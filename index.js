//* Crear un servidor usando express server
const express = require('express');
const morgan = require('morgan');
const colores = require('colors')
// cargar las variables de entorno desde el archivo .env
// require('dotenv').config();
const app = express();

//configuración del puerto
const port = process.env.PORT || 3000;

// configuración de middlewares 
// middlware para registrar las solicitiudes HTTP en la consola
app.use(morgan('combined'))
// middlware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json())
// middlware para analizar el cuerpo de las solicitudes con datos codificados en URL
app.use(express.urlencoded({extended: true}))

//middlware para manejar errores 
app.use((err, req, res, next ) => {
    console.log(err.stack)
    res.status(500).send('Something broke!'.red.bold)
})

//ruta raiz
app.get('/' , (req,res) =>{
    res.send('servidor corriendo');
})

app.get('/api', (req,res) =>
     { res.send({ 
        message: 'Hola mundo desde express',
        author: 'Johan',
        lastname: 'Gonzalez',
        age: 30,
        email: 'johan@gmail.com',
        phone: '123456789',
    })
})

app.listen(port, () => {
    console.log('Servidor corriendo en: 🚀',`http://localhost:${port}`.blue.bold );
});