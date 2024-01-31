import Precios from "../models/precios.model.js"

export const guardarPrecioPasadia = async (req, res) => {
    try {
        const nuevoPasadia = new Precios(req.body);
        const nuevoPrecioGuardado = await nuevoPasadia.save();
        console.log("descripcion de datos: "+nuevoPrecioGuardado)
        res.status(201).send({ mensaje: "Pasadia agregado con éxito" });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al agregar Pasadia", error: error.message });
        console.log(error)
    }
}


export const obtenerPrecios = async (req, res) => {
    try {
      const precios = await Precios.find();
      res.status(200).json(precios); 
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las precios desde la base de datos");
    }
  };

  export const updatePrice = async (req, res) => {
    const { id } = req.params;
    const { servicio, tipo, precio } = req.body;

    try {
        // Encuentra el precio por ID y actualízalo
        const updatedPrice = await Precios.findByIdAndUpdate(
            id,
            { servicio, tipo, precio },
            { new: true }
        );

        if (!updatedPrice) {
            return res.status(404).send('El precio con el ID proporcionado no fue encontrado.');
        }

        // Envía el precio actualizado como respuesta
        res.send(updatedPrice);
    } catch (error) {
        res.status(500).send('Error al actualizar el precio: ' + error);
    }
};

// export const crearCliente = async (req, res) => {
//     try {
//       const nuevoCliente = new Cliente(req.body);
//       const clienteGuardado = await nuevoCliente.save();
//       res.status(201).json(clienteGuardado);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error al guardar el cliente en la base de datos");
//     }
//   };

export const opad = async (req,res) => {
    try {
        let precio = 0;
        const precios = await Precios.find();
        precios.forEach((data) => {
            if (data.servicio === "adicional") {
                precio = data.precio
            }
        })

        res.status(200).json({precio:precio})

    } catch (error) {
        console.log(error)
    }
}
