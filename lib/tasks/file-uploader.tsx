import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { LucideProps, Paperclip } from "lucide-react";

export const FileUploader = {
  type: TaskType.FILE_UPLOADER,
  label: "File Uploader",
  icon: (props: LucideProps) => (<Paperclip className="stroke-pink-400" />),
  isEntryPoint: true,
  category: "Data Source",
  inputs: [
    {
      id: "trigger_in",
      name: "Trigger",
      type: TaskParamType.TRIGGER,
      hideHandle: false,
    },
    { 
      id: "file_in",
      name: "File",
      type: TaskParamType.FILE,
      hideHandle: true,
      required: true, 
      helperText: "Upload a file to use as input for the workflow.",
    }
  ],
  outputs: [
    {
      id: "dataframe_out",
      name: "Data Frame",
      type: TaskParamType.DATAFRAME,
    }
  ]
} satisfies WorkflowTask;