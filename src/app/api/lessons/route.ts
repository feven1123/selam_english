import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all lessons or lessons for a specific course
export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('courseId');

  try {
    const lessons = courseId
      ? await prisma.lesson.findMany({
          where: { courseId: Number(courseId) },
          orderBy: { createdAt: 'asc' },
        })
      : await prisma.lesson.findMany({ orderBy: { createdAt: 'asc' } });

    return NextResponse.json(lessons);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch lessons', details: err }, { status: 500 });
  }
}

// POST: Add a new lesson
export async function POST(req: NextRequest) {
  const { title, content, courseId } = await req.json();

  if (!title || !content || !courseId)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        course: { connect: { id: Number(courseId) } },
      },
    });
    return NextResponse.json(lesson, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create lesson', details: err }, { status: 500 });
  }
}

// PUT: Update a lesson
export async function PUT(req: NextRequest) {
  const lessonId = req.nextUrl.searchParams.get('id');
  const { title, content } = await req.json();

  if (!lessonId || !title || !content)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const updatedLesson = await prisma.lesson.update({
      where: { id: Number(lessonId) },
      data: { title, content },
    });
    return NextResponse.json(updatedLesson);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lesson', details: err }, { status: 500 });
  }
}

// DELETE: Remove a lesson
export async function DELETE(req: NextRequest) {
  const lessonId = req.nextUrl.searchParams.get('id');

  if (!lessonId) return NextResponse.json({ error: 'Missing lesson ID' }, { status: 400 });

  try {
    await prisma.lesson.delete({ where: { id: Number(lessonId) } });
    return NextResponse.json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete lesson', details: err }, { status: 500 });
  }
}
