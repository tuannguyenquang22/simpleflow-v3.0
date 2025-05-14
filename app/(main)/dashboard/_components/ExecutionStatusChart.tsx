"use client";

import { GetStatsExecutionStatus } from '@/actions/analytics/getStatsExecutionStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Layers2Icon } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

type ChartData = Awaited<ReturnType<typeof GetStatsExecutionStatus>>;
const chartConfig = {
  success: {
    label: "Success",
    color: "#4caf50",
  },
  failed: {
    label: "Failed",
    color: "#f44336",
  }
}

export default function ExecutionStatusChart({ data }: { data: ChartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold flex items-center gap-2'>
          <Layers2Icon className='h-6 w-6 stroke-primary' />
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily workflow execution status for the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
          <AreaChart
            data={data}
            height={200}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip content={<ChartTooltipContent className='w-[250px]' />} />
            <Area min={0} type={"bump"} fill="var(--color-failed)" stroke="var(--color-failed)" fillOpacity={0.6} stackId={"total"} dataKey={"failed"} />
            <Area min={0} type={"bump"} fill="var(--color-success)" stroke="var(--color-success)" fillOpacity={0.6} stackId={"total"} dataKey={"success"} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}