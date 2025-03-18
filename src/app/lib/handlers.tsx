export async function fetchTodos() {
  try {
    const response = await fetch("/api/todos");
    // pages/api/todos/route.ts'e istek atıyor
    if (!response.ok) throw new Error("Failed to fetch todos");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function addTodo(description: string) {
  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, isCompleted: false }),
    });

    if (!response.ok) throw new Error("Failed to add todo");

    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
    return null;
  }
}

export async function updateTodo(
  id: string,
  updatedData: { title?: string; isCompleted?: boolean }
) {
  try {
    const response = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newData: updatedData }),
    });

    if (!response.ok) throw new Error("Failed to update todo");

    return await response.json(); // Güncellenen todo'yu döndür
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
}

// DELETE
export async function deleteTodo(id: string) {
  try {
    const response = await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) throw new Error("Failed to delete todo");

    return await response.json(); // Silinen todo'yu döndür
  } catch (error) {
    console.error("Error deleting todo:", error);
    return null;
  }
}
