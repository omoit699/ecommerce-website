export const validateRequest = (req, res, next) => {
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Empty request body" });
  }

  next();
};