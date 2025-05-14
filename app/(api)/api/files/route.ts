import { NextResponse } from "next/server";
import { GetFilesForUser } from "@/actions/getFilesForUser";
import { auth } from "@clerk/nextjs/server";
import { CreateFileForUser } from "@/actions/createFileForUser";


export type CreateFileForUserRequest = {
  name: string;
  path: string;
  metadata?: string;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const files = await GetFilesForUser();
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const { name, path, metadata }: CreateFileForUserRequest = await request.json();
  await CreateFileForUser({ name, path, metadata })

  return NextResponse.json({ message: "File created successfully" });
}