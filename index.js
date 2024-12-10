//* Crear un servidor usando express server
const express = require('express');
const colores = require('colors')
// cargar las variables de entorno desde el archivo .env
// require('dotenv').config();

//configuración del puerto
const port = process.env.PORT || 3000;

const app = express();

//ruta raiz
app.get('/' , (req,res) =>{
    res.send('servidor corriendo');
})

app.listen(port, () => {
    console.log('Servidor corriendo en: 🚀',`http://localhost:${port}`.blue.bold );
});