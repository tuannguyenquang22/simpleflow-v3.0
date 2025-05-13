"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TaskParam } from "@/types/node.type";
import { CircleHelpIcon, CloudUploadIcon, FileIcon } from "lucide-react";
import { useId } from "react"

export default function FileParam({
  param,
  value,
  onChange,
}: {
  param: TaskParam;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const mockFile = [
    { name: "file1.csv", id: "123123123", type: "csv" },
    { name: "file2.csv", id: "22222", type: "xslx" },
  ];

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

        {param.required && <p className="text-red-400">(required)</p>}
      </Label>
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a file" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="flex gap-2 w-full items-center">
              <FileIcon size={12} />
              File
            </SelectLabel>
            {mockFile.map((file) => (
              <SelectItem key={file.id} value={file.id}>
                {file.name}
              </SelectItem>
            ))}
          </SelectGroup>
          {/* Optional upload handling can go here */}
        </SelectContent>
      </Select>
    </div>
  );
}

