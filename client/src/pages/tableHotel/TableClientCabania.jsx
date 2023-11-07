import React, { useState, useEffect, useMemo } from "react";
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
  RadioGroup, Radio, Checkbox,Popover, PopoverTrigger, PopoverContent
} from "@nextui-org/react";

import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import chevron from "../../images/right.png";
import plus from "../../images/plus.png";
import plusb from "../../images/plus_blue.png";
import toast, { Toaster } from 'react-hot-toast';
// import "./tables.css"
import "../table/table.css"

export default function App() {

  //#region 

  const [esCortesia, setEsCortesia] = useState(false);

  const handleCortesiaChange = (event) => {
    setEsCortesia(event.target.value === "cortesia");
  };
  
  const [users, setUsers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);

  const [cantidadBebida, setCantidadBebida] = useState(1);
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState('');
  const [precioBebidaSeleccionada, setPrecioBebidaSeleccionada] = useState(0);
  const [bebidaSeleccionadaId, setBebidaSeleccionadaId] = useState(null);

  //bebida 2

  const [cantidadBebida1, setCantidadBebida1] = useState(1);
  const [bebida1Seleccionada, setBebida1Seleccionada] = useState('');
  const [precioBebida1Seleccionada, setPrecioBebida1Seleccionada] = useState(0);
  const [bebida1SeleccionadaId, setBebida1SeleccionadaId] = useState(null);

 //comida 1

  const [cantidadFood, setCantidadFood] = useState(1);
  const [foodSeleccionada, setFoodSeleccionada] = useState('');
  const [precioFoodSeleccionada, setPrecioFoodSeleccionada] = useState(0);
  const [foodSeleccionadaId, setFoodSeleccionadaId] = useState(null);

//comida 2

  const [cantidadFood1, setCantidadFood1] = useState(1);
  const [food1Seleccionada, setFood1Seleccionada] = useState('');
  const [precioFood1Seleccionada, setPrecioFood1Seleccionada] = useState(0);
  const [food1SeleccionadaId, setFood1SeleccionadaId] = useState(null);

  const [selectedClientId, setSelectedClientId] = useState(null);
  const [cantidadDeBebidas, setCantidadDeBebidas] = useState('');

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editPago, setEditPago] = useState("");

  



  const options = ["Si", "No"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    identificacion:"",
    nombre: "",
    reserva: "",
    cantidadPersonas: {
      adultos: "",
      ninios: "",
    },
    mediosDePago: "",
    pagoAnticipado: "",
    mediosDePagoPendiente: "",
    pagoPendiente: "",
    fechaPasadia: ""

  });





  
  const [busqueda, setBusqueda] = useState('');

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return users;

    return users.filter((user) => {
      return user.identificacion.toString().includes(busqueda);
    });
  }, [busqueda, users]);

  


  const handleSearchChange = (event) => {
    setBusqueda(event.target.value);
  };


  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;
    
    const totalCosto = (formData.cantidadPersonas.ninios * pasadiaNinios) +
                       (formData.cantidadPersonas.adultos * pasadiaAdultos);
  
    const totalPendiente = totalCosto; 
    console.log(totalPendiente); 
  
    if ((name === 'pagoPendiente' && parseFloat(value) > totalPendiente) ||
        (name === 'pagoAnticipado' && parseFloat(value) > totalCosto)) {
      alert('El monto no puede ser mayor que el costo total o el monto pendiente.');
    } else {
      setFormData({
        ...formData,
        [name]: value,
        ...(fieldName ? { cantidadPersonas: { ...formData.cantidadPersonas, [fieldName]: parseInt(value, 10) } } : {})
      });
    }
  };
  

  const handleReservaChange = (selectedSize) => {
    setFormData({
      ...formData,
      reserva: selectedSize,
    });
  };

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
      throw error;  
    }
  };


  const handleGuardarBebida = async () => {
    console.log("id del cliente " + selectedClientId);
  
    // Function to check stock and update inventory for a given drink
    const checkStockAndUpdateInventory = async (bebidaId, cantidad) => {
      const response = await axios.get(`http://127.0.0.1:3000/api/verificar-disponibilidad/${bebidaId}`);
      const cantidadInicial = response.data.CantidadInicial;
      const cantidadRestante = response.data.cantidadRestante;

      const clienteResponse = await axios.get(`http://127.0.0.1:3000/api/cabania-clientes/${selectedClientId}`);
      const { ninios, adultos } = clienteResponse.data.cantidadPersonas;
      const totalPersonas = ninios + adultos;
      console.log(totalPersonas)
  
      const totalCortesias = cantidadBebida + cantidadBebida1;
      if (totalCortesias > totalPersonas) {
        alert(`La cantidad de cortesías (${totalCortesias}) no puede exceder la cantidad de personas (${totalPersonas}).`);
        return;
      }
  
  
      if (cantidad > cantidadInicial) {
        alert("La bebida no tiene suficiente stock");
        return false;
      } else if (cantidad > cantidadRestante) {
        alert(`Solo quedan ${cantidadRestante} unidades disponibles en el inventario.`);
        return false;
      }
  
      await actualizarInventarioBebida(bebidaId, cantidad);
      return true;
    };
  
    try {
      // Check for client and at least one drink selection
      if (!selectedClientId || (!bebidaSeleccionadaId && !bebida1SeleccionadaId)) {
        throw new Error('No se ha seleccionado un cliente o una bebida.');
      }
  
      if (esCortesia) {
        let atLeastOneCortesiaSaved = false;
  
        // Handle the first drink selection for courtesy
        if (cantidadBebida > 0 && bebidaSeleccionadaId) {
          // Check inventory before saving courtesy drink
          if (await checkStockAndUpdateInventory(bebidaSeleccionadaId, cantidadBebida)) {
            console.log("cortesia 1");
            const bebidaCortesia = {
              id: bebidaSeleccionadaId,
              nombre: bebidaSeleccionada,
              cantidad: cantidadBebida,
              precio: 0,
              mensaje: "Cortesía"
            };
            await guardarBebida(bebidaCortesia);
            console.log(`Cortesía guardada con éxito para ${cantidadBebida} unidades.`);
            atLeastOneCortesiaSaved = true;
          }
        }
  
        // Handle the second drink selection for courtesy
        if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
          // Check inventory before saving courtesy drink
          if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
            console.log("cortesia 2");
            const bebidaCortesia1 = {
              id: bebida1SeleccionadaId,
              nombre: bebida1Seleccionada,
              cantidad: cantidadBebida1,
              precio: 0,
              mensaje: "Cortesía"
            };
            await guardarBebida(bebidaCortesia1);
            console.log(`Cortesía guardada con éxito para ${cantidadBebida1} unidades.`);
            atLeastOneCortesiaSaved = true;
          }
        }
  
        // Close the modal if a courtesy was successfully saved
        if (atLeastOneCortesiaSaved) {
          onClose();
        }
        return; // Exit the function after handling courtesy drinks
      }
  
      let isBebidaAdded = false;
  
      // Handle the first drink selection
      if (cantidadBebida > 0 && bebidaSeleccionadaId) {
        const bebidaAdultos = {
          id: bebidaSeleccionadaId,
          nombre: bebidaSeleccionada,
          cantidad: cantidadBebida,
          precio: precioBebidaSeleccionada,
        };
  
        if (await checkStockAndUpdateInventory(bebidaSeleccionadaId, cantidadBebida)) {
          await guardarBebida(bebidaAdultos);
          isBebidaAdded = true;
          console.log("Bebida para adultos agregada:", bebidaAdultos);
        }
      }
  
      // Handle the second drink selection
      if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
        const bebidaAdultos1 = {
          id: bebida1SeleccionadaId,
          nombre: bebida1Seleccionada,
          cantidad: cantidadBebida1,
          precio: precioBebida1Seleccionada,
        };
  
        if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
          await guardarBebida(bebidaAdultos1);
          isBebidaAdded = true;
          console.log("Segunda bebida para adultos agregada:", bebidaAdultos1);
        }
      }
  
      if (!isBebidaAdded) {
        alert("No se ha agregado ninguna bebida");
      } else {
        onClose(); // Close the modal after adding drinks
      }
    } catch (error) {
      console.error('Error al guardar las bebidas en el cliente:', error.message);
    }
  };
  
  
  
  const guardarBebida = async (bebida) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/cabania-agregar-bebida', {
        id: selectedClientId,
        bebida,
      });
      console.log("peticion: ", response.data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error al agregar la bebida. Estado de la respuesta: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al guardar la bebida en el cliente:', error.message);
      throw error;  
    }
  };

  const actualizarInventarioFood = async (foodId, cantidad) => {
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
      throw error;
    }
  };

  const handleGuardarFood = async () => {
    console.log("id del cliente " + selectedClientId);
  
    const checkStockAndUpdateInventory = async (foodId, cantidad) => {
      const response = await axios.get(`http://127.0.0.1:3000/api/verificar-disponibilidad/${foodId}`);
      const cantidadInicial = response.data.CantidadInicial;
      const cantidadRestante = response.data.cantidadRestante;

      const clienteResponse = await axios.get(`http://127.0.0.1:3000/api/cabania-clientes/${selectedClientId}`);
      const { ninios, adultos } = clienteResponse.data.cantidadPersonas;
      const totalPersonas = ninios + adultos;
      console.log(totalPersonas)
  
      const totalCortesias = cantidadFood + cantidadFood1;
      if (totalCortesias > totalPersonas) {
        alert(`La cantidad de cortesías (${totalCortesias}) no puede exceder la cantidad de personas (${totalPersonas}).`);
        return;
      }
  
      if (cantidad > cantidadInicial) {
        alert("La bebida no tiene suficiente stock");
        return false;
      } else if (cantidad > cantidadRestante) {
        alert(`Solo quedan ${cantidadRestante} unidades disponibles en el inventario.`);
        return false;
      }
  
      await actualizarInventarioFood(foodId, cantidad);
      return true;
    };
  
    try {
      if (!selectedClientId || (!foodSeleccionadaId && !food1SeleccionadaId)) {
        throw new Error('No se ha seleccionado un cliente o una bebida.');
      }
  
      if (esCortesia) {
        let atLeastOneCortesiaSaved = false;
  
        if (cantidadFood > 0 && foodSeleccionadaId) {
          if (await checkStockAndUpdateInventory(foodSeleccionadaId, cantidadFood)) {
            console.log("cortesia 1");
            const foodCortesia = {
              id: foodSeleccionadaId,
              nombre: foodSeleccionada,
              cantidad: cantidadFood,
              precio: 0,
              mensaje: "Cortesía"
            };
            await guardarFood(foodCortesia);
            console.log(`Cortesía guardada con éxito para ${cantidadFood} unidades.`);
            atLeastOneCortesiaSaved = true;
          }
        }
  
        if (cantidadFood1 > 0 && food1SeleccionadaId) {
          if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
            console.log("cortesia 2");
            const foodCortesia1 = {
              id: food1SeleccionadaId,
              nombre: food1Seleccionada,
              cantidad: cantidadFood1,
              precio: 0,
              mensaje: "Cortesía"
            };
            await guardarFood(foodCortesia1);
            console.log(`Cortesía guardada con éxito para ${cantidadFood1} unidades.`);
            atLeastOneCortesiaSaved = true;
          }
        }
  
        // Close the modal if a courtesy was successfully saved
        if (atLeastOneCortesiaSaved) {
          onClose();
        }
        return; // Exit the function after handling courtesy drinks
      }
  
      let isBebidaAdded = false;
  
      // Handle the first drink selection
      if (cantidadFood > 0 && foodSeleccionadaId) {
        const foodAdultos = {
          id: foodSeleccionadaId,
          nombre: foodSeleccionada,
          cantidad: cantidadFood,
          precio: precioFoodSeleccionada,
        };
  
        if (await checkStockAndUpdateInventory(foodSeleccionadaId, cantidadFood)) {
          await guardarFood(foodAdultos);
          isBebidaAdded = true;
          console.log("Bebida para adultos agregada:", foodAdultos);
        }
      }
  
      if (cantidadFood1 > 0 && food1SeleccionadaId) {
        const foodAdultos1 = {
          id: food1SeleccionadaId,
          nombre: food1Seleccionada,
          cantidad: cantidadFood1,
          precio: precioFood1Seleccionada,
        };
  
        if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
          await guardarFood(foodAdultos1);
          isBebidaAdded = true;
          console.log("Segunda bebida para adultos agregada:", foodAdultos1);
        }
      }
  
      if (!isBebidaAdded) {
        alert("No se ha agregado ninguna bebida");
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error al guardar las bebidas en el cliente:', error.message);
    }
  };
  

  const guardarFood = async (food) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/cabania-agregar-food', {
        id: selectedClientId,
        food,
      });
      console.log("peticion: ", selectedClientId);
      onClose();
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error al agregar la bebida. Estado de la respuesta: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al guardar la bebida en el cliente:', error.message);
      throw error; 
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/cabania-clientes");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/cabania-registrar-cliente", formData);
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
      const response = await axios.get("http://127.0.0.1:3000/api/cabania-clientes");
      setUsers(response.data);
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleFormSubmitB = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/cabania-registrar-cliente", formData);
      onClose();
      toast.success('bebida agregada exitosamente');
      setFormData({
        bebidas: ""
      });
      const response = await axios.get("http://127.0.0.1:3000/api/cabania-clientes");
      setUsers(response.data);
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/cabania/edit/${editedUserId}`,
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
      await axios.delete(`http://127.0.0.1:3000/api/cabania/${id}`);
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

  const [size, setSize] = React.useState('5xl')

  const sizess = ["5xl",];

  const handleOpenM = (size) => {
    setSize(size)
  }

  const { isOpen: isModalOpenM, onOpen: openModalM, onClose: closeModalM } = useDisclosure();
  const { isOpen: isModalOpenF, onOpen: openModalF, onClose: closeModalF } = useDisclosure();


  const [ancho, setAncho] = React.useState('md')
  const sizesm = ["xs"];

  const handleOpenm = (size, userId) => {
    setAncho(size);
    setSelectedClientId(userId);
    openModalM();
  };

  const handleOpenmf = (size, userId) => {
    setAncho(size);
    setSelectedClientId(userId);
    openModalF();
  };



  const { isOpen: isModalOpenMc, onOpen: openModalMc, onClose: closeModalMc } = useDisclosure();


  const sizesmc = ["xs"];

  const handleOpenmc = (size) => {
    setSize(size)
    openModalMc();
  }

  const handleOpenModalBca = (cliente) => {
    // setSelectedClientId(cliente._id);
    setModalOpen(true);
  };

  const rol1 = [
    "Administrador de Sistemas",
  ]

  const rol2 = "admin"
  const rol3 = "user"


  const roles = [
    "admin", "user"
  ]


  const pasadiaAdultos = 70000;
  const pasadiaNinios = 50000;

  const [selectedClienteId, setSelectedClienteId] = useState(null);

  const [formDatas, setFormDatas] = useState({
    pagoPendiente: '',
    mediosDePagoPendiente: ''
  });

  const seleccionarCliente = (identificacion) => {
    setSelectedClienteId(identificacion);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormDatas({ ...formDatas, [name]: value });
  };


  const actualizarDatosCliente = async () => {
    if (selectedClienteId) {
      try {
        const response = await axios.put(`http://127.0.0.1:3000/api/cabania-clientes/${selectedClienteId}/actualizar`, {
          pagoPendiente: formDatas.pagoPendiente,
          mediosDePagoPendiente: formDatas.mediosDePagoPendiente
        });

        console.log('Datos del cliente actualizados:', response.data);
      } catch (error) {
        console.error('Hubo un problema con la petición Axios:', error);
      }
    } else {
      console.error('No hay un cliente seleccionado para actualizar');
    }
  };
 
  //#endregion

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
                      id="identificacion"
                      name="identificacion"
                      type="number"

                      variant="flat"
                      label="IDENTIFICACIÓN DE USUARIO"
                      value={formData.identificacion}
                      onChange={handleInputChange}
                      className="border-blue-400 border-2 rounded-xl"
                    />
                    <Input
                      required
                      id="nombre"
                      name="nombre"
                      type="text"

                      variant="flat"
                      label="NOMBRE DE USUARIO"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="border-blue-400 border-2 rounded-xl"
                    />

                    <Select
                      required
                      id="reserva"
                      name="reserva"
                      label="¿LA RESERVA FUE REALIZADA?"
                      className="max-w-full w-full border-blue-400 border-2 rounded-xl"
                      value={formData.reserva}
                      onChange={(event) => handleReservaChange(event.target.value)}
                    >
                      {options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex">

                    <Input
                      required
                      id="adultos"
                      name="adultos"
                      type="number"
                      variant="flat"
                      label="CANTIDAD DE ADULTOS"
                      value={formData.cantidadPersonas.adultos}
                      onChange={(event) => handleInputChange(event, "adultos")}
                      className="mr-3 border-green-400 border-2 rounded-xl"
                    />

                    <Input
                      required
                      id="ninios"
                      name="ninios"
                      type="number"
                      variant="flat"
                      label="CANTIDAD DE NIÑOS"
                      value={formData.cantidadPersonas.ninios}
                      onChange={(event) => handleInputChange(event, "ninios")}
                      className="ml-3 border-green-400 border-2 rounded-xl" 
                       
                    />
                    </div>
                    <div className="flex">

                    <select
                      id="mediosDePago"
                      name="mediosDePago"
                      
                      value={formData.mediosDePago}
                      onChange={(event) => handleInputChange(event)}
                      className="mr-3 w-6/12 outline-none border-2 rounded-xl border-blue-400"
                    >
                      <option value="">METODO DE PAGO</option>
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
                      className="w-6/12 ml-3 rounded-xl border-2  border-blue-400"
                      type="number"
                      variant="flat"
                      label="PAGO ANTICIPADO"
                      value={formData.pagoAnticipado}
                      onChange={handleInputChange}
                      
                    />
                    </div>
                    <Input
                      name="fechaPasadia"
                      type="date"
                      label="FECHA EN LA QUE DESEA DISFRUTAR EL PASADIA"
                      className="rounded-xl border-2 border-blue-400"
                      placeholder="Fecha en la desea disfrutar el pasadia"
                      value={formData.fechaPasadia}
                      onChange={handleInputChange}
                    />
                    <div className="flex">
                    <select
                    className="w-6/12 mr-3 outline-none rounded-xl border-2 border-blue-400"
                      id="mediosDePagoPendiente"
                      name="mediosDePagoPendiente"
                      value={formData.mediosDePagoPendiente}
                      onChange={(event) => handleInputChange(event)}
                    >
                      <option value="">METODO DE PAGO</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="nequi">Nequi</option>
                      <option value="daviplata">Daviplata</option>
                      <option value="pse">PSE</option>
                      <option value="efecty">Efecty</option>
                      <option value="transferencia">Transferencia</option>
                    </select>
                    <Input
                      id="pagoPendiente"
                      name="pagoPendiente"
                      className="w-6/12 ml-3 border-2 border-blue-400 rounded-xl"
                      type="number"
                      variant="flat"
                      label="PAGO ANTICIPADO"
                      value={formData.pagoPendiente}
                      onChange={handleInputChange}
                    />
                    </div>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onClick={handleFormSubmit}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="w-52 flex justify-center">

        <input
        id="s"
        type="search"
        label="busca el producto"
        value={busqueda}
        onChange={handleSearchChange}
        className="w-10 h-10"
        >
      </input>
        </div>
        <div className="flex items-center justify-center w-32 ml-3 ">
          <img
            className="w-10 h-10 cursor-pointer flex items-center justify-center "
            src={download}
            alt="actualizar"
          />
        </div>
      </div>
        
      <section className="flex coluns-2 border-3 mt-5 mx-5 rounded-t-2xl border-blue-300">
          {/* Input de búsqueda */}
        <Table className=" text-center uppercase" aria-label="Lista de Usuarios">
          <TableHeader className="text-center">
            <TableColumn className="text-center">+</TableColumn>
            <TableColumn className="text-center max-w-xs">ID</TableColumn>
            <TableColumn className="text-center ">Nombre</TableColumn>
            <TableColumn className="text-center ">Reserva</TableColumn>
        
            {/* <TableColumn className="text-center ">Precio niños</TableColumn>
            <TableColumn className="text-center ">Precio adultos</TableColumn>

           
            <TableColumn className="text-center ">Niños</TableColumn>
            <TableColumn className="text-center ">Adultos</TableColumn> */}
            {/* <TableColumn className="text-center ">Metodo de pago</TableColumn>
            <TableColumn className="text-center ">
              Anticipo
            </TableColumn> */}
            {/* <TableColumn className="text-center tables_im">Fecha de registro</TableColumn> */}
            <TableColumn className="text-center tables_im">fecha de inicio del pasadia</TableColumn>
            {/* <TableColumn className="text-center tables_im">Metodo de pago</TableColumn>
            <TableColumn className="text-center tables_im">Pago pendiente o total</TableColumn> */}
            <TableColumn className="text-center">add bebida</TableColumn>
            <TableColumn className="text-center">add comida</TableColumn>
            <TableColumn className="text-center">Pago pendiente</TableColumn>
            {/* <TableColumn className="text-center">Acción</TableColumn> */}
          </TableHeader>

          <TableBody emptyContent="No hay elementos por mostrar" className="">
            {datosFiltrados.map((cliente) => (

              <TableRow className="cursor-pointer hover:bg-blue-200" key={cliente._id}>


                {/* -------------------MODAL DE PRODUCTOS SELECCIONADOS*/}




                <TableCell>
                  {sizess.map((size) => (
                    
                    <Button className="bg-white" key={size} onPress={() => handleOpenM(size)} onClick={() => handleOpenModal(cliente)}>
                      <img className="w-4" src={chevron} alt="" />
                    </Button>
                  ))}
                  {selectedUser && (
                    <Modal size={size} isOpen={isModalOpen} onClose={closeModal} className="w-8/12"
                    classNames={{
                      backdrop: "bg-inherit",
                    }}
                    >
                      <ModalContent >
                        <ModalHeader className="border-b-3 border-blue-500 text-3xl flex  justify-between">
                          <div className="mb-0.5">History</div>
                          <div className="uppercase"> {selectedUser.nombre} - {selectedUser.identificacion}</div>
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
                                        <td style={{ height: "60px", paddingRight: "20px", width: "150px" }} className="text-right">Total: {
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


                <TableCell className="w-2/12">
                <Popover placement="top">
                  <PopoverTrigger>
                  <p onClick={() => seleccionarCliente(cliente.identificacion)}>{cliente.identificacion}</p>
                  </PopoverTrigger>
                  <PopoverContent >
                    { cliente.reserva === "Si" && ((cliente.cantidadPersonas.adultos * pasadiaAdultos) + (cliente.cantidadPersonas.ninios * pasadiaNinios) - (cliente.pagoAnticipado + cliente.pagoPendiente)) !== 0 ?
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Información</div>
                      <div className="text-red-500">Datos del usuario</div>
                      <div>Identificacion: {cliente.identificacion}</div>
                      <div className="text-tiny">Nombre: {cliente.nombre}</div>
                      <div className="text-red-500 text-small font-bold">Pago pendiente</div>
                      <div>{((cliente.cantidadPersonas.adultos * pasadiaAdultos) + (cliente.cantidadPersonas.ninios * pasadiaNinios) - (cliente.pagoAnticipado + cliente.pagoPendiente))}</div>
                      <Input
                        type="number"
                        name="pagoPendiente"
                        placeholder="Ingrse la cantidad"
                        className="border-2 border-blue-500 rounded-xl mt-2"
                        value={formDatas.pagoPendiente}
                      onChange={handleInputChanges}
                      />
                    
                      <div><select
                    className="w-full h-10 mt-2 outline-none rounded-xl border-2 border-blue-400"
                      id="mediosDePagoPendiente"
                      name="mediosDePagoPendiente"
                      value={formDatas.mediosDePagoPendiente}
                      onChange={handleInputChanges}
                    >
                      <option value="">METODO DE PAGO</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="nequi">Nequi</option>
                      <option value="daviplata">Daviplata</option>
                      <option value="pse">PSE</option>
                      <option value="efecty">Efecty</option>
                      <option value="transferencia">Transferencia</option>
                    </select></div>
                    <div className=" flex justify-end mt-2">

                    <Button color="danger" onClick={actualizarDatosCliente}>Guardar</Button>
                    </div>
                    </div>
                    : "Pago completado🤩"
                    }
                  </PopoverContent>
                </Popover>
                </TableCell> 














                <TableCell>
                  {/* {cliente._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                  ) : (
                    cliente.nombre
                  )} */}

                  <Popover placement="bottom" offset={20} showArrow>
                        <PopoverTrigger>
                          <p>{cliente.nombre}</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-small font-bold">Información</div>
                            <div className="text-red-500">Cantidad de personas</div>
                            <div className="text-tiny">Adultos: {cliente.cantidadPersonas.adultos}</div>
                            <div>Niños: {cliente.cantidadPersonas.ninios}</div>
                            <div className="text-red-500">Anticipo de pasadia</div>
                            <div>Metodo de pago: {cliente.mediosDePago}</div>
                            <div>Anticipo: {cliente.pagoAnticipado}</div>
                            <div className="text-red-500">pago pendienete o total</div>
                            <div>Metodo de pago: {cliente.mediosDePagoPendiente}</div>
                            <div>Pago pendiente: {cliente.pagoPendiente}</div>
                            <div>pendiente: {(cliente.cantidadPersonas.adultos * pasadiaAdultos) + (cliente.cantidadPersonas.ninios * pasadiaNinios) - (cliente.pagoAnticipado + cliente.pagoPendiente)}</div>
                          </div>
                        </PopoverContent>
                      </Popover>

                </TableCell>
                <TableCell>{cliente.reserva}</TableCell>
                {/* <TableCell>{pasadiaNinios}</TableCell>
                <TableCell>{pasadiaAdultos}</TableCell> */}
                {/* <TableCell>
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
                <TableCell>{cliente.cantidadPersonas.ninios}</TableCell> */}
                {/* <TableCell>{cliente.mediosDePago}</TableCell>
                <TableCell>{cliente.pagoAnticipado}</TableCell> */}
                {/* <TableCell>{new Date(cliente.fechaDeRegistro).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'  ,
                      day: 'numeric' ,
                    })}</TableCell> */}
                <TableCell>{new Date(cliente.fechaPasadia).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'  ,
                      day: 'numeric' ,
                    })}</TableCell>
                {/* <TableCell>{cliente.mediosDePagoPendiente}</TableCell>
                <TableCell>{cliente.pagoPendiente}</TableCell> */}



                <TableCell key={cliente._id} className=" ">

                <div className=" flex justify-center">
                  <div className="flex flex-wrap gap-3">
                    {sizesm.map((size) => (
                      <Button className="bg-white-100" key={size} onPress={() => handleOpenm(size, cliente._id)}>
                        <img className="w-7 h-7" src={plus} alt="" />
                      </Button>
                    ))}
                  </div>

                  <Modal
                  classNames={{
                    backdrop: "bg-inherit, blur",
                  }}
                  size={ancho} isOpen={isModalOpenM} onClose={closeModalM}>
                    <ModalContent>
                      {(closeModalM) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">BEBIDAS</ModalHeader>
                          <ModalBody>
                          <Checkbox
                            checked={esCortesia}
                            onChange={handleCortesiaChange}
                          >
                            Cortesía
                          </Checkbox>
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
                            <Input
                              name="bebidas"
                              label="Ingrese la cantidad para adultos"
                              type="number"
                              value={isNaN(cantidadBebida1) ? '' : cantidadBebida1}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setCantidadBebida1(isNaN(value) ? 0 : value);
                              }}
                            />
                            <Select
                              name="bebidas"
                              label="Seleccionar bebida para adultos"
                              value={bebida1Seleccionada}
                              onChange={(e) => {
                                const selectedBebida1 = e.target.value;
                                setBebida1Seleccionada(selectedBebida1);

                                const bebida1SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida1);
                                if (bebida1SeleccionadaInfo) {
                                  setPrecioBebida1Seleccionada(bebida1SeleccionadaInfo.ValorUnitario);
                                  setBebida1SeleccionadaId(bebida1SeleccionadaInfo._id);
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
                      <Button className="bg-white-100" key={size} onPress={() => handleOpenmf(size, cliente._id)}>
                        <img className="w-7 h-7" src={plusb} alt="" />
                      </Button>
                    ))}
                  </div>

                  <Modal size={ancho} isOpen={isModalOpenF} onClose={closeModalF}
                    classNames={{
                      backdrop: "bg-inherit",
                    }}
                  >
                    <ModalContent>
                      {(closeModalF) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">COMIDAS</ModalHeader>
                          <ModalBody>
                          <RadioGroup onChange={handleCortesiaChange}>
                          <Radio value="cortesia">Cortesía</Radio>
                        </RadioGroup>
                            <Input
                              name="bebidas"
                              label="Ingrese la cantidad para adultos"
                              type="number"
                              value={isNaN(cantidadFood) ? '' : cantidadFood}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setCantidadFood(isNaN(value) ? 0 : value);
                              }}
                            />
                            <Select
                              name="restaurante"
                              label="Seleccionar comida"
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
                            <Input
                              name="restaurante"
                              label="Ingrese la cantidad para adultos"
                              type="number"
                              value={isNaN(cantidadFood1) ? '' : cantidadFood1}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setCantidadFood1(isNaN(value) ? 0 : value);
                              }}
                            />
                            <Select
                              name="restaurante"
                              label="Seleccionar bebida para adultos"
                              value={food1Seleccionada}
                              onChange={(e) => {
                                const selectedFood1 = e.target.value;
                                setFood1Seleccionada(selectedFood1);

                                const food1SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedFood1);
                                if (food1SeleccionadaInfo) {
                                  setPrecioFood1Seleccionada(food1SeleccionadaInfo.ValorUnitario);
                                  setFood1SeleccionadaId(food1SeleccionadaInfo._id);
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
                <TableCell> {(cliente.cantidadPersonas.adultos * pasadiaAdultos) + (cliente.cantidadPersonas.ninios * pasadiaNinios) - (cliente.pagoAnticipado + cliente.pagoPendiente)}</TableCell>
                {/* <TableCell className="flex justify-center align-center pr-5 w-60">
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
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
