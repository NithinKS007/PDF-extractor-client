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
  pagination: {
    totalPages: 0,
    currentPage: 1,
    limit: 9,
    page: 1,
  },

  /**
   * Action to update the `pdfs` state.
   *
   */
  setPdfs: (pdfs) => set({ pdfs }),
  setLoading: (isLoading) => set({ isLoading }),
  setPagination: (pagination) => set((state) => ({
    pagination: {
      ...state.pagination,
      ...pagination, 
    },
  })),
}));

export default usePdfStore;
