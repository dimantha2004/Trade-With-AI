import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    // Create a preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass the file to the parent component
    onImageSelected(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all ease-in-out duration-200 ${
          dragActive 
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600'
        } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
          disabled={isAnalyzing}
        />
        
        {previewUrl ? (
          <div className="flex flex-col items-center">
            <img 
              src={previewUrl} 
              alt="Chart preview" 
              className="max-h-80 max-w-full object-contain rounded-md shadow-md mb-4" 
            />
            {!isAnalyzing && (
              <button
                onClick={handleButtonClick}
                className="text-sm text-gray-600 dark:text-gray-300 underline hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Choose a different image
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Upload Trade Chart
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Drag and drop your chart screenshot here, or click to browse
            </p>
            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
            >
              Select File
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Supported formats: JPG, PNG, GIF
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;