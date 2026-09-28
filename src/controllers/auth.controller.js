import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export async function register(req, res) {
  const { nome, email, password } = req.body ?? {};

  if (!nome || !email || !password) {
    return res.status(400).json({ erro: "nome, email e password são obrigatórios" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ erro: "A senha deve ter pelo menos 6 caracteres" });
  }

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    return res.status(409).json({ erro: "E-mail já cadastrado" });
  }

  const hash = await bcrypt.hash(password, 10); // 10 = custo
  const user = await prisma.user.create({
    data: { nome, email, password: hash }, // role nasce USER (default do schema)
  });

  return res.status(201).json(user); // sem senha graças ao omit
}

export async function login(req, res) {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ erro: "email e password são obrigatórios" });
  }

  // omit: { password: false } traz a senha só aqui, para comparar
  const user = await prisma.user.findUnique({
    where: { email },
    omit: { password: false },
  });

  const senhaOk = user && (await bcrypt.compare(password, user.password));
  if (!senhaOk) {
    // mesma mensagem para e-mail inexistente e senha errada
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET, {
    subject: String(user.id),
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const { password: _, ...userSemSenha } = user;
  return res.status(200).json({ token, user: userSemSenha });
}