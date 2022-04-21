const express = require("express");

const app = express();

app.get("/users/:userId", (req, res) => {
  res.json({
    id: req.params.userId,
    name: "Leo",
    age: 21,
  });
});

app.listen(5000, () => console.log("API ready port:5000..."));
