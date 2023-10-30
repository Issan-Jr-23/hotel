import Cliente from "../models/client.model.js";

export const obtenerClientes = async (req, res) => {
  try {
    const clientesObtenidos = await Cliente.find();
    res.status(200).json(clientesObtenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};

export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar el cliente en la base de datos");
  }
};


export const deleteClient = async (req, res) => {
  const identificacion = parseInt(req.params.identificacion); 

  try {
    const resultado = await Cliente.deleteOne({ identificacion: identificacion }); 
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




export const updateClient = async (req, res) => {
  const identificacion = req.params.identificacion;
  const { nombre, pagoPendienteTotal, reserva, bebidas } = req.body;

  try {
    const usuarioActualizado = await Cliente.findOneAndUpdate(
      { identificacion },
      { nombre, pagoPendienteTotal, reserva, bebidas },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado correctamente', usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};



export const addBebida = async (req, res) => {
  const {identificacion,bebida } = req.body;

  try {
    const cliente = await Cliente.findOne({ identificacion: identificacion });

    if (cliente) {
      cliente.bebidas.push(bebida);

      await cliente.save();

      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la bebida al cliente' });
  }
};



      




