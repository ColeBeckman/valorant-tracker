const vapi = require("unofficial-valorant-api");
const VAPI = new vapi();

export default async function handler(req, res) {
  const { name, tag } = req.query;

  const { data: matchHistory } = await VAPI.getMatches({
    region:'na',
    name,
    tag,
    filter: "competitive",
    size: 5,
  });

  const response = matchHistory;

  res.json(response);
}
