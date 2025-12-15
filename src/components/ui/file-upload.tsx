
"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, X, File as FileIcon } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (newFiles && newFiles.length > 0) {
        const fileArray = Array.from(newFiles);
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div
          onClick={onBrowseClick}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={cn(
            "flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-lg cursor-pointer transition-colors bg-card",
            isDragging
              ? "border-primary"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-muted border mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Upload file</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Drag or drop your files here or click to upload
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
        </div>
    </div>
  );
}

    