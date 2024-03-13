"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { useAppDispatch } from "@/lib/hooks";
import { fetchAllTodos, removeTodo } from "@/lib/features/todos/todosSlice";

type Props = {
  id: string;
  title: string;
  description: string;
  status: string;
  handleRemoveTodo: any;
  handleEditTodo: any;
};

const TodoItem = ({
  id,
  title,
  description,
  status,
  handleRemoveTodo,
  handleEditTodo,
}: Props) => {
  const [edit, setEdit] = useState(false);

  const [updateTodoItem, setUpdateTodoItem] = useState({
    title: title,
    description: description,
    status: status,
  });

  const handleCheckboxChange = (status: string) => {
    setUpdateTodoItem({ ...updateTodoItem, status: status });
  };

  const dispatch: any = useAppDispatch();

  return (
    <div className="w-52 h-fit bg-red-400 p-2  relative rounded border border-white">
      <div className="flex absolute right-0 top-0">
        <button
          onClick={() => setEdit(true)}
          className="text-white w-7 h-7 flex items-center justify-center  rounded hover:bg-white hover:text-red-400"
        >
          <FiEdit3 />
        </button>
        <button
          onClick={() => handleRemoveTodo(id)}
          className="text-white w-7 h-7 flex items-center justify-center  rounded hover:bg-white hover:text-red-400"
        >
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col pt-7">
        {edit ? (
          <>
            <textarea
              value={updateTodoItem.title}
              onChange={(event) =>
                setUpdateTodoItem({
                  ...updateTodoItem,
                  title: event.target.value,
                })
              }
              className="border rounded border-gray-500 mb-2  overflow-y-auto "
            />
            <textarea
              value={updateTodoItem.description}
              onChange={(event) =>
                setUpdateTodoItem({
                  ...updateTodoItem,
                  description: event.target.value,
                })
              }
              className="border rounded border-gray-500 h-auto resize-y overflow-y-auto"
            />
          </>
        ) : (
          <>
            <h3 className="text-white text-2xl font-bold mb-2 border-b pb-2 border-white">
              {title}
            </h3>

            <p className="text-white text-base font-semibold w-full break-words">
              {description}
            </p>
          </>
        )}
        {edit ? (
          <>
            <div className="mt-2">
              <div>
                <input
                  type="checkbox"
                  id="todo"
                  checked={updateTodoItem.status === "todo"}
                  onChange={() => handleCheckboxChange("todo")}
                />
                <label className="text-white ml-5 text-lg" htmlFor="todo">
                  To Do
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="option2"
                  checked={updateTodoItem.status === "doing"}
                  onChange={() => handleCheckboxChange("doing")}
                />
                <label className="text-white ml-5 text-lg" htmlFor="doing">
                  Doing
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="done"
                  checked={updateTodoItem.status === "done"}
                  onChange={() => handleCheckboxChange("done")}
                />
                <label className="text-white ml-5 text-lg" htmlFor="done">
                  Done
                </label>
                <br />
              </div>
            </div>
            <div className="w-full flex items-center justify-around">
              <button
                onClick={() => (
                  setEdit(false),
                  setUpdateTodoItem({
                    title: title,
                    description: description,
                    status: status,
                  })
                )}
                className="bg-red-600 px-5 rounded text-white hover:bg-white hover:text-red-600"
              >
                İptal
              </button>
              <button
                onClick={() => (
                  setEdit(false),
                  handleEditTodo(
                    id,
                    updateTodoItem.title,
                    updateTodoItem.description,
                    updateTodoItem.status
                  )
                )}
                className="bg-green-600 px-5 rounded text-white hover:bg-white hover:text-green-600"
              >
                Kaydet
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
