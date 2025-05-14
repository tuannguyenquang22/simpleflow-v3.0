"use client"

import { Button } from "@/components/ui/button";
import useExecution from "@/hooks/use-execution";
import { PlayIcon } from "lucide-react";

function ExecuteButton({
  workflowId
}: {
  workflowId: string;
}) {
  const generate = useExecution();
  const handleExecute = () => {
    const executionPlan = generate();
    console.log(executionPlan);
  }
  return (
    <Button variant={"outline"} className="flex items-center gap-2" onClick={handleExecute}>
      <PlayIcon size={16} className="stroke-orange-300" />
      Execute
    </Button>
  )
}

export default ExecuteButton