const express = require("express");
const router = express.Router();

const {
  listTasks,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} = require("../controllers/taskController");

// GET /tasks — Lista todas as tarefas
router.get("/", listTasks);

// POST /tasks — Cria uma nova tarefa
router.post("/", createTaskHandler);

// PUT /tasks/:id — Atualiza uma tarefa pelo ID
router.put("/:id", updateTaskHandler);

// DELETE /tasks/:id — Remove uma tarefa pelo ID
router.delete("/:id", deleteTaskHandler);

module.exports = router;
