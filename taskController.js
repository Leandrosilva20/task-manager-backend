const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../data/taskStore");

const VALID_STATUSES = ["pendente", "em andamento", "concluída"];

// GET /tasks — Lista todas as tarefas
const listTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

// POST /tasks — Cria uma nova tarefa
const createTaskHandler = async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "O campo 'title' é obrigatório." });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status inválido. Os valores aceitos são: ${VALID_STATUSES.join(", ")}.`,
      });
    }

    const task = await createTask(title, status);
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

// PUT /tasks/:id — Atualiza uma tarefa existente
const updateTaskHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID inválido." });
    }

    const { title, status } = req.body;

    if (!title && !status) {
      return res.status(400).json({
        success: false,
        message: "Informe ao menos 'title' ou 'status' para atualizar.",
      });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status inválido. Os valores aceitos são: ${VALID_STATUSES.join(", ")}.`,
      });
    }

    const existing = await getTaskById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: `Tarefa com ID ${id} não encontrada.` });
    }

    const updated = await updateTask(id, { title, status });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

// DELETE /tasks/:id — Remove uma tarefa
const deleteTaskHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID inválido." });
    }

    const deleted = await deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: `Tarefa com ID ${id} não encontrada.` });
    }

    return res.status(200).json({ success: true, message: `Tarefa ${id} removida com sucesso.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

module.exports = { listTasks, createTaskHandler, updateTaskHandler, deleteTaskHandler };
