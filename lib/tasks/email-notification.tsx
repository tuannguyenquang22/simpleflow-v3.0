import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { LucideProps, MailIcon } from "lucide-react";

export const EmailNotification = {
  type: TaskType.EMAIL_NOTIFICATION,
  label: "Email Notification",
  icon: (props: LucideProps) => (<MailIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: "Machine Learning",
  inputs: [
    {
      id: "report_in",
      name: "Report",
      type: TaskParamType.REPORT,
      hideHandle: false,
    },
    {
      id: "email",
      name: "Email Address",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true,
      helperText: "Enter the email address to send the report"
    },
  ],
  outputs: []
} satisfies WorkflowTask;