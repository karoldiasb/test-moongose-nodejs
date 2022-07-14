const router = require("express").Router();
const entityControle = require("../models/entityControle");

//CREATE
router.post("/", async (req, res) => {
  const controle = new entityControle({
    Titulo: req.body.Titulo,
    Entrada: req.body.Entrada,
    Saida: req.body.Saida,
    Caixa: req.body.Caixa,
    Descricao: req.body.Descricao,
  });
  try {
    const savedcontrole = await controle.save();
    res.json({
      sucess: true,
      data: savedcontrole,
    });
  } catch (err) {
    res.json({
      sucess: false,
      mensage: err,
    });
  }
});

//READ
router.get("/", async (req, res) => {
  const getcontrole = await entityControle.find();
  try {
    res.json({
      sucess: true,
      data: getcontrole,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const controle = await entityControle.findOne({
      slug: req.params.slug,
    });
    res.json({
      sucess: true,
      data: controle,
    });
  } catch (err) {
    res.json({
      sucess: false,
      mensage: err,
    });
  }
});

//UPDATE

router.patch("/:slug", async (req, res) => {
  console.log(req);
  try {
    const UpdatedControle = await entityControle.updateOne(
      {
        slug: req.params.slug,
      },
      {
        Titulo: req.body.Titulo,
        Entrada: req.body.Entrada,
        Saida: req.body.Saida,
        Caixa: req.body.Caixa,
        Descricao: req.body.Descricao,
      }
    );

    res.json({
      sucess: true,
      updated: UpdatedControle.modifiedCount,
    });
  } catch (err) {
    res.json({
      sucess: false,
      menssage: err,
    });
  }
});

//DELETE

router.delete("/:slug", async (req, res) => {
  try {
    const DeletedControle = await entityControle.deleteOne({
      slug: req.params.slug,
    });
    res.json({
      sucess: true,
      data: DeletedControle,
    });
  } catch (err) {
    res.json({
      sucess: false,
      mensage: err,
    });
  }
});

module.exports = router;
