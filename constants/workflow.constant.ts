export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum TaskType {
  CSV_FILE_LOADER = "CSV_FILE_LOADER",
  EMAIL_NOTIFICATION = "EMAIL_NOTIFICATION",
}

export enum TaskParamType {
  STRING = "STRING",
  FLOAT = "FLOAT",
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  FILE = "FILE",
  TRIGGER = "TRIGGER",
  DATAFRAME = "DATAFRAME",
  FEATURE = "FEATURE",
  FEATURES = "FEATURES",
  MODEL = "MODEL",
  REPORT = "REPORT",
  METRIC = "METRIC",

  // For tuning search space
  INTEGER_RANGE = "INTEGER_RANGE",
  FLOAT_RANGE = "FLOAT_RANGE",

}

export enum ExecutionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum ExecutionPhaseStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum WorkflowTrigger {
  MANUAL = "MANUAL",
  CRON = "CRON",
}