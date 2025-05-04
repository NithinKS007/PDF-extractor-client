# PDF Page Extractor

A React-based web application that allows users to upload PDF files, view individual pages, and extract selected pages into a new PDF document.

### Screen Shots

### Upload PDF Screen
![View Upload PDF](./assets/Screenshot%202025-05-04%20165249.png)

### View PDF Screen
![View Uploaded List](./assets/Screenshot%202025-05-04%20165355.png)
![View PDF Pages](./assets/Screenshot%202025-05-04%20165503.png)

### Extract PDF Screen
![Select Pages to Extract and Build New PDF](./assets/Screenshot%202025-05-04%20165432.png)

### Authentication Screen
![View Sign In](./assets/Screenshot%202025-05-04%20165133.png)
![View Sign Up](./assets/Screenshot%202025-05-04%20165150.png)


## 🌟 Features

- PDF File Upload
- PDF Preview with Thumbnails
- High-Resolution Page Preview Modal
- Page Selection and Arrangement for New PDF Creation and Extraction
- Responsive Design
- Toast Notifications for User Feedback:
- Download the Extracted PDF
- User Authentication for PDF Uploading:

## 📁 Project Structure

```
client/
│
├── .env                        # Environment variables
├── .gitignore                  # Git ignore configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Package lock for npm
├── README.md                   # Project documentation
├── tsconfig.app.json           # TypeScript configuration for app-specific settings
├── tsconfig.json               # General TypeScript configuration
├── tsconfig.node.json          # General TypeScript configuration
├── vite-config.ts              # Vite-General-Config-file
├── src/                        # Source code folder
│   ├── api/                    # API service folder
│   │   ├── auth.ts             # Authentication API requests
│   │   ├── pdf.ts              # PDF-related API requests
│   ├── components/             # React components
│   │   ├── PdfCard.tsx         # PDF card component
│   │   ├── PdfExtractModal.tsx # PDF extraction modal component
│   │   ├── pdfUploadModal.tsx  # PDF upload modal component
│   │   ├── ProtectedUser.tsx   # Protected user component
│   │   ├── SignInForm.tsx      # Sign-in form component
│   │   ├── SignUpForm.tsx      # Sign-up form component
│   │   ├── TopNavBar.tsx       # Top navigation bar component
│   │   ├── PdfView.tsx         # PDF view modal component
│   ├── config/                 # Configuration files
│   │   ├── axios.ts            # Axios configuration for API requests
│   ├── hooks/                  # Custom React hooks
│   ├── useExtractPdf.ts        # Hook for extracting PDF
│   ├── usePdfDownload.ts       # Hook for downloading PDF
│   ├── usePdfUpload.ts         # Hook for uploading PDF
│   └── useViewPdf.ts           # Hook for viewing PDF

│   ├── layouts/                # Layouts for pages
│   │   ├── UserLayout.tsx      # Layout for user-related pages
│   ├── pages/                  # Page components
│   │   ├── AuthPage.tsx        # Authentication page
│   │   ├── HomePage.tsx        # Homepage
│   ├── store/                  # Redux or context store
│   │   ├── auth/               # Auth store and types
│   │   │   ├── authStore.ts    # Store for authentication state
│   │   │   ├── authTypes.ts    # Types for authentication state
│   │   ├── pdf/                # PDF store and types
│   │   │   ├── pdfStore.ts     # Store for PDF-related state
│   │   │   └── pdfTypes.ts     # Types for PDF-related state
│   ├── types/                  # TypeScript type definitions
│   │   ├── authTypes.ts        # Types for authentication
│   │   ├── pdfTypes.ts         # Types for PDF operations
│   ├── utils/                  # Utility functions
│   │   ├── toast.ts            # Toast notification utility
│   │   └── validationSchema.ts # Validation functions
│   ├── vite-env.d.ts           # Vite build configuration (moved to src)
│   ├── App.tsx                 # Main App component
│   ├── Main.tsx                # Main entry point for React app
│   ├── index.css               # Global CSS for the app

├── node_modules/               # Node.js dependencies (auto-generated)
│
├── dist/                       # Compiled JavaScript files (after TypeScript transpilation)

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.15.0 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/PDF-extractor-client.git
cd pdf-extractor-client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 📦 Package Analysis

### Current Dependencies Analysis

#### Required Packages (Keep)

```json
{
  "@tailwindcss/vite": "^4.1.4", // For Tailwind CSS integration with Vite
  "@types/react-router-dom": "^5.3.3", // Type definitions for React Router DOM
  "axios": "^1.9.0", // For making HTTP requests
  "formik": "^2.4.6", // For form management
  "pdfjs-dist": "^5.2.133", // Core PDF handling (for viewing and manipulation)
  "react": "^19.0.0", // Core React library
  "react-dom": "^19.0.0", // Core React DOM for rendering React components
  "react-hot-toast": "^2.5.2", // For toast notifications (consider custom implementation)
  "react-icons": "^5.5.0", // For including popular icons in React
  "react-router-dom": "^7.5.3", // For navigation and routing in React apps
  "tailwindcss": "^4.1.4", // For utility-first CSS framework
  "yup": "^1.6.1", // For schema validation (used with Formik)
  "zustand": "^5.0.3" // For state management (lightweight state management library)
}
```

#### Development Dependencies (Keep)

```json
{
  "@eslint/js": "^9.22.0", // ESLint core JavaScript configurations
  "@types/pdfjs-dist": "^2.10.377", // Type definitions for pdfjs-dist
  "@types/react": "^19.0.10", // Type definitions for React
  "@types/react-dom": "^19.0.4", // Type definitions for React DOM
  "@vitejs/plugin-react": "^4.3.4", // Vite React plugin for React-based apps
  "eslint": "^9.22.0", // Linter for maintaining code quality
  "eslint-plugin-react-hooks": "^5.2.0", // ESLint plugin for React Hooks linting
  "eslint-plugin-react-refresh": "^0.4.19", // ESLint plugin for React Fast Refresh
  "globals": "^16.0.0", // Provide global variables for linting
  "typescript": "~5.7.2", // TypeScript for static type-checking
  "typescript-eslint": "^8.26.1", // ESLint plugin for TypeScript linting
  "vite": "^6.3.1" // Vite for fast builds and hot module reloading
}
```

#### Unnecessary Packages (Can be removed)

1. State Management (if not using Zustand for state management):

"zustand"

#### 🛠️ Technology Stack

**React** - UI library (react, react-dom)
**Vite** - Build tool (vite, @vitejs/plugin-react)
**Tailwind CSS** - Styling (tailwindcss, @tailwindcss/vite)
**PDF.js** - PDF processing (pdfjs-dist)
**Axios** - HTTP client (axios)
**Formik** - Form handling (formik, yup)
**Zustand** - State management (zustand)
**React Router** - Routing (react-router-dom)
**React Hot Toast** - Notifications (react-hot-toast)
**React Icons** - Icon library (react-icons)

## 📄 API Endpoints

The application expects the following API endpoints:

📄 PDF API Endpoints

- `POST /api/pdf/uploadPdf` - Upload a PDF file
- `GET /api/pdf/retrieve` - Retrieve a list of all uploaded PDFs
- `POST /api/pdf/extract/:pdfId` - Extract selected pages

📄 Authentication API Endpoints

- `POST /api/auth/signUp` - Register a new user
- `POST /api/auth/signIn` - Authenticate an existing user
- `POST /api/auth/signOut` - Sign out the current user

### 📚 Troubleshooting: PDF Worker Issue during Deployment
When deploying the app, you might encounter an issue where the PDF worker file (pdf.worker.mjs) fails to load, resulting in errors like:

Failed to load module script: The server responded with a non-JavaScript MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
This issue occurs because the pdf.worker.mjs file is not served correctly from the build or public directory during deployment. To resolve this issue in production environments (like Vercel or other hosting services), follow these steps:

Steps to fix PDF worker issue:
Ensure pdf.worker.mjs is added to the public directory:

In your project, pdf.worker.mjs is located in node_modules/pdfjs-dist/build/. You need to manually copy this file to the public directory so it can be correctly served by the server.

Add the following commands to your deployment pipeline or execute them locally:

mkdir -p public/node_modules/pdfjs-dist/build
cp node_modules/pdfjs-dist/build/pdf.worker.mjs public/node_modules/pdfjs-dist/build/pdf.worker.mjs
This will ensure that the worker file is served correctly.

Deploy to Vercel or another hosting platform:
After adding the worker to the public directory, commit the changes, push them to your remote repository, and redeploy your app. The PDF worker should now be available and load correctly.

Additional Notes:
Ensure the public folder is not ignored by Git. If it is ignored, you might need to update the .gitignore to allow the public directory to be tracked. This can be done by adding an exception like so:


# Ignore everything in the public folder (if exists)
/public/

# But track everything inside the public folder
!/public/
In case you're encountering issues with the public folder not being committed, you can manually add it to Git using:

git add -f public/
git commit -m "Fix PDF worker issue during deployment"
git push origin main

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-Feature`)
3. Commit your changes (`git commit -m 'Add some my-Feature'`)
4. Push to the branch (`git push origin feature/my-Feature`)
5. Open a Pull Request
