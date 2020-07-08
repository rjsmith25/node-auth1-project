const express = require("express");
const { login, register, logout } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

module.exports = authRouter;
