const express = require("express");
const database = require("./db");

const app = express();
const port = 8888;

//require in search endpoint
const search = require("./routes/search.js");
app.use("/search", search);

//require in history endpoint
const history = require("./routes/history.js");
app.use("/history", history);

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await database.connect();
});
