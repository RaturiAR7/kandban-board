import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundGradient } from "../constants/UI/bg-gradient";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-r bg-black text-white'>
      {/* Hero Section */}
      <header className='flex flex-col items-center justify-center text-center py-20 px-6'>
        <h1 className='text-5xl font-bold mb-6'>
          Welcome to <span className='text-blue-500'>KanbanFlow</span>
        </h1>
        <p className='text-lg text-gray-300 mb-8'>
          Organize your tasks, collaborate with your team, and boost your
          productivity with our intuitive Kanban board.
        </p>
        <div className='flex gap-4'>
          <button
            onClick={() => navigate("/register")}
            className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className='px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition'
          >
            Login
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className='py-16 px-6'>
        <h2 className='text-3xl font-bold text-center mb-12'>Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <BackgroundGradient>
            <div className='flex flex-col items-center text-center bg-black p-6 rounded-3xl'>
              <div className='text-blue-500 text-4xl mb-4'>
                <i className='fas fa-tasks'></i>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Task Management</h3>
              <p className='text-gray-400'>
                Create, organize, and prioritize your tasks with ease using our
                Kanban board.
              </p>
            </div>
          </BackgroundGradient>
          <BackgroundGradient>
            <div className='flex flex-col items-center text-center bg-black p-6 rounded-3xl'>
              <div className='text-blue-500 text-4xl mb-4'>
                <i className='fas fa-users'></i>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Team Collaboration</h3>
              <p className='text-gray-400'>
                Collaborate with your team in real-time and stay on top of your
                projects.
              </p>
            </div>
          </BackgroundGradient>
          <BackgroundGradient>
            <div className='flex flex-col items-center text-center bg-black p-6 rounded-3xl'>
              <div className=' text-4xl mb-4'>
                <i className='fas fa-chart-line'></i>
              </div>
              <h3 className='text-xl font-semibold mb-2'>
                Productivity Insights
              </h3>
              <p className='text-gray-400'>
                Track your progress and gain insights to improve your
                productivity.
              </p>
            </div>
          </BackgroundGradient>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className='py-16 text-center'>
        <h2 className='text-3xl font-bold mb-4'>Ready to Get Started?</h2>
        <p className='text-lg text-gray-200 mb-8'>
          Sign up today and take your productivity to the next level.
        </p>
        <button
          onClick={() => navigate("/register")}
          className='px-8 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition'
        >
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className='py-6 bg-gray-800 text-center text-gray-400'>
        <p>
          &copy; {new Date().getFullYear()} KanbanFlow. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Hero;
