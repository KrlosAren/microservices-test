class RequestDjangoServer {
  constructor(url) {
    this.url = url;
    this.axios = require('axios');
  }

  async getApi(enpoint) {
    try {
      const resp = await this.axios.get('http://django:8000/api/menu/');
      console.log(resp.data);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = {
  RequestDjangoServer,
};
