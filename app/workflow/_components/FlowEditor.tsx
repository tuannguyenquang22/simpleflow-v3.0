import { Workflow } from '@prisma/client'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'

import "@xyflow/react/dist/style.css"
import NodeComponent from './node/NodeComponent'
import { useEditor } from '@/providers/EditorProvider'
import { createAppNode } from '@/lib/helper/createNode'
import { TaskType } from '@/constants/workflow.constant'
import { AppNode } from '@/types/node.type'
import DeletableEdge from './edge/DeletableEdge'
import { TaskRegistry } from '@/lib/tasks/registry'

const nodeTypes = {
  SimpleFlowNode: NodeComponent
}

const edgeTypes = {
  default: DeletableEdge
}

function FlowEditor({
  workflow
}: {
  workflow: Workflow
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setSelectedNode } = useEditor();
  const { screenToFlowPosition, updateNodeData, setViewport } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x, y, zoom } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) { }
  }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData('application/reactflow');
    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });
    const newNode = createAppNode(taskType as TaskType, position);

    setNodes((nds) => nds.concat(newNode));
  }, [screenToFlowPosition, setNodes]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
    if (!connection.targetHandle) return;

    const node = nodes.find((node) => node.id === connection.target);
    if (!node) return;
    const nodeInputs = node.data.inputs;
    delete nodeInputs[connection.targetHandle];
    updateNodeData(node.id, {inputs: nodeInputs})
  }, [setEdges, updateNodeData, nodes]);

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    // No self connections allowed
    if (connection.source === connection.target) return false;

    // Same taskParam type connection
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);
    if (!sourceNode || !targetNode) return false;

    const sourceTask = TaskRegistry[sourceNode.data.type];
    const targetTask = TaskRegistry[targetNode.data.type];
    const output = sourceTask.outputs.find((output) => output.name === connection.sourceHandle);
    const input = targetTask.inputs.find((input) => input.name === connection.targetHandle);
    if (input?.type  !== output?.type) return false;

    return true;
  }, [nodes])

  return (
    <main className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={(event, node) => setSelectedNode(node)}
        onPaneClick={() => setSelectedNode(null)}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
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