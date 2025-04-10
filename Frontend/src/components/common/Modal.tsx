import { useEffect, useState } from "react";

const Modal = ({ fields, data, setData, title, onClose }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the modal is mounted
    setIsVisible(true);
    return () => setIsVisible(false); // Cleanup when unmounted
  }, []);
  const onsubmitHandler = (e: Event) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white shadow-md rounded-lg w-1/3 p-4 relative transform transition-transform duration-300 ${
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
        <form onSubmit={onsubmitHandler}>
          {fields.map((field, index) => (
            <div key={index}>
              <label
                htmlFor={field.name}
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder={field.placeholder}
                value={data[field.name]}
                onChange={(e) => {
                  setData((prevData: any) => ({
                    ...prevData,
                    [field.name]: e.target.value,
                  }));
                }}
                required
              />
            </div>
          ))}
          <button className=' '>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
