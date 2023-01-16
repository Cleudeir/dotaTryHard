/* eslint-disable camelcase */

export default async function Player(req, res) {
  const { id } = req.query;
  const request = await fetch(`${process.env.backUrl}/player?account_id=${id}`);
  const json = await request.json();
  console.log(json);
  res.status(200).json(json);
}
