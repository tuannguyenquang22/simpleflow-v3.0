import { getPeriods } from "@/actions/analytics/getPeriods"
import PeriodSelector from "./_components/PeriodSelector";
import { Period } from "@/types/analytic.type";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { Card } from "@/components/ui/card";
import { CirclePlayIcon, WaypointsIcon } from "lucide-react";
import StatsCard from "./_components/StatsCard";
import { GetStatsExecutionStatus } from "@/actions/analytics/getStatsExecutionStatus";
import ExecutionStatusChart from "./_components/ExecutionStatusChart";

async function page({
  searchParams,
}: {
  searchParams: { month?: string; year?: string }
}) {
  const currentDate = new Date();
  const { month, year } = await searchParams;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  }
  return (
    <div className="flex flex-1 h-full flex-col">
      <div className="flex justify-between items-center border-b bg-background/50 p-6 backdrop-blur-lg">
        <h1 className="text-2xl">Dashboard</h1>
        <PeriodSelectorWrapper selectedPeriod={period} />
      </div>
      <div className="p-4 flex flex-col gap-4">
        <StatsCards selectedPeriod={period} />
        <StatsExecutionStatus selectedPeriod={period} />
      </div>
    </div>
  )
}

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod?: Period }) {
  const periods = await getPeriods();
  return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-2 min-h-[120px]">
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard 
        title="Phase executions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
    </div>
  )
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Period
}) {
  const data = await GetStatsExecutionStatus(selectedPeriod);
  return <ExecutionStatusChart data={data} />
}

export default page