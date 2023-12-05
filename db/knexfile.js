const Knex = require("knex");

require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      ssl: process.env.SSL === "true",
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
