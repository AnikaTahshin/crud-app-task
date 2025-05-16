import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  message?: string;
}

const CustomLoading: React.FC<LoaderProps> = ({
  size = 40,
  color = "#3b82f6",
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div
        className="animate-spin rounded-full border-4 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: `${color}`,
        }}
      ></div>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default CustomLoading;
