import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaUserGraduate, FaArrowRight, FaShieldAlt, FaRocket, FaCheckCircle } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-between text-gray-800">
      
      <nav className="w-full bg-white/85 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            A
          </div>
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Assignment Portal
          </span>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/mentor/login"
            className="hidden sm:inline-flex items-center text-sm font-semibold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
          >
            Mentor Portal
          </Link>
          <Link
            to="/student/login"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center space-x-2 bg-blue-100/80 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Welcome to the Future of Learning</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-3xl leading-tight">
          A Complete Platform for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mentors and Students</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
          Login according to your role and access your dashboard with secure authentication and a seamless experience.
        </p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Mentor Portal</h3>
              <p className="text-sm text-gray-500 mt-2">
                Guide your students, manage lectures, and track progress effortlessly.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/mentor/login"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md"
              >
                <span>Login as Mentor</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                <FaUserGraduate />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Student Portal</h3>
              <p className="text-sm text-gray-500 mt-2">
                Learn new courses, submit assignments, and check your dashboard.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/student/login"
                className="w-full inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md shadow-blue-600/30"
              >
                <span>Login as Student</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/60 shadow-sm flex items-start space-x-4">
            <div className="text-blue-600 text-2xl mt-1"><FaShieldAlt /></div>
            <div>
              <h4 className="font-bold text-gray-900">Secure & Safe</h4>
              <p className="text-xs text-gray-500 mt-1">Role-based security and data protection for every user.</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/60 shadow-sm flex items-start space-x-4">
            <div className="text-blue-600 text-2xl mt-1"><FaRocket /></div>
            <div>
              <h4 className="font-bold text-gray-900">Fast Performance</h4>
              <p className="text-xs text-gray-500 mt-1">Extremely fast and smooth navigation without any lag.</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/60 shadow-sm flex items-start space-x-4">
            <div className="text-blue-600 text-2xl mt-1"><FaCheckCircle /></div>
            <div>
              <h4 className="font-bold text-gray-900">Google & Manual</h4>
              <p className="text-xs text-gray-500 mt-1">Both options available - Google login or manual password.</p>
            </div>
          </div>
        </div>

      </main>

      <footer className="w-full bg-white border-t border-gray-200 py-6 text-center text-xs sm:text-sm text-gray-500">
        <p>© 2026 Assignment Portal. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
