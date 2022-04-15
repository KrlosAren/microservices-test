const { response } = require('express');
const axios = require('axios');

const menuControllerPost = async (req, res = response) => {
  console.log(req.body);
  res.json({
    ok: true,
    message: 'Menu created successfully',
  });
};

module.exports = {
  menuControllerPost,
};
