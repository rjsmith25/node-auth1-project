const express = require("express");
const sessions = require("client-sessions");
const api = require("./api");

const sessionConfig = {
  cookieName: "session",
  secret: "blargadeeblargblarg",
  duration: 30 * 60 * 1000,
  cookie: {
    httpOnly: true,
    secure: false
  }
};

const app = express();

// set up port to listen on
const port = process.env.PORT || 5000;

// Parse incoming post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up sessions
app.use(sessions(sessionConfig));

// setup ap routes
app.use("/api", api);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
