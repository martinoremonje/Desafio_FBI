import jwt from "jsonwebtoken";
import { addAgentQuery, verifyAgentQuery } from "../models/queries.js";


import 'dotenv/config';

const secretKey = process.env.JWT_SECRET_KEY;

export const home = (req, res) => {
  res.render("home", {
    title: "Home Page",
  });
};

export const loginForm = (req, res) => {
  res.render("login", {
    title: "Login Page",
  });
};

export const register = (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
};

export const contact = (req, res) => {
  res.render("contact", {
    title: "Contact Page",
  });
};

export const admin = (req, res) => {
  try {
    
    const token = req.cookies.jwtToken;
    const { email } = jwt.verify(token, secretKey);
    console.log(email);
    if (!email) {
      return new Error("Usted no está autorizado para entrar aqui");
    }

    res.render("admin", {
      title: "Admin Page",
      email,
    });
  } catch (error) {
    res
      .status(401)
      .send(
        `Usted no está autorizado para entrar aqui`
      );
  }
};

export const addAgent = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    
    
    if (!name || !email || !password) {
      return res.status(400).send("Llene todos los campos");
    }
    
 
    if (password !== confirm_password) {
      return res.status(400).send("Las contraseñas deben ser iguales");
    }
    
 
    const userVerify = await verifyAgentQuery(email);
    if (userVerify) {
      return res.status(400).send("El correo se encuentra registrado con otro usuario");
    }
    

    await addAgentQuery(name, email, password);
    return res.status(201).redirect("/login");
  } catch (error) {
    // Manejo de errores
    return res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email} = req.body;
    const agentVerify = await verifyAgentQuery(email);

    if (!agentVerify) {
      return res.status(400).send("Break in is a federal assault");
    }
    const token = jwt.sign({ email: agentVerify.email }, secretKey, {
      expiresIn: 40
    });

    res.cookie("jwtToken", token, {
      httpOnly: true,
      maxAge: 40000
    });

    return res.redirect("/admin");
  } catch (error) {
    return res.status(500).send("Acceso denegado");
  }
};



