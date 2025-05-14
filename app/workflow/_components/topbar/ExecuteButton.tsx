"use client"

import { RunWorkflow } from "@/actions/runWorkflow";
import { Button } from "@/components/ui/button";
import useExecution from "@/hooks/useExecution";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ExecuteButton({
  workflowId
}: {
  workflowId: string;
}) {
  const router = useRouter();
  const generate = useExecution();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: ({ redirectUrl }) => {
      router.push(redirectUrl);
      toast.success('Workflow started successfully', { id: "execute-workflow" })
    },
    onError: (error: Error) => {
      toast.error(error.message, { id: "execute-workflow" })
    }
  })

  const handleExecute = () => {
    const executionPlan = generate();
    if (!executionPlan) {
      return;
    }

    mutation.mutate({
      workflowId,
      flowDefinition: JSON.stringify(toObject())
    })
  }
  return (
    <Button variant={"outline"} className="flex items-center gap-2" onClick={handleExecute} disabled={mutation.isPending}>
      <PlayIcon size={16} className="stroke-orange-300" />
      Execute
    </Button>
  )
}

export default ExecuteButton