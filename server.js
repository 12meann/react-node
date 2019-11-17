if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect to DB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Mongo DB"));
db.on("error", err => console.log(err));

app.use(express.json());

app.use("/todos", require("./api/todos"));

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log(`listening at ${PORT}`));
