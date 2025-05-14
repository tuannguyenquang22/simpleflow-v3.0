import { TaskParamType } from "@/constants/workflow.constant";
import { TaskParam } from "@/types/node.type";

import StringParam from "../param/StringParam";

export function NodeParamField({
  param,
  value,
  nodeId,
  onChange,
}: {
  param: TaskParam;
  value: any;
  nodeId: string;
  onChange: (value: any) => void;
}) {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.INTEGER:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.FLOAT:
      return <StringParam param={param} value={value} onChange={onChange} />;
    case TaskParamType.BOOLEAN:
      return <StringParam param={param} value={value} onChange={onChange} />;
    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not Implemented</div>
        </div>
      );
  }
}
