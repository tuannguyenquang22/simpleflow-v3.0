import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const Tuning = {
  type: TaskType.TUNING,
  label: "Tuning Model",
  icon: (props: LucideProps) => (<BetweenVerticalStartIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: "Machine Learning",
  inputs: [
    {
      id: "train_dataframe_in",
      name: "Data Frame",
      type: TaskParamType.TRAIN_DATAFRAME,
      hideHandle: false,
    },
    {
      id: "model_type",
      name: "Model Type",
      type: TaskParamType.STRING,
      options: ["RandomForest", "XGBoost", "SVM"],
      default: "RandomForest",
      hideHandle: true,
      required: true,
      helperText: "Select a model to tune"
    },
    {
      id: "search_method",
      name: "Search Method",
      type: TaskParamType.STRING,
      options: ["grid", "bayesian"],
      default: "grid",
      hideHandle: true,
      helperText: "Choose the search strategy"
    },
    {
      id: "param_grid",
      name: "Parameter Grid (JSON)",
      type: TaskParamType.STRING,
      hideHandle: true,
      helperText: "Define parameters to search, e.g. {\"n_estimators\": [100, 200]}"
    }
  ],
  outputs: [
    {
      id: "model_out",
      name: "Best Model",
      type: TaskParamType.MODEL,
    },
  ]
} satisfies WorkflowTask;