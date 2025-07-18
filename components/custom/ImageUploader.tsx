"use client";
import { useState, DragEvent } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-sm text-gray-400 mb-1">MEDIA</p>
      <div
        className={`rounded-lg bg-neutral-800 border border-neutral-700 p-8 flex flex-col items-center justify-center text-center transition-all ${
          dragOver ? "border-white" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="max-h-64 rounded-md"
          />
        ) : (
          <>
            <p className="text-white">Select image to upload</p>
            <p className="text-sm text-gray-400">or drag and drop here</p>
            <label className="mt-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <div className="bg-white text-black px-4 py-2 rounded cursor-pointer">
                Select Image
              </div>
            </label>
          </>
        )}
      </div>
    </div>
  );
}
