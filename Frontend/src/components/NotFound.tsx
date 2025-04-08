import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-[#1E1E1E] text-white'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mt-4 text-lg'>
        The page you are looking for does not exist.
      </p>
      <a
        href='/'
        className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Go Back to Home
      </a>
    </div>
  );
};

export default NotFound;
