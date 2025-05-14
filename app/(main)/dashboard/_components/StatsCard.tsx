import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface Props {
  title: string
  value: number
  icon: LucideIcon
}

function StatsCard(props: Props) {
  return (
    <Card className='relative overflow-hidden'>
      <CardHeader className='flex pb-2'>
        <CardTitle>{props.title}</CardTitle>
        <props.icon size={100} className='text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10' />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <span>{props.value}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard