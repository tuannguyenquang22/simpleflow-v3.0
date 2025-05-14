import { ExecutionStatus } from "@/constants/workflow.constant";
import { cn } from "@/lib/utils";

const indicatorColors: Record<ExecutionStatus, string> = {
  PENDING: "bg-yellow-500",
  RUNNING: "bg-blue-500",
  SUCCESS: "bg-green-500",
  FAILED: "bg-red-500",
}

export default function ExecutionStatusIndicator({ status }: { status: ExecutionStatus }) {
  return <div className={cn(
    "w-2 h-2 rounded-full",
    indicatorColors[status],
  )} />
};