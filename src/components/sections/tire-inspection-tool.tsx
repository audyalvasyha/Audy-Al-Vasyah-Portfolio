'use client';
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { analyzeTireCondition } from '@/ai/flows/analyze-tire-condition';
import type { AnalyzeTireConditionOutput } from '@/ai/flows/analyze-tire-condition';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud, AlertTriangle, Check, X } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TireInspectionTool = () => {
  const [analysis, setAnalysis] = useState<AnalyzeTireConditionOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) {
        setError('File is too large. Please select a file smaller than 4MB.');
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setAnalysis(null);
      setError(null);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0] || null);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };


  const handleAnalyzeClick = async () => {
    if (!file) {
      setError('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const response = await analyzeTireCondition({
            photoDataUri: base64data,
          });
          setAnalysis(response);
        } catch (e) {
          setError('Failed to analyze the tire. Please try again.');
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        setIsLoading(false);
      };
    } catch (e) {
      setError('Failed to analyze the tire. Please try again.');
      console.error(e);
      setIsLoading(false);
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'Good':
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <Check className="mr-2 h-4 w-4" /> Good
          </Badge>
        );
      case 'Worn':
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <AlertTriangle className="mr-2 h-4 w-4" /> Worn
          </Badge>
        );
      case 'Damaged':
        return (
          <Badge variant="destructive">
            <X className="mr-2 h-4 w-4" /> Damaged
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Tire Image Analyzer</CardTitle>
          <CardDescription>
            Upload an image of a tire to get an AI-powered condition analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors',
              isDragging && 'border-primary bg-primary/10'
            )}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            {previewUrl ? (
              <div className="relative w-full h-64">
                <Image
                  src={previewUrl}
                  alt="Tire Preview"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="w-12 h-12" />
                <p>Click to upload or drag & drop</p>
                <p className="text-xs">PNG, JPG, or WEBP (Max 4MB)</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
          {error && (
            <p className="text-destructive text-center text-sm">{error}</p>
          )}
          <Button
            onClick={handleAnalyzeClick}
            disabled={isLoading || !file}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Analyzing...' : 'Analyze Tire'}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analysis Result</CardTitle>
          <CardDescription>
            AI-generated report on the tire's condition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex justify-center items-center h-full py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {analysis && (
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Overall Condition</span>
                {getConditionBadge(analysis.condition)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Wear Level</span>
                <span className="font-semibold">{analysis.wearLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Detected Damage</span>
                <span className="font-semibold">{analysis.detectedDamage}</span>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Recommendation:</h4>
                <p className="text-muted-foreground p-3 bg-muted/50 rounded-md">
                  {analysis.recommendation}
                </p>
              </div>
            </div>
          )}
          {!isLoading && !analysis && !error && (
            <div className="flex justify-center items-center h-48 text-muted-foreground text-center">
              <p>
                Upload a tire image and click "Analyze Tire" to see the results
                here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TireInspectionTool;
