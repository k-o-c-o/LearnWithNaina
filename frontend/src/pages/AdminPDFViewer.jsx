import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PageBanner from "../components/PageBanner";
import { getLesson } from "../services/lessonService";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
import "../styles/AdminPDFViewer.css";

function AdminPDFViewer() {

    const { lessonId, pdfIndex } = useParams();
    const [lesson, setLesson] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(0.8);

    useEffect(() => {

        loadLesson();

    }, [lessonId]);

    const loadLesson = async () => {

        try{

            const data =
            await getLesson(lessonId);

            setLesson(data);

        }

        catch(error){

            console.log(error);

        }

    }

    if(!lesson){

        return null;

    }

    const pdf =lesson.pdfs[Number(pdfIndex)];
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return(

        <AdminLayout>

            <PageBanner
            title={pdf.title}
            />

            <div className="pdf-viewer">

            <div className="pdf-container">

                
                <div className="document-wrapper">
                    <Document
                        file={pdf.url}
                        loading={<p>Loading PDF...</p>}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => console.error(error)}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                        />
                    </Document>
                </div>

                <div className="pdf-controls">

                <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    ◀ Previous
                </button>

                <span>
                    Page {pageNumber} of {numPages || "--"}
                </span>

                <button
                    disabled={pageNumber === numPages}
                    onClick={() =>
                        setPageNumber((prev) => prev + 1)
                    }
                >
                    Next ▶
                </button>

            </div>

            <div className="zoom-controls">

                <button
                    onClick={() => setScale(scale - 0.2)}
                >
                    -
                </button>

                <span>
                    {Math.round(scale * 100)}%
                </span>

                <button
                    onClick={() => setScale(scale + 0.2)}
                >
                    +
                </button>

            </div>

            </div>

            </div>

        </AdminLayout>

    );

}

export default AdminPDFViewer;