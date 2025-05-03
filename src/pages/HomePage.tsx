import { useEffect, useState } from "react";
import PdfUploadModal from "../components/PdfUploadModal";
import { useFormik } from "formik";
import { pdfValidation } from "../utils/validationSchema";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { getPdfs, uploadPdf } from "../api/pdf";
import usePdfStore from "../store/pdfs";
import PdfCard from "../components/pdfCard";
import PdfExtractModal from "../components/PdfExtractModal";
import useExtractPdf from "../hooks/useExtractPdf";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setPdfs, setLoading, pdfs: pdfDataList, isLoading } = usePdfStore();

  const {
    extractModalOpen,
    handleSetExtractPdfUrl,
    handleCloseExtractModal,
    pdfPages,
    isPdfPagesLoading,
    error,
    selectedPages,
    handlePageClick,
    handleSubmitSelectedPages,
    isExtractPagesSubmitLoading
  } = useExtractPdf();

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

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const response = await getPdfs();
      setPdfs(response.data.pdfs);
    } catch (error: any) {
      console.log(`API Error retrieving pdfs ${error}`);
      const errorMessage =
        error.response?.data?.message ||
        "Error retrieving pdfs. Please try again.";
      showErrorToast(errorMessage);
    } finally {
      console.log("Pdf list fetched successfully");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [setPdfs, setLoading]);

  const handleDownload = async (pdfUrl: string, fileName: string) => {
    try {
      const fileResponse = await fetch(pdfUrl);

      if (!fileResponse.ok) {
        throw new Error("Failed to fetch the file");
      }
      const blob = await fileResponse.blob();
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      downloadLink.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      showErrorToast(
        "There was an issue downloading the PDF. Please try again."
      );
    }
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {pdfDataList && pdfDataList.length > 0 ? (
          pdfDataList.map((pdf) => (
            <PdfCard
              pdf={pdf}
              key={pdf._id}
              onDownload={() => handleDownload(pdf.pdfUrl, pdf.fileName)}
              onExtractClick={() => handleSetExtractPdfUrl(pdf.pdfUrl, pdf._id)}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-full">
          <p className="text-center">No PDFs available.</p>
        </div>
        )}
      </div>

      {extractModalOpen && (
        <PdfExtractModal
          onClose={handleCloseExtractModal}
          isLoading={isExtractPagesSubmitLoading}
          selectedPages={selectedPages}
          pages={
            error
              ? [
                  <p key="error" className="text-red-500">
                    {error}
                  </p>,
                ]
              : isPdfPagesLoading
              ? [<p key="loading">Extracting pages...</p>]
              : Object.entries(pdfPages).length > 0
              ? Object.entries(pdfPages).map(([pageNum, dataUrl]) => (
                  <div
                    key={pageNum}
                    onClick={() => handlePageClick(Number(pageNum))}
                    className={`relative cursor-pointer border-4 ${
                      selectedPages.includes(Number(pageNum))
                        ? "border-blue-500 rounded-lg"
                        : "border-transparent"
                    }`}
                  >
                    <h4 className="text-sm  text-center font-semibold mb-1 mt-1">
                      {pageNum}
                    </h4>
                    <img
                      src={dataUrl}
                      alt={`Page ${pageNum}`}
                      className="w-full h-90"
                    />
                  </div>
                ))
              : [<p key="no-pages">No pages extracted.</p>]
          }
          onSubmit={handleSubmitSelectedPages}
        />
      )}
    </>
  );
};

export default HomePage;
