import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    return NextResponse.json(book);
  }
  const books = await prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const { title, author, description, fileUrl } = await req.json();
  const book = await prisma.book.create({ data: { title, author, description, fileUrl } });
  return NextResponse.json(book, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const { title, author, description, fileUrl } = await req.json();
  const updated = await prisma.book.update({
    where: { id: Number(id) },
    data: { title, author, description, fileUrl },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  await prisma.book.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Deleted successfully' });
}
