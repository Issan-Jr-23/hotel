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
  try {
    const result = await Cliente.aggregate([
      {
        $match: {
          servicio: 'pasadia',
        },
      },
      {
        $project: {
          totalPago: {
            $sum: {
              $map: {
                input: {
                  $concatArrays: ['$restaurante', '$bebidas'],
                },
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: ['$$item.precio', 0] },
                        { $gt: ['$$item.cantidad', 0] },
                      ],
                    },
                    then: { $multiply: ['$$item.cantidad', '$$item.precio'] },
                    else: 0,
                  },
                },
              },
            },
          },
          cantidadVendidos: {
            $sum: {
              $cond: {
                if: { $gt: ['$restaurante.precio', 0] },
                then: '$restaurante.cantidad',
                else: 0,
              },
            },
          },
        },
      },
    ]);

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ totalPago: 0, cantidadVendidos: 0 });
    }
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

export const totalPructosVendidosHistorialDashboard = async (req, res) => {
  try {
    const resultado = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "pasadia" } },
      { $unwind: "$historial.restaurante" },
      { $match: { "historial.restaurante.precio": { $gt: 0 } } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.restaurante.cantidad", "$historial.restaurante.precio"] } },
        cantidadVendidos: { $sum: "$historial.restaurante.cantidad" }
      }},
      { $unwind: "$historial.bebidas" },
      { $match: { "historial.bebidas.precio": { $gt: 0 } } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.bebidas.cantidad", "$historial.bebidas.precio"] } },
        cantidadVendidos: { $sum: "$historial.bebidas.cantidad" }
      }}
    ]);

    if (resultado.length > 0) {
      res.json({ totalPago: resultado[0].totalPago, cantidadVendidos: resultado[0].cantidadVendidos });
    } else {
      res.json({ totalPago: 0, cantidadVendidos: 0 });
    }
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalPructosCortesiasDashboard = async (req, res) => {
  try {
    const resultadoCabania = await Cliente.aggregate([
      { $unwind: "$restaurante" },
      { $match: { "restaurante.precio": 0, "restaurante.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        cantidadVendidos: { $sum: "$restaurante.cantidad" }
      }},
      { $unwind: "$bebidas" },
      { $match: { "bebidas.precio": 0, "bebidas.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        cantidadVendidos: { $sum: "$bebidas.cantidad" }
      }}
    ]);

    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "pasadia" } },
      { $unwind: "$historial.restaurante" },
      { $match: { "historial.restaurante.precio": 0, "historial.restaurante.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.restaurante.cantidad", "$historial.restaurante.precio"] } },
        cantidadVendidos: { $sum: "$historial.restaurante.cantidad" }
      }},
      { $unwind: "$historial.bebidas" },
      { $match: { "historial.bebidas.precio": 0, "historial.bebidas.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.bebidas.cantidad", "$historial.bebidas.precio"] } },
        cantidadVendidos: { $sum: "$historial.bebidas.cantidad" }
      }}
    ]);

    let totalCantidadVendidos = 0;
    if (resultadoCabania.length > 0) {
      totalCantidadVendidos += resultadoCabania[0].cantidadVendidos;
    }
    if (resultadoUsuarios.length > 0) {
      totalCantidadVendidos += resultadoUsuarios[0].cantidadVendidos;
    }

    res.json({ totalPago: 0, cantidadVendidos: totalCantidadVendidos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const obtenerTotalesNiniosYAdultosEnPasadia = async (req, res) => {
  try {
    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "pasadia" } },
      {
        $group: {
          _id: null,
          totalNinios: { $sum: "$historial.ninios"},
          totalAdultos: { $sum: "$historial.adultos"}
        }
      }
    ]);

    const resultadoCabanias = await Cliente.aggregate([
      { $match: { "servicio": "pasadia" } },
      {
        $group: {
          _id: null,
          totalNinios: { $sum: "$cantidadPersonas.ninios" },
          totalAdultos: { $sum: "$cantidadPersonas.adultos" }
        }
      }
    ]);

    let totalNinios = 0;
    let totalAdultos = 0;

    if (resultadoUsuarios.length > 0) {
      totalNinios += resultadoUsuarios[0].totalNinios || 0;
      totalAdultos += resultadoUsuarios[0].totalAdultos || 0;
    }

    if (resultadoCabanias.length > 0) {
      totalNinios += resultadoCabanias[0].totalNinios || 0;
      totalAdultos += resultadoCabanias[0].totalAdultos || 0;
    }

    res.json({ totalNinios, totalAdultos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalgeneradoDashboard = async (req, res) => {
  try {
    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "pasadia" } },
      { $group: {
        _id: null,
        totalPago: { $sum: "$historial.pago" },
        totalPagoPendiente: { $sum: "$historial.pagoPendiente" }
      }}
    ]);

    const resultadoCabanias = await Cliente.aggregate([
      { $match: { "servicio": "pasadia" } },
      { $group: {
        _id: null,
        totalPago: { $sum: "$pagoAnticipado" },
        totalPagoPendiente: { $sum: "$pagoPendiente" }
      }}
    ]);

    let totalPago = 0;
    let totalPagoPendiente = 0;

    if (resultadoUsuarios.length > 0) {
      totalPago += resultadoUsuarios[0].totalPago;
      totalPagoPendiente += resultadoUsuarios[0].totalPagoPendiente;
    }

    if (resultadoCabanias.length > 0) {
      totalPago += resultadoCabanias[0].totalPago;
      totalPagoPendiente += resultadoCabanias[0].totalPagoPendiente;
    }

    res.json({ totalPago, totalPagoPendiente });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

