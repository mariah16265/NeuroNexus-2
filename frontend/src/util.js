export const getError = (error) => {
  //check if error. response and error.data.messsage exists, then return it
  //i.e, in server.js    res.status(404).send({ message: 'Product Not Found' });

  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
