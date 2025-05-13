import { FlowToExecutionPlan } from "@/lib/execution-plan";
import { AppNode } from "@/types/node.type";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecution = () => {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const result = FlowToExecutionPlan(nodes as AppNode[], edges);
  }
  , [toObject]);
  return generateExecutionPlan
};

export default useExecution;