export const send = (res, response, data = {}) => {
  return res.send({
    code: response.code,
    message: response.message,
    data: data,
  });
};

export const setErrMsg = (response, param) => {
  return {
    code: response.code,
    message: `${param} ${response.message}`,
  };
};
