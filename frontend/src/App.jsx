import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7c3aed20,transparent_35%),radial-gradient(circle_at_top_right,#2563eb20,transparent_35%),radial-gradient(circle_at_bottom,#f43f5e15,transparent_40%)]" />

      {/* Soft blur */}
      <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10">
        <AppRoutes />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
};

export default App;