import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLesson } from "../services/lessonService";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import "../styles/PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


function PDFViewer() {
  const { lessonId, pdfIndex } = useParams();
  const [lesson, setLesson] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    loadLesson();
  }, []); 

  const loadLesson = async () => {
    const data = await getLesson(lessonId);
    setLesson(data);
  };

  if (!lesson)
    return <div>Loading...</div>;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const pdf = lesson.pdfs[Number(pdfIndex)];

  console.log("Lesson:", lesson);
  console.log("PDF:", pdf);
  
  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px"
        }}
      >
        <h1>
          {pdf.title}
        </h1>

       <div className="pdf-viewer">

    <div className="pdf-container">

        <Document
          file={pdf.url}
          loading={<p>Loading PDF...</p>}
          onLoadSuccess={onDocumentLoadSuccess}
        >
        
            <Page
                pageNumber={pageNumber}
                scale={scale}
            />
        </Document>

        <div className="pdf-controls">

            <button
                disabled={pageNumber === 1}
                onClick={() =>
                    setPageNumber(prev => prev - 1)
                }
            >
                ◀ Previous
            </button>

            <span>
                Page {pageNumber} of {numPages || "--"}
            </span>

            <button
                disabled={pageNumber === numPages}
                onClick={() =>
                    setPageNumber(prev => prev + 1)
                }
            >
                Next ▶
            </button>

        </div>

        <div className="zoom-controls">

            <button
                onClick={() =>
                    setScale(prev => Math.max(prev - 0.2, 0.4))
                }
            >
                -
            </button>

            <span>
                {Math.round(scale * 100)}%
            </span>

            <button
                onClick={() =>
                    setScale(prev => Math.min(prev + 0.2, 3))
                }
            >
                +
            </button>

        </div>

    </div>

</div>

      </div>
    </>
  );
}

export default PDFViewer;