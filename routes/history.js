const router = require("express").Router();
const api = require("./api");

router.get("/", async (req, res) => {
  const test = await api.searchArtist("Kendrick Lamar");
  res.json(test);
  console.log(test);
});

module.exports = router;
