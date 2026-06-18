"use client";

import { useResumeStore } from "../../store/useResumeStore";
import { generateDocx } from "../../lib/export/generateDocx";
import { ResumePDFDocument } from "../../lib/export/ResumePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { Download, FileText, File } from "lucide-react";

export function ExportToolbar() {
  const resumeData = useResumeStore((state) => state);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch for PDFDownloadLink
    setIsClient(true);
  }, []);

  const handleDocxDownload = async () => {
    try {
      await generateDocx(resumeData);
    } catch (err) {
      console.error("Failed to generate DOCX:", err);
      alert("Failed to generate DOCX file.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 rounded-2xl bg-black/80 p-4 shadow-2xl backdrop-blur-xl border border-white/10 transition-all hover:border-white/20">
      <div className="flex items-center gap-2 mb-2 px-2">
        <Download className="h-4 w-4 text-cyan-400" />
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-200">
          Export Resume
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* PDF Download Button */}
        {isClient ? (
          <PDFDownloadLink
            document={<ResumePDFDocument data={resumeData} />}
            fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.pdf`}
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-rose-600/80 hover:shadow-[0_0_15px_rgba(225,29,72,0.4)] active:scale-95"
          >
            {({ loading }) => (
              <>
                <FileText className="h-4 w-4" />
                {loading ? "Preparing PDF..." : "Download PDF (ATS Safe)"}
              </>
            )}
          </PDFDownloadLink>
        ) : (
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-gray-500">
            <FileText className="h-4 w-4" />
            Loading PDF Engine...
          </div>
        )}

        {/* DOCX Download Button */}
        <button
          onClick={handleDocxDownload}
          className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-cyan-600/80 hover:shadow-[0_0_15px_rgba(8,145,178,0.4)] active:scale-95 text-left"
        >
          <File className="h-4 w-4" />
          Download DOCX (Editable)
        </button>
      </div>
    </div>
  );
}
