import { ExecutionPhaseStatus } from '@/constants/workflow.constant'
import { CircleCheckIcon, CircleDashedIcon, CircleXIcon, Loader2Icon } from 'lucide-react'
import React from 'react'

function PhaseStatusBadge({ status }: { status: ExecutionPhaseStatus }) {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon size={20} className='stroke-yellow-400' />
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2Icon size={20} className='stroke-blue-400 animate-spin' />
    case ExecutionPhaseStatus.SUCCESS:
      return <CircleCheckIcon size={20} className='stroke-green-400' />
    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon size={20} className='stroke-red-400' />
  }
}

export default PhaseStatusBadge