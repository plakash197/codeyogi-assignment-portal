import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        options: { theme: string; size: string },
      ) => void;
    };
  };
};

declare const google: GoogleIdentityServices;

function CreateAccount() {
  const handleResponse = (response: CredentialResponse) => {
    console.log(response);
    if(response?.credential) {
      window.location.href="/mentor/dashboard"
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '229434297162-n2s7bst2tpfn6gekct5e59aggehourtb.apps.googleusercontent.com',
      callback: handleResponse
    });

    google.accounts.id.renderButton(document.getElementById('GoogleLogin'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      {/* Main Container Card */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
        {/* Left Side - Branding / Welcome */}
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

        {/* Right Side - Sign Up Form */}
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

            {/* Input Form */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all duration-200 mt-4 shadow-lg shadow-blue-600/30"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-gray-600 font-medium">
              Already have an account?{' '}
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
