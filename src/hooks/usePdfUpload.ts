import { useState } from "react";
import { useFormik } from "formik";
import { pdfValidation } from "../utils/validationSchema";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { uploadPdf } from "../api/pdf";
import { CreatePdf } from "../types/pdfTypes";

interface ExtractPdfProps {
  fetchPdfs: () => Promise<void>;
}

const useUploadPdf = ({ fetchPdfs }: ExtractPdfProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    formik.setFieldValue("file", file);
  };

  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema: pdfValidation,
    onSubmit: async (value: CreatePdf) => {
      if (value.file) {
        try {
          const formData = new FormData();
          formData.append("file", value.file);
          const response = await uploadPdf(formData);
          await fetchPdfs();
          showSuccessToast(response.message);
        } catch (error: any) {
          console.log(`API Error upload pdf ${error}`);
          const errorMessage =
            error.response?.data?.message ||
            "Error uploading pdf. Please try again.";
          showErrorToast(errorMessage);
        } finally {
          console.log("Pdf upload complete");
          toggleModal();
        }
      }
    },
  });
  const toggleModal = () => {
    formik.resetForm();
    setIsModalOpen(!isModalOpen);
  };

  return { toggleModal, isModalOpen, handleFileChange, formik };
};

export default useUploadPdf;
