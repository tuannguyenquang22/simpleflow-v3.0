import { ExecutionPhaseStatus, ExecutionStatus, WorkflowStatus, WorkflowTrigger } from "@/constants/workflow.constant";
import prisma from "@/lib/prisma";
import { TaskRegistry } from "@/lib/tasks/registry";
import { ExecutionWorkflow } from "@/lib/workflowExecution";
import { WorkflowExecutionPlan } from "@/types/workflow.type";
import CronExpressionParser from "cron-parser";
import { timingSafeEqual } from "crypto";

function isValidSecret(secret: string) {
  const API_SECRET = process.env.API_SECRET;
  if (!API_SECRET) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
  } catch (error) {
    return false;
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1];
  if (!isValidSecret(secret)) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return Response.json({ error: "Workflow ID is required" }, { status: 400 });
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    return Response.json({ error: "Workflow not found" }, { status: 404 });
  }

  const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlan;

  try {
    const cron = CronExpressionParser.parse(workflow.cron!, { tz: "utc" });
    const nextRun = cron.next().toDate();

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId: workflowId,
        userId: workflow.userId,
        status: ExecutionStatus.PENDING,
        definition: workflow.definition,
        startedAt: new Date(),
        trigger: WorkflowTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.PENDING,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              }
            })
          })
        }
      }
    });
    await ExecutionWorkflow(execution.id);
    return new Response(null, { status: 200 });

  } catch (error) {
    return Response.json({ error: "Server Error Internal" }, { status: 500 });
  }
}
