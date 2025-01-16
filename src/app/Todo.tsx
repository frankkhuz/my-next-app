"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks)); // Parse and set tasks only once
      } catch (error) {
        console.error("Failed to parse tasks from local storage:", error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save tasks to local storage whenever the `tasks` state changes
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]); // This runs only when `tasks` changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const editedTask = prompt("Edit your task:", tasks[index]);
    if (editedTask !== null && editedTask.trim() !== "") {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) => (i === index ? editedTask : task))
      );
    }
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <h1 className="text-3xl font-semibold text-black">To Do List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          value={inputValue}
          onChange={handleChange}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 text-slate-950"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`border-none rounded-full w-32 h-14 flex items-center justify-center text-white text-lg font-medium cursor-pointer ${
            inputValue.trim()
              ? "bg-orange-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          ADD <Plus />
        </button>
      </div>
      <div className="border bg-neutral-700 rounded p-4">
        <TodoItems tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Todo;
