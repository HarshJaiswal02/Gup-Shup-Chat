const LoginForm = () => {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
