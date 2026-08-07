import './App.css';
import Welcome from './Welcome';
import { Route, Routes } from 'react-router-dom';
import MentorLogin from './MentorLogin';
import StudentLogin from './StudentLogin';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/student/login"element={<StudentLogin />} />
        <Route path="/mentor/login" element={<MentorLogin />} />
      </Routes>
    </div>
  );
}

export default App;
