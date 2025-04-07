import React, { useState } from "react";

interface BoardFormProps {
  onSubmit: (title: string, description: string) => void; // Callback for form submission
  text?: string; // Optional button text
}

const BoardForm: React.FC<BoardFormProps> = ({ onSubmit, text = "Submit" }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title, description); // Call the parent-provided onSubmit function
      setTitle(""); // Clear the form fields
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-md mb-4'
    >
      <div>
        <h2 className='text-2xl font-bold text-center'>{text}</h2>
      </div>
      <div>
        <label htmlFor='title' className='block text-white mb-2'>
          Title
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter board title'
          className='w-full p-2 rounded-md bg-gray-700 text-white'
        />
      </div>
      <div>
        <label htmlFor='description' className='block text-white mb-2'>
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter board description'
          className='w-full p-2 rounded-md bg-gray-700 text-white'
        />
      </div>
      <button
        type='submit'
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
      >
        {text}
      </button>
    </form>
  );
};

export default BoardForm;
