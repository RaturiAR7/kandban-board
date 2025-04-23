//// @ts-nocheck

import { useEffect, useState } from "react";
import { TaskInputField } from "../../constants/types";

const Modal = ({
  fields,
  data,
  setData,
  title,
  onClose,
  onsubmitHandler,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the modal is mounted
    setIsVisible(true);
    return () => setIsVisible(false); // Cleanup when unmounted
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white shadow-md rounded-lg backdrop-blur-2xl  w-1/3 p-4 relative transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-75"
        }`}
      >
        <button
          onClick={() => {
            setIsVisible(false); // Trigger closing animation
            setTimeout(onClose, 300); // Wait for animation to finish before closing
          }}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✖
        </button>
        <h2 className='text-lg font-bold mb-4'>{title}</h2>
        <form onSubmit={onsubmitHandler} className='flex flex-col gap-4'>
          {fields?.map((field: TaskInputField, index: number) => (
            <div key={index}>
              <label
                htmlFor={field.name}
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  id={field.name}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  value={data[field.name]} // Bind the selected value to the state
                  onChange={(e) => {
                    setData((prevData: Record<string, any>) => ({
                      ...prevData,
                      [field.name]: e.target.value, // Update the state with the selected value
                    }));
                  }}
                >
                  {field.options?.map((option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder={field.placeholder}
                  value={data[field.name]}
                  onChange={(e) => {
                    setData((prevData: Record<string, any>) => ({
                      ...prevData,
                      [field.name]: e.target.value,
                    }));
                  }}
                  required
                />
              )}
            </div>
          ))}
          <button className='bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded-lg w-1/3 mx-auto hover:bg-gray-200'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
