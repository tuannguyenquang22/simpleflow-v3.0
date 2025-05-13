import { TaskType } from "@/constants/workflow.constant";
import { LucideProps } from "lucide-react";
import { AppNode, TaskParam } from "./node.type";

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  category: string;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
};

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];