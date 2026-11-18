// Crea un error con código HTTP para que el error-handler lo responda tal cual
function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = httpError;
