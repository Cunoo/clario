
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to My Website
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-600">
          Built with React, TypeScript, and TailwindCSS
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </header>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500">
        {new Date().getFullYear()} My Website. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

