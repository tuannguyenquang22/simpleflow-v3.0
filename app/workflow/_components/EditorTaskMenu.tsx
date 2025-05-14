"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TaskType } from '@/constants/workflow.constant'
import { TaskRegistry } from '@/lib/tasks/registry'
import React from 'react'

export function TaskMenu() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="datasource">
        <AccordionTrigger className="font-bold">
          Data Source
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          <TaskMenuButton taskType={TaskType.CSV_FILE_LOADER} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notification">
        <AccordionTrigger className="font-bold">
          Notification
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          <TaskMenuButton taskType={TaskType.EMAIL_NOTIFICATION} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function TaskMenuButton({
  taskType
}: {
  taskType: TaskType
}) {
  const task = TaskRegistry[taskType];
  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  }
  return (
    <Button
      variant={"secondary"}
      className="flex justify-start items-center gap-2 border w-full"
      draggable
      onDragStart={event => onDragStart(event, taskType)}
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  )
}