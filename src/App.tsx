import { LoginRegister, MainApp } from "components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/channels/:userId" element={<MainApp />} />
        <Route path="/" element={<Navigate to="/channels/@me" replace />} />
        <Route path="/channels/@me" element={<MainApp />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
