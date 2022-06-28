const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Comment = require("../models/Comment.model");
const Decision = require("../models/Decision.model");

const router = require("express").Router();

router.post("/comments/create", isAuthenticated, async (req, res, next) => {
    try {
        const userId = req.payload._id
        const { comment, decisionId } = req.body
        console.log(userId, req.body)
        const newComment = await Comment.create({
            content: comment,
            decision: decisionId,
            author: userId
        })
        res.status(201).json({ message: "New comment created" });
    } catch (error) {
        
    }
})

router.delete("/comments/:id",  async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params)
    await Comment.findByIdAndDelete(id);
    
  
    res.status(200).json({ message: "Comment deleted" });
  });

module.exports = router;