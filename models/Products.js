// schema para los productos
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
//   _idProduct: { type: String, required: true, unique: true }, el servidor lo tiene que generar
// este esquema vendría siendo a las tablas en una sql
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, required: true },
  timeStamp: { type: Date, default: Date.now }
},
{ timestamps: true } // añadir a la fecha createdAt y updatedAt automaticamente
);

const Product = mongoose.model("Product", productSchema);

export default Product;
