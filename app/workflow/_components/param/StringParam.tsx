"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TaskParam } from "@/types/node.type";
import { CircleHelpIcon } from "lucide-react";
import { useId } from "react"

function StringParam({
  param,
  value,
  onChange,
}: {
  param: TaskParam,
  value: string,
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex mb-2 items-center">
        {param.name}
        {param.helperText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="">
                <CircleHelpIcon size={13} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {param.helperText}
            </TooltipContent>
          </Tooltip>
        )}
      </Label>

      {param.options ? (
        <Select value={value || param.default || ""} onValueChange={(val) => onChange?.(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {param.options.map((opt: string) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          value={value || param.default || ""}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  )
}

export default StringParam