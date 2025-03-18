import { createNewData, deleteDataById, getAllData, updateDataById } from '@/services/serviceOperations';
import { NextResponse } from 'next/server';
 // Prisma fonksiyonlarını import et

// GET 
export async function GET(req: Request) {
  try {
    const todos = await getAllData();
    // prismaya istek burdan atılıyor
    return NextResponse.json(todos);
  } catch (error) {
    console.log("ERROR GET TASK")
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST
export async function POST(req: Request) {
    try {
      // Gelen veriyi JSON formatında al
      const newData = await req.json();
  
      const data = await createNewData(newData);
  
      // Başarıyla eklenen veriyi döndür
      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }

// PUT
export async function PUT(req: Request) {
  try {
    const { id, newData } = await req.json(); // İstekten id ve yeni veriyi al
    const updatedTodo = await updateDataById(id, newData);
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.log("ERROR UPDATE TASK")
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // İstekten ID'yi al
    const deletedTodo = await deleteDataById(id);
    return NextResponse.json(deletedTodo);
  } catch (error) {
    console.log("ERROR DELETE TASK")
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}