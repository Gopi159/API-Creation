const express = require("express");
const router = express.Router();
let Router = require("./route");

router.post("/addProduct", Router.post);
router.post("/updateProduct", Router.update);
router.get("/getProducts", Router.getAll);
router.get("/getProduct", Router.getById);

module.exports = router;
