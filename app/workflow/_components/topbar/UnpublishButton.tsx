"use client"

import { PublishWorkflow } from "@/actions/publishWorkflow";
import { UnPublishWorkflow } from "@/actions/unpublishWorkflow";
import { Button } from "@/components/ui/button";
import useExecution from "@/hooks/useExecution";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

function UnPublishButton({
  workflowId
}: {
  workflowId: string;
}) {
  const generate = useExecution();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: UnPublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow unpublished successfully', { id: "unpublish-workflow" })
    },
    onError: (error: Error) => {
      toast.error(error.message, { id: "unpublish-workflow" })
    }
  })

  const handleExecute = () => {
    const executionPlan = generate();
    if (!executionPlan) {
      return;
    }
    toast.loading("Unpublishing workflow...", { id: "unpublish-workflow" })
    mutation.mutate({
      id: workflowId,
    })
  }
  return (
    <Button variant={"outline"} className="flex items-center gap-2" onClick={handleExecute} disabled={mutation.isPending}>
      <UploadCloudIcon size={16} className="stroke-blue-300" />
      UnPublish
    </Button>
  )
}

export default UnPublishButton;