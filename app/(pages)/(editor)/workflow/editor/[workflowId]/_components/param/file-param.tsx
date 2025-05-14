"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TaskParam } from "@/types/node.type";
import { File } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleHelpIcon, CloudUploadIcon, FileIcon, Loader2 } from "lucide-react";
import { useId, useState, useRef } from "react";

export default function FileParam({
  param,
  value,
  onChange,
}: {
  param: TaskParam;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: files = [],
    isLoading,
    error,
    refetch,
  } = useQuery<File[]>({
    queryKey: ["user-files"],
    queryFn: async () => {
      const res = await fetch("/api/files");
      if (!res.ok) {
        throw new Error("Failed to fetch files");
      }
      return res.json();
    },
  });

  const saveFileDataMutation = useMutation({
    mutationFn: async ({
      name,
      path,
      metadata,
    }: {
      name: string;
      path: string;
      metadata?: string;
    }) => {
      const res = await fetch("/api/files", {
        method: "POST",
        body: JSON.stringify({
          name,
          path,
          metadata,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to save file data");
      }
      return res.json();
    },
    onSuccess: (data) => {
      // Refetch files list after successful upload
      refetch();
      setIsUploading(false);
      setUploadFileName(null);
      
      // If we get an ID back and it's a valid ID, select the newly uploaded file
      if (data && data.id) {
        onChange(data.id);
      }
    },
    onError: (error) => {
      console.error("Error saving file:", error);
      setIsUploading(false);
      setUploadFileName(null);
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadFileName(file.name);
      
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_API_URL}/file/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Failed to upload file");
      }
      
      const data = await res.json();
      
      await saveFileDataMutation.mutateAsync({
        name: data?.name,
        path: data?.path,
        metadata: JSON.stringify(data?.metadata || {}),
      });
      
      // The refetch will happen via onSuccess in the mutation
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
      setUploadFileName(null);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex mb-2 items-center">
        {param.name}
        {param.helperText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-1">
                <CircleHelpIcon size={13} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {param.helperText}
            </TooltipContent>
          </Tooltip>
        )}
      </Label>
      
      <div className="flex gap-2">
        <Select value={value || ""} onValueChange={onChange} disabled={isUploading}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a file" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="flex gap-2 w-full items-center">
                <FileIcon size={12} />
                Files
              </SelectLabel>
              {isLoading ? (
                <SelectItem value="loading" disabled>
                  Loading files...
                </SelectItem>
              ) : files.length > 0 ? (
                files.map((file) => (
                  <SelectItem key={file.id} value={file.id}>
                    {file.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-files" disabled>
                  No files available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            id={id}
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button 
            type="button" 
            size="icon" 
            onClick={triggerFileInput}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CloudUploadIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {isUploading && uploadFileName && (
        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Uploading {uploadFileName}...</span>
        </div>
      )}
    </div>
  );
}