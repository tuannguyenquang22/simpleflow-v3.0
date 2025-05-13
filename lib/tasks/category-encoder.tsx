import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const CategoryEncoder = {
  type: TaskType.CATEGORY_ENCODER,
  label: "Category Encoder",
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
      name: "Categorical Columns",
      type: TaskParamType.COLUMN_SELECTOR,
      isList: true,
      hideHandle: true,
      required: true,
      helperText: "Select categorical columns to encode"
    },
    {
      id: "method",
      name: "Encoding Method",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true,
      default: "one-hot",
      options: ["one-hot", "label", "ordinal", "target"],
      helperText: "Encoding method to apply"
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