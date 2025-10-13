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
      }}
    >
      <h1>Welcome to Wasl Platform 🚀</h1>
      <p>Discover factories, services, and industrial insights.</p>

      <div style={{ display: "flex", gap: "15px" }}>
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

        {/* زر Sign Up ينقل للصفحة تسجيل الدخول */}
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
      </div>
    </div>
  );
}
