"use client"

import { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'
import FlowEditor from './flow-editor'
import TopbarEditor from './topbar-editor'
import FlowSidebar from './flow-sidebar'
import { EditorProvider } from '@/providers/editor-provider'

function Editor({
  workflow
}: {
  workflow: Workflow
}) {
  return (
    <ReactFlowProvider>
      <EditorProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TopbarEditor title="Workflow Editor" subTitle={workflow.name} workflowId={workflow.id} />
          <section className="flex h-full overflow-auto">
            <FlowEditor workflow={workflow} />
            <FlowSidebar />
          </section>
        </div>
      </EditorProvider>
    </ReactFlowProvider>
  )
}

export default Editor