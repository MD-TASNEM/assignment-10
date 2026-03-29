const getErrorResponse = (error, fallbackStatusCode = 500) => {
  if (error?.code === 11000) {
    return {
      statusCode: 400,
      message: "Duplicate field value entered",
    };
  }

  return {
    statusCode: error?.statusCode || fallbackStatusCode,
    message: error?.message || "Server error",
  };
};

module.exports = { getErrorResponse };
