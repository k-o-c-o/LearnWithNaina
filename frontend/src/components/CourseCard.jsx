import "../styles/CourseCard.css";

function CourseCard({
  course,
  onClick,
}) {
  return (
    <div
      className="course-card"
      onClick={onClick}
    >
      <img
        src={course.image}
        alt={course.title}
        className="course-image"
      />

      <div className="course-title">
        {course.title}
      </div>
    </div>
  );
}

export default CourseCard;