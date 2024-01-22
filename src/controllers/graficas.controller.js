import Usuario from '../models/transferencia.model.js';
import Cabania from "../models/client.cabania.model.js";
import Habitaciones from "../models/cliente.habitaciones.model.js";
import Cliente from "../models/client.model.js";

export const obtenerTotalesNiniosYAdultosEnPasadia = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Cabania.find();
  
      let totalNinios = 0;
      let totalAdultos = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "cabania") {
            totalNinios += reserva.ninios || 0; // Asegurarse de que ninios sea un número
            totalAdultos += reserva.adultos || 0; // Asegurarse de que adultos sea un número
          }
        });
      });
  
      clientes.forEach((personas) => {
        if (personas.servicio === "cabania") {
          totalNinios += personas.cantidadPersonas.ninios || 0;
          totalAdultos += personas.cantidadPersonas.adultos || 0;
        }
      });
  
      res.json({ totalNinios, totalAdultos });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };
  
  export const totalgenerado = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Cabania.find();
  
      let totalPago = 0;
      let totalPagoPendiente = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "pasadia") {
            totalPago += reserva.pago || 0;
            totalPagoPendiente += reserva.pagoPendiente || 0;
          }
        });
      });
  
      clientes.forEach((x) => {
        if (x.servicio === "pasadia") {
          totalPago += x.pagoAnticipado || 0;
          totalPagoPendiente += x.pagoPendiente || 0;
        }
      });
  
      res.json({ totalPago, totalPagoPendiente });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };


export const obtenerTotalesNiniosYAdultosEnHabitaciones = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Habitaciones.find();
  
      let totalNinios = 0;
      let totalAdultos = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "habitaciones") {
            totalNinios += reserva.ninios || 0; // Asegurarse de que ninios sea un número
            totalAdultos += reserva.adultos || 0; // Asegurarse de que adultos sea un número
          }
        });
      });
  
      clientes.forEach((personas) => {
        if (personas.servicio === "habitaciones") {
          totalNinios += personas.cantidadPersonas.ninios || 0;
          totalAdultos += personas.cantidadPersonas.adultos || 0;
        }
      });
  
      res.json({ totalNinios, totalAdultos });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };
  
  export const totalgeneradoHabitaciones = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Habitaciones.find();
  
      let totalPago = 0;
      let totalPagoPendiente = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "habitaciones") {
            totalPago += reserva.pago || 0;
            totalPagoPendiente += reserva.pagoPendiente || 0;
          }
        });
      });
  
      clientes.forEach((x) => {
        if (x.servicio === "habitaciones") {
          totalPago += x.pagoAnticipado || 0;
          totalPagoPendiente += x.pagoPendiente || 0;
        }
      });
  
      res.json({ totalPago, totalPagoPendiente });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };
  
  export const usuariosQueMasCompraron = async (req, res) => {
    try {
        const clientes = await Cliente.find({});
        const cabanias = await Cabania.find({});
        const habitaciones = await Habitaciones.find({});

        let resultadosCombinados = {};

        clientes.forEach(cliente => {
            let valorTotal = cliente.bebidas?.reduce((acc, bebida) => acc + bebida.cantidad * bebida.precio, 0) || 0;
            valorTotal += cliente.restaurante?.reduce((acc, item) => acc + item.cantidad * item.precio, 0) || 0;

            resultadosCombinados[cliente.identificacion] = {
                identificacion: cliente.identificacion,
                nombre: cliente.nombre,
                valorTotal: valorTotal
            };
        });

        cabanias.forEach(cabania => {
            let valorTotal = cabania.bebidas?.reduce((acc, item) => acc + item.cantidad * item.precio, 0) || 0;
            valorTotal += cabania.restaurante?.reduce((acc, item) => acc + item.cantidad * item.precio, 0) || 0;

            if (resultadosCombinados[cabania.identificacion]) {
                resultadosCombinados[cabania.identificacion].valorTotal += valorTotal;
            } else {
                resultadosCombinados[cabania.identificacion] = {
                    identificacion: cabania.identificacion,
                    nombre: cabania.nombre,
                    valorTotal: valorTotal
                };
            }
        });

        habitaciones.forEach(habitacion => {
            let valorTotal = habitacion.bebidas?.reduce((acc, item) => acc + item.cantidad * item.precio, 0) || 0;
            valorTotal += habitacion.restaurante?.reduce((acc, item) => acc + item.cantidad * item.precio, 0) || 0;

            if (resultadosCombinados[habitacion.identificacion]) {
                resultadosCombinados[habitacion.identificacion].valorTotal += valorTotal;
            } else {
                resultadosCombinados[habitacion.identificacion] = {
                    identificacion: habitacion.identificacion,
                    nombre: habitacion.nombre,
                    valorTotal: valorTotal
                };
            }
        });

        const resultadosArray = Object.values(resultadosCombinados);

        res.status(200).json(resultadosArray);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor');
    }
};

