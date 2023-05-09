const router = require("express").Router();
const api = require("./api");

router.get("/:searchTerm", async (req, res) => {
  console.log("this is the search endpoint");
  const search = req.params.searchTerm.replace("-", " ");
  const test = await api.searchArtist(search);
  res.json(test);
  //  console.log(test);
});

module.exports = router;
