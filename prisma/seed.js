import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

const SENHA = "123456";

await prisma.user.upsert({
  where: { email: "admin@tarefas.com" },
  update: {},
  create: {
    nome: "Admin",
    email: "admin@tarefas.com",
    password: await bcrypt.hash(SENHA, 10),
    role: "ADMIN",
  },
});
const ana = await prisma.user.upsert({
  where: { email: "ana@tarefas.com" },
  update: {},
  create: {
    nome: "Ana",
    email: "ana@tarefas.com",
    password: await bcrypt.hash(SENHA, 10),
  },
});
const bruno = await prisma.user.upsert({
  where: { email: "bruno@tarefas.com" },
  update: {},
  create: {
    nome: "Bruno",
    email: "bruno@tarefas.com",
    password: await bcrypt.hash(SENHA, 10),
  },
});

await prisma.tarefa.deleteMany(); // evita duplicar se rodar o seed duas vezes
await prisma.tarefa.createMany({
  data: [
    { titulo: "Estudar JWT", userId: ana.id },
    { titulo: "Fazer o README", userId: ana.id },
    { titulo: "Revisar a pesquisa", userId: bruno.id },
  ],
});

console.log("Seed concluído");
await prisma.$disconnect();
