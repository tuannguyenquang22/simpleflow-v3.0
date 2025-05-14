"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetFilesForUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return prisma.file.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}