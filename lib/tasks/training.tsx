import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const Training = {
  type: TaskType.TRAINING,
  label: "Training Model",
  icon: (props: LucideProps) => (<BetweenVerticalStartIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: "Machine Learning",
  inputs: [
    {
      id: "train_dataframe_in",
      name: "Train Data Frame",
      type: TaskParamType.TRAIN_DATAFRAME,
      hideHandle: false,
    },
    {
      id: "model_type",
      name: "Model Type",
      type: TaskParamType.STRING,
      options: ["RandomForest", "LogisticRegression", "XGBoost", "SVM"],
      default: "RandomForest",
      hideHandle: true,
      required: true,
      helperText: "Choose a model to train"
    },
  ],
  outputs: [
    {
      id: "model_out",
      name: "Model",
      type: TaskParamType.MODEL,
    },
  ]
} satisfies WorkflowTask;