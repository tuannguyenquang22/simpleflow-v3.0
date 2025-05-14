"use server"

import { ExecutionStatus } from '@/constants/workflow.constant';
import prisma from '@/lib/prisma';
import { PeriodToDateRange } from '@/lib/utils'
import { Period } from '@/types/analytic.type'
import { auth } from '@clerk/nextjs/server';

export async function GetStatsCardsValues(period: Period) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const dateRange = PeriodToDateRange(period);

  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [ExecutionStatus.SUCCESS, ExecutionStatus.FAILED],
      }
    },
    select: {
      phases: true
    }
  });

  const stats = {
    workflowExecutions: executions.length,
    phaseExecutions: 0,
  }

  stats.phaseExecutions = executions.reduce((sum, execution) => {
    return sum + execution.phases.length;
  }, 0);
 
  return stats;
}