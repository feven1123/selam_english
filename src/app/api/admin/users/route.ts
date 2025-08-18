import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch only users with role 'user'
    const users = await prisma.user.findMany({
      where: { role: 'user' }, // <--- filter admins out
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        coursesEnrolled: true, // for counting courses
      },
    });

    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
      coursesCount: u.coursesEnrolled.length,
    }));

    return NextResponse.json(formattedUsers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}
