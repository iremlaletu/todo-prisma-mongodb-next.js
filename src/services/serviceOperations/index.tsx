import { prisma } from "@/utils/prisma";

// GET ALL
export async function getAllData() {
  try {
    const data = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc", // 'desc' ile en yeni todo'yu başa alırsınız
      },
    });
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// POST
export async function createNewData(newData: any) {
  try {
    const data = await prisma.todo.create({ data: newData });
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// GET BY UNIQUE ONE VALUE
export async function getDataByUnique(id: string) {
  try {
    const data = await prisma.todo.findUnique({ where: { id } });
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// UPDATE
export async function updateDataById(
  id: string,
  newData: { description: string; isCompleted?: boolean }
) {
  try {
    const data = await prisma.todo.update({
      where: { id },
      data: newData,
    });
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

//DELETE
export async function deleteDataById(id: string) {
  try {
    const data = await prisma.todo.delete({ where: { id } });
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
