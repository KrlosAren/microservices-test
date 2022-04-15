const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { PostgrestConnect } = require('../database');
const { RequestDjangoServer } = require('./requestDjango');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pg = new PostgrestConnect();
    this.django = new RequestDjangoServer('http://django:8000/api');
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);

    this.getDjangoMenus();
    // this.getMenus();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    this.app.use(express.json());

    this.app.use('/api', require('../routes/api'));
    this.app.use('/api/menu', require('../routes/menu'));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  async getMenus() {
    this.pg.getMenus().then((res) => {
      console.log(res);
    });
  }

  async getDjangoMenus() {
    this.django.getApi('menu').then((res) => {
      console.log(res);
    });
  }

  execute() {
    this.middleware();
    this.configureSockets();
    this.server.listen(this.port, () => {
      console.log(`server is running in ${this.port}`);
    });
  }
}

module.exports = Server;
