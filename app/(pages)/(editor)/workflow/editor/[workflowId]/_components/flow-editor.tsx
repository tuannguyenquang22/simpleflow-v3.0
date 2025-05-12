import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useEffect } from 'react'

import "@xyflow/react/dist/style.css"
import NodeComponent from './node/node-component'

const nodeTypes = {
  SimpleFlowNode: NodeComponent
}

function FlowEditor({
  workflow
}: {
  workflow: Workflow
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;

    } catch (error) { }
  }, [workflow.definition, setNodes, setEdges]);
  return (
    <main className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={60}
          size={1}
          color="#EFE1D1"
          bgColor='#040D12'
        />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor