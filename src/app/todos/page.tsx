"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { deleteTodo, fetchTodos, updateTodo } from "../lib/handlers";
import { todoProps } from "@/types/type";
import { formatDate } from "@/utils/formatDate";

export default function TodoListPage() {
  const [todos, setTodos] = useState<todoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    async function loadTodos() {
      const data = await fetchTodos();
      setTodos(data);
      setLoading(false);
    }
    loadTodos();
  }, []);

  const handleUpdate = async (
    id: string,
    newData: { description?: string; isCompleted?: boolean }
  ) => {
    const updatedTodo = await updateTodo(id, newData);
    // handlers'a istek atılıyor handlers'dan api/todos/route'a ordanda
    if (updatedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    const deletedTodo = await deleteTodo(id);
    if (deletedTodo) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deletedTodo.id)
      );
    }
  };

  const handleEdit = (id: string, description: string) => {
    setEditId(id);
    setEditText(description);
  };

  const handleSave = async (id: string) => {
    await handleUpdate(id, { description: editText });
    setEditId(null);
  };

  return (
    <div className="flex flex-col  items-center p-4 min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Your To Do List</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-3">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 p-3 border rounded-md shadow-md max-w-4xl "
                >
                  <div className="flex-1">
                    {editId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border p-1 rounded-md"
                      />
                    ) : (
                      <h3
                        className={`${
                          todo.isCompleted ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.description}
                      </h3>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(todo.createdAt)}
                  </span>
                  <button
                    onClick={() =>
                      editId === todo.id
                        ? handleSave(todo.id)
                        : handleEdit(todo.id, todo.description)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer"
                  >
                    {editId === todo.id ? "Save" : "Edit"}
                  </button>

                  <button
                    onClick={() =>
                      handleUpdate(todo.id, { isCompleted: !todo.isCompleted })
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded-md cursor-pointer"
                  >
                    {todo.isCompleted ? "Completed" : "Complete"}
                  </button>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No todos found</p>
            )}
          </ul>
        )}
      </div>
      <Link href="/"> Back To Home</Link>
    </div>
  );
}
