import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import tarefaRoutes from "./routes/tarefa.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ mensagem: "API de Tarefas no ar" }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tarefas", tarefaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));