//todo 3 cek apakah projek dijalankan dalam mode production atau tidak
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//todo 1
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
//require form other file
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//todo connect to mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

//use the other file
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);