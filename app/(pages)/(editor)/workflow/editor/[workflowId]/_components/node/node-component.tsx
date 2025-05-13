"use client"

import { NodeProps } from "@xyflow/react";
import { NodeCardHeader, NodeCard, NodeCardInputBody, NodeCardInput, NodeCardOutputBody, NodeCardOutput } from "./node-card";
import { memo } from "react";
import { AppNodeData } from "@/types/node.type";
import { TaskRegistry } from "@/lib/registry";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];  
  return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
    <NodeCardHeader taskType={nodeData.type} />
    {task.inputs && (
      <NodeCardInputBody>
        {task.inputs.map((input, index) => {
          if (!input.hideHandle)
            return <NodeCardInput key={index} input={input} nodeId={props.id} />
        })}
      </NodeCardInputBody>
    )}

    {task.outputs && (
      <NodeCardOutputBody>
        {task.outputs.map((output, index) => (
          <NodeCardOutput key={index} output={output} nodeId={props.id} />
        ))}
      </NodeCardOutputBody>
    )}
  </NodeCard>
})

export default NodeComponent
NodeComponent.displayName = "NodeComponent"