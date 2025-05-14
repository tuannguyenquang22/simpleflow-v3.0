import { GetWorkflowExecutionWithPhases } from '@/actions/getWorkflowExecutionWithPhase';
import TopbarEditor from '@/app/workflow/_components/topbar/Topbar';
import { waitFor } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { Loader2Icon } from 'lucide-react';
import React, { Suspense } from 'react'
import ExecutionViewer from '@/app/workflow/_components/ExecutionViewer';

async function ExecutionViewerPage({
  params,
}: {
  params: {
    workflowId: string
    executionId: string
  }
}) {
  const { workflowId, executionId } = await params;
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <TopbarEditor
        workflowId={workflowId}
        title="Workflow run details"
        subTitle={`Run ID: ${executionId}`}
        hideButtons={true}
      />
      <section className="flex h-full overflow-auto">
        <Suspense fallback={
          <div className='flex w-full items-center justify-center'>
            <Loader2Icon className='h-10 w-10 animate-spin stroke-primary' />
          </div>
        }>
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  )
}

async function ExecutionViewerWrapper({
  executionId
}: {
  executionId: string
}) {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-bold">You are not authenticated</h1>
      </div>
    )
  }

  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-bold">Workflow execution not found</h1>
      </div>
    )
  }

  return <ExecutionViewer initialData={workflowExecution} />
}

export default ExecutionViewerPage