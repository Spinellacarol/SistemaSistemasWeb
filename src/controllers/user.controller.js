import { prisma } from "../lib/prisma.js";

export async function listarUsers(req, res) {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
}

export async function alterarRole(req, res) {
  const id = Number(req.params.id);
  const { role } = req.body ?? {};

  if (!["USER", "ADMIN"].includes(role)) {
    return res.status(400).json({ erro: "role deve ser USER ou ADMIN" });
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  const atualizado = await prisma.user.update({ where: { id }, data: { role } });
  return res.status(200).json(atualizado);
}