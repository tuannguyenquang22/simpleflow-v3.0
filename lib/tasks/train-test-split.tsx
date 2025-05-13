import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { BetweenVerticalStartIcon, LucideProps } from "lucide-react";

export const TrainTestSplit = {
  type: TaskType.TRAIN_TEST_SPLIT,
  label: "Train Test Split",
  icon: (props: LucideProps) => (<BetweenVerticalStartIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: "Machine Learning",
  inputs: [
    {
      id: "datasource_in",
      name: "Data Frame",
      type: TaskParamType.DATAFRAME,
      hideHandle: false,
    },
    {
      id: "test_size",
      name: "Test Size (%)",
      type: TaskParamType.INTEGER_NUMBER,
      default: 20,
      hideHandle: true,
      required: true,
      helperText: "Percentage of data used for testing (0 to 100)"
    },
    {
      id: "shuffle",
      name: "Shuffle",
      type: TaskParamType.BOOLEAN,
      default: true,
      hideHandle: true,
      options: ["true", "false"],
      helperText: "Shuffle data before splitting"
    },
    {
      id: "random_state",
      name: "Random Seed",
      type: TaskParamType.INTEGER_NUMBER,
      hideHandle: true,
      helperText: "Set seed to make splitting reproducible"
    },
    {
      id: "target_column",
      name: "Target Column",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true,
      helperText: "Name of the target column (label)"
    }
  ],
  outputs: [
    {
      id: "train_dataframe_out",
      name: "Train Data Frame",
      type: TaskParamType.TRAIN_DATAFRAME,
    },
    {
      id: "test_dataframe_out",
      name: "Test Data Frame",
      type: TaskParamType.TEST_DATAFRAME,
    },
  ]
} satisfies WorkflowTask;