"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"


export async function UpdateWorkflow({
  id,
  definition
}:{
  id: string, 
  definition: string
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    }
  })

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  await prisma.workflow.update({
    data: {
      definition: definition,
    },
    where: {
      id,
      userId,
    }
  })
}