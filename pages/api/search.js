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

  if (exsistingUser) {
    return res.json(exsistingUser);
  }

  const { data: accountInfo } = await VAPI.getAccount({
    name: name,
    tag: tag,
  });
  if (!accountInfo) {
    res.status(404).end();
    return;
  }
  const region = accountInfo.region;

  const { data: accountMMR } = await VAPI.getMMR({
    version: "v2",
    region,
    name,
    tag,
  });

  const { account_level, card } = accountInfo;
  const { by_season, highest_rank } = accountMMR;
  const seasonsArray = Object.values(by_season);
  const latestSeason = seasonsArray[seasonsArray.length - 1];
  const currentRank = latestSeason.final_rank_patched;
  const defaultProfilePicture = card?.small
    ? card.small
    : "/images/default-avatar.png";

  const newUserObject = {
    peak_rank: highest_rank?.patched_tier,
    profile_image: defaultProfilePicture,
    name: name.toLowerCase(),
    tag: tag.toLowerCase(),
    level: account_level,
    rank: currentRank,
    region: region,
    version: "v2",
    total_act_matches: latestSeason?.number_of_games,
    total_act_wins: latestSeason?.wins,
  };
  await knex("users").insert(newUserObject);
  res.json(newUserObject);
}
