import { RunWorkflow } from '@/actions/runWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function RunButton({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Workflow run successfully', { id: workflowId })
    },
    onError: (error) => {
      toast.error(`Failed to run workflow: ${error.message}`, { id: workflowId })
    },
  })
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate({
          workflowId,
        })
        toast.loading('Running workflow...', { id: workflowId })
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  )
}

export default RunButton