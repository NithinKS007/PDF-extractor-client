import { useEffect } from "react";
import PdfUploadModal from "../components/PdfUploadModal";
import { showErrorToast } from "../utils/toast";
import { getPdfs } from "../api/pdf";
import usePdfStore from "../store/pdf/pdfStore";
import PdfCard from "../components/pdfCard";
import PdfExtractModal from "../components/PdfExtractModal";
import useExtractPdf from "../hooks/useExtractPdf";
import usePdfDownload from "../hooks/usePdfDownload";
import useUploadPdf from "../hooks/usePdfUpload";
import useViewPdf from "../hooks/useViewPdf";
import PdfView from "../components/PdfView";
import PaginationTable from "../components/Pagination";

const HomePage = () => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    console.log("event", event);
    setPagination({ page: newPage, currentPage: newPage });
  };

  /* Extracted PDF data and loading state from the store */
  const {
    setPdfs,
    setLoading,
    pdfs: pdfDataList,
    isLoading,
    pagination,
    setPagination,
  } = usePdfStore();

  const {
    totalPages: totalPageCount,
    currentPage: currentPageNumber,
    page,
  } = pagination;

  /* Fetch PDF list from the API */
  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const response = await getPdfs({
        page: currentPageNumber,
        limit: pagination.limit,
      });
      setPdfs(response.data.pdfs);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        page: response.data.currentPage,
      });
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
  }, [page]);

  /* State and methods for handling PDF extraction and modal */
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
    isExtractPagesSubmitLoading,
    selectedPdfName,
    setSelectedPdfName
  } = useExtractPdf({ fetchPdfs });

  /* Handle the PDF download functionality */
  const { handleDownload } = usePdfDownload();

  /* Handle the PDF uploading functionality */
  const { toggleModal, isModalOpen, handleFileChange, formik } = useUploadPdf({
    fetchPdfs,
  });

  /* useViewPdf hook for viewing PDF functionality */
  const {
    currentPage,
    totalPages,
    pdfDoc,
    handleNextPage,
    handlePrevPage,
    handleViewClick,
    isViewModalOpen,
    selectedPdfUrl,
    viewModalClose,
    canvasRef,
  } = useViewPdf();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-950 border-solid w-16 h-16 rounded-full animate-spin-fast"></div>
      </div>
    );
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
              onExtractClick={() =>
                handleSetExtractPdfUrl(pdf.pdfUrl, pdf._id, pdf.fileName)
              }
              onViewClick={() => handleViewClick(pdf.pdfUrl)}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-full">
            <p className="text-center">No PDFs available.</p>
          </div>
        )}
      </div>
      <PaginationTable
        totalPages={totalPageCount}
        page={currentPageNumber}
        handlePageChange={handlePageChange}
      />

      {extractModalOpen && (
        <PdfExtractModal
          onClose={handleCloseExtractModal}
          isLoading={isExtractPagesSubmitLoading}
          selectedPages={selectedPages}
          pdfName={selectedPdfName}
          onPdfNameChange={setSelectedPdfName}
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
      {isViewModalOpen && selectedPdfUrl && pdfDoc && (
        <PdfView
          onClose={viewModalClose}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          canvasRef={canvasRef}
        />
      )}
    </>
  );
};

export default HomePage;
