import { pool } from "../database/db.js";

// ==========================================================
// ============CREATE NEW USER===============================

export const userSignup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone, age, address } = req.body;
    const text = `
    INSERT INTO userdb ( name, email, password, phone, age, address)
    VALUES ($1, $2, $3, $4,$5,$6)
    RETURNING id
  `;
    const values = [name, email, password, phone, age, address];
    const q = pool.query(text, values);
    res.json({ q });
  } catch (err) {
    console.log(err);
  }
};

// ==========================================================
// ============GET ALL USERS=================================

export const profile = (req, res) => {
  try {
    pool
      .query("SELECT * FROM userdb ORDER BY id ASC")
      .then(({ rows }) => res.status(200).json({ success: true, data: rows }))
      .catch((err) =>
        setImmediate(() => {
          throw err;
        })
      );
  } catch (error) {
    res.status(401).json({ success: false, message: "user not  found" });
  }
};

// ==========================================================
// ============GET SINGLE USERS==============================

export const singleUser = (req, res) => {
  try {
    pool.query(
      `SELECT * FROM userdb WHERE id=${req.params.id}`,
      (err, { rows }) => {
        if (err) {
          throw error;
        }
        res
          .status(200)
          .json({ status: true, message: "user found ", data: rows });
      }
    );
  } catch (error) {
    console.log("error cant get single user");
  }
};

// ==========================================================
// ============UPDATE USERS =================================

export const updateUser = async (req, res) => {
  const uid = parseInt(req.params.id);
  const { name, email, password, phone, age, address } = req.body;
  console.log("update..");

  try {
    const { err, rows } = await pool.query(
      `SELECT * FROM userdb WHERE id =${uid}`
    );

    if (err) {
      throw err;
    }

    try {
      console.log(req.body);
      pool.query(
        "UPDATE userdb SET name = $1, email = $2, password = $3, phone = $4 , age=$5, address = $6  WHERE id = $7",
        [name, email, password, phone, age, address, uid],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json({ message: `User modified with ID: ${uid}` });
        }
      );
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
};

// ==========================================================
// ============DELETE USERS=================================
export const delUser = (req, res) => {
  const uid = req.params.id;
  try {
    pool.query(`DELETE  FROM userdb WHERE id=${uid} `, (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        status: true,
        message: `user deleded with id ${uid}`,
      });
    });
  } catch (error) {}
};

// ==========================================================
// ============SEARCH USERS=================================

export const searchUser = async (req, res) => {
  console.log(req.query);
  try {
    const search = await pool.query(
      "SELECT * FROM userdb WHERE name LIKE $1 ",
      [`%${req.query.q}%`]
    );
    res.json({ search });
  } catch (error) {
    res.status(400).json({ error });
  }
};
