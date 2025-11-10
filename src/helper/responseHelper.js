export const send = (res, response, data = {}, pageData = {}) => {
  return res.send({
    code: response.code,
    message: response.message,
    pageData: pageData,
    data: data,
  });
};

export const setErrMsg = (response, param) => {
  return {
    code: response.code,
    message: `${param} ${response.message}`,
  };
};
