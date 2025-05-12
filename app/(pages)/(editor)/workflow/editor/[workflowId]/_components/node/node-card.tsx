"use client"

import { Badge } from '@/components/ui/badge';
import { TaskType } from '@/constants/workflow.constant';
import { TaskRegistry } from '@/lib/task-registry';
import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/node.type';
import { Handle, Position } from '@xyflow/react';
import { FlagIcon } from 'lucide-react';
import React from 'react'
import { NodeParamField } from './node-param';

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
        'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col',
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
        </div>
      </div>
    </div>
  )
}

export function NodeCardInputBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col divide-y gap-2">
      {children}
    </div>
  )
}

export function NodeCardInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full rounded-b-md">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
          )}
        />
      )}
    </div>
  )
}