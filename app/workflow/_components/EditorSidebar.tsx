"use client"

import { useEditor } from "@/providers/EditorProvider"
import { TaskMenu } from "./EditorTaskMenu";
import ParamConfig from "./EditorNodeConfig";

function FlowSidebar() {
  const { selectedNode } = useEditor();
  return (
    <aside className="w-[400px] min-w-[400px] max-w-[400px] border-l-2 border-separate h-screen p-2 px-4 overflow-auto">
      {selectedNode ? (
        <ParamConfig nodeId={selectedNode.id} />
      ) : (
        <TaskMenu />
      )}
    </aside>
  )
}

export default FlowSidebar