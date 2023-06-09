const express = require("express");
const router = express.Router();
const Model = require("../models/model");
const Player = require("../models/player");
const Game = require("../models/game");

const generatePIN = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

router.post("/game", async (req, res) => {
  let gamePIN = generatePIN(1000000, 9999999);

  let gameExists = await Game.exists({ gamePIN: gamePIN });

  while (gameExists) {
    gamePIN = generatePIN(1000000, 9999999);
    gameExists = await Game.exists({ gamePIN: gamePIN });
  }

  const data = new Game({
    gradeLevel: req.body.gradeLevel,
    playerCount: req.body.playerCount,
    gamePIN: gamePIN,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/game/:gamePIN", async (req, res) => {
  try {
    const data = await Game.find({ gamePIN: req.params.gamePIN });

    if (data.length === 0) {
      res.status(400).json({ message: "Game PIN entered does not exist!" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
