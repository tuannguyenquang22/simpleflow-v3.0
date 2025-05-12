"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { WorkflowStatus } from "@/constants/workflow.constant"
import { cn } from "@/lib/utils"
import { Workflow } from "@prisma/client"
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DeleteWorkflowDialog from "./DeleteWorkflowDialog"

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-800",
  [WorkflowStatus.PUBLISHED]: "bg-green-400 text-green-800",
}

function WorkflowCard({
  workflow
}: {
  workflow: Workflow
}) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex justify-between items-center h-[80px]">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            statusColors[workflow.status as WorkflowStatus]
          )}>
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link href={`/workflow/editor/${workflow.id}`} className="flex items-center hover:underline">
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="text-xs text-yellow-600 bg-yellow-200 rounded-full px-2 py-1 ml-2">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={18} />
            <span>Edit</span>
          </Link>
          <WorkflowActions workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  )
}

function WorkflowActions({ workflowId }: { workflowId: string }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <>
      <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowId={workflowId} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <MoreVerticalIcon size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowDeleteDialog(true)}>
            <TrashIcon size={18} className="text-destructive" />
            <span className="text-destructive hover:text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default WorkflowCard