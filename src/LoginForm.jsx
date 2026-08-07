import { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { RiAdminFill } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import CreateAccount from './CreateAccount';
import MentorDashboard from './MentorDashboard';
import StudentDashboard from './StudentDashboard';

function LoginForm(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [create, setCreate] = useState(false);
  const [userData, setUserData] = useState({});

  const handleGoogleResponse = (response) => {
    if (response?.credential) {
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const userData = JSON.parse(jsonPayload);
      const existingUsers = JSON.parse(
        localStorage.getItem('allUsers') || '[]'
      );

      const foundUser = existingUsers.find((u) => u.email === userData.email);

      if (foundUser) {
        if (foundUser.role.toLowerCase() !== props.name.toLowerCase()) {
          alert(
            `This email is registered as a ${foundUser.role}. You can't login here!`
          );
          return;
        }
      } else {
        const newUser = {
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          loginTime: new Date().toISOString(),
          role: props.name.toLowerCase(),
        };
        existingUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(existingUsers));
      }
      const userInfo = {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        loginTime: new Date().toISOString(),
        role: props.name.toLowerCase(),
      };

      alert('Login Successfully!');
      setUserData(userInfo);
      setIsLogin(true)
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          '229434297162-n2s7bst2tpfn6gekct5e59aggehourtb.apps.googleusercontent.com',
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleLoginBtn'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  }, [create]);

  function handleLogin() {
    if (!email || !pass) {
      alert('Kripya Email aur Password dono bharein!');
      return;
    }

    const getGoogleList = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const manualList = JSON.parse(localStorage.getItem('manualUser') || '[]');

    const checkGoogleUser = getGoogleList.some((u) => u.email === email);
    const checkManualUser = manualList.some((u) => u.email === email);

    if (checkGoogleUser) {
      alert(
        'This email is registered via Google login. Please login via Google.'
      );
      return;
    }

    if (!checkManualUser) {
      alert('No User Found. Please Create an Account first!');
      return;
    }

    const foundUser = manualList.find((u) => u.email === email);

    if (foundUser.userPass !== pass) {
      alert('Incorrect Email or Password');
      return;
    }

    if (foundUser.role.toLowerCase() !== props.name.toLowerCase()) {
      if (props.name.toLowerCase() === 'mentor') {
        alert("This user is registered as a student. You can't login here!");
      } else {
        alert("This user is registered as a mentor. You can't login here!");
      }
      return;
    }
    setUserData(foundUser);
    setIsLogin(true);
  }

  function handleForgetPassword() {
    const uName = prompt(
      'Enter your name which was given when you created the account'
    )?.toLowerCase();
    const uEmail = prompt(
      'Enter your email id which you use to login'
    )?.toLowerCase();

    if (!uName || !uEmail) return;

    const userList = JSON.parse(localStorage.getItem('manualUser') || '[]');
    const userIndex = userList.findIndex(
      (u) =>
        u.name?.toLowerCase() === uName && u.email?.toLowerCase() === uEmail
    );

    if (userIndex !== -1) {
      const newPass = prompt(
        'Enter your new password: Minimum Length: 8 and maximum Length: 16'
      );
      if (!newPass) return;

      if (newPass.length < 8) {
        alert(
          'Sorry we cant set this password because password length is less then 8, Try Again'
        );
        return;
      } else if (newPass.length > 16) {
        alert(
          'Sorry we cant set this password because password length greater than 16, Try Again'
        );
        return;
      }

      userList[userIndex].userPass = newPass;
      localStorage.setItem('manualUser', JSON.stringify(userList));
      alert('New Password Set Successfully!');
    } else {
      alert('No User Found with this Name and Email!');
    }
  }

  function handleBackToLogin() {
    setCreate(false);
  }

  function setLoginTrue(userInfor) {
    setIsLogin(true);
    setUserData(userInfor)
  }

  function backToLogin() {
    setIsLogin(false);
  }

  if (isLogin) {
    if (props.name.toLowerCase() === 'mentor') {
      return <MentorDashboard handleLogin={backToLogin} data={userData} />;
    } else if (props.name.toLowerCase() === 'student') {
      return <StudentDashboard handleLogin={backToLogin} data={userData} />;
    }
  } else if (create) {
    return (
      <CreateAccount
        name={props.name}
        handleLoginToSwitch={handleBackToLogin}
        loginTrue={setLoginTrue}
      />
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex flex-col justify-between p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base"
          >
            <IoMdArrowRoundBack className="text-xl sm:text-2xl mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="w-full max-w-md lg:max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 my-8 border border-gray-100 transition-all">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-2xl mb-4 shadow-sm border border-blue-100">
              <RiAdminFill className="text-3xl sm:text-4xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 capitalize tracking-tight">
              Welcome Back {props.name}!
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Please enter your details to sign in to your dashboard
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-sm sm:text-base bg-gray-50/50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-sm sm:text-base bg-gray-50/50"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleForgetPassword}
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center space-x-2 text-base"
            >
              <FiLogIn className="text-xl" />
              <span>Login</span>
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-4 text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div
              id="googleLoginBtn"
              className="flex justify-center w-full overflow-hidden rounded-xl"
            ></div>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm sm:text-base text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setCreate(true)}
                  className="text-blue-600 font-bold hover:underline ml-1"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>
      </div>
    );
  }
}

export default LoginForm;
