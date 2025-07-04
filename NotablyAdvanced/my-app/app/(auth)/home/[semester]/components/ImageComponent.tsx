"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageComponentProps {
  onFileSelect?: (file: File | null) => void;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (onFileSelect) {
        onFileSelect(selectedFile);
      }
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    if (onFileSelect) {
      onFileSelect(null);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        onClick={handleButtonClick}
        className="bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100"
      >
        Choose Image
      </Button>

      {previewUrl && (
        <div className="relative w-[200px] h-[150px] border border-emerald-200/20 rounded-lg overflow-hidden">
          <Image
            src={previewUrl}
            alt="Selected"
            fill
            className="object-contain"
          />
          <Button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 rounded-full"
          >
            ✕
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
