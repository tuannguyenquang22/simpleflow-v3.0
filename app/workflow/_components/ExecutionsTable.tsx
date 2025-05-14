"use client"

import { GetWorkflowExecutions } from "@/actions/getWorkflowExecutions";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatesToDurationString } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import ExecutionStatusIndicator from "./ExecutionStatusIndicator";
import { ExecutionStatus } from "@/constants/workflow.constant";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

export default function ExecutionsTable({
  workflowId,
  initialData
}: {
  workflowId: string;
  initialData: InitialDataType
}) {
  const query = useQuery({
    queryKey: ["workflow-executions", workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000,
  });

  const router = useRouter();

  return <div className="border rounded-lg shadow-md overflow-auto">
    <Table className="w-full">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Started At (DESC)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {query.data.map((execution) => {
          const duration = DatesToDurationString(execution.completedAt, execution.startedAt);
          const formattedStartedAt = execution.startedAt && formatDistanceToNow(
            execution.startedAt, {
              addSuffix: true,
            }
          )
          return (
            <TableRow key={execution.id} className="cursor-pointer hover:bg-muted/50" onClick={() => {
              router.push(`/workflow/run/${workflowId}/${execution.id}`);
            }}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">{execution.id}</span>
                  <div className="text-muted-foreground text-xs">
                    <span>Trigger via</span>
                    <Badge variant={"outline"}>{execution.trigger}</Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="">
                  <div className="flex gap-2 items-center">
                    <ExecutionStatusIndicator status={execution.status as ExecutionStatus} />
                    <span className="text-sm font-semibold">{execution.status}</span>
                  </div>
                  <div className="">{duration}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{formattedStartedAt}</span>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </div>
}