import "server-only";
import prisma from "./prisma";
import { ExecutionPhaseStatus, ExecutionStatus, TaskType } from "@/constants/workflow.constant";
import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "@/types/node.type";
import { ExecutionRegistry } from "./execution/registry";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { TaskRegistry } from "./tasks/registry";
import { revalidatePath } from "next/cache";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/types/log";
import { createLogCollector } from "./log";


export async function ExecutionWorkflow(executionId: string, nextRunAt?: Date) {
  // This function is a placeholder for the execution workflow logic.
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: { workflow: true, phases: true }
  });

  if (!execution) {
    throw new Error("Execution not found");
  }

  const definition = JSON.parse(execution.definition);
  const edges = definition.edges || [] as Edge[];

  const environment: Environment = { phases: {} };
  await initializeWorkflowExecution(executionId, execution.workflow.id, nextRunAt);
  await initializePhasesStatuses(execution);

  let executionFailed = false;
  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(phase, environment, edges);
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed);

  cleanUpEnvironment(environment);
}

async function initializeWorkflowExecution(executionId: string, workflowId: string, nextRunAt?: Date) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      startedAt: new Date(),
      status: ExecutionStatus.RUNNING,
    }
  })

  await prisma.workflow.update({
    where: { id: workflowId },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: ExecutionStatus.RUNNING,
      lastRunId: executionId,
      ...(nextRunAt && { nextRunAt })
    }
  });
}

async function initializePhasesStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id)
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    }
  })
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, executionFailed: boolean) {
  const finalStatus = executionFailed ? ExecutionStatus.FAILED : ExecutionStatus.SUCCESS;
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      completedAt: new Date(),
      status: finalStatus,
    }
  })

  await prisma.workflow.update({
    where: { id: workflowId, lastRunId: executionId },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: finalStatus,
    }
  }).catch(err => {
    // ignore
    // this means that we have trigger other runs for this workflow
    // while an execution is running
  })
}

async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment, edges: Edge[]) {
  const logCollector = createLogCollector();
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;
  setupEnvironmentForPhase(node, edges, environment);
  // Update the phase status
  await prisma.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    }
  })

  const success = await executePhase(phase, node, environment, logCollector);
  const outputs = environment.phases[node.id].outputs;
  await finalizePhase(phase.id, success, outputs, logCollector);
  return { success }
}

async function finalizePhase(phaseId: string, success: boolean, outputs: any, logCollector: LogCollector) {
  const finalStatus = success ? ExecutionPhaseStatus.SUCCESS : ExecutionPhaseStatus.FAILED;
  await prisma.executionPhase.update({
    where: { id: phaseId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      logs: {
        createMany: {
          data: logCollector.getAll().map(log => ({
            message: log.message,
            logLevel: log.level,
            timestamp: log.timestamp,
          }))
        }
      }
    }
  })
}

async function executePhase(phase: ExecutionPhase, node: AppNode, environment: Environment, logCollector: LogCollector): Promise<boolean> {
  const runFn = ExecutionRegistry[node.data.type];
  if (!runFn) {
    return false;
  };

  const executionEnvironment: ExecutionEnvironment<any> = createExecutionEnvironment(node, environment, logCollector);
  return await runFn(executionEnvironment);
}


function setupEnvironmentForPhase(node: AppNode, edges: Edge[], environment: Environment) {
  environment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // Get input value from outputs in the environment
    const connectedEdge = edges.find(edge => edge.target === node.id && edge.targetHandle === input.name);
    if (!connectedEdge) {
      console.error("Missing edge for input", input.name, node.id);
      continue;
    }

    const outputValue = environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!];
    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

function createExecutionEnvironment(node: AppNode, environment: Environment, logCollector: LogCollector) {
  return {
    getInput: (name: string) => environment.phases[node.id].inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    log: logCollector
  }
}

function cleanUpEnvironment(environment: Environment) {
  console.log("Cleaning up environment");
}