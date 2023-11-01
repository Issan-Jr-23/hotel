import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";

import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import chevron from "../../images/right.png";
import plus from "../../images/plus.png";
import plusb from "../../images/plus_blue.png";
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [users, setUsers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);

  const [cantidadBebida, setCantidadBebida] = useState(1);
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState('');
  const [precioBebidaSeleccionada, setPrecioBebidaSeleccionada] = useState(0);
  const [bebidaSeleccionadaId, setBebidaSeleccionadaId] = useState(null);


  const [cantidadFood, setCantidadFood] = useState(1);
  const [foodSeleccionada, setFoodSeleccionada] = useState('');
  const [precioFoodSeleccionada, setPrecioFoodSeleccionada] = useState(0);
  const [foodSeleccionadaId, setFoodSeleccionadaId] = useState(null);

  const [selectedClientId, setSelectedClientId] = useState(null);
  const [cantidadDeBebidas, setCantidadDeBebidas] = useState('');
  const [cantidadDeFood, setCantidadDeFood] = useState('');

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editPago, setEditPago] = useState("");

  const [cantidadBebidaN, setCantidadBebidaN] = useState(1);
  const [bebidaSeleccionadaN, setBebidaSeleccionadaN] = useState('');
  const [precioBebidaSeleccionadaN, setPrecioBebidaSeleccionadaN] = useState(0);
  const [bebidaSeleccionadaIdN, setBebidaSeleccionadaIdN] = useState(null);




  const options = ["Si", "No"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    nombre: "",
    reserva: "",
    cantidadPersonas: {
      adultos: "",
      ninios: "",
    },
    mediosDePago: "",
    pagoAnticipado:"",
    mediosDePagoPendiente:"",
    pagoPendiente:"",
    bebidas:"",
    restaurante:""
    
  });

  




  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      cantidadPersonas: {
        ...formData.cantidadPersonas,
        [fieldName]: parseInt(value, 10),
      },
    });
  };

  const handleReservaChange = (selectedSize) => {
    setFormData({
      ...formData,
      reserva: selectedSize,
    });
  };



  const actualizarInventario = async (bebidaId, VentaAdultos, VentaNinios) => {
    const response = await axios.post('http://127.0.0.1:3000/api/actualizar-inventario', {
       bebidaId,
       VentaAdultos,
       VentaNinios
    });
    // Maneja la respuesta como lo necesites
 }
 



  const handleBebidasChange = (selectedIndex) => {
    const selectedDrink = drinks[selectedIndex];
    console.log(selectedDrink);
    setFormData({
      ...formData,
      bebidas: [selectedDrink],
    });
    console.log(formData)
  };


  const handleRestauranteChange = (selectedIndex) => {
    const selectedSnack = snacks[selectedIndex];
    console.log(selectedSnack);
    setFormData({
      ...formData,
      restaurante: selectedSnack,
    });
    console.log(formData)
  };






  const actualizarCantidadBebida = (bebidaSeleccionada, cantidadDeseada) => {
    axios.put('http://localhost:3000/api/update-bebidas', {
      bebida: bebidaSeleccionada,
      cantidad: cantidadDeseada,
    })
    .then(response => {
      console.log('Cantidad de bebida actualizada con éxito:', response.data);
    })
    .catch(error => {
      console.error('Error al actualizar la cantidad de bebida:', error);
    });
  };




// Función para actualizar el inventario de bebidas en el servidor.
const actualizarInventarioBebida = async (bebidaId, cantidad) => {
  try {
      const response = await axios.post('http://127.0.0.1:3000/api/actualizar-inventario-bebida', {
          id: bebidaId,
          cantidad,
      });

      if (response.status < 200 || response.status >= 300) {
          throw new Error(`Error al actualizar el inventario. Estado de la respuesta: ${response.status}`);
      }
  } catch (error) {
      console.error('Error al actualizar el inventario de bebidas:', error.message);
      throw error;  // Re-throw para ser capturado en handleGuardarBebida
  }
};

