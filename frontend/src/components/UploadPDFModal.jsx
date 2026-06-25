import { useState } from "react";

import "../styles/UploadPDFModal.css";

import { uploadFile } from "../services/uploadService";
import { uploadLessonPDF } from "../services/lessonService";

function UploadPDFModal({
  lessonId,
  onClose,
  onUploaded,
}) {

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    try {
      setUploading(true);

      // Upload file to Cloudinary
      const url = await uploadFile(file);

      // Save PDF info to lesson
      await uploadLessonPDF(lessonId, {
        title,
        url,
      });

      onUploaded();
      onClose();

    } catch (error) {

      console.error(error);

      alert("Upload failed.");

    } finally {

      setUploading(false);

    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Upload PDF</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Document Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e)=>setFile(e.target.files[0])}
            required
          />

          <div className="modal-buttons">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default UploadPDFModal;