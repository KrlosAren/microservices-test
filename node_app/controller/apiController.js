const { response } = require('express');

const indexController = async (req, res = response) => {
  res.json({
    ok: true,
    message: 'Welcome to mdddd API',
  });
};

module.exports = {
  indexController,
};
