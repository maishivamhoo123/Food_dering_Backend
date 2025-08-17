const express = require("express");
const router = express.Router();
const Owner = require("../Schema/Owner");
const {handelOwnerRegister} = require("../Controller/Owner");
const { handelOwnerLogin , GetAllOwner} = require("../Controller/Owner");

router.post("/AddOwner", handelOwnerRegister);
router.post("/OwnerLogin" ,  handelOwnerLogin);
router.get("/getAllOwner" ,  GetAllOwner);

module.exports = router;
