import { useState } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DataUploadProps {
  onDataUpload: (data: any[]) => void;
}

const DataUpload = ({ onDataUpload }: DataUploadProps) => {
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map(row => row.split(","));
      const headers = rows[0];
      const data = rows.slice(1).filter(row => row.length === headers.length).map(row => {
        const obj: any = {};
        headers.forEach((header, i) => {
          obj[header.trim()] = row[i]?.trim();
        });
        return obj;
      });
      onDataUpload(data);
    };
    
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleFileUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Card 
      className={`p-8 border-2 border-dashed transition-all duration-300 ${
        isDragging 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border hover:border-primary/50 hover:shadow-md'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary">
          <Upload className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Upload Dataset</h3>
          <p className="text-sm text-muted-foreground">
            Drop your CSV file here or click to browse
          </p>
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        
        <Button asChild variant="default" size="lg">
          <label htmlFor="file-upload" className="cursor-pointer">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Choose File
          </label>
        </Button>

        {fileName && (
          <div className="mt-4 px-4 py-2 bg-muted rounded-lg">
            <p className="text-sm font-medium text-foreground">
              📄 {fileName}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DataUpload;
