import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const Evaluation = {
  type: TaskType.EVALUATION,
  label: "Evaluation",
  icon: (props: LucideProps) => (<BetweenVerticalStartIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: "Machine Learning",
  inputs: [
    {
      id: "model_in",
      name: "Model",
      type: TaskParamType.MODEL,
      hideHandle: false,
    },
    {
      id: "test_dataframe_in",
      name: "Test Data Frame",
      type: TaskParamType.TEST_DATAFRAME,
      hideHandle: false,
    },
    {
      id: "metrics",
      name: "Metrics",
      type: TaskParamType.STRING,
      options: ["accuracy", "precision", "recall", "f1"],
      default: "accuracy",
      hideHandle: true,
      required: true,
      helperText: "Select the evaluation metric"
    },
    {
      id: "threshold",
      name: "Threshold",
      type: TaskParamType.FLOAT_NUMBER,
      default: 0.8,
      hideHandle: true,
      required: false,
      helperText: "Set the threshold for classification tasks"
    },
    {
      id: "ai_assistant_advice",
      name: "AI Assistant Advice",
      type: TaskParamType.BOOLEAN,
      default: false,
      hideHandle: true,
      required: false,
      options: ["true", "false"],
      helperText: "Enable AI Assistant to provide advice on model performance"
    }
  ],
  outputs: [
    {
      id: "report_out",
      name: "Report",
      type: TaskParamType.REPORT,
    },
  ]
} satisfies WorkflowTask;