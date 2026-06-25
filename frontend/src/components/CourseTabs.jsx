import "../styles/CourseTabs.css";

function CourseTabs({ activeTab, setActiveTab }) {
  const tabs = ["Lessons", "Students", "Grades"];

  return (
    <div className="course-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={
            activeTab === tab
              ? "tab active"
              : "tab"
          }
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default CourseTabs;