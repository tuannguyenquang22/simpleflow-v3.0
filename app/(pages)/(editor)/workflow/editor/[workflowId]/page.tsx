import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Editor from "./_components/editor"

type Props = {
  params: { workflowId: string };
};

async function page({ params }: Props) {
  const { workflowId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-bold">You are not authenticated</h1>
      </div>
    )
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-bold">Workflow not found</h1>
      </div>
    )
  }

  return <Editor workflow={workflow}/>
}

export default page