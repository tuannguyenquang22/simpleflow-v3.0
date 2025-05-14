"use client"

import React from 'react'
import { Period } from '@/types/analytic.type'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation';

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
] as const;

function PeriodSelector({
  periods,
  selectedPeriod
}: {
  periods: Period[],
  selectedPeriod?: Period
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedValue = selectedPeriod
    ? `${selectedPeriod.month}-${selectedPeriod.year}`
    : '';

  return (
    <Select 
      defaultValue={selectedValue}
      onValueChange={value => {
        const [month, year] = value.split('-');
        const params = new URLSearchParams(searchParams);
        params.set("month", month);
        params.set("year", year);
        router.push(`/dashboard?${params.toString()}`);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period, index) => (
          <SelectItem key={index} value={`${period.month}-${period.year}`}>
            {`${MONTH_NAMES[period.month]} ${period.year}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default PeriodSelector