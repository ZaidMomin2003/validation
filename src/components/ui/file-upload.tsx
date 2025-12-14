"use client";

import React, { useState, useCallback, useRef } from "react";
import { UploadCloud, X, File as FileIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUpload({
  onChange,
  accept = ".csv, .xlsx",
  multiple = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (newFiles) {
        const fileArray = Array.from(newFiles);
        setFiles(fileArray);
        onChange(fileArray);
      }
    },
    [onChange]
  );

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is necessary to allow dropping
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const onRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      {files.length === 0 ? (
        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={cn(
            "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 bg-background"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">
              CSV or XLSX (MAX. 1000 rows)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={onFileChange}
          />
           <Button type="button" variant="outline" onClick={onBrowseClick} className="mt-4">
                Select File
            </Button>
        </div>
      ) : (
        <div className="w-full">
            <ul className="space-y-2">
            {files.map((file, index) => (
                <li
                key={index}
                className="flex items-center justify-between p-2 border rounded-md"
                >
                <div className="flex items-center gap-2">
                    <FileIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFile(index)}
                    className="w-6 h-6"
                >
                    <X className="w-4 h-4" />
                </Button>
                </li>
            ))}
            </ul>
            <div className="flex justify-center mt-4">
                <Button>Start Verification</Button>
            </div>
        </div>
      )}
    </div>
  );
}