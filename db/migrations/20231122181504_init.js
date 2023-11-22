/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("peak_rank");
    table.string("profile_image");
    table.string("name");
    table.string("tag");
    table.string("level");
    table.string("rank");
    table.string("region");
    table.string("total_act_matches");
    table.string("version");
    table.string("total_act_wins");
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
