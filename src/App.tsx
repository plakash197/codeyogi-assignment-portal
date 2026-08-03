import './App.css';
import Welcome from './Welcome';
import { Route, Routes } from 'react-router-dom';
import MentorForm from './MentorForm';
import StudentLogin from './StudentLogin';
import CreateAccount from './CreateAccount';
import MentorDash from './MentorDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/mentor/login" element={<MentorForm />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/create/account" element={<CreateAccount />} />
        <Route path="/mentor/dashboard" element={<MentorDash />} />
      </Routes>
    </div>
  );
}

export default App;
