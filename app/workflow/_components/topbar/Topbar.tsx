"use client"

import SaveButton from "./SaveButton";
import { CircleChevronLeftIcon } from "lucide-react";
import ExecuteButton from "./ExecuteButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavigationTabs from "./NavigationTabs";
import PublishButton from "./PublishButton";
import UnPublishButton from "./UnpublishButton";

function TopbarEditor({
  title,
  subTitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}: {
  title: string;
  subTitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
}) {
  return (
    <header className="flex p-4 items-center border-b-2 justify-between w-full sticky bg-background z-10">
      {/* Left section */}
      <div className="flex gap-2 items-center z-10">
        <Link href={"/workflows"}>
          <CircleChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="flex flex-col gap-1 ml-4">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subTitle && (
            <p className="text-muted-foreground text-sm text-ellipsis truncate">
              {subTitle}
            </p>
          )}
        </div>
      </div>

      {/* Center section */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <NavigationTabs workflowId={workflowId} />
      </div>

      {/* Right section */}
      <div className="flex gap-2 z-10">
        {hideButtons === false && (
          <>
            <ExecuteButton workflowId={workflowId} />
            {isPublished && (<UnPublishButton workflowId={workflowId} />)}
            {!isPublished && (
              <>
                <SaveButton workflowId={workflowId} />
                <PublishButton workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default TopbarEditor;
