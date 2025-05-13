"use client"

import { TaskParamType } from "@/constants/workflow.constant";
import { TaskParam } from "@/types/node.type";

import StringParam from "../param/string-param";
import FileParam from "../param/file-param";


export function NodeParamField({
  param,
  value,
  onChange,
}: {
  param: TaskParam;
  value: any;
  onChange: (value: any) => void;
}) {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.INTEGER_NUMBER:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.FLOAT_NUMBER:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.BOOLEAN:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.FILE:
      return <FileParam param={param} value={value} onChange={onChange} />;
    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not Implemented</div>
        </div>
      );
  }
}
