import { FlowToExecutionPlan } from "@/lib/execution-plan";
import { AppNode } from "@/types/node.type";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecution = () => {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges);
    return executionPlan;
  }
  , [toObject]);
  return generateExecutionPlan
};

export default useExecution;