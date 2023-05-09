const router = require("express").Router();


router.get("/", (req, res) => {
  console.log("this is the history endpoint");
});

module.exports = router;
