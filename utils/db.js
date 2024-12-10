// establecer la conexión a la base de datos
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

// cargar las variables de entorno desde el archivo .env
dotenv.config()

// habilitar el modo de depuración y ver las consultas a la base de datos en la consola
mongoose.set('debug',true)

// Configucación de mongoose para permitir consultas más flexibles
mongoose.set('strictQuery', false)


async function connect () {
  try {
    // agregar un estado
    if (mongoose.connection.readyState) {
      console.log('Conexión ya establecida'.yellow.bold)
      return
    }
    // establecer la conexión
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conexión Exitosa'.green.bold)
  } catch (err) {
    // error en la conexión
    console.error('Error al conectar a la base de datos: ', err.message.red.bold)
  }
}

export default connect
