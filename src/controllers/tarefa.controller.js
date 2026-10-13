import { prisma } from "../lib/prisma.js";

const STATUS_VALIDOS = ["PENDENTE", "CONCLUIDA"];

export async function listar(req, res) {
  const where = req.usuario.role === "ADMIN" ? {} : { userId: req.usuario.id };
  const tarefas = await prisma.tarefa.findMany({ where });
  return res.status(200).json(tarefas);
}

export async function criar(req, res) {
  const { titulo } = req.body ?? {};
  if (!titulo) {
    return res.status(400).json({ erro: "titulo é obrigatório" });
  }
  // o dono vem do token (req.usuario.id), nunca do body
  const tarefa = await prisma.tarefa.create({
    data: { titulo, userId: req.usuario.id },
  });
  return res.status(201).json(tarefa);
}

// busca a tarefa e aplica a regra do dono; devolve null se já respondeu
async function buscarComPermissao(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
    return null;
  }
  const tarefa = await prisma.tarefa.findUnique({ where: { id } });
  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" }); // 404 antes do 403
    return null;
  }
  const ehDono = tarefa.userId === req.usuario.id;
  const ehAdmin = req.usuario.role === "ADMIN";
  if (!ehDono && !ehAdmin) {
    res.status(403).json({ erro: "Você não pode alterar esta tarefa" });
    return null;
  }
  return tarefa;
}

export async function atualizar(req, res) {
  const tarefa = await buscarComPermissao(req, res);
  if (!tarefa) return;

  const { titulo, status } = req.body ?? {};
  if (status !== undefined && !STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: "status inválido" });
  }
  const atualizada = await prisma.tarefa.update({
    where: { id: tarefa.id },
    data: { titulo, status },
  });
  return res.status(200).json(atualizada);
}

export async function remover(req, res) {
  const tarefa = await buscarComPermissao(req, res);
  if (!tarefa) return;

  await prisma.tarefa.delete({ where: { id: tarefa.id } });
  return res.status(204).send();
}