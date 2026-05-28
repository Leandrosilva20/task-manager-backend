# Task Manager Backend

API REST para gerenciamento de tarefas, desenvolvida com **Node.js** e **Express**. As tarefas são armazenadas em memória (array), sem necessidade de banco de dados.

---

## Tecnologias

- Node.js
- Express

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Leandrosilva20/task-manager-backend.git
cd task-manager-backend
```

Instale as dependências:

```bash
npm install
```

---

## Executando

Modo produção:

```bash
npm start
```

Modo desenvolvimento (com nodemon):

```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

---

## Estrutura do Projeto

```
task-manager/
├── server.js               # Ponto de entrada da aplicação
├── app.js                  # Configuração do Express
├── package.json
├── README.md
└── src/
    ├── data/
    │   └── taskStore.js    # Armazenamento em memória (array)
    ├── controllers/
    │   └── taskController.js  # Lógica das operações CRUD
    ├── routes/
    │   └── taskRoutes.js   # Definição das rotas
    └── middleware/
        └── errorMiddleware.js # Tratamento de erros
```

---

## Estrutura de uma Tarefa

Cada tarefa possui os seguintes campos:

| Campo       | Tipo   | Descrição                                      |
|-------------|--------|------------------------------------------------|
| `id`        | Number | Identificador único, gerado automaticamente    |
| `title`     | String | Título da tarefa (obrigatório)                 |
| `status`    | String | Status atual da tarefa (padrão: `"pendente"`)  |
| `createdAt` | String | Data de criação (ISO 8601)                     |
| `updatedAt` | String | Data da última atualização (ISO 8601)          |

**Valores aceitos para `status`:** `pendente`, `em andamento`, `concluída`

---

## Rotas da API

### `GET /tasks`
Lista todas as tarefas.

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    { "id": 1, "title": "Estudar Node.js", "status": "pendente", "createdAt": "...", "updatedAt": "..." },
    { "id": 2, "title": "Fazer exercícios", "status": "concluída", "createdAt": "...", "updatedAt": "..." }
  ]
}
```

---

### `POST /tasks`
Cria uma nova tarefa.

**Body (JSON):**
```json
{
  "title": "Estudar Express",
  "status": "pendente"
}
```

> O campo `status` é opcional. Se não informado, o padrão é `"pendente"`.

**Resposta de sucesso (201):**
```json
{
  "success": true,
  "data": { "id": 3, "title": "Estudar Express", "status": "pendente", "createdAt": "...", "updatedAt": "..." }
}
```

**Erros possíveis:**
- `400` — `title` não informado ou inválido
- `400` — `status` com valor inválido

---

### `PUT /tasks/:id`
Atualiza o `title` e/ou `status` de uma tarefa existente.

**Parâmetro de rota:** `id` (número inteiro)

**Body (JSON):**
```json
{
  "status": "em andamento"
}
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "data": { "id": 3, "title": "Estudar Express", "status": "em andamento", "createdAt": "...", "updatedAt": "..." }
}
```

**Erros possíveis:**
- `400` — ID inválido
- `400` — Nenhum campo informado para atualizar
- `400` — `status` com valor inválido
- `404` — Tarefa não encontrada

---

### `DELETE /tasks/:id`
Remove uma tarefa pelo ID.

**Parâmetro de rota:** `id` (número inteiro)

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Tarefa 3 removida com sucesso."
}
```

**Erros possíveis:**
- `400` — ID inválido
- `404` — Tarefa não encontrada

---

## Testando com cURL

```bash
# Listar tarefas
curl http://localhost:3000/tasks

# Criar tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Node.js"}'

# Atualizar tarefa
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "concluída"}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/tasks/1
```

---

## Autor

**Leandro Bragança da Silva**
