import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const CombineDataFrame = {
  type: TaskType.COMBINE_DATAFRAME,
  label: "Combine Data Frames",
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
      id: "join_on",
      name: "Join On Column",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: false,
      helperText: "Optional column name to join on when aligning columns"
    },
    {
      id: "duplicate_columns",
      name: "Duplicate Columns",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: false,
      default: "rename",
      options: ["rename", "overwrite", "skip"],
      helperText: "How to handle columns with the same name"
    },
    {
      id: "fill_missing",
      name: "Fill Missing",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: false,
      default: "NaN",
      helperText: "Value to fill in missing cells when shapes don't align"
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