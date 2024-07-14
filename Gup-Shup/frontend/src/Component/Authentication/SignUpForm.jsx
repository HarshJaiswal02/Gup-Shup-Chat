import { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          name="name"
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          name="confirmPassword"
          type="confirmPassword"
          className="w-full px-3 py-2 border rounded"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile picture</label>
        <input
          type="file"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
          accept="image/*"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
