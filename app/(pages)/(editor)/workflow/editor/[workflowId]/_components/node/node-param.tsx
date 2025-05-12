"use client"

import { Input } from "@/components/ui/input";
import { TaskParamType } from "@/constants/workflow.constant";
import { AppNode, TaskParam } from "@/types/node.type";
import StringParam from "../param/string-param";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";


export function NodeParamField({ param, nodeId }: { param: TaskParam, nodeId: string }) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback((newValue: string) => {
    updateNodeData(nodeId, {
      inputs: {
        ...node?.data.inputs,
        [param.name]: newValue
      }
    })
  }, [updateNodeData, param.name, node?.data.inputs])

  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} />
    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not Implemented</div>
        </div>
      )
  }
}