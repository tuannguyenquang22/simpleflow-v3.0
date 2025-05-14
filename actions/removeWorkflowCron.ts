"use server"

"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { CronExpressionParser } from "cron-parser"
import { revalidatePath } from "next/cache";


export async function RemoveWorkflowCron({
  id,
}: {
  id: string,
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      cron: null,
      nextRunAt: null,
    }
  })

  revalidatePath("/workflows");
}