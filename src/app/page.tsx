"use client";

import Link from "next/link";
import { todoProps } from "@/types/type";
import { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { formatDate } from "@/utils/formatDate";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "/api";

export default function Home() {
  const [todos, setTodos] = useState<todoProps[]>([]); // todo listesi
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    async function fetchTodos() {
      // istek app/api/todos'a atılıyor ordan prismaya bağlanıyor
      const res = await fetch(`${API_URL}/todos`, {
        // aslında API_URL gerek yoktur
        // zaten istekleri /api/todos üzerinden olduğu için next.js bunu otomatik yapar bu route için

        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await res.json();
      setTodos(data); // API'den gelen veriyi set ediyoruz
      setLoading(false);
    }

    fetchTodos();
  }, []);

  return (
    <div className="flex justify-center flex-col items-center py-10 w-full">
      <span className="text-5xl font-extrabold uppercase">Case Study</span>
      <h1 className="text-3xl font-extrabold uppercase mb-5 text-center">
        Todo App with Prisma - MongoDB
      </h1>

      <div className="flex justify-center flex-col items-center w-full">
        <div className="flex flex-col gap-5 items-center justify-center mt-10 max-w-4xl w-full">
          <Link href="/create" className="p-2 border-2">
            Add New To Do
          </Link>

          {loading ? (
            <p>Loading...</p>
          ) : (
            // Todo Listesi
            <ul className="flex flex-wrap gap-4 justify-center w-full">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex flex-col justify-between gap-3 p-3 border rounded-md shadow-md w-1/4 min-w-[250px] h-32 overflow-hidden"
                  >
                    <div className="flex justify-between">
                      <h3
                        className={`${
                          todo.isCompleted ? "line-through text-gray-400" : ""
                        } text-ellipsis overflow-hidden`}
                        title={todo.description}
                      >
                        {todo.description}
                      </h3>
                      <Link href={`/todos`}>
                        <LuExternalLink />
                      </Link>
                    </div>

                    <span className="text-sm text-gray-500">
                      {formatDate(todo.createdAt)}
                    </span>
                  </li>
                ))
              ) : (
                <p>No todos found</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
