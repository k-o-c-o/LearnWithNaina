import "../styles/PDFCard.css";

function PDFCard({ pdf, onClick }) {
  return (
    <div
      className="pdf-card"
      onClick={onClick}
    >
      <div className="pdf-icon">
        📄
      </div>

      <div className="pdf-title">
        {pdf.title}
      </div>
    </div>
  );
}

export default PDFCard;