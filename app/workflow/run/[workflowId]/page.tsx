import React from 'react'
import TopbarEditor from '../../_components/topbar/Topbar'
import { GetWorkflowExecutions } from '@/actions/getWorkflowExecutions';
import { WorkflowIcon } from 'lucide-react';
import ExecutionsTable from '../../_components/ExecutionsTable';

async function page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = await params;
  return (
    <div className="h-full w-full overflow-auto">
      <TopbarEditor 
        workflowId={workflowId}
        hideButtons={true}
        title='Workflow Run'
        subTitle='View the execution of the workflow'
      />
      <ExecutionsTableWrapper workflowId={workflowId} />
    </div>
  )
}

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-muted-foreground">No executions found</p>
      </div>
    )
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex items-center justify-center flex-col gap-2 h-full w-full">
          <div className="rounded-full bg-secondary/50 p-4 flex items-center justify-center mb-4">
            <WorkflowIcon size={40} className='stroke-primary' />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No runs have been triggered yet for this workflow</p>
            <p className="text-sm text-muted-foreground">You can trigger a new run in the editor page</p>
          </div>
        </div>
      </div>
    )
  }

  return <div className="p-4">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />

  </div>
}


export default page