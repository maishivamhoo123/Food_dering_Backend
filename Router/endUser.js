const express = require("express")
const  {HandelUserSignup, HandelUserLogin} = require("../Controller/EndUser");
const route = express.Router();

route.post("/userSignUP" , HandelUserSignup);
route.post("/userSignIn" ,HandelUserLogin);

module.exports = route;