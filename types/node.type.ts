import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { Node } from "@xyflow/react";

export interface AppNodeData {
  type: TaskType,
  inputs: Record<string, any>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface TaskParam {
  id: string;
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}