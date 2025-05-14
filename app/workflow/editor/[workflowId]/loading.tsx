import { Loader2Icon } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2Icon 
        className="w-10 h-10 animate-spin text-muted-foreground "
      />
    </div>
  )
}

export default loading