const router = require("express").Router();
require("../db/db_connect");
const controleFinanceiro = require("./controle-financeiro");
const movement = require("./movement");

router.get("/", (req, res) => {
  res.json({
    sucess: false,
    message: "/api dedicada ao servidor",
  });
});

router.use("/controle-financeiro", controleFinanceiro);
router.use("/movement", movement);

module.exports = router;
