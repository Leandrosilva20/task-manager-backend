const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");
const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");

const app = express();

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Rota raiz — só para confirmar que o servidor está de pé
app.get("/", (req, res) => {
  res.json({ message: "API de Gerenciamento de Tarefas funcionando!" });
});

// Rotas de tarefas
app.use("/tasks", taskRoutes);

// Middlewares de erro (devem ficar por último)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