const handleGuardarBebida = async () => {
  console.log(" id del cliente " + selectedClientId);
  
  try {
      if (!selectedClientId || !bebidaSeleccionadaId) {
          throw new Error('No se ha seleccionado un cliente o una bebida.');
      }

      // Verifica la disponibilidad de la bebida antes de proceder
      const response = await axios.get(`http://127.0.0.1:3000/api/verificar-disponibilidad/${bebidaSeleccionadaId}`);
      const cantidadRestante = response.data.cantidadRestante;
      const cantidadInicial = response.data.CantidadInicial
      if(cantidadBebida > cantidadInicial){
        alert("La bebida no tiene suficiente stock");
      }else if (cantidadBebida > cantidadRestante) {
          alert(`Solo quedan ${cantidadRestante} unidades disponibles en el inventario.`);
          return;  // Termina la función aquí, no procedas con el proceso de guardar
      }

      let isBebidaAdultoAdded = false;

      if (cantidadBebida > 0 && bebidaSeleccionadaId && selectedClientId) {
          const bebidaAdultos = {
              id: bebidaSeleccionadaId,
              nombre: bebidaSeleccionada,
              cantidad: cantidadBebida,
              precio: precioBebidaSeleccionada,
          };

          await guardarBebida(bebidaAdultos);

          // Actualizar el inventario después de guardar la bebida para el cliente
          await actualizarInventarioBebida(bebidaSeleccionadaId, cantidadBebida);

          isBebidaAdultoAdded = true;
          console.log("Adultos" + bebidaAdultos);
      }

      if (!isBebidaAdultoAdded) {
          alert("No se ha agregado una bebida para adultos");
      }

      onClose();
  } catch (error) {
      console.error('Error al guardar las bebidas en el cliente:', error.message);
  }
};

// Función para hacer la petición de guardar la bebida en el cliente.
const guardarBebida = async (bebida) => {
  try {
      const response = await axios.post('http://127.0.0.1:3000/api/pasadia-agregar-bebida', {
          id: selectedClientId,
          bebida,
      });
      console.log("peticion: ", selectedClientId);
      onClose();
      if (response.status < 200 || response.status >= 300) {
          throw new Error(`Error al agregar la bebida. Estado de la respuesta: ${response.status}`);
      }
  } catch (error) {
      console.error('Error al guardar la bebida en el cliente:', error.message);
      throw error;  // Re-throw para ser capturado en handleGuardarBebida
  }
};

//////////////////////////////////////////////////////////////////



// Función para actualizar el inventario de bebidas en el servidor.
const actualizarInventariofood = async (foodId, cantidad) => {
  try {
      const response = await axios.post('http://127.0.0.1:3000/api/actualizar-inventario-food', {
          id: foodId,
          cantidad,
      });

      if (response.status < 200 || response.status >= 300) {
          throw new Error(`Error al actualizar el inventario. Estado de la respuesta: ${response.status}`);
      }
  } catch (error) {
      console.error('Error al actualizar el inventario de bebidas:', error.message);
      throw error;  // Re-throw para ser capturado en handleGuardarBebida
  }
};

const handleGuardarFood = async () => {
  console.log(" id del cliente " + selectedClientId);
  
  try {
      if (!selectedClientId || !foodSeleccionadaId) {
          throw new Error('No se ha seleccionado un cliente o una bebida.');
      }

      // Verifica la disponibilidad de la bebida antes de proceder
      const response = await axios.get(`http://127.0.0.1:3000/api/verificar-disponibilidad-food/${foodSeleccionadaId}`);
      const cantidadRestante = response.data.cantidadRestante;
      const cantidadInicial = response.data.CantidadInicial
      if(cantidadFood > cantidadInicial){
        alert("La bebida no tiene suficiente stock");
      }else if (cantidadFood > cantidadRestante) {
          alert(`Solo quedan ${cantidadRestante} unidades disponibles en el inventario.`);
          return;  // Termina la función aquí, no procedas con el proceso de guardar
      }

      let isFoodClientAdded = false;

      if (cantidadFood > 0 && foodSeleccionadaId && selectedClientId) {
          const foodclient = {
              id: foodSeleccionadaId,
              nombre: foodSeleccionada,
              cantidad: cantidadFood,
              precio: precioFoodSeleccionada,
          };

          await guardarFood(foodclient);

          // Actualizar el inventario después de guardar la bebida para el cliente
          await actualizarInventariofood(foodSeleccionadaId, cantidadFood);

          isFoodClientAdded = true;
          console.log("Adultos" + foodclient);
      }

      if (!isFoodClientAdded) {
          alert("No se ha agregado una bebida para adultos");
      }

      
  } catch (error) {
      console.error('Error al guardar las bebidas en el cliente:', error.message);
  }
};

