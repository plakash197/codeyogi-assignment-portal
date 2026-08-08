import { useState, useEffect } from 'react';
import {
  FaHome,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaEye,
} from 'react-icons/fa';

function StudentDashboard({ data, handleLogin }) {
  const [activeTab, setActiveTab] = useState('home');
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [link, setLink] = useState('');

  const student =
    data || JSON.parse(localStorage.getItem('currentStudent') || '{}');

  useEffect(() => {
    setAssignments(JSON.parse(localStorage.getItem('assignments') || '[]'));
  }, []);

  const handleSubmission = (assignmentId) => {
    if (!link) {
      alert('Enter Your Project link!');
      return;
    }

    let allSubs = JSON.parse(
      localStorage.getItem('studentSubmissions') || '[]'
    );
    const newSub = {
      id: Date.now().toString(),
      assignmentId,
      studentEmail: student.email,
      studentName: student.name,
      link,
      status: 'Pending',
    };

    allSubs.push(newSub);
    localStorage.setItem('studentSubmissions', JSON.stringify(allSubs));
    setLink('');
    setSelectedAssignment(null);
    alert('Assignment submit ho gaya!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col pb-20 sm:pb-0 sm:flex-row">
      <aside className="hidden sm:flex flex-col w-64 bg-gray-800 p-6 border-r border-gray-700">
        <h2 className="text-xl font-bold text-teal-400 mb-8">Student Portal</h2>
        <nav className="space-y-4">
          {[
            { id: 'home', name: 'Dashboard', icon: FaHome },
            { id: 'assignments', name: 'Assignments', icon: FaClipboardList },
            { id: 'profile', name: 'Profile', icon: FaUser },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl ${
                activeTab === item.id
                  ? 'bg-teal-500 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              <item.icon /> <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-6">
        <div className="flex justify-between items-center bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md border border-gray-700 mb-6">
          <div className="flex items-center space-x-4">
            {student.picture ? (
              <img
                src={student.picture}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
              />
            ) : (
              <div className="w-12 h-12 bg-teal-500 text-gray-900 font-extrabold rounded-full flex items-center justify-center text-xl shadow-inner">
                {student.name
                  ? student.name.charAt(0).toUpperCase()
                  : 'S'}
              </div>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                Welcome, {student.name || 'Student'}
              </h1>
              <p className="text-xs text-gray-400">
                ID: {student.email || 'student@gmail.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="sm:hidden bg-red-500/10 text-red-400 p-2.5 rounded-xl text-sm font-semibold"
          >
            <FaSignOutAlt />
          </button>
        </div>

        {activeTab === 'home' && (
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h1 className="text-2xl font-bold">Hello, {student.name}!</h1>
            <p className="text-gray-400">
              Total available assignments: {assignments.length}
            </p>
          </div>
        )}

        {activeTab === 'assignments' && !selectedAssignment && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Available Assignments</h2>
            {assignments.map((a) => (
              <div
                key={a.id}
                className="bg-gray-800 p-5 rounded-xl border border-gray-700 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-xs text-gray-400">
                    Deadline: {a.deadline}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAssignment(a)}
                  className="bg-teal-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                  <FaEye /> View
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedAssignment && (
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4">
            <h2 className="text-2xl font-bold text-teal-400">
              {selectedAssignment.title}
            </h2>
            <p className="text-gray-300">{selectedAssignment.description}</p>
            <div className="bg-gray-700 p-4 rounded-xl text-sm space-y-1">
              <p>
                <strong>Deadline:</strong> {selectedAssignment.deadline}
              </p>
              <p>
                <strong>Rules:</strong>
                {selectedAssignment.rules || 'no rules yet'}
              </p>
            </div>
            <input
              type="text"
              placeholder="Paste GitHub/Drive link here"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600"
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleSubmission(selectedAssignment.id)}
                className="bg-green-600 px-6 py-2 rounded-xl font-bold"
              >
                Submit Link
              </button>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="bg-gray-600 px-6 py-2 rounded-xl font-bold"
              >
                Back
              </button>
            </div>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 max-w-lg mx-auto text-center shadow-sm space-y-4">
            {student.picture ? (
              <img
                src={student.picture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 mx-auto shadow-md"
              />
            ) : (
              <div className="w-24 h-24 bg-teal-500 text-gray-900 text-3xl font-bold rounded-full flex items-center justify-center mx-auto shadow-md">
                {student.name ? student.name.charAt(0).toUpperCase() : 'M'}
              </div>
            )}
            <h3 className="text-2xl font-bold text-white">
              {student.name || 'Student User'}
            </h3>
            <p className="text-sm text-gray-400">
              {student.email || 'student@gmail.com'}
            </p>

            <div className="text-left space-y-3 border-t border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-300">
                Role:{' '}
                <span className="text-teal-400 capitalize">
                  {student.role || 'Student'}
                </span>
              </p>
              <p className="text-sm font-medium text-gray-300">
                Account Created:{' '}
                <span className="text-gray-400">
                  {student.loginTime
                    ? new Date(student.loginTime).toLocaleString()
                    : 'N/A'}
                </span>
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </main>
      <nav className="sm:hidden fixed bottom-0 w-full bg-gray-800 flex justify-around p-3 border-t border-gray-700">
        {[
          { id: 'home', name: 'Home', icon: FaHome },
          { id: 'assignments', name: 'Tasks', icon: FaClipboardList },
          { id: 'profile', name: 'Profile', icon: FaUser },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSelectedAssignment(null);
            }}
            className={`flex flex-col items-center ${
              activeTab === item.id ? 'text-teal-400' : 'text-gray-400'
            }`}
          >
            <item.icon className="text-lg" />
            <span className="text-[10px]">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default StudentDashboard;
