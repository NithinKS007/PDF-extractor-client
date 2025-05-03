import { useState, useCallback, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { extractPages } from "../api/pdf";
import { showErrorToast, showSuccessToast } from "../utils/toast";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/node_modules/pdfjs-dist/build/pdf.worker.mjs";

const useExtractPdf = () => {
  const [extractModalOpen, setExtractModalOpen] = useState<boolean>(false);
  const [extractPdfUrl, setExtractPdfUrl] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<{ [key: number]: string }>({});
  const [isPdfPagesLoading, setPdfPagesLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [selectedPdfId, setSelectedPdfId] = useState<string>();
  const [isExtractPagesSubmitLoading, setIsExtractPagesSubmitLoading] =
    useState<boolean>(false);

  const handleOpenExtractModal = () => setExtractModalOpen(true);
  const handleCloseExtractModal = () => {
    setExtractModalOpen(false);
    setPdfPages({});
    setSelectedPages([]);
    setError(null);
  };

  const handleSetExtractPdfUrl = (url: string, pdfId: string) => {
    setSelectedPdfId(pdfId);
    setExtractPdfUrl(url);
    setPdfPages({});
    setSelectedPages([]);
    setError(null);
    handleOpenExtractModal();
  };

  const handlePageClick = useCallback((pageNum: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageNum)
        ? prev.filter((num) => num !== pageNum)
        : [...prev, pageNum]
    );
  }, []);
  const extractPdfPages = useCallback(async (url: string): Promise<void> => {
    try {
      setPdfPagesLoading(true);
      setError(null);
      if (url) {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdfDoc = await loadingTask.promise;
        const pages: { [key: number]: string } = {};
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            const viewport = page.getViewport({ scale: 1.0 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            pages[i] = canvas.toDataURL();
            canvas.remove();
          }
        }
        setPdfPages(pages);
      }
    } catch (error) {
      console.error("Error extracting PDF pages:", error);
      setError("Failed to extract PDF pages. Please try again.");
    } finally {
      setPdfPagesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (extractPdfUrl && extractModalOpen && selectedPdfId) {
      extractPdfPages(extractPdfUrl);
    }
  }, [extractPdfUrl, extractModalOpen, extractPdfPages, selectedPdfId]);

  const handleSubmitSelectedPages = async () => {
    setIsExtractPagesSubmitLoading(true);
    try {
      if (selectedPages && selectedPdfId && selectedPages.length > 0) {
        const response = await extractPages({
          pages: selectedPages,
          pdfId: selectedPdfId,
        });
        showSuccessToast(response.message);
        handleCloseExtractModal();
      } else {
        showErrorToast("Please select at least one page.");
      }
    } catch (error: any) {
      console.log(`API Error extract pdf ${error}`);
      const errorMessage =
        error.response?.data?.message ||
        "Error extracting pdf. Please try again.";
      showErrorToast(errorMessage);
    } finally {
      console.log("Pdf upload complete");

      setIsExtractPagesSubmitLoading(false);
    }
  };

  return {
    extractModalOpen,
    handleSetExtractPdfUrl: handleSetExtractPdfUrl,
    handleOpenExtractModal,
    handleCloseExtractModal,
    pdfPages,
    isPdfPagesLoading,
    error,
    selectedPages,
    handleSubmitSelectedPages,
    handlePageClick,
    isExtractPagesSubmitLoading,
  };
};

export default useExtractPdf;
