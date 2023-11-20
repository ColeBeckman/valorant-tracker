const vapi = require("unofficial-valorant-api");
const VAPI = new vapi();

export default async function handler(req, res) {
  const { name, tag } = req.query;
  const { data: accountInfo } = await VAPI.getAccount({
    name: name,
    tag: tag,
  });
  const region = accountInfo.region;

  const { data: accountMMR } = await VAPI.getMMR({
    version: "v2",
    region,
    name,
    tag,
  });

  const response = { accountInfo, accountMMR };

  res.json(response);
}
