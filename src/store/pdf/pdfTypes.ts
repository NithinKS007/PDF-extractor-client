/**
 * Represents a PDF object.
 * Stores information about a PDF.
 */
export interface Pdf {
  _id: string;
  userId: string;
  fileName: string;
  pdfUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents the state of PDFs.
 * Contains an array of PDFs and Set functionalities for PDF store.
 */
export interface PdfState {
  pdfs: Pdf[];
  isLoading: boolean;
  setPdfs: (pdfs: Pdf[]) => void;
  setLoading: (isLoading: boolean) => void;
}
