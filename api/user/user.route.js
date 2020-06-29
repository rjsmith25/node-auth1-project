const express = require("express");
const { getAllUsers } = require("./user.controller");
const { isLogin } = require("../auth/auth.middleware");

const userRouter = express.Router();

userRouter.get("/", isLogin, getAllUsers);

module.exports = userRouter;
