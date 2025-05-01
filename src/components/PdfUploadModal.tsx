import { FormikProps } from "formik";

interface PdfUploadModalProps {
  onClose: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formik: FormikProps<{ file: File | null }>;
}

const PdfUploadModal: React.FC<PdfUploadModalProps> = ({
  onClose,
  formik,
  handleFileChange,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
    <div className="bg-white p-6 w-80  border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-bold mb-4">Upload PDF</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded cursor-pointer bg-gray-50 text-gray-700 hover:bg-gray-100"
          />
          {formik.touched.file && formik.errors.file && (
            <div className="text-red-500 text-sm mt-2">{formik.errors.file}</div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="flex-1 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer"
          >
            {formik.isSubmitting ? "Loading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default PdfUploadModal;
