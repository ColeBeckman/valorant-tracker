const Knex = require("knex");
const envpath =
  process.env.NODE_ENV === "development" ? ".env.local" : ".env.production";
require("dotenv").config({ path: `../${envpath}` });

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      ssl: true,
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
