"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExecutionStatus, WorkflowStatus } from "@/constants/workflow.constant"
import { cn } from "@/lib/utils"
import { Workflow } from "@prisma/client"
import { ChevronRight, ClockIcon, CornerDownRightIcon, FileTextIcon, MoreVerticalIcon, MoveRightIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DeleteWorkflowDialog from "./DeleteWorkflowDialog"
import ScheduleDialog from "./ScheduleDialog"
import ExecutionStatusIndicator from "@/app/workflow/_components/ExecutionStatusIndicator"
import { formatDistanceToNow, format } from "date-fns"
import { formatInTimeZone } from "date-fns-tz";
import RunButton from "./RunButton"

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-800",
  [WorkflowStatus.PUBLISHED]: "bg-green-400 text-white",
}

function WorkflowCard({
  workflow
}: {
  workflow: Workflow
}) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT

  return (
    <Card className="p-0 border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
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
          <div className="flex flex-col gap-2">
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
            <ScheduleSection isDraft={isDraft} workflowId={workflow.id} cron={workflow.cron} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && (
            <RunButton workflowId={workflow.id} />
          )}
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
      <LastRunDetails workflow={workflow} />
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

function ScheduleSection({ isDraft, workflowId, cron }: { isDraft?: boolean, workflowId: string, cron: string | null }) {
  if (isDraft) return null;
  else
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
        <ScheduleDialog workflowId={workflowId} usedCron={cron} key={`${cron}-${workflowId}`} />
      </div>
    )
}

function LastRunDetails({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  if (isDraft) return null;

  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
  const formattedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });
  const nextSchedule = nextRunAt && format(nextRunAt, "dd/MM/yyyy HH:mm");
  const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");
  return (
    <div className="bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center text-sm gap-2">
        {lastRunAt && (
          <Link href={`/workflow/run/${workflow.id}/${lastRunId}`} className="flex items-center gap-2 group text-sm">
            <span>Last run:</span>
            <ExecutionStatusIndicator status={lastRunStatus as ExecutionStatus} />
            <span>{lastRunStatus}</span>
            <span>{formattedStartedAt}</span>
            <ChevronRight size={14} className="group-hover:translate-x-0 transition -translate-x-[2px]" />
          </Link>
        )}
        {!lastRunAt && (
          <span className="text-sm text-muted-foreground">
            No runs yet
          </span>
        )}
      </div>
      {nextRunAt && (
        <div className="flex items-center text-sm gap-2">
          <ClockIcon size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  )
}

export default WorkflowCard