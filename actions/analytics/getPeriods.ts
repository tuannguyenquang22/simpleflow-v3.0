"use server"

import prisma from "@/lib/prisma";
import { Period } from "@/types/analytic.type";
import { auth } from "@clerk/nextjs/server"

export async function getPeriods() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const years = await prisma.workflowExecution.aggregate({
    where: { userId },
    _min: { startedAt: true },
  });

  const currentYear = new Date().getFullYear();

  const minYear = years._min.startedAt
    ? years._min.startedAt.getFullYear()
    : currentYear;

  const periods: Period[] = [];
  for (let year = minYear; year <= currentYear; year++) {
    for (let month = 0; month < 12; month++) {
      periods.push({ year, month });
    }
  }

  return periods;
}

