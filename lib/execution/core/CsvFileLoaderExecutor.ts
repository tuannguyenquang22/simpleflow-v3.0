import { CsvFileLoaderTask } from "@/lib/tasks/core/CsvFileLoaderTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function CsvFileLoaderExecutor(
  environment: ExecutionEnvironment<typeof CsvFileLoaderTask>,
): Promise<boolean> {
  const file = environment.getInput("File")
  if (!file) {
    environment.log.error("File not found");
    return false;
  }

  environment.log.info("All good !");
  environment.setOutput("Dataset", "hahahihi");

  return true;
}