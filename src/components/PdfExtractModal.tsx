import { JSX } from "react";
import { MdClose } from "react-icons/md";

interface PdfExtractModalProps {
  onClose: () => void;
  pages: JSX.Element[];
  onSubmit: () => void;
  isLoading: boolean;
  selectedPages: number[];
  pdfName: string;
  onPdfNameChange: (newName: string) => void;
  deleteExistingPdf: boolean;
  handleDeleteExistingPDF: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PdfExtractModal: React.FC<PdfExtractModalProps> = ({
  onClose,
  pages,
  onSubmit,
  isLoading,
  selectedPages,
  pdfName,
  onPdfNameChange,
  deleteExistingPdf,
  handleDeleteExistingPDF,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white w-[100%] max-w-[90vw] h-[95vh] p-6 rounded-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-8">
            <h2 className="text-lg font-bold">SELECT PAGES TO EXTRACT</h2>
            <h2 className="text-lg font-bold">- FILE NAME</h2>

            <input
              type="text"
              value={pdfName}
              onChange={(e) => onPdfNameChange(e.target.value)}
              className="text-lg font-bold border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
            />
          </div>

          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 cursor-pointer rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <MdClose className="text-gray-600" />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          {pages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pages}
            </div>
          ) : (
            <p>No pages to display.</p>
          )}
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          {selectedPages.length > 0
            ? `New PDF - Pages : ${selectedPages.map((page) =>
                page.toString().split("").join(",")
              )}`
            : "No pages selected yet."}
        </div>

        <div className="mt-6 flex flex-col items-center space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={deleteExistingPdf}
              onChange={handleDeleteExistingPDF}
              className="mr-2"
            />
            <span>Delete Existing PDF</span>
          </label>
          {deleteExistingPdf ? (
            <p className="text-sm text-red-600">
              The Existing PDF will be deleted.
            </p>
          ) : (
            <p className="text-sm text-green-600">
              The Existing PDF will not be deleted.
            </p>
          )}
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 cursor-pointer"
          >
            {isLoading ? "Submitting...." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfExtractModal;
