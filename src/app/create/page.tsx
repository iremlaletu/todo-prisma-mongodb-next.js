"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "../lib/handlers";

export default function AddTodoPage() {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    try {
      const newTodo = await addTodo(description);
      if (newTodo) {
        router.push("/todos");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Add New Todo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="New todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}
