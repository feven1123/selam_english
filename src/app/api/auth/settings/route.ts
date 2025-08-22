import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
  try {
    const { email, currentEmail, currentPassword, newPassword } = await req.json();

    if (!currentEmail || !currentPassword) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Find user by current email
    const user = await prisma.user.findUnique({ where: { email: currentEmail } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 });
    }

    const updateData: any = {};
    if (email) updateData.email = email;
    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to update settings' }, { status: 500 });
  }
}