//dashboard cabaña

export const totalPructosVendidosCabaniaDashboard = async (req, res) => {
  try {
    const result = await Cabania.aggregate([
      {
        $match: {
          servicio: 'cabania',
        },
      },
      {
        $project: {
          totalPago: {
            $sum: {
              $map: {
                input: {
                  $concatArrays: ['$restaurante', '$bebidas'],
                },
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: ['$$item.precio', 0] },
                        { $gt: ['$$item.cantidad', 0] },
                      ],
                    },
                    then: { $multiply: ['$$item.cantidad', '$$item.precio'] },
                    else: 0,
                  },
                },
              },
            },
          },
          cantidadVendidos: {
            $sum: {
              $cond: {
                if: { $gt: ['$restaurante.precio', 0] },
                then: '$restaurante.cantidad',
                else: 0,
              },
            },
          },
        },
      },
    ]);

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ totalPago: 0, cantidadVendidos: 0 });
    }
  } catch (error) {
    console.error('Error al obtener los datos: ', error);
    res.status(500).send('Error al procesar la solicitud');
  }
};


export const totalProductosVendidosHistorialCabaniaDashboard = async (req, res) => {
  try {
    const resultado = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "cabania" } },
      { $unwind: "$historial.restaurante" },
      { $match: { "historial.restaurante.precio": { $gt: 0 } } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.restaurante.cantidad", "$historial.restaurante.precio"] } },
        cantidadVendidos: { $sum: "$historial.restaurante.cantidad" }
      }},
      { $unwind: "$historial.bebidas" },
      { $match: { "historial.bebidas.precio": { $gt: 0 } } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.bebidas.cantidad", "$historial.bebidas.precio"] } },
        cantidadVendidos: { $sum: "$historial.bebidas.cantidad" }
      }}
    ]);

    if (resultado.length > 0) {
      res.json({ totalPago: resultado[0].totalPago, cantidadVendidos: resultado[0].cantidadVendidos });
    } else {
      res.json({ totalPago: 0, cantidadVendidos: 0 });
    }
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const totalProductosCortesiasCabaniaHistorialDashboard = async (req, res) => {
  try {
    const resultadoCabania = await Cabania.aggregate([
      { $unwind: "$restaurante" },
      { $match: { "restaurante.precio": 0, "restaurante.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        cantidadVendidos: { $sum: "$restaurante.cantidad" }
      }},
      { $unwind: "$bebidas" },
      { $match: { "bebidas.precio": 0, "bebidas.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        cantidadVendidos: { $sum: "$bebidas.cantidad" }
      }}
    ]);

    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "cabania" } },
      { $unwind: "$historial.restaurante" },
      { $match: { "historial.restaurante.precio": 0, "historial.restaurante.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.restaurante.cantidad", "$historial.restaurante.precio"] } },
        cantidadVendidos: { $sum: "$historial.restaurante.cantidad" }
      }},
      { $unwind: "$historial.bebidas" },
      { $match: { "historial.bebidas.precio": 0, "historial.bebidas.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.bebidas.cantidad", "$historial.bebidas.precio"] } },
        cantidadVendidos: { $sum: "$historial.bebidas.cantidad" }
      }}
    ]);

    let totalCantidadVendidos = 0;
    if (resultadoCabania.length > 0) {
      totalCantidadVendidos += resultadoCabania[0].cantidadVendidos;
    }
    if (resultadoUsuarios.length > 0) {
      totalCantidadVendidos += resultadoUsuarios[0].cantidadVendidos;
    }

    res.json({ totalPago: 0, cantidadVendidos: totalCantidadVendidos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const obtenerTotalesNiniosYAdultosEnCabaniaDashboard = async (req, res) => {
  try {

    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "cabania" } },
      { $group: {
        _id: null,
        totalNinios: { $sum: "$historial.ninios" },
        totalAdultos: { $sum: "$historial.adultos" }
      }}
    ]);

    const resultadoCabanias = await Cabania.aggregate([
      { $match: { "servicio": "cabania" } },
      { $group: {
        _id: null,
        totalNinios: { $sum: "$cantidadPersonas.ninios" },
        totalAdultos: { $sum: "$cantidadPersonas.adultos" }
      }}
    ]);


    let totalNinios = 0;
    let totalAdultos = 0;

    if (resultadoUsuarios.length > 0) {
      totalNinios += resultadoUsuarios[0].totalNinios;
      totalAdultos += resultadoUsuarios[0].totalAdultos;
    }

    if (resultadoCabanias.length > 0) {
      totalNinios += resultadoCabanias[0].totalNinios;
      totalAdultos += resultadoCabanias[0].totalAdultos;
    }

    res.json({ totalNinios, totalAdultos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};


export const totalgeneradoCabaniaDashboard = async (req, res) => {
  try {
    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "cabania" } },
      { $group: {
        _id: null,
        totalPago: { $sum: "$historial.pago" },
        totalPagoPendiente: { $sum: "$historial.pagoPendiente" }
      }}
    ]);

    const resultadoCabanias = await Cabania.aggregate([
      { $match: { "servicio": "cabania" } },
      { $group: {
        _id: null,
        totalPago: { $sum: "$pagoAnticipado" },
        totalPagoPendiente: { $sum: "$pagoPendiente" }
      }}
    ]);

    let totalPago = 0;
    let totalPagoPendiente = 0;

    if (resultadoUsuarios.length > 0) {
      totalPago += resultadoUsuarios[0].totalPago;
      totalPagoPendiente += resultadoUsuarios[0].totalPagoPendiente;
    }

    if (resultadoCabanias.length > 0) {
      totalPago += resultadoCabanias[0].totalPago;
      totalPagoPendiente += resultadoCabanias[0].totalPagoPendiente;
    }

    res.json({ totalPago, totalPagoPendiente });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

