import { useState } from "react";
import { createLesson } from "../services/lessonService";
import "../styles/AddLessonModal.css";

function AddLessonModal({
  courseId,
  onClose,
  onLessonCreated,
}) {

  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createLesson({
        title,
        courseId,
      });

      onLessonCreated();

      onClose();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Create Lesson</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
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

export default AddLessonModal;