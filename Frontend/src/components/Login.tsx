import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/userApi";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
  setTriggerUserFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({
  setIsAuthenticated,
  setTriggerUserFetch,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser({ email, password });

    if (response.status !== 200) {
      setError(response.data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", response.data.token);

    setIsAuthenticated(true);
    setTriggerUserFetch((prev) => !prev); // trigger user re-fetch
    navigate("/dashboard");
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#1E1E1E]'>
      <div className='w-full max-w-md p-6 bg-[#2E2E2E] rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center text-white mb-6'>
          Login
        </h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
