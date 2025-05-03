import { axiosInstance } from "../config/axios";

const uploadPdf = async (pdf: FormData) => {
  const response = await axiosInstance.post("pdf/upload", pdf, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getPdfs = async () => {
  const response = await axiosInstance.get("pdf/retrieve");
  return response.data;
};

const extractPages = async ({
  pages,
  pdfId,
}: {
  pages: number[];
  pdfId: string;
}) => {
  const response = await axiosInstance.post(`pdf/extract/${pdfId}`, {
    pages: pages,
  });
  return response.data;
};
export { uploadPdf, getPdfs, extractPages };
