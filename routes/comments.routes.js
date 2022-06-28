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


module.exports = router;