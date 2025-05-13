import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const SelectColumns = {
  type: TaskType.SELECT_COLUMNS,
  label: "Select Columns",
  icon: (props: LucideProps) => (<BetweenVerticalStartIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: "Transformation",
  inputs: [
    {
      id: "datasource_in",
      name: "Data Frame",
      type: TaskParamType.DATAFRAME,
      hideHandle: false,
    },
    {
      id: "columns",
      name: "Columns to Keep",
      type: TaskParamType.COLUMN_SELECTOR,
      hideHandle: true,
      required: true,
      helperText: "Select one or more columns to retain"
    }
  ],
  outputs: [
    {
      id: "datasource_out",
      name: "Data Frame",
      type: TaskParamType.DATAFRAME,
    }
  ]
} satisfies WorkflowTask;