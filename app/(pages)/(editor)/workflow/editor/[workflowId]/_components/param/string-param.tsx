"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { TaskParam } from "@/types/node.type";
import { useId, useState } from "react"


function StringParam({ 
  param,
  value,
  updateNodeParamValue
}: { 
  param: TaskParam,
  value: string,
  updateNodeParamValue: (newValue: string) => void
}) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && (
          <p className="px-2 text-red-400">*</p>
        )}
      </Label>
      <Input 
        id={id} 
        defaultValue={internalValue} 
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(internalValue)} 
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  )
}  

export default StringParam