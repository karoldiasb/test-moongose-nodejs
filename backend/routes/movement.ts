import { Request, Response, Router } from "express";
import { iRequestQuery } from "../types";
import Movement from "../models/Movement";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { title, value, type } = req.body;
  const movement = new Movement({
    title: title,
    value: value,
    type: type,
  });
  try {
    const result = await movement.save();
    res.json({
      sucess: true,
      data: result,
    });
  } catch (err) {
    res.json({
      sucess: false,
      error: err,
    });
  }
});

router.get("/", async (req: iRequestQuery, res: Response) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;

  const movement = await Movement.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Movement.countDocuments();

  try {
    res.json({
      sucess: true,
      data: movement,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.json({
      sucess: false,
      error: err,
    });
  }
});

router.get("/balance", async (req: Request, res: Response) => {
  const sumEntries = await Movement.aggregate([
    { $match: { type: "S" } },
    { $group: { _id: null, sum: { $sum: "$value" } } },
  ]);

  const sumExits = await Movement.aggregate([
    { $match: { type: "E" } },
    { $group: { _id: null, sum: { $sum: "$value" } } },
  ]);

  const total = sumEntries[0].sum - sumExits[0].sum;

  try {
    res.json({
      sucess: true,
      balance: total,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const { title, value, type } = req.body;

  try {
    const update = await Movement.findByIdAndUpdate(_id, {
      title: title,
      value: value,
      type: type,
    });

    res.json({
      sucess: true,
      updated: update,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  try {
    const deleted = await Movement.deleteOne({ _id });

    res.json({
      sucess: true,
      delete: deleted,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

module.exports = router;
