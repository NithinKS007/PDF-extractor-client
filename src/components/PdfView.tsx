import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { MdClose } from "react-icons/md";

interface PdfViewProps {
  onClose: () => void;
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  canvasRef: any;
}

const PdfView: React.FC<PdfViewProps> = ({
  onClose,
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  canvasRef,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-end mb-1.5">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 cursor-pointer rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <MdClose className="text-gray-600" />
          </button>
        </div>
        <div className="flex justify-center flex-grow overflow-auto border rounded-lg border-gray-400">
          <canvas
            ref={canvasRef}
            className="border border-gray-200 w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-800 text-white cursor-pointer"
            } transition-colors`}
            aria-label="Previous page"
          >
            <FiArrowLeft size={20} />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-800 text-white cursor-pointer"
            } transition-colors`}
            aria-label="Next page"
          >
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
