import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { LucideProps, Paperclip } from "lucide-react";

export const FileUploader = {
  type: TaskType.FILE_UPLOADER,
  label: "File Uploader",
  icon: (props: LucideProps) => (<Paperclip className="stroke-pink-400" />),
  isEntryPoint: true,
  category: "Data Source",
  inputs: [
    {
      name: "File",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true, 
    }
  ],
  outputs: []
}