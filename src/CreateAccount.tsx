import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CredentialResponse = {
  credential?: string;
};

type GoogleIdentityServices = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
      }) => void;
      renderButton: (
        parent: HTMLElement | null,
        options: { theme: string; size: string }
      ) => void;
    };
  };
};

declare const google: GoogleIdentityServices;

type CreateAccountProps = {
  name: string;
  handleLoginToSwitch: () => void;
};

function CreateAccount({ name, handleLoginToSwitch, setLoginTrue }: CreateAccountProps) {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleResponse = (response: CredentialResponse) => {
    if (response?.credential) {
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const userData = JSON.parse(jsonPayload);
      const manualUserList = JSON.parse(
        localStorage.getItem('manualUser') || '[]'
      );
      const isManualExist = manualUserList.some(
        (u: any) => u.email === userData.email
      );

      if (isManualExist) {
        alert(
          'Yeh email manually registered hai! Kripya email aur password daalkar login page se login karein.'
        );
        return;
      }

      const newUser = {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        loginTime: new Date().toISOString(),
        role: name,
      };

      const existingUsers = JSON.parse(
        localStorage.getItem('allUsers') || '[]'
      );
      const userExists = existingUsers.some(
        (u: any) => u.email === newUser.email
      );

      if (!userExists) {
        existingUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(existingUsers));
        alert('Google Account Successfully Created!');
      }
      setLoginTrue()
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '229434297162-n2s7bst2tpfn6gekct5e59aggehourtb.apps.googleusercontent.com',
      callback: handleResponse,
    });

    google.accounts.id.renderButton(document.getElementById('GoogleLogin'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  function handleManualAccount() {
    if(!userPass || !userName || !userEmail) {
      alert('Please fill all the fields')
      return 
    }
    const checkUser = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const isUserExist = checkUser.some((u: any) => u.email === userEmail);

    const manualUserList = JSON.parse(
      localStorage.getItem('manualUser') || '[]'
    );
    const isManualUser = manualUserList.some(
      (u: any) => u.email === userEmail
    );

    if (isUserExist) {
      alert(
        'Yeh email Google login se registered hai! Kripya Google login ka use karein.'
      );
      return;
    }

    if (isManualUser) {
      alert(
        'Yeh email pehle se registered hai! Kripya Login page par jakar login karein.'
      );
      return;
      }

    const newManualUser = {
      email: userEmail,
      pass: userPass,
      name: userName,
      loginTime: new Date().toISOString(),
      role: name,
    };

    manualUserList.push(newManualUser);
    localStorage.setItem('manualUser', JSON.stringify(manualUserList));
    alert('Account Create Successfully! Ab aap login kar sakte hain.');
    setTimeout(() => {
      handleLoginToSwitch()
    }, 3000)
  }

  function handleName(event: { target: { value: any } }) {
    setUserName(event.target.value);
  }

  function handleEmail(event: { target: { value: any } }) {
    setUserEmail(event.target.value.toLowerCase());
  }

  function handlePass(event: { target: { value: any } }) {
    setUserPass(event.target.value);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex-col justify-between text-white">
          <div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Start Your <br /> Journey With Us
            </h2>
            <p className="text-blue-100 text-lg mt-4 font-light">
              Create an account to join the community, submit your assignments,
              and connect with expert mentors.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl shadow-inner">
                🎓
              </div>
              <p className="font-medium text-lg">Learn from Experts</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl shadow-inner">
                🚀
              </div>
              <p className="font-medium text-lg">Boost Your Skills</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Create an Account
            </h3>
            <p className="text-gray-500 mb-8 font-medium">
              Please enter your details to sign up.
            </p>

            <div
              id="GoogleLogin"
              className="w-full flex justify-center mb-4"
            ></div>

            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  onChange={handleName}
                  value={userName}
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  onChange={handleEmail}
                  value={userEmail}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  onChange={handlePass}
                  value={userPass}
                  required
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <button
                onClick={handleManualAccount}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all duration-200 mt-4 shadow-lg shadow-blue-600/30"
              >
                Create Account
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600 font-medium">
              Already have an account?{' '}
              <button
                onClick={handleLoginToSwitch}
                className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
