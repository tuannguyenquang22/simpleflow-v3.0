"use server"

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function CreateFileForUser({
  name,
  path,
  metadata
}: {
  name: string;
  path: string;
  metadata?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  await prisma.file.create({
    data: {
      name, path, metadata, userId,
    }
  })
}
