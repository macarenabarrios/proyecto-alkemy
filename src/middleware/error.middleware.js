export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Something went wrong. Please try again.',
      status,
      path: req.path 
    }
  });
}