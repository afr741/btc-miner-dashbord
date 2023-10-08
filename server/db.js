const { Pool } = require("pg");

const pool = new Pool({
  user: "user",
  password: "",
  host: "localhost",
  port: 5432,
  database: "miners",
});

module.exports = pool;
