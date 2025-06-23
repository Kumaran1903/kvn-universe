import React from "react";
// app/loading.js
function Loading() {
  return <GradientSpinner size={60} />;
}

// Gradient Spinner
const GradientSpinner = ({ size = 40 }) => {
  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div
        className="animate-spin rounded-full border-4 border-transparent"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background:
            "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #EF4444, #3B82F6)",
          borderRadius: "50%",
          padding: "2px",
        }}
      >
        <div
          className="w-full h-full bg-white rounded-full"
          style={{ margin: "2px" }}
        />
      </div>
    </div>
  );
};

export default Loading;
