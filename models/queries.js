import { pool } from "../config/db.js";

export const addAgentQuery = async (nombre, email, contraseña) => {
  try {
    const sql = {
      text: "INSERT INTO agentes (nombre, email, contraseña) VALUES ($1, $2, $3)",
      values: [nombre, email, contraseña],
    };

    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return { success: true };
    } else {
      throw new Error("No se pudo registrar el usuario");
    }
  } catch (error) {
    console.log("Error code: ", error.code, "Error: ", error.message);
    throw error; 
  }
};

export const verifyAgentQuery = async (email) => {
  try {
    const sql = {
      text: "SELECT * FROM agentes WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(sql);
    if (response.rowCount > 0) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error code: ", error.code, "Error: ", error.message);
  }
};