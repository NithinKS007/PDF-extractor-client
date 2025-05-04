import { create } from "zustand";
import { PdfState } from "./pdfTypes";

/**
 * Zustand store for managing PDF state.
 * - pdfs: List of PDFs stored in the state.
 * - isLoading: Boolean flag indicating if the PDFs are currently being loaded.
 */
const usePdfStore = create<PdfState>((set) => ({
  pdfs: [],
  isLoading: false,

  /**
   * Action to update the `pdfs` state.
   *
   */
  setPdfs: (pdfs) => set({ pdfs }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePdfStore;
