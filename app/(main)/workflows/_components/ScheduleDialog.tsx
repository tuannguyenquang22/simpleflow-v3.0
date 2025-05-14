import { UpdateWorkflowCron } from '@/actions/updateWorkflowCron'
import CustomDialogHeader from '@/components/common/CustomHeaderDialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Calendar1Icon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import cronstrue from "cronstrue";
import { RemoveWorkflowCron } from '@/actions/removeWorkflowCron'

function ScheduleDialog({ workflowId, usedCron }: { workflowId: string, usedCron: string | null }) {
  const [cron, setCron] = useState(usedCron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");
  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success('Workflow schedule updated successfully', { id: 'schedule-update' })
    },
    onError: (error) => {
      toast.error(`Failed to update workflow schedule: ${error.message}`, { id: 'schedule-update' })
    }
  });

  const removeCronMutation = useMutation({
    mutationFn: RemoveWorkflowCron,
    onSuccess: () => {
      toast.success('Workflow schedule updated successfully', { id: 'schedule-update' })
    },
    onError: (error) => {
      toast.error(`Failed to update workflow schedule: ${error.message}`, { id: 'schedule-update' })
    }
  });


  useEffect(() => {
    try {
      const humanCron = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCron);
    } catch (error) {
      setValidCron(false);
      setReadableCron("");
    }
  }, [cron]);

  const workflowHasValidCron = usedCron && usedCron.length > 0;
  const readableSavedCron = workflowHasValidCron && cronstrue.toString(usedCron);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={"link"} 
          size={"sm"} 
          className={cn("text-sm p-0 h-auto text-orange-500", workflowHasValidCron && "text-green-500")}
        >
          <div className="flex items-center gap-1">
            {workflowHasValidCron && (
              <div className="flex items-center gap-1">
                <ClockIcon />
                {readableSavedCron}
              </div>
            )}
            {!workflowHasValidCron && (
              <div className="flex items-center gap-1">            <
                TriangleAlertIcon className='w-3 h-3' />
                Set Schedule
              </div>
            )}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader title='Schedule Workflow' icon={Calendar1Icon} />
        <div className="p-4 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Specify the schedule for your workflow. You can use cron expressions to define the schedule.
          </p>
          <Input placeholder="Example: 0 0 * * *" className="mt-4" value={cron} onChange={(e) => setCron(e.target.value)} />
          <div className={cn("bg-accent rounded-md p-4 border text-sm", validCron && "border-primary text-primary")}>
            {validCron ? readableCron : "Invalid cron expression"}
          </div>

          {workflowHasValidCron && (
            <DialogClose asChild>
              <div className="">
                <Button
                  className='w-full text-destructive border-destructive hover:text-destructive'
                  variant={"outline"}
                  disabled={
                    mutation.isPending || removeCronMutation.isPending
                  }
                  onClick={() => {
                    toast.loading('Removing schedule...', { id: 'schedule-update' })
                    removeCronMutation.mutate({
                      id: workflowId,
                    })
                  }}
                >
                  Remove current schedule
                </Button>
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className='w-full flex flex-col px-6 gap-2'>
          <DialogClose asChild>
            <Button className="w-full"
              onClick={() => {
                toast.loading('Updating schedule...', { id: 'schedule-update' })
                mutation.mutate({
                  id: workflowId,
                  cron,
                })
              }}
              disabled={mutation.isPending || !validCron}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleDialog