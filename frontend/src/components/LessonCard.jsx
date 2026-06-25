import "../styles/LessonCard.css";

function LessonCard({ lesson, onClick }) {
  return (
    <div
      className="lesson-card"
      onClick={onClick}
    >
      <h3>{lesson.title}</h3>
    </div>
  );
}

export default LessonCard;