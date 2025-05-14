import { TaskType } from "@/constants/workflow.constant";
import { AppNode } from "@/types/node.type";

export function createAppNode(
  nodeType: TaskType,
  position?: { x: number; y: number },
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "SimpleFlowNode",
    position: position || { x: 0, y: 0 },
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
  };
}