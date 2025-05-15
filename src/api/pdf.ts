import { axiosInstance } from "../config/axios";

/*  
    Purpose: Uploads a PDF file to the backend.
    Incoming:    
      - pdf: A FormData object containing the PDF file. The file is attached with the key `file`.
      - fileName: The name of the PDF file.
    Returns: The server's response, which contains information about the uploaded PDF (HTTP 200).
    Throws: An error if the request fails or returns an error.
*/
const uploadPdf = async (pdf: FormData) => {
  const response = await axiosInstance.post("pdf/upload", pdf, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/*  
    Purpose: Retrieves a list of all uploaded PDFs from the backend.
    Returns: A list of PDF objects from the backend (HTTP 200).
    Throws: An error if the request fails or returns an error.
*/
const getPdfs = async ({
  page,
  limit,
  searchQuery,
}: {
  page: number;
  limit: number;
  searchQuery: string;
}) => {
  const response = await axiosInstance.get("pdf/retrieve", {
    params: { page, limit, searchQuery },
  });
  return response.data;
};

/*  
    Purpose: Extracts specific pages from a PDF and creates a new PDF.
    Incoming: params - An object containing the `pages` to extract and the `pdfId` of the target PDF.
    - pages: A list of page numbers to extract from the PDF.
    - pdfId: The unique identifier of the PDF to extract pages from.
    - pdfName: The desired name for the newly created PDF.
    - deleteExistingPdf: True or False for deleting existing PDF
    Returns: The server's response with the extracted pages (HTTP 200).
    Throws: An error if the request fails or returns an error.
*/
const extractPages = async ({
  pages,
  pdfId,
  pdfName,
  deleteExistingPdf,
}: {
  pages: number[];
  pdfId: string;
  pdfName: string;
  deleteExistingPdf: boolean;
}) => {
  const response = await axiosInstance.post(`pdf/extract/${pdfId}`, {
    pages: pages,
    fileName: pdfName,
    deleteExistingPdf: deleteExistingPdf,
  });
  return response.data;
};
export { uploadPdf, getPdfs, extractPages };
