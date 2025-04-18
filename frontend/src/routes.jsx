import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"      element={<LoginPage />}      />
      <Route path="/dashboard"  element={<DashboardPage />}  />
      <Route path="*"           element={<NotFound />}       />  {/* 404 */}
    </Routes>
  );
}