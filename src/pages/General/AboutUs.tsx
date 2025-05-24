import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-20 px-6 md:px-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-white bg-gradient-to-r from-blue-300 to-purple-400">
            Revolutionizing Sewadar Coordination
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
            Connect HQ transforms volunteer management with{" "}
            <span className="font-semibold text-blue-200">intuitive tools</span>{" "}
            for batch coordination, real-time tracking, and insightful
            analytics. Designed to bring{" "}
            <span className="italic text-purple-200">
              clarity and efficiency
            </span>{" "}
            to every aspect of sewa administration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Feature Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="text-blue-300 text-3xl mb-4">✨</div>
            <h3 className="text-2xl font-bold mb-4 text-blue-100">
              Core Features
            </h3>
            <ul className="space-y-3 text-blue-50">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">✓</span>
                Secure authentication system
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">✓</span>
                Detailed volunteer profiles
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">✓</span>
                Real-time call management
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">✓</span>
                Comprehensive reporting
              </li>
            </ul>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="text-purple-300 text-3xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-4 text-purple-100">
              Batch Management
            </h3>
            <ul className="space-y-3 text-purple-50">
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">✓</span>
                Flexible batch types
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">✓</span>
                Real-time assignment tracking
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">✓</span>
                Role-based access control
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">✓</span>
                Centralized administration
              </li>
            </ul>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-indigo-400/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="text-indigo-300 text-3xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-100">
              Operational Impact
            </h3>
            <ul className="space-y-3 text-indigo-50">
              <li className="flex items-start">
                <span className="text-indigo-300 mr-2">✓</span>
                Streamlines coordination
              </li>
              <li className="flex items-start">
                <span className="text-indigo-300 mr-2">✓</span>
                Eliminates manual errors
              </li>
              <li className="flex items-start">
                <span className="text-indigo-300 mr-2">✓</span>
                Provides actionable insights
              </li>
              <li className="flex items-start">
                <span className="text-indigo-300 mr-2">✓</span>
                Unified data platform
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 max-w-3xl mx-auto">
          <blockquote className="text-xl italic text-blue-100 mb-4">
            "Crafted with devotion to empower the spirit of seva through
            technology."
          </blockquote>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto my-4 rounded-full"></div>
          <p className="font-medium text-blue-200">
            Developed with <span className="text-red-400">❤️</span> by{" "}
            <span className="font-bold text-white">
              <a
                href="https://groverlakshya.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-whit-400 hover:underline"
              >
                Lakshya Grover
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
