const knex = require("../../db/db");
const vapi = require("unofficial-valorant-api");
const VAPI = new vapi();

export default async function handler(req, res) {
  const { name, tag } = req.query;
  const exsistingUser = await knex
    .select("*")
    .where({
      name: name.toLowerCase(),
      tag: tag.toLowerCase(),
    })
    .from("users")
    .first();

  // if (exsistingUser) {
  //   return res.json(exsistingUser);
  // }
  await knex("matches").join("users", "users.id", "=", "matches.user_id");
  
  const { data: matchHistory } = await VAPI.getMatches({
    region: "na",
    name,
    tag,
    filter: "competitive",
    size: 5,
  });

  const response = matchHistory;
  const matchesObject = {};
  await knex("matches").insert(matchesObject);
  res.json(response);
}
