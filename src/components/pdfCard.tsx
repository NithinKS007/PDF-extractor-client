import React from "react";

interface Pdf {
  _id: string;
  fileName: string;
  pdfUrl: string;
}

interface PdfCardProps {
  pdf: Pdf;
  onDownload: () => void;
  onExtractClick: () => void;
  onViewClick: () => void;
}

const PdfCard: React.FC<PdfCardProps> = ({
  pdf,
  onDownload,
  onExtractClick,
  onViewClick
}) => {
  return (
    <div className="w-11/12 mt-5 mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-2 truncate">
        {pdf.fileName}
      </h3>
      <div className="mb-3">
        <iframe
          src={pdf.pdfUrl}
          width="100%"
          height="150px"
          className="rounded-md shadow-sm"
          title={pdf.fileName}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onExtractClick}
          className="text-blue-500 hover:text-blue-700 text-xs cursor-pointer"
        >
          Extract PDF
        </button>
        <button
          onClick={onViewClick}
          className="text-blue-500 hover:text-blue-700 text-xs cursor-pointer"
        >
          View
        </button>
        <button
          onClick={onDownload}
          className="text-blue-500 hover:text-blue-700 text-xs cursor-pointer"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default PdfCard;
