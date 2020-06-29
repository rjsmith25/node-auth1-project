const { insert, findBy } = require("../user/user.model");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password is required" });
  }

  try {
    password = await bcrypt.hash(password, 12);
    let user = await insert({ username, password });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: "Unable to register new user" });
  }
}

async function login(req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password is required" });
  }
  try {
    let user = await findBy({ username }).first();

    if (!user) {
      return res.status(400).json({ message: "You shall not pass!" });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return res.status(400).json({ message: "You shall not pass!" });
    }

    req.session.user = user;
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "You shall not pass!" });
  }
}

function logout(req, res) {
  if (req.session) {
    req.session.reset();
    res.send("Logged Out");
  } else {
    res.end();
  }
}

module.exports = { register, login, logout };
