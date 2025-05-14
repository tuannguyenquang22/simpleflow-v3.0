"use client"

import { PublishWorkflow } from "@/actions/publishWorkflow";
import { Button } from "@/components/ui/button";
import useExecution from "@/hooks/useExecution";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

function PublishButton({
  workflowId
}: {
  workflowId: string;
}) {
  const generate = useExecution();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow published successfully', { id: "publish-workflow" })
    },
    onError: (error: Error) => {
      toast.error(error.message, { id: "publish-workflow" })
    }
  })

  const handleExecute = () => {
    const executionPlan = generate();
    if (!executionPlan) {
      return;
    }
    toast.loading("Publishing workflow...", { id: "publish-workflow" })
    mutation.mutate({
      id: workflowId,
      flowDefinition: JSON.stringify(toObject())
    })
  }
  return (
    <Button variant={"outline"} className="flex items-center gap-2" onClick={handleExecute} disabled={mutation.isPending}>
      <UploadCloudIcon size={16} className="stroke-blue-300" />
      Publish
    </Button>
  )
}

export default PublishButton;