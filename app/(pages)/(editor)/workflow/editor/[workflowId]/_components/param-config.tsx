"use client"

import { TaskType } from "@/constants/workflow.constant";
import { TaskRegistry } from "@/lib/registry";
import { useReactFlow } from "@xyflow/react"
import { NodeParamField } from "./node/node-param";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ParamConfig({ nodeId }: { nodeId: string }) {
  const { getNode, updateNodeData } = useReactFlow();
  const node = getNode(nodeId);
  const task = TaskRegistry[node?.data.type as TaskType];

  const [formData, setFormData] = useState<Record<string, any>>(node?.data.inputs || {});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    updateNodeData(nodeId, {
      inputs: formData
    });
    toast.success("Node parameters updated", { id: "node-update" });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start gap-2 items-center w-full border-b-2 p-2">
        <task.icon size={20} className="inline-block mr-2" />
        <p className="text-sm font-bold">
          {task.label}
        </p>
      </div>
      {task.inputs.map((param) => {
        if (param.hideHandle)
          return <NodeParamField
            key={param.id}
            param={param}
            value={formData[param.id]}
            onChange={(val) => handleChange(param.id, val)}
          />
      })}
      <Button className="w-full" variant={"outline"} onClick={handleSave}>
        <CheckIcon size={16} className='stroke-green-400' />
        Save
      </Button>
    </div>
  )
}

export default ParamConfig