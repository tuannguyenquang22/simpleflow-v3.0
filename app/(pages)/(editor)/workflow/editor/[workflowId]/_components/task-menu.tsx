"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TaskType } from '@/constants/workflow.constant'
import { TaskRegistry } from '@/lib/registry'
import React from 'react'

export function TaskMenu() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="datasource">
        <AccordionTrigger className="font-bold">
          Data Source
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          <TaskMenuButton taskType={TaskType.FILE_UPLOADER} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="transformation">
        <AccordionTrigger className="font-bold">
          Transformation
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          <TaskMenuButton taskType={TaskType.COMBINE_DATAFRAME} />
          <TaskMenuButton taskType={TaskType.SELECT_COLUMNS} />
          <TaskMenuButton taskType={TaskType.CATEGORY_ENCODER} />
          <TaskMenuButton taskType={TaskType.NUMERIC_SCALER} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="machine-learning">
        <AccordionTrigger className="font-bold">
          Machine Learning
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          <TaskMenuButton taskType={TaskType.TRAIN_TEST_SPLIT} />
          <TaskMenuButton taskType={TaskType.TRAINING} />
          <TaskMenuButton taskType={TaskType.TUNING} />
          <TaskMenuButton taskType={TaskType.EVALUATION} />
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