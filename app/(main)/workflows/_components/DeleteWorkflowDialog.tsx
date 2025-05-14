"use client"

import { DeleteWorkflow } from "@/actions/deleteWorkflow"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  workflowId: string
}

function DeleteWorkflowDialog({ open, setOpen, workflowId }: Props) {
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => { toast.success("Workflow deleted successfully", { id: workflowId }) },
    onError: () => { toast.error("Failed to delete workflow", { id: workflowId }) },
  })

  const handleDelete = () => {
    toast.loading("Deleting workflow...", { id: workflowId })
    deleteMutation.mutate(workflowId)
    setOpen(false)
  }

  return <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this workflow? This action cannot be
          undone. All data associated with this workflow will be permanently
          deleted.
        </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        className="bg-destructive hover:bg-destructive/90 text-white"
        onClick={handleDelete}
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog >
}

export default DeleteWorkflowDialog