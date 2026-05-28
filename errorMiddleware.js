// Middleware para rotas não encontradas (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Rota '${req.originalUrl}' não encontrada.`,
  });
};

// Middleware global de tratamento de erros
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Erro interno do servidor.",
  });
};

module.exports = { notFound, errorHandler };
