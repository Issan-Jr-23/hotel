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
  RadioGroup, Radio, Checkbox, Popover, PopoverTrigger, PopoverContent, Pagination
} from "@nextui-org/react";

import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import chevron from "../../images/right.png";
import plus from "../../images/plus.png";
import plusb from "../../images/plus_blue.png";
import { SearchIcon } from "../tablePasadia/SearchIcon";
import { PlusIcon } from "../finca/PlusIcon.jsx";
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from "jspdf";
import Swal from 'sweetalert2';
// import "./tables.css"
import "../table/table.css"
import logo from "../../images/logo.png"
import wave from "../../images/wave.png"
import svg from "../../images/svg.png"
import AxiosInstance from "../../api/axios.js";

export default function App() {


  const toBase64 = (url) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });

  //#region 

  const [esCortesia, setEsCortesia] = useState(false);


  const handleCortesiaChange = (event) => {
    setEsCortesia(event.target.checked);
  };

  const [users, setUsers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);

  const [cantidadBebida, setCantidadBebida] = useState("");
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState('');
  const [precioBebidaSeleccionada, setPrecioBebidaSeleccionada] = useState(0);
  const [bebidaSeleccionadaId, setBebidaSeleccionadaId] = useState(null);

  //bebida 2

  const [cantidadBebida1, setCantidadBebida1] = useState("");
  const [bebida1Seleccionada, setBebida1Seleccionada] = useState('');
  const [precioBebida1Seleccionada, setPrecioBebida1Seleccionada] = useState(0);
  const [bebida1SeleccionadaId, setBebida1SeleccionadaId] = useState(null);

  const [cantidadBebida2, setCantidadBebida2] = useState("");
  const [bebida2Seleccionada, setBebida2Seleccionada] = useState('');
  const [precioBebida2Seleccionada, setPrecioBebida2Seleccionada] = useState(0);
  const [bebida2SeleccionadaId, setBebida2SeleccionadaId] = useState(null);

  const [cantidadBebida3, setCantidadBebida3] = useState("");
  const [bebida3Seleccionada, setBebida3Seleccionada] = useState('');
  const [precioBebida3Seleccionada, setPrecioBebida3Seleccionada] = useState(0);
  const [bebida3SeleccionadaId, setBebida3SeleccionadaId] = useState(null);

  const [cantidadBebida4, setCantidadBebida4] = useState("");
  const [bebida4Seleccionada, setBebida4Seleccionada] = useState('');
  const [precioBebida4Seleccionada, setPrecioBebida4Seleccionada] = useState(0);
  const [bebida4SeleccionadaId, setBebida4SeleccionadaId] = useState(null);

  //comida 1

  const [cantidadFood, setCantidadFood] = useState("");
  const [foodSeleccionada, setFoodSeleccionada] = useState('');
  const [precioFoodSeleccionada, setPrecioFoodSeleccionada] = useState(0);
  const [foodSeleccionadaId, setFoodSeleccionadaId] = useState(null);

  //comida 2


  const [cantidadFood1, setCantidadFood1] = useState("");
  const [food1Seleccionada, setFood1Seleccionada] = useState('');
  const [precioFood1Seleccionada, setPrecioFood1Seleccionada] = useState(0);
  const [food1SeleccionadaId, setFood1SeleccionadaId] = useState(null);


  const [cantidadFood2, setCantidadFood2] = useState("");
  const [food2Seleccionada, setFood2Seleccionada] = useState('');
  const [precioFood2Seleccionada, setPrecioFood2Seleccionada] = useState(0);
  const [food2SeleccionadaId, setFood2SeleccionadaId] = useState(null);

  const [cantidadFood3, setCantidadFood3] = useState("");
  const [food3Seleccionada, setFood3Seleccionada] = useState('');
  const [precioFood3Seleccionada, setPrecioFood3Seleccionada] = useState(0);
  const [food3SeleccionadaId, setFood3SeleccionadaId] = useState(null);


  const [cantidadFood4, setCantidadFood4] = useState("");
  const [food4Seleccionada, setFood4Seleccionada] = useState('');
  const [precioFood4Seleccionada, setPrecioFood4Seleccionada] = useState(0);
  const [food4SeleccionadaId, setFood4SeleccionadaId] = useState(null);

  const [selectedClientId, setSelectedClientId] = useState(null);
  const [cantidadDeBebidas, setCantidadDeBebidas] = useState('');

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editPago, setEditPago] = useState("");

  const [errorFechaPasadia, setErrorFechaPasadia] = useState(false);
  const [errorIdentificacion, setErrorIdentificacion] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorReserva, setErrorReserva] = useState(false);
  const [errorAdultos, setErrorAdultos] = useState(false);
  const [errorCabania, setErrorCabania] = useState(false);


  const [cantidadFoodDisponible, setCantidadFoodDisponible] = useState(0);
  const [cantidadFood1Disponible, setCantidadFood1Disponible] = useState(0);
  const [cantidadFood2Disponible, setCantidadFood2Disponible] = useState(0);
  const [cantidadFood3Disponible, setCantidadFood3Disponible] = useState(0);
  const [cantidadFood4Disponible, setCantidadFood4Disponible] = useState(0);

  const [cantidadBebidaDisponible, setCantidadBebidaDisponible] = useState(0);
  const [cantidadBebida1Disponible, setCantidadBebida1Disponible] = useState(0);
  const [cantidadBebida2Disponible, setCantidadBebida2Disponible] = useState(0);
  const [cantidadBebida3Disponible, setCantidadBebida3Disponible] = useState(0);
  const [cantidadBebida4Disponible, setCantidadBebida4Disponible] = useState(0);







  const options = ["Si", "No"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    identificacion: "",
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
    fechaPasadia: "",
    tipo_cabania: "",
    nuevoTotal: ""
  });





  const [valorCabania, setValorCabania] = useState(null);
  const [valorCabaniaM, setValorCabaniaM] = useState(null);
  const [valorPorPersonaAdicional, setValorPorPersonaAdicional] = useState(null);

  const [busqueda, setBusqueda] = useState('');

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return users;

    return users.filter((user) => {
      return user.identificacion.toString().includes(busqueda);
    });
  }, [busqueda, users]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/table-precios");
        const cabanias = response.data.find(item => item.servicio === "cabanias");
        const cabaniasm = response.data.find(item => item.servicio === "cabaniaMayapo");
        const cabaniasmAdicional = response.data.find(item => item.servicio === "adicional");

        if (cabanias) {
          setValorCabania(cabanias.precio);
        } else {
          console.log("No se encontró el servicio de 'cabanias'");
        }

        if (cabaniasm) {
          setValorCabaniaM(cabaniasm.precio);
        } else {
          console.log("No se encontró el servicio de 'cabanias mayapo'");
        }

        if (cabaniasmAdicional) {
          setValorPorPersonaAdicional(cabaniasmAdicional.precio)
        } else {
          console.log("No se encontró el servicio de 'cabanias adicionales'");
        }

      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  console.log("precio de cabanias: " + valorCabania)


  const handleSearchChange = (event) => {
    setBusqueda(event.target.value);
  };


  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;
    let nuevoTotal, totalCosto;


    if (name === 'identificacion') {
      setErrorIdentificacion(!value);
    } else if (name === 'nombre') {
      setErrorNombre(!value);
    } else if (name === 'fechaPasadia') {
      setErrorFechaPasadia(!value);
    } else if (name === 'reserva') {
      setErrorReserva(!value);
    } else if (name === 'adultos') {
      setErrorAdultos(!value);
    } else if (name === 'tipo_cabania') {
      setErrorCabania(!value)
    }


    if (name === "tipo_cabania") {
      totalCosto = value === "Mayapo" ? valorCabaniaM : valorCabania;
    } else {
      totalCosto = formData.tipo_cabania === "Mayapo" ? valorCabaniaM : valorCabania;
    }

    const cantidadDeClientes = formData.cantidadPersonas.ninios + formData.cantidadPersonas.adultos;
    if (cantidadDeClientes > 4) {
      totalCosto += ((cantidadDeClientes - 4) * valorPorPersonaAdicional);
    }


    if (name === 'pagoPendiente' || name === 'pagoAnticipado') {
      const pagoPendiente = name === 'pagoPendiente' ? parseFloat(value) : parseFloat(formData.pagoPendiente || 0);
      const pagoAnticipado = name === 'pagoAnticipado' ? parseFloat(value) : parseFloat(formData.pagoAnticipado || 0);
      const totalPagos = pagoPendiente + pagoAnticipado;

      if (totalPagos > totalCosto) {
        alert('La suma de los montos no puede ser mayor que el costo total.');
      } else {
        nuevoTotal = totalCosto - totalPagos;
        formData.nuevoTotal = nuevoTotal;

        console.log("el total que debe pagar la persona: " + nuevoTotal)


        if (nuevoTotal > 0) {


        }
      }
    }


    console.log("alerta de nuevo total: " + formData.nuevoTotal)


    console.log("total de personas: " + formData.cantidadPersonas.ninios);
    console.log("total costo 3: " + totalCosto);

    const totalPendiente = totalCosto;
    console.log("total costo 2: " + totalPendiente);

    if ((name === 'pagoPendiente' && parseFloat(value) > totalPendiente) ||
      (name === 'pagoAnticipado' && parseFloat(value) > totalCosto)) {
      alert('El monto no puede ser mayor que el costo total o el monto pendiente.');
    } else {
      if ((name === 'ninios' || name === 'adultos')) {
        const nuevosValores = {
          ...formData.cantidadPersonas,
          [fieldName]: parseInt(value, 10)
        };
        const nuevoTotalClientes = nuevosValores.ninios + nuevosValores.adultos;

        if (nuevoTotalClientes !== cantidadDeClientes) {
          formData.pagoAnticipado = "";
        }
      }

      setFormData({
        ...formData,
        [name]: value,
        totalCosto,
        nuevoTotal: formData.nuevoTotal,
        ...(name === "tipo_cabania" && { [name]: value }),
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
      const response = await AxiosInstance.post('/actualizar-inventario-bebida', {
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
  const actualizarStockInicialBebida = async (bebidaId, cantidad) => {
    try {
      const response = await AxiosInstance.post(`/actualizar-stock-inicial/${bebidaId}`, { cantidad });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error al actualizar el stock inicial. Estado de la respuesta: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al actualizar el stock inicial:', error.message);
      throw error;
    }
  };

  const handleGuardarBebida = async () => {
    if (!selectedClientId || (!bebidaSeleccionadaId && !bebida1SeleccionadaId && !bebida2SeleccionadaId && !bebida3SeleccionadaId && !bebida4SeleccionadaId)) {
      toast.error('No se ha seleccionado un cliente o una Bebida.');
      toast.
        return;
    }

    const checkStockAndUpdateInventory = async (bebidaId, cantidad) => {
      const response = await AxiosInstance.get(`/verificar-disponibilidad/${bebidaId}`);

      let fecha = new Date();

      fecha.setHours(fecha.getHours() - 5);

      const fechaAjustada = fecha.toLocaleString();

      const disponibleInventario = response.data.cantidadRestante;

      const clienteResponse = await AxiosInstance.get(`/cabania-clientes/${selectedClientId}`);
      const { ninios, adultos } = clienteResponse.data.cantidadPersonas;
      const numeroDebebidas = clienteResponse.data.cantidadDeBebidas.filter(bebida => bebida.mensaje === "Cortesía" && bebida.fechaDeMarca === "");
      const cantidadTotalCortesia = numeroDebebidas.reduce((total, bebida) => total + bebida.cantidad, 0);
      console.log("numero de cortesias: " + cantidadTotalCortesia)
      console.log("cantidad de bebidas del usuario" + JSON.stringify(numeroDebebidas, null, 2))
      const totalPersonas = ninios + adultos;

      if (esCortesia) {

        const nuevaCantidadTotalCortesia = cantidadTotalCortesia;
        const cantidadRestante = totalPersonas - cantidadTotalCortesia;
        console.log("cantidad restante: " + cantidadRestante)
        console.log("supuesta nueva cantidad: " + nuevaCantidadTotalCortesia)

        if (cantidad > disponibleInventario) {
          alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
          return false;
        }

        if (cantidad > cantidadRestante) {
          alert(`el usuario tiene ${cantidadRestante} cortesias disponibles`)
          return;
        }

        if (nuevaCantidadTotalCortesia > totalPersonas) {
          alert(`La cantidad de cortesías (${nuevaCantidadTotalCortesia}) no puede exceder la cantidad de personas (${totalPersonas}).`);
          return false;
        }

        if (cantidad > cantidadRestante) {
          alert(`Solo puedes agregar hasta ${cantidadRestante} cortesías adicionales.`);
          return false;
        }
      } else {
        if (cantidad > disponibleInventario) {
          alert(`Solo quedan ${cantidadRestante} unidades disponibles en el inventario.`);
          return false;
        }
      }
      if (cantidad > disponibleInventario) {
        alert(`Solo quedan ${cantidadRestante} unidades disponibles en el inventario.`);
        return false;
      }

      await actualizarInventarioBebida(bebidaId, cantidad);
      await actualizarStockInicialBebida(bebidaId, cantidad);
      return true;
    };

    try {
      if (!selectedClientId || (!bebidaSeleccionadaId && !bebida1SeleccionadaId && !bebida2SeleccionadaId && !bebida3SeleccionadaId && !bebida4SeleccionadaId)) {
        throw new Error('No se ha seleccionado un cliente o una bebida.');
      }

      if (esCortesia) {
        let atLeastOneCortesiaSaved = false;

        if (cantidadBebida > 0 && bebidaSeleccionadaId) {
          if (await checkStockAndUpdateInventory(bebidaSeleccionadaId, cantidadBebida)) {
            const bebidaCortesia = {
              id: bebidaSeleccionadaId,
              nombre: bebidaSeleccionada,
              cantidad: cantidadBebida,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarBebida(bebidaCortesia);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
          if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
            const bebidaCortesia1 = {
              id: bebida1SeleccionadaId,
              nombre: bebida1Seleccionada,
              cantidad: cantidadBebida1,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarBebida(bebidaCortesia1);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadBebida2 > 0 && bebida2SeleccionadaId) {
          if (await checkStockAndUpdateInventory(bebida2SeleccionadaId, cantidadBebida2)) {
            const bebidaCortesia2 = {
              id: bebida2SeleccionadaId,
              nombre: bebida2Seleccionada,
              cantidad: cantidadBebida2,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarBebida(bebidaCortesia2);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadBebida3 > 0 && bebida3SeleccionadaId) {
          if (await checkStockAndUpdateInventory(bebida3SeleccionadaId, cantidadBebida3)) {
            const bebidaCortesia3 = {
              id: bebida3SeleccionadaId,
              nombre: bebida3Seleccionada,
              cantidad: cantidadBebida3,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarBebida(bebidaCortesia3);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadBebida4 > 0 && bebida4SeleccionadaId) {
          if (await checkStockAndUpdateInventory(bebida4SeleccionadaId, cantidadBebida4)) {
            const bebidaCortesia4 = {
              id: bebida4SeleccionadaId,
              nombre: bebida4Seleccionada,
              cantidad: cantidadBebida4,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarBebida(bebidaCortesia4);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (atLeastOneCortesiaSaved) {
          onClose();
        }
        return;
      }

      let isBebidaAdded = false;

      if (cantidadBebida > 0 && bebidaSeleccionadaId) {
        const bebidaAdultos = {
          id: bebidaSeleccionadaId,
          nombre: bebidaSeleccionada,
          cantidad: cantidadBebida,
          precio: precioBebidaSeleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(bebidaSeleccionadaId, cantidadBebida)) {
          await guardarBebida(bebidaAdultos);
          isBebidaAdded = true;
        }
      }

      if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
        const bebidaAdultos1 = {
          id: bebida1SeleccionadaId,
          nombre: bebida1Seleccionada,
          cantidad: cantidadBebida1,
          precio: precioBebida1Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
          await guardarBebida(bebidaAdultos1);
          isBebidaAdded = true;
        }
      }

      if (cantidadBebida2 > 0 && bebida2SeleccionadaId) {
        const bebidaAdultos2 = {
          id: bebida2SeleccionadaId,
          nombre: bebida2Seleccionada,
          cantidad: cantidadBebida2,
          precio: precioBebida2Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(bebida2SeleccionadaId, cantidadBebida2)) {
          await guardarBebida(bebidaAdultos2);
          isBebidaAdded = true;
        }
      }

      if (cantidadBebida3 > 0 && bebida3SeleccionadaId) {
        const bebidaAdultos3 = {
          id: bebida3SeleccionadaId,
          nombre: bebida3Seleccionada,
          cantidad: cantidadBebida3,
          precio: precioBebida3Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(bebida3SeleccionadaId, cantidadBebida3)) {
          await guardarBebida(bebidaAdultos3);
          isBebidaAdded = true;
        }
      }

      if (cantidadBebida4 > 0 && bebida4SeleccionadaId) {
        const bebidaAdultos4 = {
          id: bebida4SeleccionadaId,
          nombre: bebida4Seleccionada,
          cantidad: cantidadBebida4,
          precio: precioBebida4Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(bebida4SeleccionadaId, cantidadBebida4)) {
          await guardarBebida(bebidaAdultos4);
          isBebidaAdded = true;
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



  const guardarBebida = async (bebida) => {
    try {
      const response = await AxiosInstance.post('/cabania-agregar-bebida', {
        id: selectedClientId,
        bebida,
      });
      toast.success('Bebida guardada exitosamente!');
      setCantidadBebida("");
      setBebidaSeleccionada('');
      setPrecioBebidaSeleccionada("");
      setBebidaSeleccionadaId('');

      setCantidadBebida1("");
      setBebida1Seleccionada('');
      setPrecioBebida1Seleccionada("");
      setBebida1SeleccionadaId('');

      setEsCortesia(false);

      closeModalM();

      const responses = await AxiosInstance.get("/cabania-clientes");

      // Ordena los datos de la respuesta de la petición GET, no del PUT
      const usuariosOrdenados = responses.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));

      // Actualiza el estado con los usuarios ordenados
      setUsers(usuariosOrdenados);
    } catch (error) {
      console.error('Error al guardar la bebida en el cliente:', error.message);
      throw error;
    }
  };

  const actualizarInventarioFood = async (foodId, cantidad) => {
    try {
      const response = await AxiosInstance.post('/actualizar-inventario-food', {
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
  const actualizarStockInicialFood = async (foodId, cantidad) => {
    try {
      const response = await AxiosInstance.post(`/actualizar-stock-inicial-food/${foodId}`, { cantidad });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error al actualizar el stock inicial. Estado de la respuesta: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al actualizar el stock inicial:', error.message);
      throw error;
    }
  };



  const handleGuardarFood = async () => {

    if (!selectedClientId || (!foodSeleccionadaId && !food1SeleccionadaId && food2SeleccionadaId && food3SeleccionadaId && food4SeleccionadaId)) {
      toast.error('No se ha seleccionado un cliente o una comida.');
      toast.
        return;
    }

    const checkStockAndUpdateInventory = async (foodId, cantidad) => {
      const response = await AxiosInstance.get(`/verificar-disponibilidad/${foodId}`);

      let fecha = new Date();

      fecha.setHours(fecha.getHours() - 5);

      const fechaAjustada = fecha.toLocaleString();

      const disponibleInventario = response.data.cantidadRestante;

      const clienteResponse = await AxiosInstance.get(`/cabania-clientes/${selectedClientId}`);
      const { ninios, adultos } = clienteResponse.data.cantidadPersonas;
      const numeroDeFood = clienteResponse.data.cantidadDeFood.filter(food => food.mensaje === "Cortesía" && food.fechaDeMarca === "");
      const cantidadTotalCortesia = numeroDeFood.reduce((total, food) => total + food.cantidad, 0);
      console.log("numero de cortesias: " + cantidadTotalCortesia)
      console.log("cantidad de bebidas del usuario" + JSON.stringify(numeroDeFood, null, 2))
      const totalPersonas = ninios + adultos;


      if (foodSeleccionada && disponibleInventario === 0) {
        toast.error('Algun producto esta agotado',
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        return false;
      }


      if (esCortesia) {

        const nuevaCantidadTotalCortesia = cantidadTotalCortesia;
        const cantidadRestante = totalPersonas - cantidadTotalCortesia;
        console.log("cantidad restante: " + cantidadRestante)
        console.log("supuesta nueva cantidad: " + nuevaCantidadTotalCortesia)

        if (cantidad > totalPersonas) {
          alert(`La cantidad de cortesias ${cantidad} no debe superar a la cantidad de personas ${totalPersonas} `)
          return;
        }

        if (cantidad > disponibleInventario) {
          alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
          return false;
        }


        if (cantidad > cantidadRestante) {
          alert(`el usuario tiene ${cantidadRestante} cortesias disponibles`)
          return;
        }

        if (nuevaCantidadTotalCortesia > totalPersonas) {
          alert(`La cantidad de cortesías (${nuevaCantidadTotalCortesia}) no puede exceder la cantidad de personas (${totalPersonas}).`);
          return false;
        }

        if (cantidad > cantidadRestante) {
          alert(`Solo puedes agregar hasta ${cantidadRestante} cortesías adicionales.`);
          return false;
        }
      } else {
        if (cantidad > disponibleInventario) {
          alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
          return false;
        }
      }
      if (cantidad > disponibleInventario) {
        alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
        return false;
      }

      await actualizarInventarioFood(foodId, cantidad);
      await actualizarStockInicialFood(foodId, cantidad);
      return true;
    };
    try {
      if (!selectedClientId || (!foodSeleccionadaId && !food1SeleccionadaId && !food2SeleccionadaId && !food3SeleccionadaId && !food4SeleccionadaId)) {
        throw new Error('No se ha seleccionado un cliente o una bebida.');
      }

      if (esCortesia) {
        let atLeastOneCortesiaSaved = false;

        if (cantidadFood > 0 && foodSeleccionadaId) {
          if (await checkStockAndUpdateInventory(foodSeleccionadaId, cantidadFood)) {
            const foodCortesia = {
              id: foodSeleccionadaId,
              nombre: foodSeleccionada,
              cantidad: cantidadFood,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarFood(foodCortesia);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadFood1 > 0 && food1SeleccionadaId) {
          if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
            const foodCortesia1 = {
              id: food1SeleccionadaId,
              nombre: food1Seleccionada,
              cantidad: cantidadFood1,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarFood(foodCortesia1);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadFood2 > 0 && food2SeleccionadaId) {
          if (await checkStockAndUpdateInventory(food2SeleccionadaId, cantidadFood2)) {
            const foodCortesia2 = {
              id: food2SeleccionadaId,
              nombre: food2Seleccionada,
              cantidad: cantidadFood2,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarFood(foodCortesia2);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadFood3 > 0 && food3SeleccionadaId) {
          if (await checkStockAndUpdateInventory(food3SeleccionadaId, cantidadFood3)) {
            const foodCortesia3 = {
              id: food3SeleccionadaId,
              nombre: food3Seleccionada,
              cantidad: cantidadFood3,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarFood(foodCortesia3);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (cantidadFood4 > 0 && food4SeleccionadaId) {
          if (await checkStockAndUpdateInventory(food4SeleccionadaId, cantidadFood4)) {
            const foodCortesia4 = {
              id: food4SeleccionadaId,
              nombre: food4Seleccionada,
              cantidad: cantidadFood4,
              precio: 0,
              mensaje: "Cortesía",
              fechaDeMarca: ""
            };
            await guardarFood(foodCortesia4);
            atLeastOneCortesiaSaved = true;
          }
        }

        if (atLeastOneCortesiaSaved) {
          onClose();
        }
        return;
      }

      let isBebidaAdded = false;

      if (cantidadFood > 0 && foodSeleccionadaId) {
        const foodAdultos = {
          id: foodSeleccionadaId,
          nombre: foodSeleccionada,
          cantidad: cantidadFood,
          precio: precioFoodSeleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(foodSeleccionadaId, cantidadFood)) {
          await guardarFood(foodAdultos);
          isBebidaAdded = true;
        }
      }

      if (cantidadFood1 > 0 && food1SeleccionadaId) {
        const foodAdultos1 = {
          id: food1SeleccionadaId,
          nombre: food1Seleccionada,
          cantidad: cantidadFood1,
          precio: precioFood1Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
          await guardarFood(foodAdultos1);
          isBebidaAdded = true;
        }
      }

      if (cantidadFood2 > 0 && food2SeleccionadaId) {
        const foodAdultos2 = {
          id: food2SeleccionadaId,
          nombre: food2Seleccionada,
          cantidad: cantidadFood2,
          precio: precioFood2Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(food2SeleccionadaId, cantidadFood2)) {
          await guardarFood(foodAdultos2);
          isBebidaAdded = true;
        }
      }

      if (cantidadFood3 > 0 && food3SeleccionadaId) {
        const foodAdultos3 = {
          id: food3SeleccionadaId,
          nombre: food3Seleccionada,
          cantidad: cantidadFood3,
          precio: precioFood3Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(food3SeleccionadaId, cantidadFood3)) {
          await guardarFood(foodAdultos3);
          isBebidaAdded = true;
        }
      }

      if (cantidadFood4 > 0 && food4SeleccionadaId) {
        const foodAdultos4 = {
          id: food4SeleccionadaId,
          nombre: food4Seleccionada,
          cantidad: cantidadFood4,
          precio: precioFood4Seleccionada,
          fechaDeMarca: ""
        };

        if (await checkStockAndUpdateInventory(food4SeleccionadaId, cantidadFood4)) {
          await guardarFood(foodAdultos4);
          isBebidaAdded = true;
        }
      }

      if (!isBebidaAdded) {
        alert("No se ha agregado ninguna bebida");
      } else {
        closeModalF();
      }
    } catch (error) {
      console.error('Error al guardar las bebidas en el cliente:', error.message);
    }
  };


  const guardarFood = async (food) => {

    try {
      const response = await AxiosInstance.post('/cabania-agregar-food', {
        id: selectedClientId,
        food,
      });
      toast.success('Comida guardada exitosamente!');
      setCantidadFood("");
      setFoodSeleccionada('');
      setPrecioFoodSeleccionada("");
      setFoodSeleccionadaId('');


      setCantidadFood1("");
      setFood1Seleccionada('');
      setPrecioFood1Seleccionada("");
      setFood1SeleccionadaId('');


      setEsCortesia(false);

      closeModalF();
      const responses = await AxiosInstance.get("/cabania-clientes");

      // Ordena los datos de la respuesta de la petición GET, no del PUT
      const usuariosOrdenados = responses.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));

      // Actualiza el estado con los usuarios ordenados
      setUsers(usuariosOrdenados);

    } catch (error) {
      console.error('Error al guardar la bebida en el cliente:', error.message);
      throw error;
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/cabania-clientes");
        setUsers(response.data);
        const usuariosOrdenados = response.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    try {



      event.preventDefault();
      let formIsValid = true;

      //fecha pasadia 

      if (!formData.fechaPasadia) {
        setErrorFechaPasadia(true);
        formIsValid = false;
      } else {
        setErrorFechaPasadia(false);
      }

      //identificacion

      if (!formData.identificacion) {
        setErrorIdentificacion(true);
        formIsValid = false;
      } else {
        setErrorIdentificacion(false);
      }

      //nombre

      if (!formData.nombre) {
        setErrorNombre(true)
        formIsValid = false
      } else {
        setErrorNombre(false)
      }

      //reserva

      if (!formData.reserva) {
        setErrorReserva(true)
        formIsValid = false
      } else {
        setErrorReserva(false)
      }

      //adultos

      if (!formData.cantidadPersonas.adultos) {
        setErrorAdultos(true)
        formIsValid = false
      } else {
        setErrorAdultos(false)
      }

      if (!formData.tipo_cabania) {
        setErrorCabania(true)
        formIsValid = false
      } else {
        setErrorCabania(false)
      }

      if (formIsValid) {




        await AxiosInstance.post("/cabania-registrar-cliente", formData);
        onClose();
        toast.success('Cliente agregado exitosamente!');
        setFormData({
          identificacion: "",
          nombre: "",
          reserva: "",
          pagoPendienteTotal: "",
          totalConsumo: "",
          cantidadPersonas: {
            adultos: "",
            ninios: "",
          },
          tipo_cabania: ""
        });
        const response = await AxiosInstance.get("/cabania-clientes");
        setUsers(response.data);
        const usuariosOrdenados = response.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
      }
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleFormSubmitB = async () => {
    try {
      await AxiosInstance.post("/cabania-registrar-cliente", formData);
      onClose();
      toast.success('bebida agregada exitosamente');
      setFormData({
        bebidas: ""
      });
      const response = await AxiosInstance.get("/cabania-clientes");
      setUsers(response.data);
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleEditUser = async () => {
    try {
      await AxiosInstance.put(
        `/cabania/edit/${editedUserId}`,
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
      await AxiosInstance.delete(`/cabania/${id}`);
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
        const response = await AxiosInstance.get("/drinks");
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
        const response = await AxiosInstance.get("/food");
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
  const sizesm = ["2xl"];

  const handleOpenm = async (size, userId) => {
    setAncho(size);
    setSelectedClientId(userId);
    openModalM();
    setCantidadBebida(""); // o '' si quieres que el campo esté completamente vacío
    setBebidaSeleccionada('');
    setPrecioBebidaSeleccionada("");
    setBebidaSeleccionadaId('');

    setCantidadBebida1("");
    setBebida1Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioBebida1Seleccionada(""); // o el valor por defecto inicial
    setBebida1SeleccionadaId('');

    setCantidadBebida2("");
    setBebida2Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioBebida2Seleccionada(""); // o el valor por defecto inicial
    setBebida2SeleccionadaId('');

    setCantidadBebida3("");
    setBebida3Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioBebida3Seleccionada(""); // o el valor por defecto inicial
    setBebida3SeleccionadaId('');

    setCantidadBebida4("");
    setBebida4Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioBebida4Seleccionada(""); // o el valor por defecto inicial
    setBebida4SeleccionadaId('');

    setFiltro("")
    setFiltro2("")
    setFiltro3("")
    setFiltro4("")
    setFiltro5("")

    setCantidadBebidaDisponible("")
    setCantidadBebida1Disponible("")
    setCantidadBebida2Disponible("")
    setCantidadBebida3Disponible("")
    setCantidadBebida4Disponible("")


    const response = await AxiosInstance.get("/food");
    setSnacks(response.data);
    const responses = await AxiosInstance.get("/drinks");
    setDrinks(responses.data);




  };

  const handleOpenmf = async (size, userId) => {
    setAncho(size);
    setSelectedClientId(userId);
    openModalF();

    // Sin números
    setCantidadFood("");
    setFoodSeleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioFoodSeleccionada(""); // o el valor por defecto inicial
    setFoodSeleccionadaId('');

    // Con número 1
    setCantidadFood1("");
    setFood1Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioFood1Seleccionada(""); // o el valor por defecto inicial
    setFood1SeleccionadaId('');

    // Con número 2
    setCantidadFood2("");
    setFood2Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioFood2Seleccionada(""); // o el valor por defecto inicial
    setFood2SeleccionadaId('');

    // Con número 3
    setCantidadFood3("");
    setFood3Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioFood3Seleccionada(""); // o el valor por defecto inicial
    setFood3SeleccionadaId('');

    // Con número 4
    setCantidadFood4("");
    setFood4Seleccionada(''); // Establecer como vacío o el valor por defecto que desees
    setPrecioFood4Seleccionada(""); // o el valor por defecto inicial
    setFood4SeleccionadaId('');

    setFoodFiltro("")
    setFoodFiltro2("")
    setFoodFiltro3("")
    setFoodFiltro4("")
    setFoodFiltro5("")

    setCantidadFoodDisponible("")
    setCantidadFood1Disponible("")
    setCantidadFood2Disponible("")
    setCantidadFood3Disponible("")
    setCantidadFood4Disponible("")

    const response = await AxiosInstance.get("/food");
    setSnacks(response.data);
    const responses = await AxiosInstance.get("/drinks");
    setDrinks(responses.data);

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




  const [formDatas, setFormDatas] = useState({
    pagoPendiente: '',
    mediosDePagoPendiente: ''
  });

  const [selectedClienteId, setSelectedClienteId] = useState(null);

  const seleccionarCliente = (identificacion) => {
    setSelectedClienteId(identificacion);
    calcularPagoPendiente(identificacion);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormDatas({ ...formDatas, [name]: value });
  };

  const calcularPagoPendiente = (identificacion) => {
    const clienteSeleccionado = users.find(user => user.identificacion === identificacion);
    if (clienteSeleccionado) {
      const valorCabaniaActual = clienteSeleccionado.nuevoTotal
      const pagoPendienteCalculado = valorCabaniaActual;
      setFormDatas({
        ...formDatas,
        pagoPendiente: pagoPendienteCalculado.toString()
      });
    }
  };

  const actualizarDatosCliente = async () => {
    if (!formDatas.pagoPendiente || !formDatas.mediosDePagoPendiente) {
      toast.error('Debe llenar todos los campos');
      return;
    }

    if (selectedClienteId) {
      console.log("identificacion del cliente: " + selectedClienteId)
      try {
        const clienteResponse = await AxiosInstance.get(`/cabania-clientes-identificacion/${selectedClienteId}`);
        const clienteData = clienteResponse.data;

        const nuevoValorTotal = clienteData.valorTotal - formDatas.pagoPendiente;

        const response = await AxiosInstance.put(`/cabania-clientes/${selectedClienteId}/actualizar`, {
          valorTotal: nuevoValorTotal,
          pagoPendiente: formDatas.pagoPendiente,
          mediosDePagoPendiente: formDatas.mediosDePagoPendiente
        });

        setFormDatas({
          pagoPendiente: '',
          mediosDePagoPendiente: ''
        });

        toast.success('Datos actualizados exitosamente');

        const responses = await AxiosInstance.get("/cabania-clientes");
        const usuariosOrdenados = responses.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
        setUsers(usuariosOrdenados);

      } catch (error) {
        console.error('Hubo un problema con la petición Axios:', error);
      }
    } else {
      console.error('No hay un cliente seleccionado para actualizar');
    }
  };

  //#endregion

  const [displayLimit, setDisplayLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeDisplayLimit = (event) => {
    setDisplayLimit(Number(event.target.value));
    setCurrentPage(1);
  };


  async function actualizarFechaEnProductos() {
    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getHours() - 5);
    const fechaISO = fechaActual.toISOString();
    selectedUser.bebidas.forEach(bebida => {
      if (bebida.fechaDeMarca === "") {
        bebida.fechaDeMarca = fechaISO;
      }
    });
    selectedUser.restaurante.forEach(comida => {
      if (comida.fechaDeMarca === "") {
        comida.fechaDeMarca = fechaISO;
      }
    });
    const datosActualizados = {
      clienteId: selectedUser._id,
      bebidas: selectedUser.bebidas,
      restaurante: selectedUser.restaurante
    };
    try {
      const response = await AxiosInstance.put('/cabania-facturacion', datosActualizados);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  }


  const generarPDF = async () => {
    const pdf = new jsPDF();
  
    await actualizarFechaEnProductos(selectedUser._id);
  
    try {
      const svgBase64 = await toBase64(svg);
      pdf.addImage(svgBase64, 'JPEG', 0, 0, 220, 80);
    } catch (error) {
      console.error("Error al cargar la imagen", error);
    }
  
    try {
      const waveBase64 = await toBase64(wave);
      pdf.addImage(waveBase64, 'JPEG', 0, 240, 220, 80);
    } catch (error) {
      console.error("Error al cargar la imagen", error);
    }
  
    try {
      const logoBase64 = await toBase64(logo);
      pdf.addImage(logoBase64, 'JPEG', 85, 25, 40, 40);
    } catch (error) {
      console.error("Error al cargar la imagen", error);
    }
  
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor("#FFFFFF");
    pdf.text("HOTEL MEQO", 105, 20, null, null, 'center');
  
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text('Datos de la empresa', 157, 54);
  
    pdf.setFontSize(10);
    pdf.text('Nombre: Hotel Meqo', 164, 63)
    pdf.text('Numero: 3152390814', 164, 70)
  
    pdf.setFontSize(12);
    pdf.text('Datos del cliente', 10, 54);
    pdf.setFontSize(10);
    pdf.text(`Nombre: ${selectedUser.nombre}`, 10, 63);
    pdf.text(`Identificación: ${selectedUser.identificacion}`, 10, 70);
  
    // Encabezados de la tabla de productos
    pdf.setFontSize(12);
    pdf.text("Descripción", 10, 80);
    pdf.text("Cantidad", 80, 80);
    pdf.text("Precio", 150, 80);
    pdf.text("Total", 180, 80); // Added column header for total
    pdf.line(10, 82, 200, 82);
  
    // Lista de productos
    let y = 90;
    const cincoHorasEnMilisegundos = 3 * 60 * 60 * 1000;
    const productos = [...selectedUser.bebidas, ...selectedUser.restaurante];
  
    const ahora = new Date();
    const totalGeneral = productos.filter(producto => {
      const fechaDeMarca = new Date(producto.fechaDeMarca);
      const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;
      return producto.fechaDeMarca === "" || diferenciaEnHoras <= 3;
    }).reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
  
    // Lógica para dividir en múltiples páginas
    const agregarProductoEnPagina = (producto) => {
      const fechaDeMarca = new Date(producto.fechaDeMarca);
      const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;
  
      if (producto.fechaDeMarca === "" || diferenciaEnHoras <= 3) {
        const productoTotal = producto.cantidad * producto.precio;
        pdf.text(producto.nombre, 10, y);
        pdf.text(producto.cantidad.toString(), 88, y);
        pdf.text(`$${producto.precio.toFixed(2)}`, 150, y);
        pdf.text(`$${productoTotal.toFixed(2)}`, 180, y);
  
        // Actualizar posición Y
        y += 10;
  
        // Verificar si hay espacio suficiente para otro producto en la página actual
        if (y > 282) { // 297 - Margen inferior
          // Cambiar a una nueva página
          pdf.addPage();
          y = 10; // Reiniciar la posición Y
        }
      }
    };
  
    // Iterar sobre los productos
    productos.forEach(agregarProductoEnPagina);
  
    // Mostrar el total general en la última página
    pdf.setFontSize(12);
    pdf.text(`Total General: ${totalGeneral.toFixed(2)}`, 150, y);
  
    pdf.save("factura.pdf");
  };



  const totalPages = Math.ceil(datosFiltrados.length / displayLimit + 1);
  const start = (currentPage - 1) * displayLimit;
  const end = start + displayLimit;




  let fecha2 = new Date();

  fecha2.setHours(fecha2.getHours());

  const hours = fecha2.toLocaleString();

  const [filtro, setFiltro] = useState('');
  const [filtro2, setFiltro2] = useState('');
  const [filtro3, setFiltro3] = useState('');
  const [filtro4, setFiltro4] = useState('');
  const [filtro5, setFiltro5] = useState('');

  const [foodFiltro, setFoodFiltro] = useState('');
  const [foodFiltro2, setFoodFiltro2] = useState('');
  const [foodFiltro3, setFoodFiltro3] = useState('');
  const [foodFiltro4, setFoodFiltro4] = useState('');
  const [foodFiltro5, setFoodFiltro5] = useState('');

  const bebidasFiltradas = drinks.filter(bebida =>
    bebida.Descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  const bebidasFiltradas2 = drinks.filter(bebida =>
    bebida.Descripcion.toLowerCase().includes(filtro2.toLowerCase())
  );

  const bebidasFiltradas3 = drinks.filter(bebida =>
    bebida.Descripcion.toLowerCase().includes(filtro3.toLowerCase())
  );

  const bebidasFiltradas4 = drinks.filter(bebida =>
    bebida.Descripcion.toLowerCase().includes(filtro4.toLowerCase())
  );

  const bebidasFiltradas5 = drinks.filter(bebida =>
    bebida.Descripcion.toLowerCase().includes(filtro5.toLowerCase())
  );

  const foodFiltradas = snacks.filter(food =>
    food.Descripcion.toLowerCase().includes(foodFiltro.toLowerCase())
  );

  const foodFiltradas2 = snacks.filter(food =>
    food.Descripcion.toLowerCase().includes(foodFiltro2.toLowerCase())
  );

  const foodFiltradas3 = snacks.filter(food =>
    food.Descripcion.toLowerCase().includes(foodFiltro3.toLowerCase())
  );

  const foodFiltradas4 = snacks.filter(food =>
    food.Descripcion.toLowerCase().includes(foodFiltro4.toLowerCase())
  );

  const foodFiltradas5 = snacks.filter(food =>
    food.Descripcion.toLowerCase().includes(foodFiltro5.toLowerCase())
  );

  const handleItemClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="max-w-full w-98 mx-auto">
       <Toaster position="top-right" />
      <div className="btnAdd flex  px-5 flex-wrap">
          
          <div className="inputSearch">
          <Input
            label="Search"
            value={busqueda}
            onChange={handleSearchChange}
            isClearable
            radius="lg"
            className="w-72 h-12"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-black/90",
                "placeholder:text-black/60 dark:placeholder:text-black/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-black/90 text-black pointer-events-none flex-shrink-0" />
            }
          />
        </div>

          <div className="">
            <div className="flex  flex-wrap gap-3">

            <div>
            <Button
              variant="flat"
              onClick={() => {
                setBackdrop("blur");
                onOpen();
              }}
              className="capitalize text-white bg-black"
            >
              <PlusIcon /> Agregar
            </Button>
            </div>
          <div className="flex items-center justify-center w-32 ">
            <Button className="bg-blue-500 w-28 text-white">
              Exportar
            </Button>
          </div>
            </div>
          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                  <ModalBody>

                    <Input
                      isRequired
                      id="identificacion"
                      name="identificacion"
                      type="number"
                      variant="flat"
                      label="IDENTIFICACIÓN DE USUARIO"
                      value={formData.identificacion}
                      onChange={handleInputChange}
                      className={`rounded-xl border-2 h-12 ${errorIdentificacion ? 'border-red-500' : 'border-blue-400'}`}
                    />
                    <Input
                      isRequired
                      id="nombre"
                      name="nombre"
                      type="text"

                      variant="flat"
                      label="NOMBRE DE USUARIO"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`rounded-xl border-2 h-12  ${errorNombre ? 'border-red-500' : 'border-blue-400'}`}
                    />

                    <Select
                      isRequired
                      id="reserva"
                      name="reserva"
                      label="¿LA RESERVA FUE REALIZADA?"
                      className={`rounded-xl border-2  ${errorReserva ? 'border-red-500' : 'border-blue-400'}`}
                      value={formData.reserva}
                      onChange={(event) => handleReservaChange(event.target.value)}
                    >
                      {options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>

                    <select
                      required
                      id="tipo_cabania"
                      name="tipo_cabania"

                      value={formData.tipo_cabania}
                      onChange={(event) => handleInputChange(event)}
                      className={`h-14 outline-none rounded-xl border-2 ${errorCabania ? 'border-red-500' : 'border-blue-400'}`}
                    >
                      <option value="">ELIGIR CABAÑA </option>
                      <option value="Macuira">MACUIRA</option>
                      <option value="Taroa">TAROA</option>
                      <option value="Mayapo">MAYAPO</option>
                    </select>
                    <div className="flex">


                      <Input
                        isRequired
                        id="adultos"
                        name="adultos"
                        type="number"
                        variant="flat"
                        label="CANTIDAD DE ADULTOS"
                        value={formData.cantidadPersonas.adultos}
                        onChange={(event) => handleInputChange(event, "adultos")}
                        className={` rounded-xl border-2 h-12  ${errorAdultos ? 'border-red-500' : 'border-blue-400'}`}
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
                        className="ml-3 h-12  border-green-400 border-2 rounded-xl"

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
                      isRequired
                      name="fechaPasadia"
                      type="date"
                      label="FECHA EN LA QUE DESEA DISFRUTAR DE LA CABAÑA"
                      className={` rounded-xl border-2 ${errorFechaPasadia ? 'border-red-500' : 'border-blue-400'}`}
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



      </div>

      <section className="flex mx-5 rounded-t-2xl flex-col">
        {/* Input de búsqueda */}
        <div className="flex justify-end">
          <select className="w-28 h-8 outline-none text-white bg-white/0 rounded-xl mb-1" onChange={handleChangeDisplayLimit} value={displayLimit}>
            <option className="text-black" value="1">Mostrar 1</option>
            <option className="text-black" value="5">Mostrar 5</option>
            <option className="text-black" value="10">Mostrar 10</option>
            <option className="text-black" value="15">Mostrar 15</option>
            <option className="text-black" value="50">Mostrar 50</option>
            <option className="text-black" value="100">Mostrar 100</option>
          </select>

        </div>
        <Table className=" text-center uppercase" aria-label="Lista de Usuarios"
        >
          <TableHeader className="text-center">
            <TableColumn className="text-center">+</TableColumn>
            <TableColumn className="text-center max-w-xs">ID</TableColumn>
            <TableColumn className="text-center ">Nombre</TableColumn>
            <TableColumn className="text-center ">Reserva</TableColumn>
            <TableColumn className="text-center ">Cabaña</TableColumn>
            <TableColumn className="text-center tables_im">fecha de inicio cabaña</TableColumn>
            <TableColumn className="text-center">agregar bebida</TableColumn>
            <TableColumn className="text-center">agregar comida</TableColumn>
            <TableColumn className="text-center">Pago pendiente</TableColumn>
          </TableHeader>

          <TableBody emptyContent="No hay elementos por mostrar" className="">
            {datosFiltrados.slice(start, end).map((cliente) => (

              <TableRow className="cursor-pointer hover:bg-blue-200" key={cliente._id}



              >


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
                      <ModalContent className="max-h-96 overflow-y-auto">
                        <ModalHeader className="border-b-3 border-blue-500 text-3xl flex  justify-between">
                          <div className="mb-0.5 text-2xl">History</div>
                          <div className="uppercase text-lg"> {selectedUser.nombre} - {selectedUser.identificacion}</div>
                        </ModalHeader>
                        <ModalBody className="uppercase flex">
                          <div className="flex w-full">
                            <section className="flex justify-between w-full flex-wrap">

                              <div className="mx-5 my-1  w-full">


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
                                          <td>
                                            {
                                              (() => {
                                                const cincoHorasEnMilisegundos = 3 * 60 * 60 * 1000; // 5 horas en milisegundos
                                                const ahora = new Date();
                                                const fechaDeMarca = new Date(producto.fechaDeMarca);
                                                const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;

                                                return (producto.fechaDeMarca === "" || diferenciaEnHoras <= 3) ? producto.nombre : null;
                                              })()
                                            }
                                          </td>
                                          <td>
                                            {
                                              (() => {
                                                const cincoHorasEnMilisegundos = 3 * 60 * 60 * 1000; // 5 horas en milisegundos
                                                const ahora = new Date();
                                                const fechaDeMarca = new Date(producto.fechaDeMarca);
                                                const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;

                                                return (producto.fechaDeMarca === "" || diferenciaEnHoras <= 3) ? producto.cantidad : null;
                                              })()
                                            }
                                          </td>
                                          <td>
                                            {
                                              (() => {
                                                const cincoHorasEnMilisegundos = 3 * 60 * 60 * 1000; // 5 horas en milisegundos
                                                const ahora = new Date();
                                                const fechaDeMarca = new Date(producto.fechaDeMarca);
                                                const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;

                                                return (producto.fechaDeMarca === "" || diferenciaEnHoras <= 3) ? producto.precio : null;
                                              })()
                                            }
                                          </td>
                                          <td>
                                            {
                                              (() => {
                                                const cincoHorasEnMilisegundos = 3 * 60 * 60 * 1000; // 5 horas en milisegundos
                                                const ahora = new Date();
                                                const fechaDeMarca = new Date(producto.fechaDeMarca);
                                                const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;

                                                return (producto.fechaDeMarca === "" || diferenciaEnHoras <= 3) ? producto.cantidad * producto.precio : null;
                                              })()
                                            }
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot className="border-t-3 border-green-500 pt-2">
                                      <tr>
                                        <td className="w-6/12 text-left"></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{ height: "60px", paddingRight: "20px", width: "150px" }} className="text-right">
                                          Total: {
                                            [...selectedUser.bebidas, ...selectedUser.restaurante]
                                              .filter(producto => {
                                                const cincoHorasEnMilisegundos = 3 * 60 * 60 * 1000; // 3 horas en milisegundos
                                                const ahora = new Date();
                                                const fechaDeMarca = new Date(producto.fechaDeMarca);
                                                const diferenciaEnHoras = (ahora - fechaDeMarca) / cincoHorasEnMilisegundos;

                                                return producto.fechaDeMarca === "" || diferenciaEnHoras <= 3;
                                              })
                                              .reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0)
                                          }
                                        </td>

                                      </tr>
                                    </tfoot>
                                  </table>
                                ) : (
                                  <p className=" w-full text-center">No hay productos que mostrar😔</p>
                                )}
                              </div>

                            </section>
                          </div>
                        </ModalBody>


                        <ModalFooter>
                          <Button color="primary" onClick={() => {
                            Swal.fire({
                              title: '¿Estás seguro?',
                              text: "¿Quieres guardar esto como PDF?",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Sí, guardar',
                              cancelButtonText: 'No, cancelar'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                generarPDF(selectedUser._id);
                                // Muestra un nuevo SweetAlert con el chulito de confirmación
                                Swal.fire({
                                  title: '¡Guardado!',
                                  text: 'El archivo PDF ha sido guardado exitosamente.',
                                  icon: 'success',
                                  confirmButtonColor: '#3085d6',
                                  confirmButtonText: 'Ok'
                                });
                              }
                            })
                          }}>
                            Guardar como PDF
                          </Button>
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
                      {cliente.reserva === "Si" && cliente.tipo_cabania !== "Mayapo" && ((cliente.nuevoTotal)) || cliente.reserva === "Si" && cliente.tipo_cabania === "Mayapo" && ((cliente.nuevoTotal)) ||
                        cliente.reserva === "No" && cliente.tipo_cabania === "Mayapo" && ((cliente.nuevoTotal)) !== 0 ?
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Información</div>
                          <div className="text-red-500">Datos del usuario</div>
                          <div>Identificacion: {cliente.identificacion}</div>
                          <div className="text-tiny">Nombre: {cliente.nombre}</div>
                          <div className="text-red-500 text-small font-bold">Pago pendiente</div>
                          <div>{cliente.tipo_cabania === "Mayapo" ? ((cliente.nuevoTotal))
                            : ((cliente.nuevoTotal))}</div>
                          <Input
                            disabled
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
                        <div>pendiente: {cliente.tipo_cabania === "Mayapo" ? ((cliente.nuevoTotal))
                          : ((cliente.nuevoTotal))}</div>
                      </div>

                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>{cliente.reserva}</TableCell>
                <TableCell>{cliente.tipo_cabania}</TableCell>
                <TableCell>{new Date(cliente.fechaPasadia).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</TableCell>
                {/* <TableCell>{cliente.mediosDePagoPendiente}</TableCell>
                <TableCell>{cliente.pagoPendiente}</TableCell> */}



                <TableCell key={cliente._id} >

                  <div className=" flex justify-center">
                    <div className="flex flex-wrap gap-3">
                      {sizesm.map((size) => (
                        <Button className="bg-white-100" key={size} onPress={() => handleOpenm(size, cliente._id)}  >
                          <img className="w-7 h-7" src={plus} alt="" />
                        </Button>
                      ))}
                    </div>

                    <Modal
                      classNames={{
                        backdrop: "bg-inherit",
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
                                Cortesía cabañas
                              </Checkbox>
                              <div className="flex">
                                <Input
                                  className="mr-2"
                                  name="bebidas"
                                  label="Ingrese la cantidad"
                                  type="number"
                                  value={isNaN(cantidadBebida) ? '' : cantidadBebida}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setCantidadBebida(isNaN(value) ? "" : value);
                                  }}
                                />
                                <Input
                                  disabled
                                  label=" Stock "
                                  className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                  placeholder={` ${cantidadBebidaDisponible}`}
                                />
                                <Select
                                  className="ml-2"
                                  name="bebidas"
                                  label="Seleccionar bebida"
                                  value={bebidaSeleccionada}
                                  onChange={(e) => {
                                    const selectedBebida = e.target.value;
                                    setBebidaSeleccionada(selectedBebida);

                                    const bebidaSeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida);
                                    if (bebidaSeleccionadaInfo) {
                                      setPrecioBebidaSeleccionada(bebidaSeleccionadaInfo.ValorUnitario);
                                      setBebidaSeleccionadaId(bebidaSeleccionadaInfo._id);
                                      setCantidadBebidaDisponible(bebidaSeleccionadaInfo.CantidadInicial);
                                    }
                                  }}
                                >
                                  {bebidasFiltradas.map((bebida) => (
                                    <SelectItem key={bebida.Descripcion}>
                                      {bebida.Descripcion}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <aside className="search-button">
                                  <div className="container">
                                    <span className="lupa">
                                      <SearchIcon />
                                    </span>
                                    <input
                                      type="search"
                                      id="search"
                                      placeholder="¿Qué quieres buscar?"
                                      value={filtro}
                                      onClick={handleItemClick}
                                      onChange={(e) => {
                                        e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                        setFiltro(e.target.value);
                                      }} />
                                  </div>
                                </aside>
                              </div>
                              <div className="flex">
                                <Input
                                  className="mr-2"
                                  name="bebidas"
                                  label="Ingrese la cantidad"
                                  type="number"
                                  value={isNaN(cantidadBebida1) ? '' : cantidadBebida1}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setCantidadBebida1(isNaN(value) ? "" : value);
                                  }}
                                />
                                <Input
                                  disabled
                                  label=" Stock "
                                  className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                  placeholder={` ${cantidadBebida1Disponible}`}
                                />
                                <Select
                                  className="ml-2"
                                  name="bebidas"
                                  label="Seleccionar bebida"
                                  value={bebida1Seleccionada}
                                  onChange={(e) => {
                                    const selectedBebida1 = e.target.value;
                                    setBebida1Seleccionada(selectedBebida1);

                                    const bebida1SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida1);
                                    if (bebida1SeleccionadaInfo) {
                                      setPrecioBebida1Seleccionada(bebida1SeleccionadaInfo.ValorUnitario);
                                      setBebida1SeleccionadaId(bebida1SeleccionadaInfo._id);
                                      setCantidadBebida1Disponible(bebida1SeleccionadaInfo.CantidadInicial);
                                    }
                                  }}
                                >
                                  {bebidasFiltradas2.map((bebida) => (
                                    <SelectItem key={bebida.Descripcion}>
                                      {bebida.Descripcion}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <aside className="search-button">
                                  <div className="container">
                                    <span className="lupa">
                                      <SearchIcon />
                                    </span>
                                    <input
                                      type="search"
                                      id="search"
                                      placeholder="¿Qué quieres buscar?"
                                      value={filtro2}
                                      onClick={handleItemClick}
                                      onChange={(e) => {
                                        e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                        setFiltro2(e.target.value);
                                      }} />
                                  </div>
                                </aside>
                              </div>
                              <div className="flex">
                                <Input
                                  className="mr-2"
                                  name="bebidas"
                                  label="Ingrese la cantidad"
                                  type="number"
                                  value={isNaN(cantidadBebida2) ? '' : cantidadBebida2}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setCantidadBebida2(isNaN(value) ? "" : value);
                                  }}
                                />
                                <Input
                                  disabled
                                  label=" Stock "
                                  className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                  placeholder={` ${cantidadBebida2Disponible}`}
                                />
                                <Select
                                  className="ml-2"
                                  name="bebidas"
                                  label="Seleccionar bebida"
                                  value={bebida2Seleccionada}
                                  onChange={(e) => {
                                    const selectedBebida2 = e.target.value;
                                    setBebida2Seleccionada(selectedBebida2);

                                    const bebida2SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida2);
                                    if (bebida2SeleccionadaInfo) {
                                      setPrecioBebida2Seleccionada(bebida2SeleccionadaInfo.ValorUnitario);
                                      setBebida2SeleccionadaId(bebida2SeleccionadaInfo._id);
                                      setCantidadBebida2Disponible(bebida2SeleccionadaInfo.CantidadInicial);
                                    }
                                  }}
                                >
                                  {bebidasFiltradas3.map((bebida) => (
                                    <SelectItem key={bebida.Descripcion}>
                                      {bebida.Descripcion}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <aside className="search-button">
                                  <div className="container">
                                    <span className="lupa">
                                      <SearchIcon />
                                    </span>
                                    <input
                                      type="search"
                                      id="search"
                                      placeholder="¿Qué quieres buscar?"
                                      value={filtro3}
                                      onClick={handleItemClick}
                                      onChange={(e) => {
                                        e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                        setFiltro3(e.target.value);
                                      }} />
                                  </div>
                                </aside>
                              </div>
                              <div className="flex">
                                <Input
                                  className="mr-2"
                                  name="bebidas"
                                  label="Ingrese la cantidad"
                                  type="number"
                                  value={isNaN(cantidadBebida3) ? '' : cantidadBebida3}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setCantidadBebida3(isNaN(value) ? "" : value);
                                  }}
                                />
                                <Input
                                  disabled
                                  label=" Stock "
                                  className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                  placeholder={` ${cantidadBebida3Disponible}`}
                                />
                                <Select
                                  className="ml-2"
                                  name="bebidas"
                                  label="Seleccionar bebida"
                                  value={bebida3Seleccionada}
                                  onChange={(e) => {
                                    const selectedBebida3 = e.target.value;
                                    setBebida3Seleccionada(selectedBebida3);

                                    const bebida3SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida3);
                                    if (bebida3SeleccionadaInfo) {
                                      setPrecioBebida3Seleccionada(bebida3SeleccionadaInfo.ValorUnitario);
                                      setBebida3SeleccionadaId(bebida3SeleccionadaInfo._id);
                                      setCantidadBebida3Disponible(bebida3SeleccionadaInfo.CantidadInicial);
                                    }
                                  }}
                                >
                                  {bebidasFiltradas4.map((bebida) => (
                                    <SelectItem key={bebida.Descripcion}>
                                      {bebida.Descripcion}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <aside className="search-button">
                                  <div className="container">
                                    <span className="lupa">
                                      <SearchIcon />
                                    </span>
                                    <input
                                      type="search"
                                      id="search"
                                      placeholder="¿Qué quieres buscar?"
                                      value={filtro4}
                                      onClick={handleItemClick}
                                      onChange={(e) => {
                                        e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                        setFiltro4(e.target.value);
                                      }} />
                                  </div>
                                </aside>
                              </div>
                              <div className="flex">
                                <Input
                                  className="mr-2"
                                  name="bebidas"
                                  label="Ingrese la cantidad"
                                  type="number"
                                  value={isNaN(cantidadBebida4) ? '' : cantidadBebida4}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setCantidadBebida4(isNaN(value) ? "" : value);
                                  }}
                                />
                                <Input
                                  disabled
                                  label=" Stock "
                                  className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                  placeholder={` ${cantidadBebida4Disponible}`}
                                />
                                <Select
                                  className="ml-2"
                                  name="bebidas"
                                  label="Seleccionar bebida"
                                  value={bebida4Seleccionada}
                                  onChange={(e) => {
                                    const selectedBebida4 = e.target.value;
                                    setBebida4Seleccionada(selectedBebida4);

                                    const bebida4SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida4);
                                    if (bebida4SeleccionadaInfo) {
                                      setPrecioBebida4Seleccionada(bebida4SeleccionadaInfo.ValorUnitario);
                                      setBebida4SeleccionadaId(bebida4SeleccionadaInfo._id);
                                      setCantidadBebida4Disponible(bebida4SeleccionadaInfo.CantidadInicial);
                                    }
                                  }}
                                >
                                  {bebidasFiltradas5.map((bebida) => (
                                    <SelectItem key={bebida.Descripcion}>
                                      {bebida.Descripcion}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <aside className="search-button">
                                  <div className="container">
                                    <span className="lupa">
                                      <SearchIcon />
                                    </span>
                                    <input
                                      type="search"
                                      id="search"
                                      placeholder="¿Qué quieres buscar?"
                                      value={filtro5}
                                      onClick={handleItemClick}
                                      onChange={(e) => {
                                        e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                        setFiltro5(e.target.value);
                                      }} />
                                  </div>
                                </aside>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" variant="light" onPress={closeModalM}>
                                Close
                              </Button>
                              <Button color="primary" onClick={handleGuardarBebida}>
                                Ahorrar
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
                            <Checkbox
                              checked={esCortesia}
                              onChange={handleCortesiaChange}
                            >
                              Cortesía cabañas
                            </Checkbox>
                            <div className="flex">

                              <Input
                                className="mr-2"
                                name="bebidas"
                                label="Ingrese la cantidad"
                                type="number"
                                value={isNaN(cantidadFood) ? '' : cantidadFood}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadFood(isNaN(value) ? "" : value);
                                }}
                              />
                              <Input
                                disabled
                                label=" Stock "
                                className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                placeholder={` ${cantidadFoodDisponible}`}
                              />
                              <Select
                                className="ml-2"
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
                                    setCantidadFoodDisponible(foodSeleccionadaInfo.CantidadInicial);
                                  }
                                }}
                              >
                                {foodFiltradas.map((food) => (
                                  <SelectItem key={food.Descripcion}>
                                    {food.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                              <aside className="search-button">
                                <div className="container">
                                  <span className="lupa">
                                    <SearchIcon />
                                  </span>
                                  <input
                                    type="search"
                                    id="search"
                                    placeholder="¿Qué quieres buscar?"
                                    value={foodFiltro}
                                    onClick={handleItemClick}
                                    onChange={(e) => {
                                      e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                      setFoodFiltro(e.target.value);
                                    }} />
                                </div>
                              </aside>
                            </div>
                            <div className="flex">
                              <Input
                                className="mr-2"
                                name="restaurante"
                                label="Ingrese la cantidad"
                                type="number"
                                value={isNaN(cantidadFood1) ? '' : cantidadFood1}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadFood1(isNaN(value) ? "" : value);
                                }}
                              />
                              <Input
                                disabled
                                label=" Stock "
                                className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                placeholder={` ${cantidadFood1Disponible}`}
                              />
                              <Select
                                className="ml-2"
                                name="restaurante"
                                label="Seleccionar comida"
                                value={food1Seleccionada}
                                onChange={(e) => {
                                  const selectedFood1 = e.target.value;
                                  setFood1Seleccionada(selectedFood1);

                                  const food1SeleccionadaInfo = snacks.find(bebida => bebida.Descripcion === selectedFood1);
                                  if (food1SeleccionadaInfo) {
                                    setPrecioFood1Seleccionada(food1SeleccionadaInfo.ValorUnitario);
                                    setFood1SeleccionadaId(food1SeleccionadaInfo._id);
                                    setCantidadFood1Disponible(food1SeleccionadaInfo.CantidadInicial);
                                  }
                                }}
                              >
                                {foodFiltradas2.map((food) => (
                                  <SelectItem key={food.Descripcion}>
                                    {food.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                              <aside className="search-button">
                                <div className="container">
                                  <span className="lupa">
                                    <SearchIcon />
                                  </span>
                                  <input
                                    type="search"
                                    id="search"
                                    placeholder="¿Qué quieres buscar?"
                                    value={foodFiltro2}
                                    onClick={handleItemClick}
                                    onChange={(e) => {
                                      e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                      setFoodFiltro2(e.target.value);
                                    }} />
                                </div>
                              </aside>
                            </div>
                            <div className="flex">
                              <Input
                                className="mr-2"
                                name="restaurante"
                                label="Ingrese la cantidad"
                                type="number"
                                value={isNaN(cantidadFood2) ? '' : cantidadFood2}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadFood2(isNaN(value) ? "" : value);
                                }}
                              />
                              <Input
                                disabled
                                label=" Stock "
                                className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                placeholder={` ${cantidadFood2Disponible}`}
                              />
                              <Select
                                className="ml-2"
                                name="restaurante"
                                label="Seleccionar comida"
                                value={food2Seleccionada}
                                onChange={(e) => {
                                  const selectedFood2 = e.target.value;
                                  setFood2Seleccionada(selectedFood2);

                                  const food2SeleccionadaInfo = snacks.find(bebida => bebida.Descripcion === selectedFood2);
                                  if (food2SeleccionadaInfo) {
                                    setPrecioFood2Seleccionada(food2SeleccionadaInfo.ValorUnitario);
                                    setFood2SeleccionadaId(food2SeleccionadaInfo._id);
                                    setCantidadFood2Disponible(food2SeleccionadaInfo.CantidadInicial);
                                  }
                                }}
                              >
                                {foodFiltradas3.map((food) => (
                                  <SelectItem key={food.Descripcion}>
                                    {food.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                              <aside className="search-button">
                                <div className="container">
                                  <span className="lupa">
                                    <SearchIcon />
                                  </span>
                                  <input
                                    type="search"
                                    id="search"
                                    placeholder="¿Qué quieres buscar?"
                                    value={foodFiltro3}
                                    onClick={handleItemClick}
                                    onChange={(e) => {
                                      e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                      setFoodFiltro3(e.target.value);
                                    }} />
                                </div>
                              </aside>
                            </div>
                            <div className="flex">
                              <Input
                                className="mr-2"
                                name="restaurante"
                                label="Ingrese la cantidad"
                                type="number"
                                value={isNaN(cantidadFood3) ? '' : cantidadFood3}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadFood3(isNaN(value) ? "" : value);
                                }}
                              />
                              <Input
                                disabled
                                label=" Stock "
                                className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                placeholder={` ${cantidadFood3Disponible}`}
                              />
                              <Select
                                className="ml-2"
                                name="restaurante"
                                label="Seleccionar comida"
                                value={food3Seleccionada}
                                onChange={(e) => {
                                  const selectedFood3 = e.target.value;
                                  setFood3Seleccionada(selectedFood3);

                                  const food3SeleccionadaInfo = snacks.find(bebida => bebida.Descripcion === selectedFood3);
                                  if (food3SeleccionadaInfo) {
                                    setPrecioFood3Seleccionada(food3SeleccionadaInfo.ValorUnitario);
                                    setFood3SeleccionadaId(food3SeleccionadaInfo._id);
                                    setCantidadFood3Disponible(food3SeleccionadaInfo.CantidadInicial);
                                  }
                                }}
                              >
                                {foodFiltradas4.map((food) => (
                                  <SelectItem key={food.Descripcion}>
                                    {food.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                              <aside className="search-button">
                                <div className="container">
                                  <span className="lupa">
                                    <SearchIcon />
                                  </span>
                                  <input
                                    type="search"
                                    id="search"
                                    placeholder="¿Qué quieres buscar?"
                                    value={foodFiltro4}
                                    onClick={handleItemClick}
                                    onChange={(e) => {
                                      e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                      setFoodFiltro4(e.target.value);
                                    }} />
                                </div>
                              </aside>
                            </div>
                            <div className="flex">
                              <Input
                                className="mr-2"
                                name="restaurante"
                                label="Ingrese la cantidad"
                                type="number"
                                value={isNaN(cantidadFood4) ? '' : cantidadFood4}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  setCantidadFood4(isNaN(value) ? "" : value);
                                }}
                              />
                              <Input
                                disabled
                                label=" Stock "
                                className="w-44 flex text-blue-500 border-2 border-blue-400 rounded-xl"
                                placeholder={` ${cantidadFood4Disponible}`}
                              />
                              <Select
                                className="ml-2"
                                name="restaurante"
                                label="Seleccionar comida"
                                value={food4Seleccionada}
                                onChange={(e) => {
                                  const selectedFood4 = e.target.value;
                                  setFood4Seleccionada(selectedFood4);

                                  const food4SeleccionadaInfo = snacks.find(bebida => bebida.Descripcion === selectedFood4);
                                  if (food4SeleccionadaInfo) {
                                    setPrecioFood4Seleccionada(food4SeleccionadaInfo.ValorUnitario);
                                    setFood4SeleccionadaId(food4SeleccionadaInfo._id);
                                    setCantidadFood4Disponible(food4SeleccionadaInfo.CantidadInicial);
                                  }
                                }}
                              >
                                {foodFiltradas5.map((food) => (
                                  <SelectItem key={food.Descripcion}>
                                    {food.Descripcion}
                                  </SelectItem>
                                ))}
                              </Select>
                              <aside className="search-button">
                                <div className="container">
                                  <span className="lupa">
                                    <SearchIcon />
                                  </span>
                                  <input
                                    type="search"
                                    id="search"
                                    placeholder="¿Qué quieres buscar?"
                                    value={foodFiltro5}
                                    onClick={handleItemClick}
                                    onChange={(e) => {
                                      e.stopPropagation(); // También detiene la propagación aquí para mayor seguridad
                                      setFoodFiltro5(e.target.value);
                                    }} />
                                </div>
                              </aside>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" variant="light" onPress={closeModalF}>
                              Close
                            </Button>
                            <Button color="primary" onClick={handleGuardarFood}>
                              Ahorrar
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
                <TableCell>{cliente.tipo_cabania === "Mayapo" ? ((cliente.nuevoTotal))
                  : ((cliente.nuevoTotal))}</TableCell>
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
