"use server"


import { WorkflowStatus } from "@/constants/workflow.constant";
import prisma from "@/lib/prisma";
import { CreateWorkflowSchamaType, CreateWorkflowSchema } from "@/schemas/workflow.schema"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export async function CreateWorkflow(form: CreateWorkflowSchamaType) {
  const { success, data } = CreateWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid data");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify({}),
      ...data,
    }
  })

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}