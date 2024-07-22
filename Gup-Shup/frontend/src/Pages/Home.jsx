import SignUpForm from "../Component/Authentication/SignUpForm";
import LoginForm from "../Component/Authentication/LoginForm";
import { useState } from "react";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  // lex flex-col items-center justify-center min-w-96 mx-auto
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Gup-Shup</h1>
      <div className=" p-4 bg-white rounded shadow-md">
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="text-center mt-4">
          {isLogin ? (
            <p>
              Create an account{" "}
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
