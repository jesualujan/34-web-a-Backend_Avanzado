//* Crear un servidor usando express server
const express = require('express');

const app = express();

//ruta raiz
app.get('/' , (req,res) =>{
    res.send('Servidor Funcionando')
})

app.listen(3000, () => {
    console.log('Server on port 3000');
});