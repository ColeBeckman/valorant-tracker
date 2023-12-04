const knex = require("../../db/db");
const vapi = require("unofficial-valorant-api");
const VAPI = new vapi();

export default async function handler(req, res) {
  const { name, tag } = req.query;
  const existingUser = await knex
    .select("*")
    .where({
      name: name.toLowerCase(),
      tag: tag.toLowerCase(),
    })
    .from("users")
    .first();

  const existingUserMatches = await knex("matches").where({
    user_id: existingUser.id,
  });

  if (existingUserMatches.length) {
    return res.json(existingUserMatches);
  }

  const { data: matchHistory } = await VAPI.getMatches({
    region: "na",
    name,
    tag,
    filter: "competitive",
    size: 5,
  });

  const recentMatches = matchHistory.map((match) => {
    const myPlayer = match.players.all_players.find((player) => {
      const matchAccount =
        player.name.toLowerCase() === name.toLowerCase() &&
        player.tag.toLowerCase() === tag.toLowerCase();
      return matchAccount;
    });
    const { assists, deaths, kills, score } = myPlayer.stats;
    const { map } = match.metadata;
    const winningTeam = match.teams.blue.has_won ? "Blue" : "Red";
    const isWin = winningTeam === myPlayer.team;
    const kda = `${kills}/${deaths}/${assists}`;

    return {
      user_id: existingUser.id,
      map: map,
      is_win: isWin,
      kda: kda,
      score: score,
    };
  });
  if (recentMatches.length) {
    await knex("matches").insert(recentMatches);
    return res.json(recentMatches);
  }
  res.json([]);
}
