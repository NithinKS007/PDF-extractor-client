import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { showErrorToast } from "../utils/toast";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/node_modules/pdfjs-dist/build/pdf.worker.mjs";

/**
 * Custom hook for viewing PDF documents.
 * Manages state for PDF document loading, page navigation, and modal visibility.
 */

const useViewPdf = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Load the PDF document from the given URL.
   * Uses PDF.js to load and parse the document, then sets the document and total pages.
   */

  const loadPdf = async (selectedPdfUrl: string) => {
    try {
      const loadingTask = pdfjsLib.getDocument(selectedPdfUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
    } catch (error: any) {
      console.error("Error loading PDF:", error);
      showErrorToast(error.message);
    }
  };

  /**
   * Render a specific page of the PDF on the canvas.
   * The page is rendered based on the current page number and scaled to fit the container.
   */
  const renderPage = async (pdfDoc: pdfjsLib.PDFDocumentProxy) => {
    try {
      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (context && canvas && context) {
        const container = canvas.parentElement || document.body;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight || window.innerHeight;

        // Calculate scale to fit the page inside the container
        const defaultViewport = page.getViewport({ scale: 1 });

        const width = containerWidth / defaultViewport.width;
        const height = containerHeight / defaultViewport.height;
        const scale = Math.min(width / height);

        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        // Render the page to the canvas
        await page.render(renderContext).promise;
      }
    } catch (error: any) {
      console.error("Error rendering page:", error);
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    if (selectedPdfUrl) {
      loadPdf(selectedPdfUrl);
    }
  }, [selectedPdfUrl]);

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(pdfDoc);
    }
  }, [pdfDoc, currentPage]);

  /**
   * Go to the next page in the PDF document if there are more pages
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Go to the previous page in the PDF document if not on the first page
   */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Set the selected PDF URL and open the view modal.
   * Initializes the current page to 1 when the modal is opened.
   */
  const handleViewClick = (pdfUrl: string) => {
    setSelectedPdfUrl(pdfUrl);
    setIsViewModalOpen(true);
    setCurrentPage(1);
  };

  /**
   * Close the view modal and clear the selected PDF URL.
   */
  const onClose = () => {
    setIsViewModalOpen(false);
    setSelectedPdfUrl(null);
  };

  return {
    currentPage,
    totalPages,
    pdfDoc,
    handleNextPage,
    handlePrevPage,
    handleViewClick,
    isViewModalOpen,
    viewModalClose: onClose,
    selectedPdfUrl,
    canvasRef,
  };
};

export default useViewPdf;
