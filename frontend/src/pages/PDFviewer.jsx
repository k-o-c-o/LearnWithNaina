import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMaterial } from "../services/materialService";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import "../styles/PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


function PDFViewer() {
  const { materialId } =
    useParams();

  const [material,
    setMaterial] =
    useState(null);

  const [currentPdf,
    setCurrentPdf] =
    useState(0);

  const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    loadMaterial();
  }, []);

  const loadMaterial =
    async () => {
      const data =
        await getMaterial(
          materialId
        );

      setMaterial(data);
    };

  if (!material)
    return <div>Loading...</div>;

  console.log(material);
  console.log(material.pdfs);
  console.log(material.pdfs[currentPdf]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px"
        }}
      >
        <h1>
          {material.title}
        </h1>

       <div className="pdf-viewer">

    <div className="pdf-container">

        <Document
            file={material.pdfs[currentPdf]}
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

        <br />

        <button
            onClick={() =>
            setCurrentPdf(
                Math.max(
                currentPdf - 1,
                0
                )
            )
            }
            >
            Previous
        </button>

        <button
            onClick={() =>
            setCurrentPdf(
                Math.min(
                currentPdf + 1,
                material.pdfs.length - 1
                )
            )
            }
            >
            Next
        </button>
      </div>
    </>
  );
}

export default PDFViewer;