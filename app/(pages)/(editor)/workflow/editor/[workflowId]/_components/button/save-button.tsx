"use client"

import { UpdateWorkflow } from '@/actions/updateWorkflow'
import { Button } from '@/components/ui/button'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function SaveButton({
  workflowId
}: {
  workflowId: string
}) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => { toast.success('Workflow saved successfully', { id: "save-workflow" }) },
    onError: () => { toast.error('Failed to save workflow', { id: "save-workflow" }) }
  })

  const handleSave = () => {
    const workflowDefinition = JSON.stringify(toObject());
    saveMutation.mutate({
      id: workflowId,
      definition: workflowDefinition
    })
  }

  return (
    <Button variant={"outline"} className="flex items-center gap-2" onClick={handleSave}>
      <CheckIcon size={16} className='stroke-green-400'/>
      Save
    </Button>
  )
}