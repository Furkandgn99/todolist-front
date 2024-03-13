"use client";

import {
  AddTodo,
  Todo,
  TodosState,
  editTodo,
  fetchAllTodos,
  removeTodo,
} from "@/lib/features/todos/todosSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

import TodoItem from "@/components/todoItem";

const Home = () => {
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  const handleAddTodo = () => {
    dispatch(
      AddTodo({
        id: "",
        title: "Title",
        description: "Description",
        status: "todo",
      })
    )
      .then(() => dispatch(fetchAllTodos()))
      .catch((error: any) => console.log(error));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id))
      .then(() => dispatch(fetchAllTodos()))
      .catch((error: any) => console.log(error));
  };

  const handleEditTodo = ({ id, description, title, status }: Todo) => {
    dispatch(
      editTodo({
        id: id,
        description: description,
        title: title,
        status: status,
      })
    )
      .then(() => dispatch(fetchAllTodos()))
      .catch((error: any) => console.log(error));
  };

  const todosItems = useAppSelector<TodosState>((state) => state.todos);

  useEffect(() => {
    console.log("todos items", todosItems);
  }, [todosItems]);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => handleAddTodo()}
        className=" bg-gray-400 rounded text-white p-2 hover:bg-red-400"
      >
        Add Item
      </button>
      <div className=" w-fit h-fit  border-2 rounded border-red-400">
        <div className="flex flex-row w-full justify-center items-center border-b-2 border-red-400">
          <h2 className="w-52 text-center font-bold text-2xl text-gray-400">
            To Do
          </h2>
          <h2 className="w-52 text-center font-bold text-2xl text-gray-400 border-x-2 border-red-400">
            Doing
          </h2>
          <h2 className="w-52 text-center font-bold text-2xl text-gray-400">
            Done
          </h2>
        </div>
        <div className="flex flex-row w-full relative">
          <div className="w-52">
            {todosItems.Todos.filter(
              (todosItem) => todosItem.status === "todo"
            ).map((todosItem) => (
              <TodoItem
                key={todosItem.id}
                id={todosItem.id}
                handleRemoveTodo={(id: string) => handleRemoveTodo(id)}
                handleEditTodo={(
                  id: string,
                  title: string,
                  description: string,
                  status: string
                ) =>
                  handleEditTodo({
                    id: id,
                    title: title,
                    description: description,
                    status: status,
                  })
                }
                title={todosItem.title}
                description={todosItem.description}
                status={todosItem.status}
              />
            ))}
          </div>
          <div className="w-52">
            {todosItems.Todos.filter(
              (todosItem) => todosItem.status === "doing"
            ).map((todosItem) => (
              <TodoItem
                key={todosItem.id}
                id={todosItem.id}
                handleRemoveTodo={(id: string) => handleRemoveTodo(id)}
                handleEditTodo={(
                  id: string,
                  title: string,
                  description: string,
                  status: string
                ) =>
                  handleEditTodo({
                    id: id,
                    title: title,
                    description: description,
                    status: status,
                  })
                }
                title={todosItem.title}
                description={todosItem.description}
                status={todosItem.status}
              />
            ))}
          </div>
          <div className="w-52">
            {todosItems.Todos.filter(
              (todosItem) => todosItem.status === "done"
            ).map((todosItem) => (
              <TodoItem
                key={todosItem.id}
                id={todosItem.id}
                handleRemoveTodo={(id: string) => handleRemoveTodo(id)}
                handleEditTodo={(
                  id: string,
                  title: string,
                  description: string,
                  status: string
                ) =>
                  handleEditTodo({
                    id: id,
                    title: title,
                    description: description,
                    status: status,
                  })
                }
                title={todosItem.title}
                description={todosItem.description}
                status={todosItem.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
