// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apis/userApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      if (response.status !== 200) {
        setError(response.data.message || "Registration failed");
        return;
      }
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#1E1E1E]'>
      <div className='w-full max-w-md p-6 bg-[#2E2E2E] rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center text-white mb-6'>
          Register
        </h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-300'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 mt-1 bg-[#3A3A3A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your name'
              required
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-300'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 mt-1 bg-[#3A3A3A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-300'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 mt-1 bg-[#3A3A3A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Register
          </button>
        </form>
        <p className='text-center text-gray-400 mt-4'>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className='text-blue-500 hover:underline'
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
