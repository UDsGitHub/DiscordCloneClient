import { LoginRegisterPage, MainApp } from "components";
import { RouteTrackerProvider } from "context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RouteTrackerProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/channels/@me" replace />} />
          <Route path="/channels/@me" element={<MainApp />} />
          <Route path="/channels/@me/:id" element={<MainApp />} />
          <Route path="/channels/:serverId/:channelId" element={<MainApp />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/register" element={<LoginRegisterPage />} />
        </Routes>
      </RouteTrackerProvider>
    </BrowserRouter>
  );
}

export default App;
