"use server"

import { ExecutionPhaseStatus, ExecutionStatus, WorkflowStatus } from "@/constants/workflow.constant";
import { FlowToExecutionPlan } from "@/lib/executionPlan";
import { ExecutionWorkflow } from "@/lib/workflowExecution";
import prisma from "@/lib/prisma"
import { TaskRegistry } from "@/lib/tasks/registry";
import { WorkflowExecutionPlan } from "@/types/workflow.type"
import { auth } from "@clerk/nextjs/server"

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  let workflowDefinition = flowDefinition;
  if (workflow.status === WorkflowStatus.PUBLISHED) {
    if (!workflow.executionPlan) {
      throw new Error("Workflow execution plan is not available");
    }
    executionPlan = JSON.parse(workflow.executionPlan);
    workflowDefinition = workflow.definition;
  } else {
    if (!flowDefinition) {
      throw new Error("Workflow definition is required");
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
      console.error(result.error);
      throw new Error("Invalid workflow definition");    
    }

    if (!result.executionPlan) {
      throw new Error("Failed to generate execution plan");
    }

    executionPlan = result.executionPlan;
  }

  if (!flowDefinition) {
    throw new Error("Workflow definition is required");
  }

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: ExecutionStatus.PENDING,
      definition: workflowDefinition,
      trigger: "MANUAL",
      phases: {
        create: executionPlan.flatMap(phase => {
          return phase.nodes.flatMap(node => {
            return {
              userId,
              status: ExecutionPhaseStatus.PENDING,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          })
        })
      },
    },
    select: {
      id: true,
      phases: true
    }
  });

  if (!execution) {
    throw new Error("Failed to create workflow execution");
  }

  ExecutionWorkflow(execution.id);
  return {
    redirectUrl: `/workflow/run/${workflowId}/${execution.id}`,
  }
}