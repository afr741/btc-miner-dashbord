const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const BITCOIN_PRICE_URL = "https://blockchain.info/q/24hrprice";
const MINING_DIFFICULTY_URL = "https://blockchain.info/q/getdifficulty";
const secretKey = "bitcoinftw";

// in memory cache to store btc price and mining difficulty
const cache = new NodeCache();

//ENDPOINTS FOR MINING STATS
app.get("/stats", async (req, res) => {
  try {
    let bitcoinPrice;
    let miningDifficulty;

    // check if price and miningDifficulty are available in cache
    if (cache.has("bitcoinPrice") && cache.has("miningDifficulty")) {
      bitcoinPrice = cache.get("bitcoinPrice");
      miningDifficulty = cache.get("miningDifficulty");
    } else {
      // Fetch Bitcoin price and mining difficulty concurrently if nothing in cache
      const [priceResponse, difficultyResponse] = await Promise.all([
        axios.get(BITCOIN_PRICE_URL),
        axios.get(MINING_DIFFICULTY_URL),
      ]);
      bitcoinPrice = priceResponse.data;
      miningDifficulty = difficultyResponse.data / 10000000000000;

      // cache price and diffculty for 5 minutes
      cache.set("bitcoinPrice", bitcoinPrice, 5 * 60);
      cache.set("miningDifficulty", miningDifficulty, 5 * 60);
    }

    // fetch other stats from db
    const allStats = await pool.query("SELECT * FROM mining_stats");
    const statsWithInfo = {
      ...allStats.rows[0],
      bitcoinPrice,
      miningDifficulty,
    };

    // send combined stats to client
    res.json(statsWithInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/miners", async (req, res) => {
  try {
    const allMining = await pool.query("SELECT * FROM mining_equipment");
    res.json(allMining.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//ENDPOINTS FOR WORKERS
//get all miners
app.get("/miners", async (req, res) => {
  try {
    const allMining = await pool.query("SELECT * FROM mining_equipment");
    res.json(allMining.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//add a worker
app.post("/miners", async (req, res) => {
  try {
    const { name, location, hashrate } = req.body; // Exclude 'id' from req.body
    const newTodo = await pool.query(
      "INSERT INTO mining_equipment (name, location, hashrate) VALUES ($1, $2, $3) RETURNING *",
      [name, location, hashrate]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a worker

app.put("/miner/:id", async (req, res) => {
  try {
    const { name, location, hashrate } = req.body;
    const { id } = req.params; // Extract 'id' from URL parameter

    const updatedMiner = await pool.query(
      "UPDATE mining_equipment SET name = $1, location = $2, hashrate = $3 WHERE id = $4 RETURNING *",
      [name, location, hashrate, id]
    );

    if (updatedMiner.rows.length === 0) {
      return res.status(404).json({ error: "Miner not found" });
    }

    res.json(updatedMiner.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete a worker
app.delete("/miner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWorker = await pool.query(
      "DELETE FROM mining_equipment WHERE id = $1",
      [id]
    );
    // Check if any rows were deleted
    if (deleteWorker.rowCount === 0) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json("miner was deleted!", deleteWorker);
  } catch (err) {
    console.log(err.message);
  }
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database by username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = result.rows[0];
    if (password === user.password) {
      // Generate a JWT token
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: "1h", // Token expiration time
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
