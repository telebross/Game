const express = require("express");
const app = express();
const port = 3000;
const port = 3001;

app.use("/", express.static(__dirname));
app.listen(port, () => console.log(`Server listening on port ${port}!`));