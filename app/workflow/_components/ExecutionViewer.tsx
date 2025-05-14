"use client"

import { GetWorkflowExecutionWithPhases } from '@/actions/getWorkflowExecutionWithPhase'
import { GetWorkflowPhaseDetails } from '@/actions/getWorkflowPhaseDetail';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExecutionPhaseStatus, ExecutionStatus, WorkflowStatus } from '@/constants/workflow.constant';
import { cn, DatesToDurationString } from '@/lib/utils';
import { LogLevel } from '@/types/log';
import { ExecutionLog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow, set } from 'date-fns';
import { CalendarIcon, CircleDashedIcon, ClockIcon, Loader2Icon, LucideIcon, WorkflowIcon } from 'lucide-react';
import React, { ReactNode, useEffect } from 'react'
import PhaseStatusBadge from './PhaseStatusBadge';

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

export default function ExecutionViewer({
  initialData
}: {
  initialData: ExecutionData
}) {
  const [selectedPhase, setSelectedPhase] = React.useState<string | null>(null);
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) => q.state.data?.status === ExecutionStatus.RUNNING ? 1000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  })

  const duration = DatesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt,
  )

  const isRunning = query.data?.status === ExecutionStatus.RUNNING;

  useEffect(() => {
    // While runnning, automatically select the running phase
    const phases = query.data?.phases || [];
    if (isRunning && phases.length > 0) {
      const phaseToSelect = phases.toSorted((a, b) => a.startedAt! > b.startedAt! ? -1 : 1)[0];
      setSelectedPhase(phaseToSelect.id);
      return ;
    }

    const phaseToSelect = phases.toSorted((a, b) => 
      a.completedAt! > b.completedAt! ? -1 : 1
    )[0];
    setSelectedPhase(phaseToSelect.id);
  }, [query.data?.phases, isRunning, selectedPhase]);

  return <div className="flex w-full h-full">
    <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
      <div className="py-4 ox-2">
        <ExecutionLabel
          icon={CircleDashedIcon}
          label="Status"
          value={
            <div className="font-semibold flex gap-2 items-center">
              <PhaseStatusBadge status={query.data?.status as ExecutionPhaseStatus} />
              <span>{query.data?.status}</span>
            </div>
          }
        />

        <ExecutionLabel
          icon={CalendarIcon}
          label="Started at"
          value={
            <span className="lowercase">
              {query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true }) : "-"}
            </span>
          }
        />

        <ExecutionLabel
          icon={ClockIcon}
          label="Duration"
          value={duration ? duration : <Loader2Icon className='animate-spin' size={20} />}
        />

        <Separator />
        <div className="flex justify-center items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className="stroke-muted-foreground/50" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase, index) => (
            <Button
              key={phase.id}
              className=' w-full flex justify-between items-center gap-2'
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              onClick={() => {
                if (isRunning) {
                  return;
                }
                setSelectedPhase(phase.id);
              }}
            >
              <div className="flex items-center gap-2">
                <Badge variant={"outline"}>{index + 1}</Badge>
                <div className="font-semibold">{phase.name}</div>
              </div>
              <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus } />
            </Button>
          ))}
        </div>
      </div>
    </aside>
    <div className="flex h-full w-full">
      {isRunning && (
        <div className="flex items-center justify-center flex-col gap-2 h-full w-full">
          <Loader2Icon className='animate-spin' size={40} />
          <p className="text-muted-foreground">Execution is running...</p>
        </div>
      )}
      {!isRunning && !selectedPhase && (
        <div className="flex items-center justify-center flex-col gap-2 h-full w-full">
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No phase selected</p>
            <p className="text-muted-foreground">Select a phase to view details</p>
          </div>
        </div>
      )}
      {!isRunning && selectedPhase && phaseDetails.data && (
        <div className="flex container flex-col gap-4 overflow-auto p-4">
          <Badge variant={"outline"} className="space-x-4 p-1">
            <div className="flex gap-1 items-center">
              <ClockIcon size={20} className="stroke-muted-foreground/50" />
              <span className="font-semibold">Duration</span>
            </div>
            <span>
              {DatesToDurationString(
                phaseDetails.data?.completedAt,
                phaseDetails.data?.startedAt,
              )}
            </span>
          </Badge>
          <ParameterViewer title="Inputs" subTitle="Inputs used for this phase" paramsJson={phaseDetails.data?.inputs} />
          <ParameterViewer title="Outputs" subTitle="Outputs used for this phase" paramsJson={phaseDetails.data?.outputs} />
          <LogViewer logs={phaseDetails.data?.logs} />
        </div>
      )}
    </div>
  </div>
}

function ExecutionLabel({
  icon,
  label,
  value
}: {
  icon: LucideIcon,
  label: ReactNode,
  value: ReactNode
}) {
  const Icon = icon
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/50" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  )
}

function ParameterViewer({
  title,
  subTitle,
  paramsJson
}: {
  title: string,
  subTitle: string,
  paramsJson: string | null
}) {
  const params = paramsJson ? JSON.parse(paramsJson) : undefined;
  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none">
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription className='text-muted-foreground text-sm'>
          {subTitle}
        </CardDescription>
        <CardContent className="py-4">
          <div className="flex flex-col gap-2">
            {(!params || Object.keys(params).length === 0) && (
              <p className="text-sm">No parameters generated by this phase</p>
            )}
            {params && Object.entries(params).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground basis-1/3">{key}</p>
                <Input readOnly className='flex-1 basis-2/3' value={value as string} />
              </div>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

function LogViewer({ logs }: { logs: ExecutionLog[] | undefined }) {
  if (!logs || logs.length === 0) return null;
  return <Card>
    <CardHeader className="rounded-lg rounded-b-none">
      <CardTitle className='text-base'>Logs</CardTitle>
      <CardDescription className='text-muted-foreground text-sm'>
        Logs generated by this phase
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4">
      <Table>
        <TableHeader className='text-muted-foreground text-sm'>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map(log => (
            <TableRow key={log.id} className='text-muted-foreground'>
              <TableCell width={200}>{log.timestamp.toISOString()}</TableCell>
              <TableCell width={80} className={cn(
                "uppercase text-xs font-bold p-[3px] pl-4",
                (log.logLevel as LogLevel) === "error" && "text-destructive",
                (log.logLevel as LogLevel) === "info" && "text-green-600",
                (log.logLevel as LogLevel) === "warning" && "text-blue-600",
              )}>
                  {log.logLevel}
              </TableCell>
              <TableCell>
                <p className="text-sm">{log.message}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
}