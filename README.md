
```markdown
# Task Manager Backend

API REST completa para gerenciamento de tarefas, desenvolvida com **Node.js**, **Express**, **MongoDB** e **JWT** para autenticação.

## 🚀 Tecnologias
- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Joi (validação)
- Bcrypt (hash de senhas)

## Instalação

Clone o repositório:
```bash
git clone https://github.com/Leandrosilva20/task-manager-backend.git
```

Entre na pasta do projeto:
```bash
cd task-manager-backend
```

Instale as dependências:
```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=seu_segredo_aqui
```

## Executando

Inicie o servidor:
```bash
npm start
```

Modo desenvolvimento (com nodemon):
```bash
npm run dev
```

Se tudo estiver certo, você verá:
```
Server running on port 3000
Connected to MongoDB
```

## Rotas principais

### Autenticação
- `POST /signup` → Criar usuário
- `POST /login` → Login e geração de token JWT

### Tarefas
- `GET /tasks` → Listar todas as tarefas
- `POST /tasks` → Criar nova tarefa
- `GET /tasks/:id` → Buscar tarefa por ID
- `PUT /tasks/:id` → Atualizar tarefa
- `DELETE /tasks/:id` → Deletar tarefa

## Testes

Rodar testes com Jest:
```bash
npm test
```

---

## Autor
**Leandro Bragança da Silva**


