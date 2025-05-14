import { Environment } from "@/types/executor";
import { CsvFileLoaderExecutor } from "./core/CsvFileLoaderExecutor";
import { TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";

type ExecutionFn<T extends WorkflowTask> = (environment: any) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutionFn<WorkflowTask & { type: K }>;
}

export const ExecutionRegistry: RegistryType = {
  CSV_FILE_LOADER: CsvFileLoaderExecutor,
  EMAIL_NOTIFICATION: (environment: Environment) => Promise.resolve(true),
}