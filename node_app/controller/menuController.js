const { response } = require('express');
const axios = require('axios');

const menuController = async (req, res = response) => {
  try {
    const resp = await axios.get('http://django:8000/api/menu');
    res.json({
      ok: true,
      menu: resp.data,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  menuController,
};
