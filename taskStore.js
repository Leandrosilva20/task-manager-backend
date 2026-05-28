// ===========================================
// Armazenamento de tarefas em memória (array)
// ===========================================

let tasks = [];
let nextId = 1;

// Retorna todas as tarefas usando Promise
const getAllTasks = () => {
  return new Promise((resolve) => {
    resolve([...tasks]);
  });
};

// Busca tarefa por ID usando async/await
const getTaskById = async (id) => {
  const task = tasks.find((t) => t.id === id);
  return task ? { ...task } : null;
};

// Cria uma nova tarefa usando callback convertido para Promise
const createTask = (title, status = "pendente") => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (!title || typeof title !== "string" || title.trim() === "") {
        return reject(new Error("Título inválido"));
      }

      const newTask = {
        id: nextId++,
        title: title.trim(),
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      tasks.push(newTask);
      resolve({ ...newTask });
    });
  });
};

// Atualiza uma tarefa existente usando async/await
const updateTask = async (id, updates) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...(updates.title !== undefined && { title: updates.title.trim() }),
    ...(updates.status !== undefined && { status: updates.status }),
    updatedAt: new Date().toISOString(),
  };

  return { ...tasks[index] };
};

// Remove uma tarefa usando async/await
const deleteTask = async (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
