import { TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";

import { CsvFileLoaderTask } from "./core/CsvFileLoaderTask";
import { EmailNotification } from "./core/EmailNotification";

type Registry = {
  [key in TaskType]: WorkflowTask & { type: key };
}

export const TaskRegistry: Registry = {
  CSV_FILE_LOADER: CsvFileLoaderTask,
  EMAIL_NOTIFICATION: EmailNotification,
}