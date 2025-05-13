"use client"

import { Badge } from '@/components/ui/badge';
import { TaskType } from '@/constants/workflow.constant';
import { TaskRegistry } from '@/lib/registry';
import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/node.type';
import { Handle, Position } from '@xyflow/react';
import { FlagIcon, GripVerticalIcon } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';

export function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 p-0.5 flex flex-col',
        isSelected && "border-blue-500",
      )}
    >
      {children}
    </div>
  )
}

export function NodeCardHeader({
  taskType
}: {
  taskType: TaskType
}) {
  const task = TaskRegistry[taskType]
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <div className="text-xs font bold uppercase text-muted-foreground">
          {task.label}
        </div>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && (
            <div className='flex items-center gap-1'>
              <Badge className="text-xs">
                <FlagIcon />
              </Badge>
            </div>
          )}
          <Badge variant="secondary" className="text-xs">
            {task.category}
          </Badge>
          <Button variant={"ghost"} size={"icon"} className="drag-handle">
            <GripVerticalIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function NodeCardInputBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col divide-y gap-1">
      {children}
    </div>
  )
}

export function NodeCardInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      {!input.hideHandle && (
        <>
          <div className="text-xs ">{input.name}</div>
          <Handle
            id={input.name}
            type="target"
            position={Position.Left}
            className={cn(
              "!bg-muted-foreground !border-2 !border-background !-left-1 !w-3.5 !h-3.5",
            )}
          />
        </>
      )}
    </div>
  )
}

export function NodeCardOutputBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col divide-y gap-1">
      {children}
    </div>
  )
}

export function NodeCardOutput({ output, nodeId }: { output: TaskParam, nodeId: string }) {
  console.log("output", output);
  return (
    <div className="flex justify-end relative p-3 bg-secondary w-full">
      <div className="text-xs ">{output.name}</div>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-1 !w-3.5 !h-3.5",
        )}
      />
    </div>
  )
}