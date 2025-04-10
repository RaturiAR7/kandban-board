import { useDraggable } from "@dnd-kit/core";
import { Task } from "../constants/types";
import { deleteIcon } from "../constants/icons";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  deleteTaskHandler: (taskId: string) => void;
  updateTaskHandler: (
    taskId: string,
    updatedData: { title: string; description: string }
  ) => void;
};

const TaskCard = ({
  task,
  deleteTaskHandler,
  updateTaskHandler,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedTitle, setEditedTitle] = useState(task.title); // State for the edited title
  const [editedDescription, setEditedDescription] = useState(task.description); // State for the edited description

  // Only enable drag-and-drop when not editing
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id || "default-id",
    disabled: isEditing, // Disable drag-and-drop when editing
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() && editedDescription.trim()) {
      updateTaskHandler(task?.id || "default-id", {
        title: editedTitle,
        description: editedDescription,
      }); // Call the update handler
    }
    setIsEditing(false); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditedTitle(task.title); // Reset title
    setEditedDescription(task.description); // Reset description
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <img
          src={deleteIcon}
          className='w-5 h-5 cursor-pointer'
          onClick={() => {
            deleteTaskHandler(task.id || "");
          }}
        />
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className='px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Edit
          </button>
        )}
      </div>
      <div
        ref={setNodeRef}
        {...(!isEditing ? listeners : {})} // Attach listeners only when not editing
        {...attributes}
        style={style}
        className='cursor-grab rounded-lg bg-[#3A3A3A] p-3 shadow-sm hover:shadow-md'
      >
        <div>
          {isEditing ? (
            <>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className='w-full p-1 mb-2 rounded-md bg-gray-700 text-white'
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className='w-full p-1 rounded-md bg-gray-700 text-white'
              />
              <div className='flex justify-end gap-2 mt-2'>
                <button
                  onClick={handleSaveClick}
                  className='px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700'
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className='px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700'
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className='text-xl font-bold text-neutral-100'>
                {task.title}
              </h3>
              <p className='mt-2 text-base font-semibold text-neutral-100'>
                {task.description}
              </p>
              <div className='mt-4 text-sm text-neutral-100'>
                <p>
                  Priority:{" "}
                  <span
                    className={`${
                      task.priority === "High"
                        ? "text-green-400"
                        : task.priority === "Medium"
                        ? "text-amber-200"
                        : "text-red-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>
                <p>
                  Created:{" "}
                  <span className=''>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
