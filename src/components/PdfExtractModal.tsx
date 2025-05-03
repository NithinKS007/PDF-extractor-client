import { JSX } from "react";
import { MdClose } from "react-icons/md";

interface PdfExtractModalProps {
  onClose: () => void;
  pages: JSX.Element[];
  onSubmit: () => void;
  isLoading: boolean;
  selectedPages: number[];
}

const PdfExtractModal: React.FC<PdfExtractModalProps> = ({
  onClose,
  pages,
  onSubmit,
  isLoading,
  selectedPages,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white w-[100%] max-w-[90vw] h-[80vh] p-6 rounded-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">SELECT PAGES TO EXTRACT</h2>
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
        <div className="mt-6 flex justify-center">
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
