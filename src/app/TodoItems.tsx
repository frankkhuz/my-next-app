import { Pen, Trash } from "lucide-react";
import React from "react";

interface TodoItemsProps {
  tasks: string[]; // Array of tasks
  onDelete: (index: number) => void; // Function to handle delete
  onEdit: (index: number) => void; // Function to handle edit (placeholder for now)
}

const TodoItems: React.FC<TodoItemsProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="flex flex-col items-center my-3 gap-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 italic">
          No tasks added yet. Start adding!
        </p>
      ) : (
        tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full max-w-md bg-white rounded-lg shadow-md p-4"
          >
            <p className="text-gray-900 font-medium flex-1">{task}</p>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => onEdit(index)}
              >
                <Pen />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onDelete(index)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoItems;
