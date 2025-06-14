
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { InterviewGuidePDF } from './InterviewGuidePDF';
import { Skeleton } from "@/components/ui/skeleton";

interface PDFPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  title: string;
}

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return <Skeleton className="w-full h-full" />;
  }
  return <>{children}</>;
};

export const PDFPreviewDialog = ({ open, onOpenChange, content, title }: PDFPreviewDialogProps) => {
  const PDFComponent = <InterviewGuidePDF title={title} content={content} />;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Preview
          </DialogTitle>
          <DialogDescription>
            Preview and download your generated interview guide. The preview may take a moment to render.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex flex-col h-full">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold truncate pr-4">{title}</h3>
            <PDFDownloadLink
              document={PDFComponent}
              fileName={`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`}
            >
              {({ loading }) =>
                <Button size="sm" disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Generating...' : 'Download PDF'}
                </Button>
              }
            </PDFDownloadLink>
          </div>
          
          <div className="flex-grow min-h-0">
            <ClientOnly>
              <PDFViewer width="100%" height="100%" className="border rounded-md">
                {PDFComponent}
              </PDFViewer>
            </ClientOnly>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
