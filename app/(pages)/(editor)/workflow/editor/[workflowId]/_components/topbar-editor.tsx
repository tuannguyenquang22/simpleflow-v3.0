"use client"

import { Button } from "@/components/ui/button";
import SaveButton from "./button/save-button";
import { BotIcon } from "lucide-react";
import ExecuteButton from "./button/execute-button";

function TopbarEditor({
  title,
  subTitle,
  workflowId
}: {
  title: string;
  subTitle?: string;
  workflowId: string;
}) {
  return (
    <header className="flex p-4 border-b-2 border-separate justify-between w-full sticky bg-background z-10">
      <div className="flex gap-1 flex-1">
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subTitle && (
            <p className="text-muted-foreground text-sm text-ellipsis truncate">{subTitle}</p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <ExecuteButton workflowId={workflowId} />
        <SaveButton workflowId={workflowId} />
      </div>
    </header>
  )
}

export default TopbarEditor