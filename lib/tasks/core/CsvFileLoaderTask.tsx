import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { LucideProps, Paperclip } from "lucide-react";

export const CsvFileLoaderTask = {
  type: TaskType.CSV_FILE_LOADER,
  label: "CSV File Loader",
  icon: (props: LucideProps) => (<Paperclip className="stroke-pink-400" />),
  isEntryPoint: true,
  category: "Data Source",
  inputs: [
    {
      name: "Trigger",
      type: TaskParamType.TRIGGER,
      hideHandle: false,
    },
    {
      name: "File",
      type: TaskParamType.STRING,
      defeult: "",
      hideHandle: true,
      helperText: "Upload a file to use as input for the workflow.",
    }
  ] as const,
  outputs: [
    {
      name: "Dataset",
      type: TaskParamType.DATAFRAME,
    }
  ]
} satisfies WorkflowTask;