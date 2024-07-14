import SignUpForm from "./Authentication/SignUpForm";
import LoginForm from "./Authentication/LoginForm";
import { useState } from "react";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Gup-Shup</h1>
      <div className="w-full max-w-sm p-4 bg-white rounded shadow-md">
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="text-center mt-4">
          {isLogin ? (
            <p>
              Create an account
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
