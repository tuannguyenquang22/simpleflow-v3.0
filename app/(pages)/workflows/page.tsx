import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react"
import { waitFor } from "@/lib/utils";
import { GetWorkflowsForUser } from "@/actions/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CreateWorkflowButton from "./_components/CreateWorkflowButton";
import WorkflowCard from "./_components/WorkflowCard";

function page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-2xl backdrop-blur-lg">
        <span>Workflows</span>
        <CreateWorkflowButton />
      </h1>
      <div className="h-full p-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={i}
          className="h-32 w-full rounded-md bg-muted"
        />
      ))}
    </div>
  )
}

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again later</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  )
}

export default page