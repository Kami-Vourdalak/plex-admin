import express from "express";
import cors from "cors";
import { users } from "./routes/users.ts"
import "./config/db.config.ts"
import bodyParser from "body-parser"


// import timeout from "connect-timeout";

const app = express();

// const allowList = ["http://example1.com", "http://example2.com"];

// app.use(timeout("5s"));
app.use(cors())

app.use(bodyParser.json())


app.use(users)

app.get("/", (_, res) => {
  res.status(200).send("ok");
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.info(`App listening at port ${port}`)
);
server.setTimeout(11000);
