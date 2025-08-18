import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: { lessons: true }, // ✅ include lessons
    });
    return NextResponse.json(course);
  }

  const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(courses);
}


export async function POST(req: NextRequest) {
  const { title, description, image, isFree } = await req.json();
  const course = await prisma.course.create({ data: { title, description, image, isFree } });
  return NextResponse.json(course, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const { title, description, image, isFree } = await req.json();
  const updated = await prisma.course.update({
    where: { id: Number(id) },
    data: { title, description, image, isFree },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  await prisma.course.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Deleted successfully' });
}
