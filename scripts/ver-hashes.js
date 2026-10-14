import { prisma } from "../src/lib/prisma.js";

// omit: { password: false } mostra a senha (hash) só neste script
const users = await prisma.user.findMany({
  omit: { password: false },
  select: undefined,
});

console.table(
  users.map((u) => ({ id: u.id, email: u.email, role: u.role, hash: u.password }))
);

await prisma.$disconnect();
