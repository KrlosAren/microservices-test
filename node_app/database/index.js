const { Client } = require('pg');
require('dotenv').config();

class PostgrestConnect {
  constructor() {
    this.connectPG();
  }

  connectPG() {
    this.client = new Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });
    this.client.connect((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Connected to PostgreSQL');
      }
    });
  }

  async getMenus() {
    this.client.query('SELECT * FROM menu_menu', (error, res) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log(res.rows);
        return res.rows;
      }
    });
  }
}

module.exports = {
  PostgrestConnect,
};
