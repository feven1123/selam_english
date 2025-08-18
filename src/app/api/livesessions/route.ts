import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const session = await prisma.liveSession.findUnique({ where: { id: Number(id) } });
    return NextResponse.json(session);
  }
  const sessions = await prisma.liveSession.findMany({ orderBy: { scheduledAt: 'asc' } });
  return NextResponse.json(sessions);
}

export async function POST(req: NextRequest) {
  const { title, description, link, scheduledAt } = await req.json();
  const session = await prisma.liveSession.create({ data: { title, description, link, scheduledAt: new Date(scheduledAt) } });
  return NextResponse.json(session, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const { title, description, link, scheduledAt } = await req.json();
  const updated = await prisma.liveSession.update({
    where: { id: Number(id) },
    data: { title, description, link, scheduledAt: new Date(scheduledAt) },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  await prisma.liveSession.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Deleted successfully' });
}
