import React from "react";

const ErrorComponent = ({ message = "Something went wrong" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-red-500">Error: {message}</div>
    </div>
  );
};

export default ErrorComponent;
