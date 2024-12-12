//* Crear un servidor usando express server
import express from "express";
import morgan from "morgan";
import connect from "./utils/db.js";
import Product from "./models/Products.js";
// eslint-disable-next-line no-unused-vars
import colors from "colors";

// cargar las variables de entorno desde el archivo .env
// require('dotenv').config();
const app = express();

// configuración del puerto
const port = process.env.PORT || 3000;

// configuración de middlewares
// middlware para registrar las solicitiudes HTTP en la consola
app.use(morgan("combined"));
// middlware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
// middlware para analizar el cuerpo de las solicitudes con datos codificados en URL
app.use(express.urlencoded({ extended: true }));

// middlware para manejar errores
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!".red.bold);
});

// ruta raiz
app.get("/", (req, res) => {
  res.send("servidor corriendo");
});

// RUTAS
// IMPLEMENTAR CRUD -> API (BACKEND MODERNO - REST API)
// para mandar datos a la base de datos por post
app.post("/products", async (req, res) => {
  // Lógica para crear un nuevo registro
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
    // res.status(201).json(product); mandar la respuesta en formato JSON
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
    // res.status(500).json(error.message); mandar la respuesta en formato JSON
  }
});

// para mandar todos los datos de la base de datos por get
app.get("/products", async (req, res) => {
  // Lógica para obtener todos los registros
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// para mandar un dato por id de la base de datos por get
app.get("/products/:id", async (req, res) => {
  // Lógica para obtener todos los registros
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// para actualizar un dato por id de la base de datos por put
app.put("/products/:id", async (req, res) => {
  // Lógica para obtener todos los registros
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

///  para eliminar datos de la base de datos por id
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

app.get("/products", (req, res) => {
  res.send({
    message: "Hola mundo desde express",
    author: "Johan",
    lastname: "Gonzalez",
    age: 30,
    email: "johan@gmail.com",
    phone: "123456789"
  });
});

app.listen(port, () => {
  console.log("Servidor corriendo en: 🚀", `http://localhost:${port}`.blue.bold);
});

// conectar a la base de datos
connect();
