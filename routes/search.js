const router = require("express").Router();
const api = require("./api");
const database = require("../db");

router.get("/:searchTerm", async (req, res) => {
  const search = req.params.searchTerm.replace("-", " ");
  const data = await api.searchArtist(search);
  res.json(data);
  database.save("Results", data);
});

module.exports = router;
