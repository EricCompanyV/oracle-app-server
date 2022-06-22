const User = require("../models/User.model");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log("--->username:", username, "--->password:", password)

  const newUser = { username };

  const randomSalt = bcryptjs.genSaltSync(10);

  const hashedPassword = bcryptjs.hashSync(password, randomSalt);

  newUser.hashedPassword = hashedPassword;
  try {
    await User.create(newUser);
    res.status(201).json({ message: "New user created", status: "OK" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res
        .status(403)
        .json({ message: "Username already in use", status: "KO" });
    } else {
      res.status(500).json({ message: error, status: "KO" });
    }
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user === null) {
    res.status(404).json({ message: "Username not found", status: "KO" });
  } else {
    const { hashedPassword, createdAt, updatedAt } = user;
    if (bcryptjs.compareSync(password, hashedPassword)) {
      const tempUser = { username, createdAt, updatedAt };
      delete tempUser.hashedPassword;
      const token = jwt.sign(tempUser, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      res.json({ token });
    } else {
      res.status(403).json({ message: "Wrong password", status: "KO" });
    }
  }
});

module.exports = router;
