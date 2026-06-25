import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMaterial } from "../services/materialService";

function PDFViewer() {
  const { materialId } =
    useParams();

  const [material,
    setMaterial] =
    useState(null);

  const [currentPdf,
    setCurrentPdf] =
    useState(0);

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

        <div
          style={{
            height: "700px",
            border:
              "1px solid #ddd"
          }}
        >
          <iframe
                title="pdf"

                src={
                    material.pdfs[
                    currentPdf
                    ]
                }

                width="100%"

                height="100%"
           />
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