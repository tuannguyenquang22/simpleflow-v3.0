import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const NumericScaler = {
  type: TaskType.NUMERIC_SCALER,
  label: "Numeric Scaler",
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
      name: "Numeric Columns",
      type: TaskParamType.COLUMN_SELECTOR,
      isList: true,
      hideHandle: true,
      required: true,
      helperText: "Select numeric columns to scale"
    },
    {
      id: "scaling_method",
      name: "Scaling Method",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true,
      default: "standard",
      options: ["standard", "minmax", "robust", "maxabs"],
      helperText: "Select method for scaling numeric columns"
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