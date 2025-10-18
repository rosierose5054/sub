import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Factories from "./pages/Factories";
import Premium from "./pages/Premium";
import NewsPage from "./pages/News"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/factories" element={<Factories />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/news" element={<NewsPage />} /> {/* راوت صفحة الأخبار */}
      </Routes>
    </Router>
  );
}
