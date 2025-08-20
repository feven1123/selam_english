import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure you have prisma client setup

export async function GET() {
  try {
    const totalCourses = await prisma.course.count();
    const totalBooks = await prisma.book.count();
    const registeredUsers = await prisma.user.count();

    return NextResponse.json({
      totalCourses,
      totalBooks,
      registeredUsers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
