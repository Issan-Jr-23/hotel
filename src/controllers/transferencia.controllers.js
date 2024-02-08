// usuarioController.js
import Usuario from "../models/transferencia.model.js";
import Cliente from "../models/client.model.js";
import Cabania from "../models/client.cabania.model.js"
import Habitaciones from "../models/cliente.habitaciones.model.js"

export const obtenerClientes = async (req, res) => {
  try {
    const clientesObtenidos = await Cliente.find({})
    res.status(200).json( clientesObtenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};
export const obtenerClientesCabania = async (req, res) => {
  try {
    const clientesObtenidos = await Cabania.find({})
    res.status(200).json( clientesObtenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};
export const obtenerClientesHabitaciones = async (req, res) => {
  try {
    const clientesObtenidos = await Habitaciones.find({})
    res.status(200).json( clientesObtenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};
export const agregarOActualizarUsuario = async (req, res) => {
  const { identificacion, datosHistorial } = req.body;

  try {
    let usuario = await Usuario.findOne({ identificacion });
    console.log("datos en el servidor: ", usuario);

    const idHistorial = `${identificacion}-${Date.now()}`;

    const nuevoRegistroHistorial = {
      idHistorial,
      ...datosHistorial,
    };

    console.log("datos del servidor: ", nuevoRegistroHistorial);

    if (usuario) {
      usuario.historial.push(nuevoRegistroHistorial);
    } else {
      usuario = new Usuario({
        identificacion,
        historial: [nuevoRegistroHistorial],
      });
    }

    await usuario.save();
    res
      .status(200)
      .json({ message: "Usuario agregado o actualizado con éxito", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error });
    console.log(error);
  }
};
export const obtenerHistorial = async (req, res) => {
  try {
    const clientesObtenidos = await Usuario.find();
    res.status(200).json(clientesObtenidos);
    console.log(clientesObtenidos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error al obtener los clientes desde la base de datos");
  }
};
export const obtenerHistorialDeUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findOne({ identificacion: id });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.json(usuario.historial);
  } catch (error) {
    console.error("Error al obtener el historial del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};
export const obtenerHistorialReservasNo = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    const clientes = await Cliente.find();

    const historialReservasSi = usuarios.map((usuario) => ({
      identificacion: usuario.identificacion,
      reservasSi: usuario.historial.filter((item) => item.reserva === "No"),
    }));

    const reservasSiClientes = clientes.filter((cliente) => cliente.reserva === "No").map((cliente) => ({
      identificacion: cliente.identificacion,
      reserva: cliente.reserva,
    }));

    res.json({ historialReservasSi, reservasSiClientes });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
export const obtenerCantidadGeneralResrvas = async (req, res) => {
  try {
    const historial = await Usuario.find();
    const pasadia = await Cliente.find();
    const cabania = await Cabania.find();
    const habitaciones = await Habitaciones.find();

    let cantidadSi = 0;
    let cantidadNo = 0;


    historial.forEach((data) =>{
      data.historial?.forEach((response) => {
        if (response.reserva === "Si") {
          cantidadSi++
        }else if (response.reserva === "No") {
          cantidadNo++
        }
      })
    })

    pasadia.forEach((data) => {
      if (data.reserva === "Si") {
        cantidadSi++
      }else if(data.reserva === "No"){
        cantidadNo++
      }
    })

    cabania.forEach((data) => {
      if (data.reserva === "Si") {
        cantidadSi++
      }else if(data.reserva === "No"){
        cantidadNo++
      }
    })

    habitaciones.forEach((data) => {
      if (data.reserva === "Si") {
        cantidadSi++
      }else if(data.reserva === "No"){
        cantidadNo++
      }
    })




    // const historialReservasSi = usuarios.map((usuario) => ({
    //   identificacion: usuario.identificacion,
    //   reservasSi: usuario.historial.filter((item) => item.reserva === "Si"),
    // }));


    // const reservasSiClientes = clientes.filter((cliente) => cliente.reserva === "Si").map((cliente) => ({
    //   identificacion: cliente.identificacion,
    //   reserva: cliente.reserva,
    // }));

    res.json({ 
      si:cantidadSi,
      no:cantidadNo
    
    });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const afp = async (req, res) => {
    const pasadia = await Cliente.find();
    const historial = await Usuario.find();
  try {
    let activos = 0;
    let finalizados = 0;
    let pendientes = 0;
    let cancelados = 0;
    pasadia.forEach((data) => {
      if (data.estado === "activo") {
        activos++
      }else if(data.estado === "finalizado"){
        finalizados++
      }else if(data.estado === "pendiente"){
        pendientes++
      }else {
        cancelados++
      }
    })

    historial.forEach((response) => {
      response.historial.forEach((data) => {
        if (data.servicio === "pasadia"){
       if(data.estado === "finalizado"){
        finalizados++
      }
        }else{
          console.log("No hay datos")
        }
      })
    })
    res.json({pendientes: pendientes,activos : activos,finalizados : finalizados,cancelados : cancelados
    })
  } catch (error) {
    console.log("Error")
    
  }
}

export const afpc = async (req, res) => {
    const cabania = await Cabania.find();
    const historial = await Usuario.find();
  try {
    let activos = 0;
    let finalizados = 0;
    let pendientes = 0;
    let cancelados = 0;
    cabania.forEach((data) => {
      if (data.estado === "activo") {
        activos++
      }else if(data.estado === "finalizado"){
        finalizados++
      }else if(data.estado === "pendiente"){
        pendientes++
      }else{
        cancelados++
      }
    })

    historial.forEach((response) => {
      response.historial.forEach((data) => {
        if (data.servicio === "cabania"){
       if(data.estado === "finalizado"){
        finalizados++
      }else if(data.estado === "cancelado"){
        cancelados++
      }
        }else{
          console.log("No hay datos")
        }
      })
    })
    res.json({pendientes: pendientes,activos : activos,finalizados : finalizados,cancelados : cancelados
    })
  } catch (error) {
    console.log("Error")
    
  }
}

export const afph = async (req, res) => {
    const habitaciones = await Habitaciones.find();
    const historial = await Usuario.find();
  try {
    let activos = 0;
    let finalizados = 0;
    let pendientes = 0;
    let cancelados = 0;
    habitaciones.forEach((data) => {
      if (data.estado === "activo") {
        activos++
      }else if(data.estado === "finalizado"){
        finalizados++
      }else if(data.estado === "pendiente"){
        pendientes++
      }else {
        cancelados++
      }
    })

    historial.forEach((response) => {
      response.historial.forEach((data) => {
        if (data.servicio === "habitaciones"){
       if(data.estado === "finalizado"){
        finalizados++
      }
        }else{
          console.log("No hay datos")
        }
      })
    })
    res.json({pendientes: pendientes,activos : activos,finalizados : finalizados,cancelados : cancelados
    })
  } catch (error) {
    console.log("Error")
    
  }
}















export const totalGeneradoBar = async(req, res) => {
  try {
    const pasadia = await Cliente.find(); 
    const historial = await Usuario.find();

    let total = 0;
    let totalRestaurante = 0;
    let totalRecepcion = 0;
    let totalDescorche = 0;

    // Process pasadia
    if (pasadia) {
      pasadia.forEach((b) => {
        b.bebidas?.forEach((data) => {
          total += data.cantidad * data.precio;
        });
      });

      pasadia.forEach((r) => {
        r.restaurante?.forEach((data) => {
          totalRestaurante += data.cantidad * data.precio;
        });
      });

      pasadia.forEach((rec) => {
        rec.recepcion?.forEach((data) => {
          totalRecepcion += data.cantidad * data.precio; 
        });
      });

      pasadia.forEach((desc) => {
        desc.descorche?.forEach((data) =>{
          totalDescorche += data.cantidad * data.precio; 
        });
      });
    }

    // Process historial
    if (historial) {
      historial.forEach((hb) => {
        hb.historial?.forEach((data) => {
          data.bebidas?.forEach((response) => {
            total += response.cantidad * response.precio;
          });

          if (data.servicio === "pasadia") {
            data.restaurante?.forEach((response) => {
              if (response.precio !== 0 ) {
                totalRestaurante += response.cantidad * response.precio;
              }
            });

            data.recepcion?.forEach((response) => {
              if (response.precio !== 0 ) {
                totalRecepcion += response.cantidad * response.precio;
              }
            });
          }
        });

        hb.descorche?.forEach((data) => {
          if (data.servicio === "pasadia") {
            totalDescorche += data.cantidad * data.precio; 
          }
        });
      });
    }

    // Send response
    res.status(200).json({
      bar: total || 0,
      restaurante: totalRestaurante || 0,
      recepcion: totalRecepcion || 0,
      descorche: totalDescorche || 0
    });

  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const totalGeneradoCabaniaBard = async(req, res) => {
  try {
    const cabania = await Cabania.find();

  
    let totalBar = 0;
    let totalRes = 0;
    let totalRec = 0;
    let totalDes = 0;

    cabania.forEach((b) =>{
      b.bebidas.forEach((data)=>{
        if (data.precio !== 0) {
          totalBar += data.cantidad * data.precio;
        }
      })
    })

    cabania.forEach((r) => {
      r.restaurante.forEach((data) => {
        if (data.precio !== 0){
          totalRes += data.cantidad * data.precio;
        }
      })
    })

    cabania.forEach((rec) => {
      rec.recepcion.forEach((data) => {
        if (data.precio !== 0) {
          totalRec += data.cantidad * data.precio
        }
      })
    })

    cabania.forEach((des) => {
      des.descorche.forEach((data) => {
        if (data.precio !== 0) {
          totalDes += data.cantidad * data.precio;
        }
      })
    })

    res.status(200).json({
      bar: totalBar || 0,
      restaurante: totalRes || 0,
      recepcion: totalRec || 0,
      descorche: totalDes || 0
    })

  } catch (error) {
    console.log(error)
  }
}

export const totalGeneradoHabitacionesBard = async(req, res) => {
  try {
    const habitaciones = await Habitaciones.find();
    const historial = await Usuario.find();
    
    let totalBar = 0;
    let totalRes = 0;
    let totalRec = 0;
    let totalDes = 0;

    habitaciones.forEach((bar ) => {
      bar.bebidas.forEach((data) => {
        totalBar += data.cantidad * data.precio;
      })
    })
    habitaciones.forEach((res) => {
      res.restaurante.forEach((data) => {
        totalRes += data.cantidad * data.precio;
      })
    })
    habitaciones.forEach((rec) => {
      rec.recepcion.forEach((data) => {
        totalRec += data.cantidad * data.precio; 
      })
    })
    habitaciones.forEach((des) => {
      des.descorche.forEach((data) => {
        totalDes += data.cantidad * data.precio;
      })
    })


    historial.forEach((bar) => {
      bar.historial.forEach((data) => {
        data.bebidas.forEach((bbr) => {
          totalBar += bbr.cantidad * bbr.precio;
        })
      })
    })

    historial.forEach((res) =>{
      res.historial.forEach((data) => {
        data.restaurante.forEach((bbr) => {
          totalRes += bbr.cantidad * data.precio; 
        })
      })
    })

    historial.forEach((rec) => {
      rec.historial.forEach((data) => {
        data.recepcion.forEach((data) => {
          totalRec += bbr.cantidad * data.precio;
        })
      })
    })

    historial.forEach((des) => {
      des.historial.forEach((data) => {
        data.descorche.forEach((bbr) => {
          totalDes += bbr.cantidad * bbr.precio; 
        })
      })
    })

    res.status(200).json({
      bar: totalBar || 0,
      restaurante: totalRes || 0 ,
      recepcion: totalRec || 0,
      descorche: totalDes || 0
    })
    
  } catch (error) {
    console.log(error)
  }
}
