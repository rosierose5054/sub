import { useNavigate } from "react-router-dom";

function Factories() {
  const navigate = useNavigate();

  return (
    <div className="factories-page">
      <h2>المصانع</h2>
      <p>تعرف على المزيد حول الخدمات والتفاصيل الصناعية.</p>

      <button
        onClick={() => navigate("/premium")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        تعلم المزيد
      </button>
    </div>
  );
}

export default Factories;
