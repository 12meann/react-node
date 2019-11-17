if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//connect to DB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Mongo DB"));
db.on("error", err => console.log(err));

//form handling
app.use(express.json());

//routes
app.use("/todos", require("./api/todos"));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening at ${PORT}`));
