import Venta from "../models/inventario.model.js"


export const obtenerProductosMasVendidos = async (req, res) => {
    try {
      const productos = await Venta.find().sort({ ventas: -1 }).limit(10); // Obtener los 10 productos más vendidos
      res.json(productos);
    } catch (error) {
      res.status(500).send(error);
    }
  };
