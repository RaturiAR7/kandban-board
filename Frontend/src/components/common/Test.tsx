// @ts-nocheck

import { useState } from "react";
import Modal from "./Modal";
import { TASK_INPUT_FIELDS } from "../../constants/types";

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

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
          fields={TASK_INPUT_FIELDS}
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
