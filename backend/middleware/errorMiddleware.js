const notFound = (request, response, next) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  console.log(error);
  response.json(404);
  next(error);
};
const errorHandler = (err, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode);
  response.json({ message: err.message });
};

export { notFound, errorHandler };
