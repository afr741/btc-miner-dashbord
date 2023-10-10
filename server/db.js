const { Pool } = require("pg");

const pool = new Pool({
  user: "vij",
  password: "vij2023",
  host: "localhost",
  port: 5432,
  database: "miners",
});

module.exports = pool;