export const obtenerTotal = async (req, res) => {
  try {
    const documentos = await Usuario.find({});

    const totalesPorUsuario = documentos.map(doc => {
      let valorTotal = 0;
      let nombres = [];

      doc.historial.forEach(historialItem => {
        if (typeof historialItem.nombre === 'string') {
          nombres.push(historialItem.nombre);
        }

        historialItem.bebidas.forEach(item => {
          valorTotal += item.cantidad * item.precio;
        });

        historialItem.restaurante.forEach(item => {
          valorTotal += item.cantidad * item.precio;
        });
      });

      let nombreMasCompleto = nombres.reduce((nombreActual, nombreSiguiente) => {
        if (typeof nombreActual === 'string' && typeof nombreSiguiente === 'string') {
          return nombreActual.split(' ').length > nombreSiguiente.split(' ').length ? nombreActual : nombreSiguiente;
        } else {
          return nombreActual; 
        }
      }, '');

      return {
        identificacion: doc.identificacion,
        nombre: nombreMasCompleto,
        valorTotal
      };
    });

    res.json(totalesPorUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const productosMasComprados = async (req, res) => {
  try {
    const pasadia = await Cliente.find();
    const cabania = await Cabania.find();
    const habitaciones = await Habitaciones.find();
    const historial = await Usuario.find();
    const productosInfo = [];
    const findProductById = (array, id, itemId) => {
      return array.find((item) => item.id === id && item.itemId === itemId);
    };



    // cabania.forEach((data) => {
    //   data.restaurante.forEach((producto) => {
    //     const existingProduct = findProductById(productosInfo, producto.id, producto.itemId);

    //     if (existingProduct) {
    //       existingProduct.cantidad += producto.cantidad;
    //       existingProduct.total += producto.cantidad * producto.precio;
    //     } else {
    //       productosInfo.push({
    //         id: producto.id || producto.itemId,
    //         nombre: producto.nombre,
    //         cantidad: producto.cantidad,
    //         total: producto.cantidad * producto.precio,
    //       });
    //     }
    //   });
    // });
    // cabania.forEach((data) => {
    //   data.bebidas.forEach((producto) => {
    //     const existingProduct = findProductById(productosInfo, producto.id, producto.itemId);

    //     if (existingProduct) {
    //       existingProduct.cantidad += producto.cantidad;
    //       existingProduct.total += producto.cantidad * producto.precio;
    //     } else {
    //       productosInfo.push({
    //         id: producto.id || producto.itemId,
    //         nombre: producto.nombre,
    //         total: producto.cantidad * producto.precio,
    //       });
    //     }
    //   });
    // });

    pasadia.forEach((data) => {
      data.restaurante.forEach((producto) => {
        const existingProduct = findProductById(productosInfo, producto.id , producto.itemId);
  
        if (existingProduct) {
          existingProduct.total += producto.cantidad * producto.precio;
        } else {
          productosInfo.push({
            id: producto.id || producto.itemId,
            nombre: producto.nombre,
            total: producto.cantidad * producto.precio,
          });
        }
      } )
    });

    pasadia.forEach((data) => {
      data.bebidas.forEach((producto) => {
        const existingProduct = findProductById(productosInfo, producto.id, producto.itemId);
        if (existingProduct) {
          existingProduct.cantidad += producto.cantidad;
          existingProduct.total += producto.cantidad * producto.precio;
        } else {
          productosInfo.push({
            id: producto.id || producto.itemId,
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            total: producto.cantidad * producto.precio,
          });
        }
      } )
    });

    // habitaciones.forEach((data) => {
    //   data.restaurante.forEach((producto) => {
    //     const existingProduct = findProductById(productosInfo, producto.id, producto.itemId);
  
    //     if (existingProduct) {
    //       existingProduct.cantidad += producto.cantidad;
    //       existingProduct.total += producto.cantidad * producto.precio;
    //     } else {
    //       productosInfo.push({
    //         id: producto.id || producto.itemId,
    //         nombre: producto.nombre,
    //         total: producto.cantidad * producto.precio,
    //       });
    //     }
    //   } )
    // });

    // habitaciones.forEach((data) => {
    //   data.bebidas.forEach((producto) => {
    //     const existingProduct = findProductById(productosInfo, producto.id, producto.itemId);
  
    //     if (existingProduct) {
    //       existingProduct.cantidad += producto.cantidad;
    //       existingProduct.total += producto.cantidad * producto.precio;
    //     } else {
    //       productosInfo.push({
    //         id: producto.id || producto.itemId,
    //         nombre: producto.nombre,
    //         total: producto.cantidad * producto.precio,
    //       });
    //     }
    //   } )
    // });



    historial.forEach((producto) => {
      producto.historial.forEach((response) => {
        response.restaurante.forEach((data) => {
          const existingProduct = findProductById(productosInfo, data.id, data.itemId);
          if (existingProduct) {
            existingProduct.total += data.cantidad * data.precio;
          } else {
            productosInfo.push({
              id: data.id || data.itemId,
              nombre: data.nombre,
              total: data.cantidad * data.precio,
            });
          }
        });
      });
    });
    historial.forEach((producto) => {
      producto.historial.forEach((response) => {
        response.bebidas.forEach((data) => {
          const existingProduct = findProductById(productosInfo, data.id, data.itemId);
          if (existingProduct) {
            existingProduct.total += data.cantidad * data.precio;
          } else {
            productosInfo.push({
              id: data.id || data.itemId ,  
              nombre: data.nombre,
              total: data.cantidad * data.precio,
            });
          }
        });
      });
    });



    res.status(200).json({ productosInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const comprasUsers = async(req, res) => {
  try {
    const Pasadia = await Cliente.find();
   
    const response = Pasadia.map(Cliente => {
      const totalBebidas = Cliente.bebidas.reduce((total, data) => {
        return total + (data.cantidad * data.precio);
      }, 0);

      const totalRestaurante = Cliente.restaurante.reduce((totalR, data) => {
        return totalR + (data.cantidad * data.precio);
      }, 0); 

      const totalCompra = totalBebidas + totalRestaurante;

      return {
        identificacion: Cliente.identificacion,
        nombre: Cliente.nombre,
        totalCompra
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


export const productosMasCompradosPass = async (req, res) => {
  try {
    const pasadia = await Cliente.find();
    const historial = await Usuario.find();
    const productosInfo = [];
    const findProductById = (array, id, itemId) => {
      return array.find((item) => item.id === id && item.itemId === itemId);
    };


    pasadia.forEach((data) => {
      data.restaurante.forEach((producto) => {
        const existingProduct = findProductById(productosInfo, producto.id , producto.itemId);
  
        if (existingProduct) {
          existingProduct.total += producto.cantidad * producto.precio;
        } else {
          productosInfo.push({
            id: producto.id || producto.itemId,
            nombre: producto.nombre,
            total: producto.cantidad * producto.precio,
          });
        }
      } )
    });

    pasadia.forEach((data) => {
      data.bebidas.forEach((producto) => {
        const existingProduct = findProductById(productosInfo, producto.id, producto.itemId);
        if (existingProduct) {
          existingProduct.cantidad += producto.cantidad;
          existingProduct.total += producto.cantidad * producto.precio;
        } else {
          productosInfo.push({
            id: producto.id || producto.itemId,
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            total: producto.cantidad * producto.precio,
          });
        }
      } )
    });




    historial.forEach((producto) => {
      producto.historial.forEach((response) => {
        if (response.servicio === "pasadia") {
          response.restaurante.forEach((data) => {
            const existingProduct = findProductById(productosInfo, data.id, data.itemId);
            if (existingProduct) {
              existingProduct.total += data.cantidad * data.precio;
            } else {
              productosInfo.push({
                id: data.id || data.itemId,
                nombre: data.nombre,
                total: data.cantidad * data.precio,
              });
            }
          });
        }
      });
    });
    historial.forEach((producto) => {
      producto.historial.forEach((response) => {
        if (response.servicio === "pasadia") {
          response.bebidas.forEach((data) => {
            const existingProduct = findProductById(productosInfo, data.id, data.itemId);
            if (existingProduct) {
              existingProduct.total += data.cantidad * data.precio;
            } else {
              productosInfo.push({
                id: data.id || data.itemId ,  
                nombre: data.nombre,
                total: data.cantidad * data.precio,
              });
            }
          });
        }
      });
    });



    res.status(200).json({ productosInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


