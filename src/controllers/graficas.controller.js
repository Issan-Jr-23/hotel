import Usuario from '../models/transferencia.model.js';
import Cabania from "../models/client.cabania.model.js";
import Habitaciones from "../models/cliente.habitaciones.model.js";
import Cliente from "../models/client.model.js";






  

  
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


//dashboard pasadia

export const totalProductosVendidosDashboard = async (req, res) => {

    const pasadia = await Cliente.find()

  try {
    let totalPagado = 0;
    let totalVendido =0;

    pasadia.forEach((data) => {
      data.restaurante.forEach((res) => {
        totalVendido += res.cantidad;
        totalPagado += res.cantidad * res.precio;
       })
    })
      res.status(200).json({ totalPago: totalPagado || 0, cantidadVendidos: totalVendido || 0});
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

export const totalPructosVendidosHistorialDashboard = async (req, res) => {
    const historial = await Usuario.find();
  try {

let cantidadTotal = 0;
let totalPorPrecio = 0;


historial.forEach((data) => {
  data.historial.forEach((response) => {
    response.restaurante.forEach((res) => {
      cantidadTotal += res.cantidad;
      totalPorPrecio += res.cantidad * res.precio;
    });
  });
});

  res.json({ totalPago: totalPorPrecio  || 0, cantidadVendidos: cantidadTotal || 0 });

  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalPructosCortesiasDashboard = async (req, res) => {
  const pasadia = await Cliente.find();
  const historial = await Usuario.find();
  try {
    let cortRes = 0;
    historial.forEach((data) => {
      data.historial.forEach((response) => {
        response.restaurante.forEach((res) =>{
          if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
          }
        })
      })
    })

    pasadia.forEach((data) => {
      data.restaurante?.forEach((res) => {
        if (res.mensaje === "Cortesía" && res.precio === 0) {
        cortRes += res.cantidad;
        }
      })
      data.bebidas?.forEach((res) => {
        if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
        }
      })
    })

    res.json({ totalPago: 0, cantidadVendidos: cortRes});
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const obtenerTotalesNiniosYAdultosEnPasadia = async (req, res) => {
    const pasadia = await Cliente.find();
    const historial = await Usuario.find();
  try {
    let conteo = 0;
    let totalPagado = 0;
      pasadia.forEach((data) => {
        if (data.servicio === "pasadia") {
          conteo++
          // totalPagado += data.pagoAnticipado + data.pagoPendiente + data.nuevoTotal;
        }
      })
      historial.forEach((data) => {
        data.historial.forEach((response) => {
          if (response.servicio === "pasadia") {
            conteo++
            // totalPagado += response.pago + response.pagoPendiente;
          }
        })
      })
    res.status(200).json({ totalPasadias: conteo});
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalgeneradoDashboard = async (req, res) => {
  try {
    const historial = await Usuario.find();
    const pasadia = await Cliente.find();
     let total = 0;
     historial.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "pasadia") {
        total += response.pago + response.pagoPendiente
        }
      })
     })

     pasadia.forEach((data) => {
      if (data.servicio === "pasadia") {
        total += data.pagoAnticipado + data.pagoPendiente
      }
     })

    res.json({ totalPago: total });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

//dashboard cabaña

export const totalPructosVendidosCabaniaDashboard = async (req, res) => {
  try {
    const cabania = await Cabania.find();
    let totalCompra = 0;
    let totalVendido = 0;

    cabania.forEach((data) => {
      data.restaurante?.forEach((response) => {
        totalVendido += response.cantidad;
        totalCompra += response.cantidad * response.precio;
      })
      data.bebidas?.forEach((response) => {
        totalVendido += response.cantidad;
        totalCompra += response.cantidad * response.precio;
      })
    })

      res.status(200).json({ totalPago: totalCompra || 0, cantidadVendidos: totalVendido || 0 });
    
  } catch (error) {
    console.error('Error al obtener los datos: ', error);
    res.status(500).send('Error al procesar la solicitud');
  }
};


export const totalProductosVendidosHistorialCabaniaDashboard = async (req, res) => {
   const historial = await Usuario.find();
  try {

let cantidadTotal = 0;
let totalPorPrecio = 0;


historial.forEach((data) => {
  data.historial.forEach((response) => {

    if (response.servicio === "cabania") {

    response.restaurante?.forEach((res) => {
      cantidadTotal += res.cantidad;
      totalPorPrecio += res.cantidad * res.precio;
    });

    response.bebidas?.forEach((res) => {
      cantidadTotal += res.cantidad;
      totalPorPrecio += res.cantidad * res.precio;
    });

    }

  });
});
      res.json({ totalPago: totalPorPrecio  || 0, cantidadVendidos: cantidadTotal || 0 });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
}


export const totalProductosCortesiasCabaniaHistorialDashboard = async (req, res) => {
  const pasadia = await Cabania.find();
  const historial = await Usuario.find();
  try {
    let cortRes = 0;
    historial.forEach((data) => {
      data.historial.forEach((response) => {
      if (response.servicio === "cabania") {
        response.restaurante?.forEach((res) =>{
          if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
          }
        })

        response.bebidas?.forEach((res) =>{
          if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
          }
        })
      }
      })


        
    })
    pasadia.forEach((data) => {
      data.restaurante?.forEach((res) => {
        if (res.mensaje === "Cortesía" && res.precio === 0) {
        cortRes += res.cantidad;
        }
      })
      data.bebidas?.forEach((res) => {
        if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
        }
      })
    })

    res.json({ totalPago: 0, cantidadVendidos: cortRes});
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const obtenerTotalesNiniosYAdultosEnCabaniaDashboard = async (req, res) => {
    const pasadia = await Cabania.find();
    const historial = await Usuario.find();
  try {
    let conteo = 0;
    let totalPagado = 0;
      pasadia.forEach((data) => {
        if (data.servicio === "cabania") {
          conteo++
          // totalPagado += data.pagoAnticipado + data.pagoPendiente + data.nuevoTotal;
        }
      })
      historial.forEach((data) => {
        data.historial.forEach((response) => {
          if (response.servicio === "cabania") {
            conteo++
            // totalPagado += response.pago + response.pagoPendiente;
          }
        })
      })
    res.status(200).json({ totalPasadias: conteo});
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const totalgeneradoCabaniaDashboard = async (req, res) => {
  try {
    const historial = await Usuario.find();
    const pasadia = await Cabania.find();
     let total = 0;
     historial.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "cabania") {
        total += response.pago + response.pagoPendiente
        }
      })
     })

     pasadia.forEach((data) => {
      if (data.servicio === "cabania") {
        total += data.pagoAnticipado + data.pagoPendiente
      }
     })

    res.json({ totalPago: total });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

//dashboard habitaciones



export const totalgeneradoHabitaciones = async (req, res) => {
  try {
    const historial = await Usuario.find();
    const pasadia = await Habitaciones.find();
     let total = 0;
     historial.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "habitaciones") {
        total += response.pago + response.pagoPendiente
        }
      })
     })

     pasadia.forEach((data) => {
      if (data.servicio === "habitaciones") {
        total += data.pagoAnticipado + data.pagoPendiente
      }
     })

    res.json({ totalPago: total });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const totalProductosCortesiasHabitacionesHistorialDashboard = async (req, res) => {
  const pasadia = await Habitaciones.find();
  const historial = await Usuario.find();
  try {
    let cortRes = 0;
    historial.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "habitaciones") {
        response.restaurante.forEach((res) =>{
          if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
          }
        })
        }
      })
    })

    pasadia.forEach((data) => {
      data.restaurante?.forEach((res) => {
        if (res.mensaje === "Cortesía" && res.precio === 0) {
        cortRes += res.cantidad;
        }
      })
      data.bebidas?.forEach((res) => {
        if (res.mensaje === "Cortesía" && res.precio === 0) {
          cortRes += res.cantidad;
        }
      })
    })

    res.json({ totalPago: 0, cantidadVendidos: cortRes});
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalProductosVendidosHistorialHabitacionesDashboard = async (req, res) => {
    const historial = await Usuario.find();
  try {

let cantidadTotal = 0;
let totalPorPrecio = 0;


historial.forEach((data) => {
  data.historial.forEach((response) => {

    if (response.servicio === "habitaciones") {

    response.restaurante?.forEach((res) => {
      cantidadTotal += res.cantidad;
      totalPorPrecio += res.cantidad * res.precio;
    });

    response.bebidas?.forEach((res) => {
      cantidadTotal += res.cantidad;
      totalPorPrecio += res.cantidad * res.precio;
    });

    }

  });
});
      res.json({ totalPago: totalPorPrecio  || 0, cantidadVendidos: cantidadTotal || 0 });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
}

export const obtenerTotalesNiniosYAdultosEnHabitaciones = async (req, res) => {
    const pasadia = await Habitaciones.find();
    const historial = await Usuario.find();
  try {
    let conteo = 0;
    let totalPagado = 0;
      pasadia.forEach((data) => {
        if (data.servicio === "habitaciones") {
          conteo++
          // totalPagado += data.pagoAnticipado + data.pagoPendiente + data.nuevoTotal;
        }
      })
      historial.forEach((data) => {
        data.historial.forEach((response) => {
          if (response.servicio === "habitaciones") {
            conteo++
            // totalPagado += response.pago + response.pagoPendiente;
          }
        })
      })
    res.status(200).json({ totalPasadias: conteo});
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};



export const totalPructosVendidosHabitacionesDashboard = async (req, res) => {

    const pasadia = await Habitaciones.find()

  try {
    let totalPagado = 0;
    let totalVendido =0;

    pasadia.forEach((data) => {
      data.restaurante.forEach((res) => {
        totalVendido += res.cantidad;
        totalPagado += res.cantidad * res.precio;
       })
    })
      res.status(200).json({ totalPago: totalPagado || 0, cantidadVendidos: totalVendido || 0});
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};



export const obtainVentasPasadia = async(req, res) => {
  try {
  const pasadia = await Cliente.find();
  const historial = await Usuario.find();
  let cantidad = 0;
  let totalVentas = 0;
    pasadia.forEach((data) => {
      if (data.servicio === "pasadia") {
        cantidad ++
        totalVentas += data.pagoAnticipado + data.pagoPendiente;
      }
    })

    historial.forEach((data) =>{
      data.historial.forEach((response) => {
        if (response.servicio === "pasadia") {
          cantidad++
          totalVentas += response.pago + response.pagoPendiente;
        }
      })
    })

    res.status(200).json({ totalCompras: totalVentas || 0, numeroCompras: cantidad || 0 })

  } catch (error) {
    console.log(error)
  }
}

export const obtainVentasPasadiaProducts = async(req, res) => {
  try {
    const pasadia = await Cliente.find();
    const historial = await Usuario.find();
    let compras = 0;
    let cantidadComprada = 0;
    let cortesias = 0;

    pasadia.forEach((res) => {


      res.restaurante?.forEach((data) =>{
      if (data.mensaje === "Cortesía" && data.precio === 0) {
        cortesias += data.cantidad
      }else{
      cantidadComprada += data.cantidad
      compras += data.cantidad * data.precio
      }
      })


      res.bebidas?.forEach((data) =>{
      if (data.mensaje === "Cortesía" && data.precio === 0) {
        cortesias += data.cantidad
      }else{
      cantidadComprada += data.cantidad
      compras += data.cantidad * data.precio
      }
      })
    })

    historial.forEach((response) => {
      response.historial.forEach((res) =>{
        res.restaurante?.forEach((data) =>{
      if (data.mensaje === "Cortesía" && data.precio === 0) {
        cortesias += data.cantidad
      }else {
      cantidadComprada += data.cantidad
      compras += data.cantidad * data.precio
      }
      })



      res.bebidas?.forEach((data) =>{
      if (data.mensaje === "Cortesía" && data.precio === 0) {
        cortesias += data.cantidad
      }else{
      cantidadComprada += data.cantidad
      compras += data.cantidad * data.precio
      }
      })
      })
    })

    res.status(200).json({cantidadComprada: cantidadComprada, money:compras, cortesias: cortesias})

  } catch (error) {
    console.log(error)
  }
}

export const obtainClients = async (req, res) => {
  try {
    const clients = await Cliente.find();

    const clientData = clients.map(cliente => {
      const totalBebidas = cliente.bebidas.reduce((total, bebida) => {
        if (bebida.mensaje !== 'Cortesía' && bebida.precio > 0) {
          return total + bebida.cantidad * bebida.precio;
        }
        return total;
      }, 0);

      const totalRestaurante = cliente.restaurante.reduce((total, item) => {
        if (item.precio > 0) {
          return total + item.cantidad * item.precio;
        }
        return total;
      }, 0);

      const totalDescorche = cliente.descorche.reduce((total, item) => {
        if (item.precio > 0) {
          return total + item.cantidad * item.precio;
        }
        return total;
      }, 0);

      const totalRecepcion = cliente.recepcion.reduce((total, item) => {
        if (item.precio > 0) {
          return total + item.cantidad * item.precio;
        }
        return total;
      }, 0);

      return {
        identificacion: cliente.identificacion,
        nombre: cliente.nombre,
        totalBebidas: totalBebidas,
        totalRestaurante: totalRestaurante,
        totalDescorche: totalDescorche,
        totalRecepcion: totalRecepcion,
        totalPago: cliente.pagoPendiente + cliente.pagoAnticipado
      };
    });

    res.json(clientData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};

export const obtainUsers = async (req, res) => {
  try {
    const users = await Usuario.find();

    const userData = [];

    for (const usuario of users) {
      const nombre = usuario.historial[0]?.nombre || 'Nombre no disponible';

      const totalBebidas = usuario.historial.reduce((total, registro) => {
        if (registro.bebidas) {
          return total + calcularTotal(registro.bebidas);
        }
        return total;
      }, 0);

      const totalRestaurante = usuario.historial.reduce((total, registro) => {
        if (registro.restaurante) {
          return total + calcularTotal(registro.restaurante);
        }
        return total;
      }, 0);

      const totalDescorche = usuario.historial.reduce((total, registro) => {
        if (registro.descorche) {
          return total + calcularTotal(registro.descorche);
        }
        return total;
      }, 0);

      const totalRecepcion = usuario.historial.reduce((total, registro) => {
        if (registro.recepcion) {
          return total + calcularTotal(registro.recepcion);
        }
        return total;
      }, 0);

      const totalPago = usuario.historial.reduce((total, registro) => {
        return total + (registro.pago || 0) + (registro.pagoPendiente || 0);
      }, 0);

      userData.push({
        identificacion: usuario.identificacion,
        nombre,
        totalBebidas: totalBebidas,
        totalRestaurante: totalRestaurante,
        totalDescorche: totalDescorche,
        totalRecepcion: totalRecepcion,
        totalPago: totalPago
      });
    }

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios desde la base de datos");
  }
};


const calcularTotal = (registros) => {
  return registros.reduce((total, registro) => {
    if (registro.precio > 0) {
      return total + registro.cantidad * registro.precio;
    }
    return total;
  }, 0);
};

export const obtainClientsCabanias = async (req, res) => {
  try {
    const clients = await Cabania.find();

    const clientData = clients.map(cliente => {
      const totalBebidas = cliente.bebidas.reduce((total, bebida) => {
        if (bebida.mensaje !== 'Cortesía' && bebida.precio > 0) {
          return total + bebida.cantidad * bebida.precio;
        }
        return total;
      }, 0);

      const totalRestaurante = cliente.restaurante.reduce((total, item) => {
        if (item.precio > 0) {
          return total + item.cantidad * item.precio;
        }
        return total;
      }, 0);

      const totalDescorche = cliente.descorche.reduce((total, item) => {
        if (item.precio > 0) {
          return total + item.cantidad * item.precio;
        }
        return total;
      }, 0);

      const totalRecepcion = cliente.recepcion.reduce((total, item) => {
        if (item.precio > 0) {
          return total + item.cantidad * item.precio;
        }
        return total;
      }, 0);

      return {
        identificacion: cliente.identificacion,
        nombre: cliente.nombre,
        totalBebidas: totalBebidas,
        totalRestaurante: totalRestaurante,
        totalDescorche: totalDescorche,
        totalRecepcion: totalRecepcion,
        totalPago: cliente.pagoPendiente + cliente.pagoAnticipado
      };
    });

    res.json(clientData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};

export const obtainUsersCabanias = async (req, res) => {
  try {
    const users = await Usuario.find();

    const userData = [];

    for (const usuario of users) {
      // Se asume que el nombre se obtiene del primer registro de historial que cumpla con ser un servicio de cabaña.
      const primerRegistroCabaña = usuario.historial.find(registro => registro.servicio === 'cabaña');
      const nombre = primerRegistroCabaña?.nombre || 'Nombre no disponible';

      const totalBebidas = usuario.historial.reduce((total, registro) => {
        if (registro.servicio === 'cabaña' && registro.bebidas) {
          return total + calcularTotal(registro.bebidas);
        }
        return total;
      }, 0);

      const totalRestaurante = usuario.historial.reduce((total, registro) => {
        if (registro.servicio === 'cabaña' && registro.restaurante) {
          return total + calcularTotal(registro.restaurante);
        }
        return total;
      }, 0);

      const totalDescorche = usuario.historial.reduce((total, registro) => {
        if (registro.servicio === 'cabaña' && registro.descorche) {
          return total + calcularTotal(registro.descorche);
        }
        return total;
      }, 0);

      const totalRecepcion = usuario.historial.reduce((total, registro) => {
        if (registro.servicio === 'cabaña' && registro.recepcion) {
          return total + calcularTotal(registro.recepcion);
        }
        return total;
      }, 0);

      const totalPago = usuario.historial.reduce((total, registro) => {
        if (registro.servicio === 'cabaña') {
          return total + (registro.pago || 0) + (registro.pagoPendiente || 0);
        }
        return total;
      }, 0);

      userData.push({
        identificacion: usuario.identificacion,
        nombre,
        totalBebidas: totalBebidas,
        totalRestaurante: totalRestaurante,
        totalDescorche: totalDescorche,
        totalRecepcion: totalRecepcion,
        totalPago: totalPago
      });
    }

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios desde la base de datos");
  }
};