//dashboard habitaciones

export const obtenerTotalesNiniosYAdultosEnHabitaciones = async (req, res) => {
  try {

    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "habitaciones" } },
      { $group: {
        _id: null,
        totalNinios: { $sum: "$historial.ninios" },
        totalAdultos: { $sum: "$historial.adultos" }
      }}
    ]);

    const resultadoCabanias = await Habitaciones.aggregate([
      { $match: { "servicio": "habitaciones" } },
      { $group: {
        _id: null,
        totalNinios: { $sum: "$cantidadPersonas.ninios" },
        totalAdultos: { $sum: "$cantidadPersonas.adultos" }
      }}
    ]);


    let totalNinios = 0;
    let totalAdultos = 0;

    if (resultadoUsuarios.length > 0) {
      totalNinios += resultadoUsuarios[0].totalNinios;
      totalAdultos += resultadoUsuarios[0].totalAdultos;
    }

    if (resultadoCabanias.length > 0) {
      totalNinios += resultadoCabanias[0].totalNinios;
      totalAdultos += resultadoCabanias[0].totalAdultos;
    }

    res.json({ totalNinios, totalAdultos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalgeneradoHabitaciones = async (req, res) => {
  try {
    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "habitaciones" } },
      { $group: {
        _id: null,
        totalPago: { $sum: "$historial.pago" },
        totalPagoPendiente: { $sum: "$historial.pagoPendiente" }
      }}
    ]);

    const resultadoCabanias = await Habitaciones.aggregate([
      { $match: { "servicio": "habitaciones" } },
      { $group: {
        _id: null,
        totalPago: { $sum: "$pagoAnticipado" },
        totalPagoPendiente: { $sum: "$pagoPendiente" }
      }}
    ]);

    let totalPago = 0;
    let totalPagoPendiente = 0;

    if (resultadoUsuarios.length > 0) {
      totalPago += resultadoUsuarios[0].totalPago;
      totalPagoPendiente += resultadoUsuarios[0].totalPagoPendiente;
    }

    if (resultadoCabanias.length > 0) {
      totalPago += resultadoCabanias[0].totalPago;
      totalPagoPendiente += resultadoCabanias[0].totalPagoPendiente;
    }

    res.json({ totalPago, totalPagoPendiente });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalProductosCortesiasHabitacionesHistorialDashboard = async (req, res) => {
  try {
    const resultadoCabania = await Habitaciones.aggregate([
      { $unwind: "$restaurante" },
      { $match: { "restaurante.precio": 0, "restaurante.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        cantidadVendidos: { $sum: "$restaurante.cantidad" }
      }},
      { $unwind: "$bebidas" },
      { $match: { "bebidas.precio": 0, "bebidas.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        cantidadVendidos: { $sum: "$bebidas.cantidad" }
      }}
    ]);

    const resultadoUsuarios = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "habitaciones" }},
      { $unwind: "$historial.restaurante" },
      { $match: { "historial.restaurante.precio": 0, "historial.restaurante.mensaje": "Cortesía"}},
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.restaurante.cantidad", "$historial.restaurante.precio"] } },
        cantidadVendidos: { $sum: "$historial.restaurante.cantidad" }
      }},
      { $unwind: "$historial.bebidas" },
      { $match: { "historial.bebidas.precio": 0, "historial.bebidas.mensaje": "Cortesía" } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.bebidas.cantidad", "$historial.bebidas.precio"] } },
        cantidadVendidos: { $sum: "$historial.bebidas.cantidad" }
      }}
    ]);

    let totalCantidadVendidos = 0;
    if (resultadoCabania.length > 0) {
      totalCantidadVendidos += resultadoCabania[0].cantidadVendidos;
    }
    if (resultadoUsuarios.length > 0) {
      totalCantidadVendidos += resultadoUsuarios[0].cantidadVendidos;
    }

    res.json({ totalPago: 0, cantidadVendidos: totalCantidadVendidos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalProductosVendidosHistorialHabitacionesDashboard = async (req, res) => {
  try {
    const resultado = await Usuario.aggregate([
      { $unwind: "$historial" },
      { $match: { "historial.servicio": "habitaciones" } },
      { $unwind: "$historial.restaurante" },
      { $match: { "historial.restaurante.precio": { $gt: 0 } } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.restaurante.cantidad", "$historial.restaurante.precio"] } },
        cantidadVendidos: { $sum: "$historial.restaurante.cantidad" }
      }},
      { $unwind: "$historial.bebidas" },
      { $match: { "historial.bebidas.precio": { $gt: 0 } } },
      { $group: {
        _id: null,
        totalPago: { $sum: { $multiply: ["$historial.bebidas.cantidad", "$historial.bebidas.precio"] } },
        cantidadVendidos: { $sum: "$historial.bebidas.cantidad" }
      }}
    ]);

    if (resultado.length > 0) {
      res.json({ totalPago: resultado[0].totalPago, cantidadVendidos: resultado[0].cantidadVendidos });
    } else {
      res.json({ totalPago: 0, cantidadVendidos: 0 });
    }
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalPructosVendidosHabitacionesDashboard = async (req, res) => {
  try {
    const result = await Habitaciones.aggregate([
      {
        $match: {
          servicio: 'habitaciones',
        },
      },
      {
        $project: {
          totalPago: {
            $sum: {
              $map: {
                input: {
                  $concatArrays: ['$restaurante', '$bebidas'],
                },
                as: 'item',
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: ['$$item.precio', 0] },
                        { $gt: ['$$item.cantidad', 0] },
                      ],
                    },
                    then: { $multiply: ['$$item.cantidad', '$$item.precio'] },
                    else: 0,
                  },
                },
              },
            },
          },
          cantidadVendidos: {
            $sum: {
              $cond: {
                if: { $gt: ['$restaurante.precio', 0] },
                then: '$restaurante.cantidad',
                else: 0,
              },
            },
          },
        },
      },
    ]);

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ totalPago: 0, cantidadVendidos: 0 });
    }
  } catch (error) {
    console.error('Error al obtener los datos: ', error);
    res.status(500).send('Error al procesar la solicitud');
  }
};


