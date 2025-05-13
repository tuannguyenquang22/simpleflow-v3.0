import { AppNode } from "@/types/node.type";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow.type";
import { Edge } from "@xyflow/react";
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
        // if (planned)
      }
    }

  return { executionPlan };
}