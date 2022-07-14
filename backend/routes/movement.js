const router = require("express").Router();
const Movement = require("../models/Movement");

router.post("/", async (req, res) => {
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
      mensage: err,
    });
  }
});

router.get("/", async (req, res) => {
  const movement = await Movement.find();
  try {
    res.json({
      sucess: true,
      data: movement,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

router.get("/balance", async (req, res) => {
  const movement = await Movement.find();
  const entries = movement
    .filter((m) => m.type === "E")
    .reduce((sum, m) => sum + m.value, 0);
  const exits = movement
    .filter((m) => m.type === "S")
    .reduce((sum, m) => sum + m.value, 0);

  const total = entries - exits;
  try {
    res.json({
      sucess: true,
      data: total,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
