"use server"

"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { CronExpressionParser } from "cron-parser"
import { revalidatePath } from "next/cache";


export async function UpdateWorkflowCron({
  id,
  cron
}:{
  id: string, 
  cron: string
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const interval = CronExpressionParser.parse(cron);
    await prisma.workflow.update({
      where: {
        id,
        userId,
      },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      }
    })
  } catch (error: any) {
    throw new Error("Invalid cron expression");
  }

  revalidatePath("/workflows");
}