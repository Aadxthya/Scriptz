"use client";

function Loading() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      {/* Pulsing Dots with Different Colors */}
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  );
}

export default Loading;
