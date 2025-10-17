import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        gap: "20px",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Welcome to Wasl Platform 🚀</h1>
      <p style={{ fontSize: "1.2rem", color: "#4B5563" }}>
        Discover factories, services, industrial insights, and the latest news.
      </p>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* زر ينقل للصفحة المصانع */}
        <button
          onClick={() => navigate("/factories")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1D4ED8",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Learn More
        </button>

        {/* زر ينقل لصفحة البريميم */}
        <button
          onClick={() => navigate("/premium")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#10B981",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Start Now
        </button>

        {/* زر Sign Up ينقل لصفحة تسجيل الدخول */}
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#F59E0B",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>

        {/* زر جديد يعرض صفحة Contact */}
        <button
          onClick={() => navigate("/contact")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6B21A8",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Contact Us
        </button>

        {/* زر جديد يفتح صفحة الأخبار */}
        <button
          onClick={() => navigate("/news")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3B82F6",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          News
        </button>
      </div>
    </div>
  );
}