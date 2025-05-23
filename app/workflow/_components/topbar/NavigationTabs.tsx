"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationTabs({ workflowId }: { workflowId: string }) {
  const pathname = usePathname();
  const activePath = pathname.split("/")[2];
  return (
    <Tabs value={activePath} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflow/editor/${workflowId}`}>
          <TabsTrigger value="editor" className="w-full">
            Editor
          </TabsTrigger>
        </Link>
        <Link href={`/workflow/run/${workflowId}`}>
          <TabsTrigger value="run" className="w-full">
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  )
}