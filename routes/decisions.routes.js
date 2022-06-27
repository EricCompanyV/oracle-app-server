const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Decision = require("../models/Decision.model");

const router = require("express").Router();

router.post("/decisions/create", isAuthenticated, async (req, res, next) => {
  try {
    const { name, description, options, criteria, result, isPublic } = req.body;
    const userId = req.payload._id;
    const decision = await Decision.create({
      name: name.trim(),
      description,
      options,
      criteria,
      result,
      isPublic,
      author: userId,
    });
    res.status(201).json({ message: "New beer created", id: decision.id });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/decisions/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const decision = await Decision.findById(id);
    res.status(100).json({ message: "Found decision", decision });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/decisions/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, description, options, criteria, result, isPublic } = req.body;
  const newDecision = {};
  if (name !== "") {
    newDecision.name = name;
  }
  if (description !== "") {
    newDecision.description = description;
  }
  if (options !== "") {
    newDecision.options = options;
  }
  if (criteria !== "") {
    newDecision.criteria = criteria;
  }
  if (result !== "") {
    newDecision.result = result;
  }
  if (isPublic !== "") {
    newDecision.isPublic = isPublic;
  }
  try {
    const decision = await Decision.findByIdAndUpdate(id, newDecision);

    res.status(200).json({ message: "Decision updated", id });
  } catch (error) {}
});

router.post;

module.exports = router;
