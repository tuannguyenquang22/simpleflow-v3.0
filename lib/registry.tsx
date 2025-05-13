import { TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";

import { FileUploader } from "./tasks/file-uploader";
import { CombineDataFrame } from "./tasks/combine-dataframe";
import { SelectColumns } from "./tasks/select-columns";
import { CategoryEncoder } from "./tasks/category-encoder";
import { NumericScaler } from "./tasks/numeric-scaler";
import { TrainTestSplit } from "./tasks/train-test-split";
import { Training } from "./tasks/training";
import { Tuning } from "./tasks/tuning";
import { Evaluation } from "./tasks/evaluation";
import { EmailNotification } from "./tasks/email-notification";

type Registry = {
  [key in TaskType]: WorkflowTask & { type: key };
}

export const TaskRegistry: Registry = {
  FILE_UPLOADER: FileUploader,
  COMBINE_DATAFRAME: CombineDataFrame,
  SELECT_COLUMNS: SelectColumns,
  CATEGORY_ENCODER: CategoryEncoder,
  NUMERIC_SCALER: NumericScaler,
  TRAIN_TEST_SPLIT: TrainTestSplit,
  TRAINING: Training,
  TUNING: Tuning,
  EVALUATION: Evaluation,
  EMAIL_NOTIFICATION: EmailNotification
}