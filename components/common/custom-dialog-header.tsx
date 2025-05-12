import React from 'react'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'

function CustomDialogHeader({
  title,
  description,
  icon,
  titleClassName,
  descriptionClassName,
  iconClassName,
}: {
  title: string
  description?: string
  icon?: LucideIcon

  titleClassName?: string
  descriptionClassName?: string
  iconClassName?: string
}) {
  const Icon = icon;
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-r">
          {Icon && (
            <Icon
              size={30}
              className={cn("stroke-primary", iconClassName)}
            />
          )}
          {title && (
            <p className={cn("text-2xl font-bold text-center", titleClassName)}>
              {title}
            </p>
          )}
          {description && (
            <p className={cn("text-sm text-muted-foreground text-center", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  )
}

export default CustomDialogHeader