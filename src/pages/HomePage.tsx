import { useState } from "react";
import PdfUploadModal from "../components/PdfUploadModal";
import { useFormik } from "formik";
import { pdfValidation } from "../utils/validationSchema";
import { showErrorToast } from "../utils/toast";
import { uploadPdf } from "../api/pdf";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => {
    formik.resetForm();
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    formik.setFieldValue("file", file);
  };

  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema: pdfValidation,
    onSubmit: async (value) => {
      console.log("pdf value", value);
      if (value.file) {
        try {
          const formData = new FormData();
          formData.append("file", value.file);
          const response = await uploadPdf(formData)
          console.log("response",response)

        } catch (error: any) {
          console.log(`API Error upload pdf ${error}`);
          const errorMessage =
            error.response?.data?.message || "Error uploading pdf. Please try again.";
          showErrorToast(errorMessage);
        } finally {
          console.log("Pdf upload complete");
        }
      } else {
        console.log("No file to upload");
      }
    },
  });

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="p-3 mt-5 mr-5 cursor-pointer bg-gray-800 text-white rounded-md hover:bg-gray-500"
        >
          UPLOAD PDF
        </button>
      </div>
      {isModalOpen && (
        <PdfUploadModal
          onClose={toggleModal}
          handleFileChange={handleFileChange}
          formik={formik}
        />
      )}
    </>
  );
};

export default HomePage;
