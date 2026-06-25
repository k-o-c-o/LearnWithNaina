import "../styles/StudentCard.css";

function StudentCard({ student, onClick }) {
  return (
    <div
      className="student-card"
      onClick={onClick}
    >
      <div>
        <h3>{student.studentId.name}</h3>

        <p>{student.studentId.email}</p>
      </div>

      <span className="student-arrow">
        →
      </span>
    </div>
  );
}

export default StudentCard;