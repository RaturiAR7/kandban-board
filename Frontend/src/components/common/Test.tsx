// @ts-nocheck

import { useState } from "react";
import Modal from "./Modal";

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
  });
  const fields = [
    {
      name: "title",
      label: "Task Title",
      type: "text",
    },
    {
      name: "description",
      label: "Task Description",
      type: "text",
    },
    {
      name: "status",
      label: "Task Status",
      type: "select",
      options: ["TODO", "IN_PROGRESS", "DONE"],
    },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onsubmitHandler = (e: Event) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      <button
        onClick={toggleModal}
        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
      >
        Open Modal
      </button>

      {isModalOpen && (
        <Modal
          title='Enter Task'
          fields={fields}
          onClose={toggleModal}
          data={formData}
          setData={setFormData}
          onsubmitHandler={onsubmitHandler}
        />
      )}
    </div>
  );
};

export default Test;
