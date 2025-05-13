"use client"

import { useEditor } from "@/providers/editor-provider"
import { TaskMenu } from "./task-menu";
import ParamConfig from "./param-config";

function FlowSidebar() {
  const { selectedNode } = useEditor();
  return (
    <aside className="w-[300px] min-w-[300px] max-w-[300px] border-l-2 border-separate h-screen p-2 px-4 overflow-auto">
      {selectedNode ? (
        <ParamConfig nodeId={selectedNode.id} />
      ) : (
        <TaskMenu />
      )}
    </aside>
  )
}

export default FlowSidebar