// temp-hash-admin.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminPassword = '123';
const adminEmail = 'admin@gmail.com';
const adminName = 'Admin';

async function createAdmin() {
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin', // important
    },
  });

  console.log('Admin created:', admin);
  prisma.$disconnect();
}

createAdmin();
