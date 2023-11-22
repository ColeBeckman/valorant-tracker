/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("matches", function (table) {
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.increments();
    table.string("map");
    table.string("outcome");
    table.string("kda");
    table.string("score");
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("matches");
};
