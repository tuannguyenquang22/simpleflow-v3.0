import { FlowToExecutionPlan, FlowToExecutionPlanErrorType } from "@/lib/executionPlan";
import { AppNode } from "@/types/node.type";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

const useExecution = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback((error: any) => {
    switch (error.type) {
      case FlowToExecutionPlanErrorType.INVALID_INPUTS:
        toast.error("Invalid inputs detected in the workflow. Please check the nodes and their connections.",
          { id: "execution-error" }
        )
        setInvalidInputs(error.invalidElements);
        break;
      case FlowToExecutionPlanErrorType.NO_ENTRY_POINT:
        toast.error("No entry point found in the workflow. Please ensure there is a valid starting node.",
          { id: "execution-error" }
        )
        break;
      default:
        toast.error("An unknown error occurred while generating the execution plan.",
          { id: "execution-error" }
        )
        break;
    }
  }, [setInvalidInputs]);

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const { executionPlan, error } = FlowToExecutionPlan(nodes as AppNode[], edges);

    if (error) {
      handleError(error);
      return null;
    }
      
    clearErrors();
    return executionPlan;
  }
    , [toObject, handleError, clearErrors]);

  return generateExecutionPlan
};

export default useExecution;