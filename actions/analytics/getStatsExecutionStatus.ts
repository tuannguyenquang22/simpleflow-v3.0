"use server"

import { ExecutionStatus } from '@/constants/workflow.constant';
import prisma from '@/lib/prisma';
import { PeriodToDateRange } from '@/lib/utils'
import { Period } from '@/types/analytic.type'
import { auth } from '@clerk/nextjs/server';
import { eachDayOfInterval, format } from 'date-fns';

export async function GetStatsExecutionStatus(period: Period) {
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
  });

  const stats: Record<string, {
    success: number;
    failed: number;
  }> = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  })
    .map((date) => format(date, 'yyyy-MM-dd'))
    .reduce((acc, date) => {
      acc[date] = {
        success: 0,
        failed: 0,
      };
      return acc;
    }, {} as any);

  executions.forEach((execution) => {
    const date = format(execution.startedAt!, 'yyyy-MM-dd');
    if (execution.status === ExecutionStatus.SUCCESS) {
      stats[date].success += 1;
    }
    if (execution.status === ExecutionStatus.FAILED) {
      stats[date].failed += 1;
    }
  })

  const result = Object.entries(stats)
    .map(([date, infos ]) => ({
      date,
      ...infos
    }));
  return result;
}