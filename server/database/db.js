// const { Pool, Client } = require("pg");
import pg from "pg";
const { Client, Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mrshoaib11",
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
});
export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mrshoaib11",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, "connection successfull.....");
  client.end();
});
