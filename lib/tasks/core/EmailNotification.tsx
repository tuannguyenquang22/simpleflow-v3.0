import { TaskParamType, TaskType } from "@/constants/workflow.constant";
import { WorkflowTask } from "@/types/workflow.type";
import { LucideProps, MailIcon } from "lucide-react";

/**
 * Email Notification Task
 * This task sends an email notification with the report attached.
 */

const CATEGORY: string = "Notification"

export const EmailNotification = {
  type: TaskType.EMAIL_NOTIFICATION,
  label: "Email Notification",
  icon: (props: LucideProps) => (<MailIcon className="stroke-pink-400" />),
  isEntryPoint: false,
  category: CATEGORY,
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