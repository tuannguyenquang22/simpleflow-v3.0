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

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}