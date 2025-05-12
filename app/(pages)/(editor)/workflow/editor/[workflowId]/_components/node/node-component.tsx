"use client"

import { NodeProps } from "@xyflow/react";
import { NodeCardHeader, NodeCard, NodeCardInputBody, NodeCardInput } from "./node-card";
import { memo } from "react";
import { AppNodeData } from "@/types/node.type";
import { TaskRegistry } from "@/lib/task-registry";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  
  return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
    <NodeCardHeader taskType={nodeData.type} />
    {nodeData.inputs && (
      <NodeCardInputBody>
        {task.inputs.map((input, index) => (
          <NodeCardInput key={index} input={input} nodeId={props.id} />
        ))}
      </NodeCardInputBody>
    )}
  </NodeCard>
})

export default NodeComponent
NodeComponent.displayName = "NodeComponent"