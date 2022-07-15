const router = require("express").Router();

require("../db/db_connect");
import { Request, Response } from "express";
import controleFinanceiro from "./controle-financeiro";
const movement = require("./movement");

router.get("/", (req: Request, res: Response) => {
  res.json({
    sucess: false,
    message: "/api dedicada ao servidor",
  });
});

router.use("/controle-financeiro", controleFinanceiro);
router.use("/movement", movement);

module.exports = router;
