import { useState } from "react";
import "../styles/AddCourseModal.css";

import { uploadFile } from "../services/uploadService";
import { createCourse } from "../services/courseService";

function AddCourseModal({ onClose, onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadFile(image);
      }

      await createCourse({
        title,
        description,
        image: imageUrl,
      });

      alert("Course created!");

      onCourseCreated();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Create Course</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Course Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Create
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddCourseModal;