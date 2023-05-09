const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("this is the search endpoint");
});

module.exports = router;
