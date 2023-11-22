const Knex = require("knex");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "valorant-tracker-db",
      user: "postgres",
      password: "password",
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
