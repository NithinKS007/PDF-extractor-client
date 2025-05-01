import { axiosPdfInstance } from "../config/axios";

const uploadPdf = async (pdf: FormData) => {
  const response = await axiosPdfInstance.post("pdf/upload", pdf);
  return response.data;
};

export { uploadPdf };
