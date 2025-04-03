function errorHanlder(err, req, res, next) {
  const errMessage = err.messgae || "internal server error";
  const errStatus = err.status || 500;

  res.status(errStatus).json({ success: false, errMessage });
}

export default errorHanlder;
