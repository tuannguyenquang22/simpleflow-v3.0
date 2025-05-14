"use client"

import { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'
import FlowEditor from './FlowEditor'
import TopbarEditor from './topbar/Topbar'
import FlowSidebar from './EditorSidebar'
import { EditorProvider } from '@/providers/EditorProvider'
import { FlowValidationProvider } from '@/providers/FlowValidationProvider'
import { WorkflowStatus } from '@/constants/workflow.constant'

function Editor({
  workflow
}: {
  workflow: Workflow
}) {
  return (
    <FlowValidationProvider>
      <ReactFlowProvider>
        <EditorProvider>
          <div className="flex flex-col h-full w-full overflow-hidden">
            <TopbarEditor 
              title="Workflow Editor" 
              subTitle={`Workflow: ${workflow.name}`} 
              workflowId={workflow.id}
              isPublished={workflow.status === WorkflowStatus.PUBLISHED}
            />
            <section className="flex h-full overflow-auto">
              <FlowEditor workflow={workflow} />
              <FlowSidebar />
            </section>
          </div>
        </EditorProvider>
      </ReactFlowProvider>
    </FlowValidationProvider>
  )
}

export default Editor