const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Comment = require("../models/Comment.model");
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
    res.status(201).json({ message: "New decision created", id: decision.id });
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

router.get("/decisions",  async (req, res, next) => {
  try {
    //filter for only public decisions later
    const decisions = await Decision.find();
    res.status(200).json( {message: "Found decisions", decisions})
  } catch (error) {
  console.log(error)
  res.status(500).json(error);
}})

router.get("/decisions/:id",  async (req, res, next) => {
  const { id } = req.params;
  try {
    const decision = await Decision.findById(id);
    const commentsOnDecision = await Comment.find({decision: id}).populate("author","username")
    console.log("fetching comments")
    console.log(commentsOnDecision)
    res.status(200).json({ message: "Found decision", decision, commentsOnDecision });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/decisions/user/:userId", isAuthenticated,  async (req, res, next) => {
    const { userId } = req.params;
    try {
        const decisionArray = await Decision.find({author: userId})
        res.status(200).json({ message: "Found user decisions", decisionArray });

    } catch (error) {
        
    }
})

router.put("/decisions/:id",  async (req, res, next) => {
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

router.delete("/decisions/:id",  async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params)
  await Decision.findByIdAndDelete(id);
  const listComments = await Comment.find({decision: id})
  listComments.forEach(async(comment)=>{
    await Comment.findByIdAndDelete(comment._id)
  })
  console.log(listComments)
  

  res.status(200).json({ message: "Decision deleted" });
});

module.exports = router;
