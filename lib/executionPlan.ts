import { AppNode, AppNodeMissingInputs } from "@/types/node.type";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow.type";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./tasks/registry";

export enum FlowToExecutionPlanErrorType {
  INVALID_INPUTS = "INVALID_INPUTS",
  NO_ENTRY_POINT = "NO_ENTRY_POINT",
}

type FlowToExecutionPlanType = {
  error?: {
    type: FlowToExecutionPlanErrorType;
    invalidElements?: AppNodeMissingInputs[];
  }
  executionPlan?: WorkflowExecutionPlan;
}

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {
  const entryPoint = nodes.find((node) => TaskRegistry[node.data.type].isEntryPoint);

  if (!entryPoint) {
    return {
      error: {
        type: FlowToExecutionPlanErrorType.NO_ENTRY_POINT,
      }
    }
  }

  const inputsWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();
  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint]
    }
  ];
  planned.add(entryPoint.id);

  for (let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every(incomer => planned.has(incomer.id))) {
          // If all incoming nodes are planned and there are still invalid inputs
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          // Skip this node for now
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }

    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanErrorType.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      }
    }
  }

  return { executionPlan };
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.id];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
      // This input is fine
    }

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.id
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      // the inputs is required and have a valid value for it
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // The output is providing a value to the input: the input is fine
        continue;
      }
    }
    invalidInputs.push(input.id);
  }

  return invalidInputs;
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) {
    return [];
  }

  const incomersIds = new Set<string>();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  })

  return nodes.filter((node) => incomersIds.has(node.id));
}