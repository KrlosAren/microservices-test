const redis = require('redis');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
    this.redisClient();
  }

  async redisClient() {
    this.client = redis.createClient({
      url: 'redis://redis:6379/0',
    });
    this.client.on('error', (err) => console.log('redis client error', err));
    this.client.on('connect', () => console.log('redis client connected'));
    await this.client.connect();
    this.configureSubcriber();
  }

  async configureSubcriber() {
    this.sub = this.client.duplicate();
    await this.sub.connect();

    await this.sub.subscribe('menu', (message) => {
      console.log('subscriber message', message);
      this.io.emit('all-menus', message);
    });
    await this.sub.subscribe('update_menu', (message) => {
      console.log('subscriber message', message);
      this.io.emit('update-menu', message);
    });

    await this.sub.subscribe('delete_menu', (message) => {
      console.log('subscriber message', message);
      this.io.emit('delete-menu', message);
    });
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('client', (data) => {
        console.log(data);
        this.io.emit('server', data);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}

module.exports = Sockets;