// Función para hacer la petición de guardar la bebida en el cliente.
const guardarFood = async (food) => {
  try {
      const response = await axios.post('http://127.0.0.1:3000/api/pasadia-agregar-food', {
          id: selectedClientId,
          food,
      });
      console.log("peticion: ", selectedClientId);
      closeModalF()
      if (response.status < 200 || response.status >= 300) {
          throw new Error(`Error al agregar la bebida. Estado de la respuesta: ${response.status}`);
      }
  } catch (error) {
      console.error('Error al guardar la bebida en el cliente:', error.message);
      throw error;  // Re-throw para ser capturado en handleGuardarBebida
  }
};

  









  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/pasadia-clientes");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/pasadia-registrar-cliente", formData);
      onClose();
      toast.success('Cliente agregado exitosamente!');
      setFormData({
        identificacion: "",
        nombre: "",
        reserva: "",
        pagoPendienteTotal: "",
        bebidas: "",
        restaurante: "",
        totalConsumo: "",
      });
      const response = await axios.get("http://127.0.0.1:3000/api/pasadia-clientes");
      setUsers(response.data);
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleFormSubmitB = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/pasadia-registrar-cliente", formData);
      onClose();
      toast.success('bebida agregada exitosamente');
      setFormData({
        bebidas: ""
      });
      const response = await axios.get("http://127.0.0.1:3000/api/pasadia-clientes");
      setUsers(response.data);
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/pasadia/edit/${editedUserId}`,
        {
          nombre: editedName,
          pagoPendienteTotal: editPago
        }
      );
      const updatedUsers = users.map((user) =>
        user.identificacion === editedUserId ? { ...user, nombre: editedName, pagoPendienteTotal: editPago } : user
      );
      setUsers(updatedUsers);
      setEditedName("");
      setEditPago("");
      setEditedUserId(null);
      toast.success('Cliente actualizado exitosamente!');
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Error al editar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleDeleteUser = async (identificacion) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:3000/api/pasadia/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/drinks");
        setDrinks(response.data);
        setCantidadDeBebidas(response.data)
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/food");
        setSnacks(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);


  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const { isOpen: isFirstModalOpen, onOpen: openFirstModal, onClose: closeFirstModal } = useDisclosure();
  const sizes = ['4xl'];
  const [selectedSize, setSelectedSize] = React.useState('');

  const handleOpen = (size) => {
    setSelectedSize(size);
    openFirstModal();
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const [size, setSize] = React.useState('md')

  const sizess = [ "5xl",];

  const handleOpenM = (size) => {
    setSize(size)
  }



  const {isOpen: isModalOpenM, onOpen: openModalM, onClose: closeModalM} = useDisclosure();
  const {isOpen: isModalOpenF, onOpen: openModalF, onClose: closeModalF} = useDisclosure();


  const sizesm = ["xs"];

  const handleOpenm = (size,userId) => {
    setSelectedSize(size);
    setSelectedClientId(userId);
    openModalM();
};

  const handleOpenmf = (size,userId) => {
    setSelectedSize(size);
    setSelectedClientId(userId);
    openModalF();
};


  const {isOpen: isModalOpenMc, onOpen: openModalMc, onClose: closeModalMc} = useDisclosure();


  const sizesmc = ["xs"];

  const handleOpenmc = (size) => {
    setSize(size)
    openModalMc();
  }



  const handleOpenModalBca = (cliente) => {
    // setSelectedClientId(cliente._id);
    setModalOpen(true);
  };




  return (
    <div className="max-w-full w-98 mx-auto">
      <Toaster />
      <div className="flex justify-between px-5">
        <div className=" ">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="flat"
              
              onClick={() => {
                setBackdrop("blur");
                onOpen();
              }}
              className="capitalize text-white bg-gradient-to-r from-emerald-400 to-cyan-500"
            >
              Agregar Cliente
            </Button>
          </div>
          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                  <ModalBody>
                   
                    <Input
                      required
                      id="nombre"
                      name="nombre"
                      type="text"
                      
                      variant="flat"
                      label="Nombre de usuario"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                     
                    <Select
                      required
                      id="reserva"
                      name="reserva"
                      label="¿La reserva fue realizada?"
                      className="max-w-full w-full"
                      value={formData.reserva}
                      onChange={(event) => handleReservaChange(event.target.value)}
                    >
                      {options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      required
                      id="adultos"
                      name="adultos"
                      type="number"
                      variant="flat"
                      label="Cantidad de Adultos"
                      value={formData.cantidadPersonas.adultos}
                      onChange={(event) => handleInputChange(event, "adultos")}
                    />

                    <Input
                      required
                      id="ninios"
                      name="ninios"
                      type="number"
                      variant="flat"
                      label="Cantidad de Niños"
                      value={formData.cantidadPersonas.ninios}
                      onChange={(event) => handleInputChange(event, "ninios")}
                    />
                    <select
                      id="mediosDePago"
                      name="mediosDePago"
                      value={formData.mediosDePago}
                      onChange={(event) => handleInputChange(event)} 
                    >
                      <option value="">Seleccione un tipo</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="nequi">Nequi</option>
                      <option value="daviplata">Daviplata</option>
                      <option value="pse">PSE</option>
                      <option value="efecty">Efecty</option>
                      <option value="transferencia">Transferencia</option>
                    </select>
                    <Input
                      required
                      id="pagoAnticipado"
                      name="pagoAnticipado"
                      className=""
                      type="number"
                      variant="flat"
                      label="Pago anticipado"
                      value={formData.pagoAnticipado}
                      onChange={handleInputChange}
                    />
                    <select
                      id="mediosDePagoPendiente"
                      name="mediosDePagoPendiente"
                      value={formData.mediosDePagoPendiente}
                      onChange={(event) => handleInputChange(event)} 
                    >
                      <option value="">Seleccione un tipo</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="nequi">Nequi</option>
                      <option value="daviplata">Daviplata</option>
                      <option value="pse">PSE</option>
                      <option value="efecty">Efecty</option>
                      <option value="transferencia">Transferencia</option>
                    </select>
                    <Input
                      required
                      id="pagoPendiente"
                      name="pagoPendiente"
                      className=""
                      type="number"
                      variant="flat"
                      label="Pago anticipado"
                      value={formData.pagoPendiente}
                      onChange={handleInputChange}
                    />

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onClick={handleFormSubmitB}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="flex items-center justify-center ">
          <img
            className="w-10 h-10 cursor-pointer flex items-center justify-center "
            src={download}
            alt="actualizar"
          />
        </div>
      </div>


      <section className="flex coluns-2 border-3 mt-5 mx-5 rounded-t-2xl border-blue-300">
        <Table className=" text-center" aria-label="Lista de Usuarios">
          <TableHeader className="text-center">
            <TableColumn  classNames={{
        wrapper: "max-h-[382px]",
      }}  className="text-center max-w-xs">+</TableColumn>
            <TableColumn className="text-center max-w-xs">ID</TableColumn>
            <TableColumn className="text-center ">Nombre</TableColumn>
            <TableColumn className="text-center ">Reserva</TableColumn>
            <TableColumn className="text-center ">Adultos</TableColumn>
            <TableColumn className="text-center ">Niños</TableColumn>
            <TableColumn className="text-center ">Niños</TableColumn>
            <TableColumn className="text-center ">
              Pago pendiente o total
            </TableColumn>
            <TableColumn className="text-center">Fecha de registro</TableColumn>
            <TableColumn className="text-center">add bebida</TableColumn>
            <TableColumn className="text-center">add bebida</TableColumn>
            <TableColumn className="text-center">add bebida</TableColumn>
            <TableColumn className="text-center">add comida</TableColumn>
            <TableColumn className="text-center">Consumo total</TableColumn>
            <TableColumn className="text-center">Acción</TableColumn>
          </TableHeader>








          <TableBody emptyContent="No hay elementos por mostrar" className="">
            {users.map((cliente) => (
              
              <TableRow key={cliente._id}>


                {/* -------------------MODAL DE PRODUCTOS SELECCIONADOS*/}

               


                <TableCell>
                {sizess.map((size) => (
                <Button className="bg-white" key={size} onPress={() => handleOpenM(size)} onClick={() => handleOpenModal(cliente)}>
                  <img className="w-4" src={chevron} alt="" />
                </Button>
                  ))}
                {selectedUser && (
                <Modal size={size}  isOpen={isModalOpen} onClose={closeModal} className="w-8/12">
                  <ModalContent >
                    <ModalHeader className="border-b-3 border-blue-500 text-3xl flex  justify-between">
                      <div className="mb-0.5">History</div>
                      <div className="uppercase"> {selectedUser.nombre}</div>
                    </ModalHeader>
                    <ModalBody className="uppercase flex">
                      <div className="flex w-full">
                        <section className="flex justify-between w-full flex-wrap border-3">

                          {/* Sección de Productos (Bebidas + Comidas) */}
                          <div className="mx-5 my-1 border-2 w-full">
                            <h4 className="text-green-600">Productos (Bebidas y Comidas)</h4>

                            {/* Combina ambos arrays (bebidas y comidas) y verifica si tiene elementos */}
                            {selectedUser.bebidas && selectedUser.restaurante && 
                            Array.isArray(selectedUser.bebidas) && Array.isArray(selectedUser.restaurante) &&
                            [...selectedUser.bebidas, ...selectedUser.restaurante].length > 0 ? (
                              <table className="w-full text-center">
                                <thead>
                                  <tr>
                                      <th>Nombre</th>
                                      <th>Cantidad</th>
                                      <th>Precio Unitario</th>
                                      <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {/* Muestra los productos (bebidas y comidas) */}
                                    {[...selectedUser.bebidas, ...selectedUser.restaurante].map((producto, index) => (
                                        <tr key={index}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.cantidad * producto.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="border-t-3 border-green-500 pt-2">
                                  <tr>
                                    <td className="w-6/12 text-left"></td>
                                    <td></td>
                                    <td></td>
                                    <td style={{height:"60px", paddingRight: "20px", width: "150px"}} className="text-right">Total: {
                                      [...selectedUser.bebidas, ...selectedUser.restaurante].reduce((acc, producto) => 
                                        acc + (producto.cantidad * producto.precio), 0
                                      )
                                    }</td>
                                  </tr>
                                </tfoot>
                              </table>
                            ) : (
                              <p className="border-4 w-full text-center">No hay productos que mostrar😔</p>
                            )}
                          </div>

                        </section>
                      </div>
                    </ModalBody>


                    <ModalFooter>
                      <Button color="danger" variant="light" onClick={closeModal}>
                        Cerrar
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              )}
                </TableCell>

              {/* --------------------FIN DEL MODAL */}
              

              <TableCell  className="w-2/12">
                  ID
                </TableCell>













                
                <TableCell>
                  {cliente._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                  ) : (
                    cliente.nombre
                  )}
                </TableCell>
                <TableCell>{cliente.reserva}</TableCell>
                <TableCell>
                  {cliente._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        type="number"
                        value={editPago}
                        onChange={(e) => setEditPago(e.target.value)}
                      />
                    </div>
                  ) : (
                    cliente.cantidadPersonas.adultos
                  )}
                </TableCell>
                <TableCell>{cliente.cantidadPersonas.ninios}</TableCell>
                <TableCell>{cliente.mediosDePago}</TableCell>
                <TableCell>{cliente.pagoAnticipado}</TableCell>
                <TableCell>{cliente.fechaDeRegistro}</TableCell>
                <TableCell>{cliente.mediosDePagoPendiente}</TableCell>
                <TableCell>{cliente.pagoPendiente}</TableCell>

                   
                     
                      <TableCell key={cliente._id} className=" ">
                  
                      <div className=" flex justify-center">
                      <div className="flex flex-wrap gap-3">
                          {sizesm.map((size) => (
                            <Button className="bg-white-100" key={size} onPress={() => handleOpenm(size,cliente._id)}>
                              <img className="w-7 h-7" src={plus} alt="" />
                            </Button>
                          ))}
                        </div>

                    <Modal size={size} isOpen={isModalOpenM} onClose={closeModalM}>
                      <ModalContent>
                        {(closeModalM) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">BEBIDAS</ModalHeader>
                            <ModalBody>
                              <Input
                                name="bebidas"
                                label="Ingrese la cantidad para adultos"
                                type="number"
                                value={isNaN(cantidadBebida) ? '' : cantidadBebida}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadBebida(isNaN(value) ? 0 : value);
                                }}
                              />
                              <Select
                                name="bebidas"
                                label="Seleccionar bebida para adultos"
                                value={bebidaSeleccionada}
                                onChange={(e) => {
                                  const selectedBebida = e.target.value;
                                  setBebidaSeleccionada(selectedBebida);

                                  const bebidaSeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida);
                                  if (bebidaSeleccionadaInfo) {
                                    setPrecioBebidaSeleccionada(bebidaSeleccionadaInfo.ValorUnitario);
                                    setBebidaSeleccionadaId(bebidaSeleccionadaInfo._id);
                                  }
                                }}
                              >
                                {drinks.map((bebida) => (
                                  <SelectItem key={bebida.Descripcion}>
                                    {bebida.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" variant="light" onPress={closeModalM}>
                                Close
                              </Button>
                              <Button onClick={handleGuardarBebida}>
                                Guardar Bebidas
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>


                      </div>
                
                      </TableCell>
                    







                  <TableCell key={cliente.id} className="">
                        <div className="flex flex-wrap gap-3">
                          {sizesm.map((size) => (
                            <Button className="bg-white-100" key={size} onPress={() => handleOpenmf(size,cliente._id)}>
                              <img className="w-7 h-7" src={plus} alt="" />
                            </Button>
                          ))}
                        </div>

                        <Modal size={size} isOpen={isModalOpenF} onClose={closeModalF}>
                      <ModalContent>
                        {(closeModalF) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">COMIDAS</ModalHeader>
                            <ModalBody>
                              <Input
                                name="restaurante"
                                label="Ingrese la cantidad para adultos"
                                type="number"
                                value={isNaN(cantidadFood) ? '' : cantidadFood}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadBebida(isNaN(value) ? 0 : value);
                                }}
                              />
                              <Select
                                name="bebidas"
                                label="Seleccionar bebida para adultos"
                                value={foodSeleccionada}
                                onChange={(e) => {
                                  const selectedFood = e.target.value;
                                  setFoodSeleccionada(selectedFood);

                                  const foodSeleccionadaInfo = snacks.find(food => food.Descripcion === selectedFood);
                                  if (foodSeleccionadaInfo) {
                                    setPrecioFoodSeleccionada(foodSeleccionadaInfo.ValorUnitario);
                                    setFoodSeleccionadaId(foodSeleccionadaInfo._id);
                                  }
                                }}
                              >
                                {snacks.map((food) => (
                                  <SelectItem key={food.Descripcion}>
                                    {food.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" variant="light" onPress={closeModalF}>
                                Close
                              </Button>
                              <Button onClick={handleGuardarFood}>
                                Guardar Bebidas
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>

                  </TableCell>













































                {/* {cliente.bebidas.map((bebida, index) => (
                  <TableCell key={index}>{bebida?.nombre || "aun no hay bebidas"}</TableCell>
                ))} */}
                {/* {cliente.restaurante.map((food, index) => (
                  <TableCell key={index}>{food?.nombre || "aun no hay bebidas"}</TableCell>
                ))} */}

                <TableCell>{cliente.totalConsumo}</TableCell>
                <TableCell className="flex justify-center align-center pr-5 w-60">
                  {cliente.identificacion === editedUserId && (
                    <div className="flex">
                      <img
                        className="w-8 h-8 mr-4 cursor-pointer"
                        src={download}
                        alt="actualizar"
                        onClick={handleEditUser}
                      />
                    </div>
                  )}
                  <img
                    className="w-8 h-8 mr-4 cursor-pointer"
                    src={editar}
                    alt="Edit"
                    onClick={() => {
                      setEditedUserId(cliente._id);
                    }}
                  />
                  <img
                    className="w-8 h-8 cursor-pointer"
                    src={borrar}
                    alt="Delete"
                    onClick={() => handleDeleteUser(cliente._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
