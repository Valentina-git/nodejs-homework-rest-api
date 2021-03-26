const express = require("express");
const logger = require("morgan");
const cors = require("cors");

///////////////////////////////////////////////////

// const { MongoClient } = require("mongodb");
// const dotenv = require("dotenv");
// dotenv.config();
// const dbURI = process.env.DB_HOST;

// async function run() {
// 	const client = await new MongoClient(dbURI, {
// 		useUnifiedTopology: true,
// 	}).connect();
// 	const resultCollection = await client
// 		.db("db-contacts")
// 		.collection("contacts")
// 		.find()
// 		.toArray();
// }
// run();

///////////////////////////////////////////

const contactsRouter = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

module.exports = app;
