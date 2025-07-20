import { useState, useRef } from "react";
import { useImageUpload } from "../../hooks/useContent";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  currentImage?: string;
  onImageChange?: (url: string) => void;
  onImageUpdate?: (url: string) => void; // Alternative prop name for compatibility
  label?: string;
  aspectRatio?: string;
  acceptedTypes?: string;
}

export function ImageUpload({
  currentImage,
  onImageChange,
  onImageUpdate,
  label = "Upload Image",
  aspectRatio = "aspect-video",
  acceptedTypes = "image/*",
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();

  const handleFileSelect = async (file: File) => {
    // Validate file type based on acceptedTypes
    const isValidType =
      acceptedTypes === "*" ||
      acceptedTypes.includes("*") ||
      acceptedTypes.split(",").some((type) => {
        const trimmedType = type.trim();
        if (trimmedType === "image/*") return file.type.startsWith("image/");
        if (trimmedType === "video/*") return file.type.startsWith("video/");
        if (trimmedType === ".pdf") return file.type === "application/pdf";
        return file.type === trimmedType;
      });

    if (!isValidType) {
      setError(`Please select a valid file type: ${acceptedTypes}`);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit for videos/PDFs
      setError("File size must be less than 10MB");
      return;
    }

    try {
      setError(null);
      const { url } = await uploadImage(file);
      const updateCallback = onImageUpdate || onImageChange;
      if (updateCallback) {
        updateCallback(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    const updateCallback = onImageUpdate || onImageChange;
    if (updateCallback) {
      updateCallback("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">{label}</label>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {currentImage ? (
        <div className="relative">
          <div
            className={`${aspectRatio} w-full bg-gray-100 rounded-lg overflow-hidden`}
          >
            <img
              src={currentImage}
              alt="Current"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`${aspectRatio} w-full border-2 border-dashed rounded-lg transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">
                  Drag and drop a file, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {acceptedTypes === "image/*"
                    ? "PNG, JPG, GIF up to 10MB"
                    : acceptedTypes === "video/*"
                      ? "MP4, MOV, AVI up to 10MB"
                      : acceptedTypes === ".pdf"
                        ? "PDF files up to 10MB"
                        : "Accepted files up to 10MB"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Choose File</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
