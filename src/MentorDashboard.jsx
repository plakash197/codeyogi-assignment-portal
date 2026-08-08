import { useState, useEffect } from 'react';
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaPlus,
  FaCheck,
  FaTimes,
  FaEdit,
  FaEye,
} from 'react-icons/fa';

function MentorDashboard({ data, handleLogin }) {
  const [assignRules, setAssignRules] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsList, setStudentsList] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [assignTitle, setAssignTitle] = useState('');
  const [assignDesc, setAssignDesc] = useState('');
  const [assignDeadline, setAssignDeadline] = useState('');

  const [editingAssignment, setEditingAssignment] = useState(null);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [viewSubmissions, setViewSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  const currentMentor =
    data ||
    JSON.parse(
      localStorage.getItem('currentMentor') ||
        '{"name": "Mentor", "email": "mentor@gmail.com", "role": "mentor"}'
    );

  useEffect(() => {
    loadStudents();
    loadAssignments();
  }, []);

  const loadStudents = () => {
    const googleUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const manualUsers = JSON.parse(localStorage.getItem('manualUser') || '[]');

    const formattedGoogle = googleUsers.map((u) => ({
      ...u,
      loginType: 'Google Login',
      id: u.email,
    }));
    const formattedManual = manualUsers.map((u) => ({
      ...u,
      loginType: 'Manual Account',
      id: u.userEmail || u.email,
      name: u.userName || u.name,
    }));

    const allCombined = [...formattedGoogle, ...formattedManual];
    const onlyStudents = allCombined.filter(
      (u) => u.role?.toLowerCase() === 'student'
    );

    setTotalStudents(onlyStudents.length);
    setStudentsList(onlyStudents);
  };

  const loadAssignments = () => {
    const savedAssignments = JSON.parse(
      localStorage.getItem('assignments') || '[]'
    );
    setAssignments(savedAssignments);
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!assignTitle || !assignDesc || !assignDeadline) {
      alert('Kripya sabhi fields bharein!');
      return;
    }

    const newAssignment = {
      id: Date.now().toString(),
      title: assignTitle,
      description: assignDesc,
      deadline: assignDeadline,
      rules: assignRules,
      createdBy: currentMentor.email || 'mentor@gmail.com',
      createdAt: new Date().toLocaleDateString(),
    };

    const updatedAssignments = [...assignments, newAssignment];
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    setAssignments(updatedAssignments);

    setAssignTitle('');
    setAssignDesc('');
    setAssignDeadline('');
    setIsCreating(false);
    alert('Assignment Successfully Create Ho Gaya!');
  };

  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    const updated = assignments.map((a) =>
      a.id === editingAssignment.id ? editingAssignment : a
    );
    localStorage.setItem('assignments', JSON.stringify(updated));
    setAssignments(updated);
    setEditingAssignment(null);
    alert('Assignment Successfully Update Ho Gaya!');
  };

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setViewSubmissions(true);
    const allSubmissions = JSON.parse(
      localStorage.getItem('studentSubmissions') || '[]'
    );
    const currentAssignmentSubs = allSubmissions.filter(
      (s) => s.assignmentId === assignment.id
    );
    setSubmissions(currentAssignmentSubs);
  };

  const handleSubmissionAction = (submissionId, status) => {
    const allSubmissions = JSON.parse(
      localStorage.getItem('studentSubmissions') || '[]'
    );
    const updated = allSubmissions.map((sub) => {
      if (sub.id === submissionId) {
        return { ...sub, status: status };
      }
      return sub;
    });

    localStorage.setItem('studentSubmissions', JSON.stringify(updated));
    setSubmissions(
      updated.filter((s) => s.assignmentId === selectedAssignment.id)
    );
    alert(`Assignment Successfully ${status} kar diya gaya hai!`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col pb-20 sm:pb-0 sm:flex-row">
      <aside className="hidden sm:flex flex-col w-64 bg-gray-800 border-r border-gray-700 p-6 justify-between sticky top-0 h-screen">
        <div>
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-gray-900 font-bold text-xl shadow-md">
              M
            </div>
            <span className="text-xl font-bold text-white">Mentor Panel</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('home');
                setIsCreating(false);
                setEditingAssignment(null);
                setViewSubmissions(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-teal-500 text-gray-900 shadow-lg shadow-teal-500/30'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('students');
                setIsCreating(false);
                setEditingAssignment(null);
                setViewSubmissions(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'students'
                  ? 'bg-teal-500 text-gray-900 shadow-lg shadow-teal-500/30'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <FaUsers className="text-lg" />
              <span>Students</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('assignment');
                setIsCreating(false);
                setEditingAssignment(null);
                setViewSubmissions(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'assignment'
                  ? 'bg-teal-500 text-gray-900 shadow-lg shadow-teal-500/30'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <FaClipboardList className="text-lg" />
              <span>Assignment</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setIsCreating(false);
                setEditingAssignment(null);
                setViewSubmissions(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-teal-500 text-gray-900 shadow-lg shadow-teal-500/30'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <FaUser className="text-lg" />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogin}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
        <div className="flex justify-between items-center bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md border border-gray-700 mb-6">
          <div className="flex items-center space-x-4">
            {currentMentor.picture ? (
              <img
                src={currentMentor.picture}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
              />
            ) : (
              <div className="w-12 h-12 bg-teal-500 text-gray-900 font-extrabold rounded-full flex items-center justify-center text-xl shadow-inner">
                {currentMentor.name
                  ? currentMentor.name.charAt(0).toUpperCase()
                  : 'M'}
              </div>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                Welcome, {currentMentor.name || 'Mentor'}
              </h1>
              <p className="text-xs text-gray-400">
                ID: {currentMentor.email || 'mentor@gmail.com'}
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Total Active Assignments
                  </p>
                  <h3 className="text-3xl font-bold text-teal-400 mt-1">
                    {
                      assignments.filter(
                        (a) => new Date(a.deadline) >= new Date()
                      ).length
                    }
                  </h3>
                </div>
                <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center text-2xl">
                  <FaClipboardList />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Total Students
                  </p>
                  <h3 className="text-3xl font-bold text-teal-400 mt-1">
                    {totalStudents}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center text-2xl">
                  <FaUsers />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">
                Recent 10 Assignments
              </h3>
              {assignments.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Koi assignment create nahi kiya gaya hai.
                </p>
              ) : (
                <div className="space-y-3">
                  {assignments
                    .slice(-10)
                    .reverse()
                    .map((item) => {
                      const isExpired = new Date(item.deadline) < new Date();
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl border border-gray-700"
                        >
                          <div>
                            <h4 className="font-semibold text-white">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              Deadline: {item.deadline}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isExpired
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-teal-500/20 text-teal-400'
                            }`}
                          >
                            {isExpired ? 'Completed' : 'Active'}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                Registered Students
              </h3>
              <span className="bg-teal-500/20 text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold">
                Total: {totalStudents}
              </span>
            </div>

            {studentsList.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                Koi student register nahi hai.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studentsList.map((stu, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/40 p-5 rounded-2xl border border-gray-700 flex items-center space-x-4"
                  >
                    {stu.picture ? (
                      <img
                        src={stu.picture}
                        alt="Student"
                        className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-teal-500 text-gray-900 font-extrabold rounded-full flex items-center justify-center text-xl shadow-inner">
                        {stu.name ? stu.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-white text-base truncate">
                        {stu.name || 'Student Name'}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        ID/Email: **********
                      </p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/20 text-blue-300">
                        {stu.loginType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'assignment' && (
          <div className="space-y-6">
            {viewSubmissions && selectedAssignment ? (
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Submissions for: {selectedAssignment.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Created By ID: {selectedAssignment.createdBy}
                    </p>
                  </div>
                  <button
                    onClick={() => setViewSubmissions(false)}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl text-sm font-semibold"
                  >
                    Back to Assignments
                  </button>
                </div>

                {submissions.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">
                    Abhi tak kisi student ne lonk submit nahi kiya hai
                  </p>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-gray-700/40 p-4 rounded-xl border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div>
                          <h4 className="font-semibold text-white">
                            {sub.studentName}
                          </h4>
                          <p className="text-xs text-gray-400">
                            Email: {sub.studentEmail}
                          </p>
                          <a
                            href={sub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 text-xs underline mt-1 block"
                          >
                            View Submission Link: {sub.link}
                          </a>
                          <span
                            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                              sub.status === 'Accepted'
                                ? 'bg-green-500/20 text-green-400'
                                : sub.status === 'Rejected'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            Status: {sub.status || 'Pending'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleSubmissionAction(sub.id, 'Accepted')
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 shadow"
                          >
                            <FaCheck /> <span>Accept</span>
                          </button>
                          <button
                            onClick={() =>
                              handleSubmissionAction(sub.id, 'Rejected')
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 shadow"
                          >
                            <FaTimes /> <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : editingAssignment ? (
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 max-w-xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                  Edit Assignment
                </h3>
                <form onSubmit={handleUpdateAssignment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingAssignment.title}
                      onChange={(e) =>
                        setEditingAssignment({
                          ...editingAssignment,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editingAssignment.description}
                      onChange={(e) =>
                        setEditingAssignment({
                          ...editingAssignment,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Deadline
                    </label>
                    <input
                      type="datetime-local"
                      value={editingAssignment.deadline}
                      onChange={(e) =>
                        setEditingAssignment({
                          ...editingAssignment,
                          deadline: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Rules / Instructions
                    </label>
                    <textarea
                      placeholder="Example: Do not use external libraries, use only React..."
                      value={editingAssignment.rules}
                      onChange={(e) => setEditingAssignment({
                        ...
                        editingAssignment,
                        rules: e.target.value
                      })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      rows="2"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="flex-grow bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold py-3 rounded-xl shadow"
                    >
                      Update Assignment
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAssignment(null)}
                      className="px-5 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : isCreating ? (
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 max-w-xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                  Create New Assignment
                </h3>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter assignment title"
                      value={assignTitle}
                      onChange={(e) => setAssignTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter assignment details"
                      value={assignDesc}
                      onChange={(e) => setAssignDesc(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Deadline
                    </label>
                    <input
                      type="datetime-local"
                      value={assignDeadline}
                      onChange={(e) => setAssignDeadline(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Rules / Instructions
                    </label>
                    <textarea
                      placeholder="Example: Do not use external libraries, use only React..."
                      value={assignRules}
                      onChange={(e) => setAssignRules(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500"
                      rows="2"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="flex-grow bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold py-3 rounded-xl shadow"
                    >
                      Publish Assignment
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-5 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">
                    All Assignments
                  </h3>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-md"
                  >
                    <FaPlus />
                    <span>Create Assignment</span>
                  </button>
                </div>

                {assignments.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">
                    Koi assignment available nahi hai.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {assignments.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-800 p-5 rounded-2xl border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div
                          className="cursor-pointer flex-grow"
                          onClick={() => setSelectedAssignment(item)}
                        >
                          <h4 className="font-bold text-white text-lg">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            Created By ID: {item.createdBy}
                          </p>
                          <p className="text-xs text-teal-400 mt-1">
                            Deadline: {item.deadline}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => handleViewSubmissions(item)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1"
                          >
                            <FaEye /> <span>Submissions</span>
                          </button>
                          <button
                            onClick={() => setEditingAssignment(item)}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1"
                          >
                            <FaEdit /> <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 max-w-lg mx-auto text-center shadow-sm space-y-4">
            {currentMentor.picture ? (
              <img
                src={currentMentor.picture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 mx-auto shadow-md"
              />
            ) : (
              <div className="w-24 h-24 bg-teal-500 text-gray-900 text-3xl font-bold rounded-full flex items-center justify-center mx-auto shadow-md">
                {currentMentor.name
                  ? currentMentor.name.charAt(0).toUpperCase()
                  : 'M'}
              </div>
            )}
            <h3 className="text-2xl font-bold text-white">
              {currentMentor.name || 'Mentor User'}
            </h3>
            <p className="text-sm text-gray-400">
              {currentMentor.email || 'mentor@gmail.com'}
            </p>

            <div className="text-left space-y-3 border-t border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-300">
                Role:{' '}
                <span className="text-teal-400 capitalize">
                  {currentMentor.role || 'Mentor'}
                </span>
              </p>
              <p className="text-sm font-medium text-gray-300">
                Account Created:{' '}
                <span className="text-gray-400">
                  {data.loginTime
                    ? new Date(data.loginTime).toLocaleString()
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

      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-xl flex justify-around items-center py-3 z-50">
        <button
          onClick={() => {
            setActiveTab('home');
            setIsCreating(false);
            setEditingAssignment(null);
            setViewSubmissions(false);
          }}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'home'
              ? 'text-teal-400 scale-110 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <FaHome className="text-xl" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('students');
            setIsCreating(false);
            setEditingAssignment(null);
            setViewSubmissions(false);
          }}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'students'
              ? 'text-teal-400 scale-110 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <FaUsers className="text-xl" />
          <span className="text-[10px] font-semibold mt-1">Students</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('assignment');
            setIsCreating(false);
            setEditingAssignment(null);
            setViewSubmissions(false);
          }}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'assignment'
              ? 'text-teal-400 scale-110 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <FaClipboardList className="text-xl" />
          <span className="text-[10px] font-semibold mt-1">Assignment</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('profile');
            setIsCreating(false);
            setEditingAssignment(null);
            setViewSubmissions(false);
          }}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'profile'
              ? 'text-teal-400 scale-110 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <FaUser className="text-xl" />
          <span className="text-[10px] font-semibold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}

export default MentorDashboard;
