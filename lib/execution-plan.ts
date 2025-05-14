import { AppNode } from "@/types/node.type";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow.type";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./registry";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
}

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {
  const entryPoint = nodes.find((node) => TaskRegistry[node.data.type].isEntryPoint);

  if (!entryPoint) {
    throw new Error("No entry point found");
  }

  const planned = new Set<string>();

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint]
    }
  ];

  for (let phase = 2;
    phase <= nodes.length || planned.size < nodes.length;
    phase++) {
      const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: []};
      for (const currentNode of nodes) {
        if (planned.has(currentNode.id)) {
          continue;
        }

        const invalidInputs = getInvalidInputs(currentNode, edges, planned);
        if (invalidInputs.length > 0) {
          const incomers = getIncomers(currentNode, nodes, edges);
          if (incomers.every(incomer => planned.has(incomer.id))) {
            // If all incoming nodes are planned and there are still invalid inputs
            console.log("Invalid inputs", invalidInputs);
            throw new Error(`Invalid inputs ${invalidInputs.join(", ")} for node ${currentNode.id}`);
          } else {
            // Skip this node for now
            continue;
          }
        }
        nextPhase.nodes.push(currentNode);
        planned.add(currentNode.id);
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
    const inputLinkedToOutput  = incomingEdges.find(
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