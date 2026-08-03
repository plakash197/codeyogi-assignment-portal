import { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { RiAdminFill } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import MentorDash from './MentorDashboard';

function MentorForm() {
  const login = {
    username: 'codeyogi@mentor321.com',
    password: 'codeyogi@mentor123',
  };
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    const mentorMail = login.username;
    const mentorPass = login.password;

    if (mentorMail === email && mentorPass === pass) {
      setIsLogin(true);
    } else {
      alert('you are not a mentor Or incorrect Password / Email Try again');
    }
  }

  if (isLogin) {
    return <MentorDash />;
  } else {
    return (
      <div className="bg-gray-100 h-screen">
        <div className="p-3 h-[70px] bg-blue-400 flex items-center">
          <Link to="/" className="text-3xl flex">
            <IoMdArrowRoundBack />
            <span className="text-xl text-white ml-8 font-bold">
              Mentor Login
            </span>
          </Link>
        </div>

        <div className="px-3 py-5 flex flex-col items-center justify-center">
          <div className="w-full text-[120px] flex justify-center">
            <div className="border-3 rounded-[999px] p-5 text-cyan-300">
              <RiAdminFill />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <h1 className="text-5xl font-bold text-center mb-4">
              <span className="text-blue-400"> Welcome </span> Back Mentor!{' '}
            </h1>
            <div className="flex flex-col gap-4">
              <input
                className="h-[50px] border-2 border-gray-600 px-3 py-2 border-box w-full rounded-[99px] text-lg bg-white"
                type="text"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value.toLocaleLowerCase())}
                value={email}
                required
              />

              <input
                className="h-[50px] border-2 border-gray-600 px-3 py-2 border-box w-full rounded-[99px] text-lg bg-white"
                type="password"
                placeholder="Password"
                required
                onChange={(event) => setPass(event.target.value.toLocaleLowerCase())}
                value={pass}
              />
              <div
                className="py-2 flex flex-row justify-center items-center font-bold bg-blue-600 rounded-[99px] "
                onClick={handleLogin}
              >
                <button className="text-xl text-white">Login</button>
                <p className="text-2xl ml-2">
                  <FiLogIn />
                </p>
              </div>
              <div className="flex flex-col gap-[3px]">
              <button className="text-lg text-blue-400 text-center">
                Forget Password?
              </button>
              <p className="text-lg text-gray-400 text-center">OR</p>
              <Link to="/create/account" className="text-lg text-blue-400 text-center"> Create an account </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MentorForm;
