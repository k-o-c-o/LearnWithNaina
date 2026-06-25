import "../styles/PageBanner.css";

function PageBanner({ title }) {
  return (
    <div className="page-banner">
      <h1>{title}</h1>
    </div>
  );
}

export default PageBanner;