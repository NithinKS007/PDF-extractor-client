import { create } from "zustand";

interface Pdf {
  _id: string;
  userId: string;
  fileName: string;
  pdfUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PdfState {
  pdfs: Pdf[];
  isLoading: boolean;
  setPdfs: (pdfs: Pdf[]) => void;
  setLoading: (isLoading: boolean) => void;
}

const usePdfStore = create<PdfState>((set) => ({
  pdfs: [],
  isLoading: false,
  setPdfs: (pdfs) => set({ pdfs }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePdfStore;
