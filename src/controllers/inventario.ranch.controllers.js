import Inventario from "../models/inventario.ranch.model.js"

export const registrarData = async (req, res) =>{
    try {
        const nuevoRegistro = new Inventario(req.body)
        const registroCreado  = await nuevoRegistro.save();
        res.status(201).json(registroCreado)
    } catch (error) {
        res.status(500).send("Error al crear el registro Ranch")
    }
}

export const obtenerInventario = async (req, res) => {
    try {
      const dataFinca = await Inventario.find();
      res.status(200).json(dataFinca);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener los clientes desde la base de datos");
    }
  };

  export const deleteRegistro = async (req, res) => {
    const identificacion = req.params.id; 
    try {
      const resultado = await Inventario.deleteOne({ _id: identificacion }); 
      if (resultado.deletedCount > 0) {
        res.status(200).json({ message: `Usuario con identificación "${identificacion}" eliminado con éxito.` });
      } else {
        res.status(404).json({ message: `No se encontró un usuario con la identificación "${identificacion}".` });
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }