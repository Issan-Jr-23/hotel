import React, { useState, useEffect, useMemo } from "react"
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import fd from "../../images/flechas-dobles.png"
import { Table } from "@mui/material"
import AxiosInstance from "../../api/axios.js"
import { Pagination, Modal, Box, Typography } from "@mui/material"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, Input, useDisclosure, Checkbox, Select, SelectItem, Tabs, Tab } from "@nextui-org/react"
import { green, purple, blue, red } from '@mui/material/colors';
import chevron from "../../images/right.png";
import { VerticalDotsIcon } from "../iconos/VerticalDotsIcon.jsx"
import Brightness1Icon from '@mui/icons-material/Brightness1';
import loading_progress from "../../images/Animation-alternativa-loading.json"
import plus from "../../images/plus.png";
import plusb from "../../images/plus_blue.png";
import Lottie from "react-lottie"
import { PlusIcon } from "../finca/PlusIcon.jsx";
import { SearchIcon } from "../tablePasadia/SearchIcon.jsx";
import stats from "../../images/stats.svg"
import toast, { Toaster } from 'react-hot-toast';
import "./pasadiaTable.css"


export default function review() {
    const [formDatas, setFormDatas] = useState({
        pagoPendiente: '',
        mediosDePagoPendiente: ''
    });
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [pasadiaAdultos, setPasadiaAdultos] = useState(null)
    const [pasadiaNinios, setPasadiaNinios] = useState(null)

    const [open, setOpen] = React.useState(false);
    const [openMd, setOpenMd] = React.useState(false);
    const [openFz, setOpenFz] = React.useState(false);
    const [openTd, setOpenTd] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloseMd = () => setOpenMd(false);
    const handleCloseFz = () => setOpenFz(false);
    const handleCloseTd = () => setOpenTd(false);
    const handleClose = () => setOpen(false);
    const [resetKey, setResetKey] = useState(0);
    const [resetKey1, setResetKey1] = useState(0);
    const [resetKey2, setResetKey2] = useState(0);
    const [resetKey3, setResetKey3] = useState(0);
    const [resetKey4, setResetKey4] = useState(0);

    //#region

    const { user } = useAuth();
    const isAdmin = user && user.role === 'admin';
    const isEditor = user && user.role === 'editor';

    //#region 
    const [esCortesia, setEsCortesia] = useState(false);
    const [users, setUsers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [comidas, setComidas] = useState([]);

    const [cantidadBebida, setCantidadBebida] = useState("");
    const [bebidaSeleccionada, setBebidaSeleccionada] = useState('');
    const [precioBebidaSeleccionada, setPrecioBebidaSeleccionada] = useState("");
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
    const [editedReserva, setEditedReserva] = useState("");
    const [editedDate, setEditedDate] = useState("")

    const [errorFechaPasadia, setErrorFechaPasadia] = useState(false);
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorReserva, setErrorReserva] = useState(false);
    const [errorAdultos, setErrorAdultos] = useState(false);
    const [errorNinios, setErrorNinios] = useState(false);

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


    const [editClient, setEditClient] = useState(null)
    const [editCantidadAdultos, setEditCantidadAdultos] = useState("")
    const [editCantidadNinios, setEditCantidadNinios] = useState("")
    const [editMetodoPago, setEditMetodoPago] = useState("")
    const [editPagoAnticipado, setEditPagoAnticipado] = useState("")
    const [editMetodoPagoPendiente, setEditMetodoPagoPendiente] = useState("")


    const [cantidadItem, setCantidadItem] = useState("");
    const [itemSeleccionado, setItemSeleccionado] = useState("");
    const [precioItemSeleccionado, setPrecioItemSeleccionado] = useState("");
    const [itemSeleccionadoId, setItemSeleccionadoId] = useState("");
    const [subItemSeleccionadoId, setSubItemSeleccionadoId] = useState("");

    const [cantidadItem1, setCantidadItem1] = useState("");
    const [itemSeleccionado1, setItemSeleccionado1] = useState("");
    const [precioItemSeleccionado1, setPrecioItemSeleccionado1] = useState("");
    const [itemSeleccionadoId1, setItemSeleccionadoId1] = useState("");
    const [subItemSeleccionadoId1, setSubItemSeleccionadoId1] = useState("");

    const [cantidadItem2, setCantidadItem2] = useState("");
    const [itemSeleccionado2, setItemSeleccionado2] = useState("");
    const [precioItemSeleccionado2, setPrecioItemSeleccionado2] = useState("");
    const [itemSeleccionadoId2, setItemSeleccionadoId2] = useState("");
    const [subItemSeleccionadoId2, setSubItemSeleccionadoId2] = useState("");

    const [cantidadItem3, setCantidadItem3] = useState("");
    const [itemSeleccionado3, setItemSeleccionado3] = useState("");
    const [precioItemSeleccionado3, setPrecioItemSeleccionado3] = useState("");
    const [itemSeleccionadoId3, setItemSeleccionadoId3] = useState("");
    const [subItemSeleccionadoId3, setSubItemSeleccionadoId3] = useState("");

    const [cantidadItem4, setCantidadItem4] = useState("");
    const [itemSeleccionado4, setItemSeleccionado4] = useState("");
    const [precioItemSeleccionado4, setPrecioItemSeleccionado4] = useState("");
    const [itemSeleccionadoId4, setItemSeleccionadoId4] = useState("");
    const [subItemSeleccionadoId4, setSubItemSeleccionadoId4] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const [isSaving, setIsSaving] = useState(false);

    const [resTotal, setResTotal] = useState({});
    const [barTotal, setBarTotal] = useState({});
    const [recTotal, setRecTotal] = useState({});
    const [desTotal, setDesTotal] = useState({});


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
        nuevoTotal: ""

    });


    //#endregion
    //#region 

    const [busqueda, setBusqueda] = useState('');
    const [ccDisponibles, setCcDisponibles] = useState(null)
    const location = useLocation();




    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
                setUsers(response.data.clientes);
                setTotalPaginas(response.data.totalPages);
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            } catch (error) {
                console.error("Error al obtener los clientes: ", error);
            }
        };

        obtenerClientes();
    }, [paginaActual]);


    const cambiarPagina = (event, value) => {
        if (value === paginaActual || (value === 1 && paginaActual === 1)) {
            return;
        }
        setIsLoading(true);
        setPaginaActual(value);
    };

    const refresh = async () => {
        const response = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
        setUsers(response.data.clientes);
        setTotalPaginas(response.data.totalPages);
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }

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

    const navigate = useNavigate();

    const adicional = (id) => {
        navigate(`/adicional/${id}`);
        console.log("id del usuario para ver el historial del usuario: " + id)
    };

    const handleCortesiaChange = (event) => {
        setEsCortesia(event.target.checked);
    };


    function obtenerFechaConAjuste() {
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        return fechaActual.toISOString();
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get("/table-precios");
                const pasadiaN = response.data.find(item => item.servicio === "pasadia" && item.tipo === "ninios");
                const pasadiaA = response.data.find(item => item.servicio === "pasadia" && item.tipo === "adultos");


                if (pasadiaN) {
                    setPasadiaNinios(pasadiaN.precio);
                } else {
                    console.log("No se encontró el servicio de 'cabanias'");
                }

                if (pasadiaA) {
                    setPasadiaAdultos(pasadiaA.precio);
                } else {
                    console.log("No se encontró el servicio de 'cabanias mayapo'");
                }

            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);


    const datosFiltrados = useMemo(() => {
        if (!busqueda) return users;

        return users.filter((user) => {
            return user && user.identificacion.toString().includes(busqueda.toString());
        });
    }, [busqueda, users]);




    const handleInputChange = (event, fieldName) => {
        const { name, value } = event.target;

        if (name === 'identificacion') {
            setErrorIdentificacion(!value);
        } else if (name === 'nombre') {
            setErrorNombre(!value);
        } else if (name === 'fechaPasadia') {
            setErrorFechaPasadia(!value);
        } else if (name === 'reserva') {
            setErrorReserva(!value);
        } else if (name === 'adultos') {
            setErrorAdultos(!value)
        } else if (name === 'ninios') {
            setErrorNinios(!value)
        }

        let newValue = parseInt(value, 10);
        if (isNaN(newValue)) {
            newValue = 0;
        }

        const totalCosto = (formData.cantidadPersonas.ninios * pasadiaNinios) +
            (formData.cantidadPersonas.adultos * pasadiaAdultos);

        const valueInputs = (formData.pagoAnticipado + formData.pagoPendiente);
        const totalValueInputs = valueInputs;

        const totalPendiente = totalCosto;

        const ppc = totalPendiente - totalValueInputs;
        console.log("valor de los inputs: " + ppc)
        formData.nuevoTotal = ppc;

        const cantidadDeClientes = formData.cantidadPersonas.ninios + formData.cantidadPersonas.adultos;
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
                nuevoTotal: formData.nuevoTotal,
                ...(fieldName && (name === 'ninios' || name === 'adultos') ? { cantidadPersonas: { ...formData.cantidadPersonas, [fieldName]: newValue } } : {})
            });
        }
    };

    //#region 
    const handleReservaChange = (selectedSize) => {
        setFormData({
            ...formData,
            reserva: selectedSize,
        });
    };

    const guardarCortesiaBebidaInventory = async (foodId, cantidad) => {
        try {
            const response = await AxiosInstance.post('/guardar-cortesias-inventario', {
                foodId,
                cantidad
            });

            if (response.status === 200) {
                console.log('Cortesías guardadas correctamente:', response.data);
            } else {
                console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error.message);
        }
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

        if (isSaving) return;
        setIsSaving(true);

        if (!selectedClientId || (!bebidaSeleccionadaId && !bebida1SeleccionadaId && !bebida2SeleccionadaId && !bebida3SeleccionadaId && !bebida4SeleccionadaId)) {
            toast.error('No se ha seleccionado un cliente o una Bebida.');
            setIsSaving(false);
            return;
        }

        const checkStockAndUpdateInventory = async (bebidaId, cantidad) => {
            const response = await AxiosInstance.get(`/verificar-disponibilidad/${bebidaId}`);

            let fecha = new Date();

            fecha.setHours(fecha.getHours() - 5);

            const fechaAjustada = fecha.toLocaleString();

            const disponibleInventario = response.data.cantidadRestante;

            const clienteResponse = await AxiosInstance.get(`/pasadia-clientes/${selectedClientId}`);
            const { ninios, adultos } = clienteResponse.data.cantidadPersonas;
            const numeroDebebidas = clienteResponse.data.cantidadDeBebidas.filter(bebida => bebida.mensaje === "Cortesía" && bebida.fechaDeMarca === "");
            const cantidadTotalCortesia = numeroDebebidas.reduce((total, bebida) => total + bebida.cantidad, 0);
            console.log("numero de cortesias: " + cantidadTotalCortesia)
            console.log("cantidad de bebidas del usuario" + JSON.stringify(numeroDebebidas, null, 2))
            const totalPersonas = ninios + adultos;




            if (bebidaSeleccionada && disponibleInventario === 0) {
                // alert(`Producto agotado ${foodSeleccionada} en el stock ( ${disponibleInventario} ) `);
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
                setCcDisponibles(cantidadRestante)
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
                    alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                    return false;
                }
            }
            if (cantidad > disponibleInventario) {
                alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                return false;
            }

            await actualizarInventarioBebida(bebidaId, cantidad);
            await actualizarStockInicialBebida(bebidaId, cantidad);
            return true;
        };

        try {
            if (!selectedClientId || (!bebidaSeleccionadaId && !bebida1SeleccionadaId && !bebida2SeleccionadaId && !bebida3SeleccionadaId && !bebida4SeleccionadaId)) {
                setIsSaving(false);
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
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarCortesiaBebidaInventory(bebidaSeleccionadaId, cantidadBebida)
                        await guardarBebida(bebidaCortesia);
                        setCantidadBebida("");
                        setBebidaSeleccionada('');
                        setPrecioBebidaSeleccionada("");
                        setBebidaSeleccionadaId('');
                        setCantidadBebidaDisponible(0)
                        setResetKey(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                //isCortesia
                if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
                    if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
                        const bebidaCortesia1 = {
                            id: bebida1SeleccionadaId,
                            nombre: bebida1Seleccionada,
                            cantidad: cantidadBebida1,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarCortesiaBebidaInventory(bebida1SeleccionadaId, cantidadBebida1)
                        await guardarBebida(bebidaCortesia1);
                        setCantidadBebida1("");
                        setBebida1Seleccionada('');
                        setPrecioBebida1Seleccionada("");
                        setBebida1SeleccionadaId('');
                        setCantidadBebida1Disponible(0)
                        setResetKey1(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                //isCortesia
                if (cantidadBebida2 > 0 && bebida2SeleccionadaId) {
                    if (await checkStockAndUpdateInventory(bebida2SeleccionadaId, cantidadBebida2)) {
                        const bebidaCortesia2 = {
                            id: bebida2SeleccionadaId,
                            nombre: bebida2Seleccionada,
                            cantidad: cantidadBebida2,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarBebida(bebidaCortesia2);
                        setCantidadBebida2("");
                        setBebida2Seleccionada('');
                        setPrecioBebida2Seleccionada("");
                        setBebida2SeleccionadaId('');
                        setCantidadBebida2Disponible(0);
                        setResetKey2(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                //isCortesia
                if (cantidadBebida3 > 0 && bebida3SeleccionadaId) {
                    if (await checkStockAndUpdateInventory(bebida3SeleccionadaId, cantidadBebida3)) {
                        const bebidaCortesia3 = {
                            id: bebida3SeleccionadaId,
                            nombre: bebida3Seleccionada,
                            cantidad: cantidadBebida3,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarBebida(bebidaCortesia3);
                        setCantidadBebida3("");
                        setBebida3Seleccionada('');
                        setPrecioBebida3Seleccionada("");
                        setBebida3SeleccionadaId('');
                        setCantidadBebida3Disponible(0)
                        setResetKey3(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                //isCortesia
                if (cantidadBebida4 > 0 && bebida4SeleccionadaId) {
                    if (await checkStockAndUpdateInventory(bebida4SeleccionadaId, cantidadBebida4)) {
                        const bebidaCortesia4 = {
                            id: bebida4SeleccionadaId,
                            nombre: bebida4Seleccionada,
                            cantidad: cantidadBebida4,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarBebida(bebidaCortesia4);
                        setCantidadBebida4("");
                        setBebida4Seleccionada('');
                        setPrecioBebida4Seleccionada("");
                        setBebida4SeleccionadaId('');
                        setCantidadBebida4Disponible(0)
                        setResetKey4(prevKey => prevKey + 1);
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
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebidaSeleccionadaId, cantidadBebida)) {
                    await guardarBebida(bebidaAdultos);
                    setCantidadBebida("");
                    setBebidaSeleccionada('');
                    setPrecioBebidaSeleccionada("");
                    setBebidaSeleccionadaId('');
                    setCantidadBebidaDisponible(0)
                    setResetKey(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
                const bebidaAdultos1 = {
                    id: bebida1SeleccionadaId,
                    nombre: bebida1Seleccionada,
                    cantidad: cantidadBebida1,
                    precio: precioBebida1Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
                    await guardarBebida(bebidaAdultos1);
                    setCantidadBebida1("");
                    setBebida1Seleccionada('');
                    setPrecioBebida1Seleccionada("");
                    setBebida1SeleccionadaId('');
                    setCantidadBebida1Disponible(0)
                    setResetKey1(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }


            if (cantidadBebida2 > 0 && bebida2SeleccionadaId) {
                const bebidaAdultos2 = {
                    id: bebida2SeleccionadaId,
                    nombre: bebida2Seleccionada,
                    cantidad: cantidadBebida2,
                    precio: precioBebida2Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida2SeleccionadaId, cantidadBebida2)) {
                    await guardarBebida(bebidaAdultos2);
                    setCantidadBebida2("");
                    setBebida2Seleccionada('');
                    setPrecioBebida2Seleccionada("");
                    setBebida2SeleccionadaId('');
                    setCantidadBebida2Disponible(0)
                    setResetKey2(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            // Handle the second drink selection
            if (cantidadBebida3 > 0 && bebida3SeleccionadaId) {
                const bebidaAdultos3 = {
                    id: bebida3SeleccionadaId,
                    nombre: bebida3Seleccionada,
                    cantidad: cantidadBebida3,
                    precio: precioBebida3Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida3SeleccionadaId, cantidadBebida3)) {
                    await guardarBebida(bebidaAdultos3);
                    setCantidadBebida3("");
                    setBebida3Seleccionada('');
                    setPrecioBebida3Seleccionada("");
                    setBebida3SeleccionadaId('');
                    setCantidadBebida3Disponible(0)
                    setResetKey3(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            // Handle the second drink selection
            if (cantidadBebida4 > 0 && bebida4SeleccionadaId) {
                const bebidaAdultos4 = {
                    id: bebida4SeleccionadaId,
                    nombre: bebida4Seleccionada,
                    cantidad: cantidadBebida4,
                    precio: precioBebida4Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida4SeleccionadaId, cantidadBebida4)) {
                    await guardarBebida(bebidaAdultos4);
                    setCantidadBebida4("");
                    setBebida4Seleccionada('');
                    setPrecioBebida4Seleccionada("");
                    setBebida4SeleccionadaId('');
                    setCantidadBebida4Disponible(0)
                    setResetKey4(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (!isBebidaAdded) {
                alert("No se ha agregado ninguna bebida");
                setIsSaving(false);
            }
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar las bebidas en el cliente:', error.message);
        }
    };

    const guardarBebida = async (bebida) => {
        try {
            await AxiosInstance.post('/pasadia-agregar-bebida', {
                id: selectedClientId,
                bebida,
            });
            toast.success('Bebida guardada exitosamente!');

            setIsSaving(false);

            setEsCortesia(false);
            refresh();
            closeModalM();
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la bebida en el cliente:', error.message);
            throw error;
        }
    };
    //#endregion 

    const resetInpurGuardarFood = () => {
        setCantidadFood("");
        setFoodSeleccionada('');
        setPrecioFoodSeleccionada("");
        setFoodSeleccionadaId('');

        setCantidadFood1("");
        setFood1Seleccionada('');
        setPrecioFood1Seleccionada("");
        setFood1SeleccionadaId('');

        setCantidadFood2("");
        setFood2Seleccionada('')
        setPrecioFood2Seleccionada("");
        setFood2SeleccionadaId('');

        setCantidadFood3("");
        setFood3Seleccionada('');
        setPrecioFood3Seleccionada("");
        setFood3SeleccionadaId('');

        setCantidadFood4("");
        setFood4Seleccionada('');
        setPrecioFood4Seleccionada("");
        setFood4SeleccionadaId('');

        setCantidadFoodDisponible("")
        setCantidadFood1Disponible("")
        setCantidadFood2Disponible("")
        setCantidadFood3Disponible("")
        setCantidadFood4Disponible("")

        setResetKey(prevKey => prevKey + 1);

    }

    const guardarCortesiaFoodInventory = async (foodId, cantidad) => {
        console.log("datos de las cortesias que se guardaran: ", foodId, cantidad)
        try {
            const response = await AxiosInstance.post('/guardar-cortesias-inventario', {
                foodId,
                cantidad
            });

            if (response.status === 200) {
                console.log('Cortesías guardadas correctamente:', response.data);
            } else {
                console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error.message);
        }
    };

    const actualizarInventarioFood = async (foodId, cantidad) => {
        try {
            const response = await AxiosInstance.post('/actualizar-inventario-food', {
                id: foodId,
                cantidad,
            });
            console.log("datos enviados al servidor: " + foodId)

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error al actualizar el inventario. Estado de la respuesta: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al actualizar el inventario de comidas:', error.message);
            console.log("id predeterminado: " + foodId)
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

        if (isSaving) return;
        setIsSaving(true);

        if (!selectedClientId || (!foodSeleccionadaId && !food1SeleccionadaId && food2SeleccionadaId && food3SeleccionadaId && food4SeleccionadaId)) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
            return;
        }

        const checkStockAndUpdateInventory = async (foodId, cantidad) => {
            const response = await AxiosInstance.get(`/verificar-disponibilidad/${foodId}`);

            let fecha = new Date();

            fecha.setHours(fecha.getHours() - 5);

            const fechaAjustada = fecha.toLocaleString();

            const disponibleInventario = response.data.cantidadRestante;

            const clienteResponse = await AxiosInstance.get(`/pasadia-clientes/${selectedClientId}`);
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
                    alert(`Solo quedan 1 ${disponibleInventario} unidades disponibles en el inventario.`);
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
            }



            if (cantidad > disponibleInventario) {
                alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                return;
            } else if (disponibleInventario === 0 && !foodSeleccionada) {
                alert(`Ya no quedan ${foodSeleccionada} disponibles en el inventario `);
                return;
            } else if (disponibleInventario === 0 && !food1Seleccionada) {
                alert(`Ya no quedan ${food1Seleccionada} disponibles en el inventario `);
                return;
            }
            console.log("id de la comida seleccionada : " + foodSeleccionadaId)

            await actualizarInventarioFood(foodId, cantidad);
            await actualizarStockInicialFood(foodId, cantidad);

            return true;
        };


        try {
            if (!selectedClientId || (!foodSeleccionadaId && !food1SeleccionadaId && !food2SeleccionadaId && !food3SeleccionadaId && !food4SeleccionadaId)) {
                setIsSaving(false);
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
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarCortesiaFoodInventory(foodSeleccionadaId, cantidadFood)
                        await guardarFood(foodCortesia);
                        setCantidadFood("");
                        setFoodSeleccionada('');
                        setPrecioFoodSeleccionada("");
                        setFoodSeleccionadaId('');
                        setCantidadFoodDisponible(0);
                        setResetKey(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                //isCortesia
                if (cantidadFood1 > 0 && food1SeleccionadaId) {
                    if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
                        const foodCortesia1 = {
                            id: food1SeleccionadaId,
                            nombre: food1Seleccionada,
                            cantidad: cantidadFood1,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarCortesiaFoodInventory(food1SeleccionadaId, cantidadFood1)
                        await guardarFood(foodCortesia1);
                        setCantidadFood1("");
                        setFood1Seleccionada('');
                        setPrecioFood1Seleccionada("");
                        setFood1SeleccionadaId('');
                        setCantidadFood1Disponible(0)
                        setResetKey1(prevKey => prevKey + 1);
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
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarFood(foodCortesia2);
                        await guardarCortesiaFoodInventory(food2SeleccionadaId, cantidadFood2)
                        setCantidadFood2("");
                        setFood2Seleccionada('');
                        setPrecioFood2Seleccionada("");
                        setFood2SeleccionadaId('');
                        setCantidadFood2Disponible(0)
                        setResetKey2(prevKey => prevKey + 1);
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
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarFood(foodCortesia3);
                        await guardarCortesiaFoodInventory(food3SeleccionadaId, cantidadFood3)
                        setCantidadFood3("");
                        setFood3Seleccionada('');
                        setPrecioFood3Seleccionada("");
                        setFood3SeleccionadaId('');
                        setCantidadFood3Disponible(0)
                        setResetKey3(prevKey => prevKey + 1);
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
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        await guardarFood(foodCortesia4);
                        await guardarCortesiaFoodInventory(food4SeleccionadaId, cantidadFood4)
                        setCantidadFood4("");
                        setFood4Seleccionada('');
                        setPrecioFood4Seleccionada("");
                        setFood4SeleccionadaId('');
                        setCantidadFood4Disponible(0)
                        setResetKey4(prevKey => prevKey + 1);
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
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(foodSeleccionadaId, cantidadFood)) {
                    await guardarFood(foodAdultos);
                    setCantidadFood("");
                    setFoodSeleccionada('');
                    setPrecioFoodSeleccionada("");
                    setFoodSeleccionadaId('');
                    setCantidadFoodDisponible(0)
                    setResetKey(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }


            if (cantidadFood1 > 0 && food1SeleccionadaId) {
                const foodAdultos1 = {
                    id: food1SeleccionadaId,
                    nombre: food1Seleccionada,
                    cantidad: cantidadFood1,
                    precio: precioFood1Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
                    await guardarFood(foodAdultos1);
                    setCantidadFood1("");
                    setFood1Seleccionada('');
                    setPrecioFood1Seleccionada("");
                    setFood1SeleccionadaId('');
                    setCantidadFood1Disponible(0);
                    setResetKey1(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadFood2 > 0 && food2SeleccionadaId) {
                const foodAdultos2 = {
                    id: food2SeleccionadaId,
                    nombre: food2Seleccionada,
                    cantidad: cantidadFood2,
                    precio: precioFood2Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food2SeleccionadaId, cantidadFood2)) {
                    await guardarFood(foodAdultos2);
                    setCantidadFood2("");
                    setFood2Seleccionada('');
                    setPrecioFood2Seleccionada("");
                    setFood2SeleccionadaId('');
                    setCantidadFood2Disponible(0);
                    setResetKey2(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }


            if (cantidadFood3 > 0 && food3SeleccionadaId) {
                const foodAdultos3 = {
                    id: food3SeleccionadaId,
                    nombre: food3Seleccionada,
                    cantidad: cantidadFood3,
                    precio: precioFood3Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food3SeleccionadaId, cantidadFood3)) {
                    await guardarFood(foodAdultos3);
                    setCantidadFood3("");
                    setFood3Seleccionada('');
                    setPrecioFood3Seleccionada("");
                    setFood3SeleccionadaId('');
                    setCantidadFood3Disponible(0);
                    setResetKey3(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadFood4 > 0 && food4SeleccionadaId) {
                const foodAdultos4 = {
                    id: food4SeleccionadaId,
                    nombre: food4Seleccionada,
                    cantidad: cantidadFood4,
                    precio: precioFood4Seleccionada,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food4SeleccionadaId, cantidadFood4)) {
                    await guardarFood(foodAdultos4);
                    setCantidadFood4("");
                    setFood4Seleccionada('');
                    setPrecioFood4Seleccionada("");
                    setFood4SeleccionadaId('');
                    setCantidadFood4Disponible(0)
                    setResetKey4(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }



            if (!isBebidaAdded) {
                toast.error("No se ha agregado ninguna comida");
                setIsSaving(false);
            }
        } catch (error) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
        }
    };

    const guardarFood = async (food) => {

        try {
            const response = await AxiosInstance.post('/pasadia-agregar-food', {
                id: selectedClientId,
                food,
            });
            toast.success('Comida guardada exitosamente!');
            setEsCortesia(false);
            closeModalF();
            setIsSaving(false);
            closeModalF();
            refresh()
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la comida en el cliente:', error.message);
            throw error;
        }
    };




    //#endregion

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

            if (formIsValid) {

                await AxiosInstance.post("/pasadia-registrar-cliente", formData);
                onClose();
                toast.success('Cliente agregado exitosamente!');
                setFormData({
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
                    fechaPasadia: ""

                });
                const response = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
                setUsers(response.data.clientes);
                setTotalPaginas(response.data.totalPages);
            }
        } catch (error) {
            toast.error('Ocurrió un error al agregar el cliente o el registro ya existe.');
        }
    };
    //#region 


    const handleEditUser = async (id) => {
        try {
            await AxiosInstance.put(
                `/pasadia/edit/${id}`,
                {
                    nombre: editedName,
                    fechaPasadia: editedDate,
                    reserva: editedReserva
                },
                console.log("id del usuario " + id)
            );
            const updatedUsers = users.map((user) =>
                user._id === id ? { nombre: editedName, fechaPasadia: editedDate, reserva: editedReserva } : user
            );
            setEditedName("");
            setEditedReserva("");
            setEditedDate("");
            setEditedUserId(null);
            toast.success('Cliente actualizado exitosamente!');
            const response = await AxiosInstance.get("/pasadia-clientes");
            const usuariosOrdenados = response.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
            setUsers(usuariosOrdenados);
        } catch (error) {
            console.error("Error al editar usuario:", error);
            alert("Error al editar usuario. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get("/drinks");
                const filteredDrinks = response.data.filter(drink => drink.CantidadInicial > 0);
                setDrinks(filteredDrinks);
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
                const snacksWithoutSubproducts = response.data.filter(product =>
                    (!product.subproductos || product.subproductos.length === 0) &&
                    product.CantidadInicial > 0
                );

                setSnacks(snacksWithoutSubproducts);
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
                const allProducts = response.data;

                let subProducts = [];
                allProducts.forEach(product => {
                    if (product.CantidadInicial > 0) {
                        if (product.subproductos) {
                            const subProductosConCantidadPadre = product.subproductos.map(sub => {
                                return { ...sub, cantidadPadre: product.CantidadInicial, idPadre: product._id };
                            });
                            subProducts = subProducts.concat(subProductosConCantidadPadre);
                        }
                    }
                });

                setComidas(subProducts);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);

    const [isModalOpen, setModalOpen] = useState(false);


    const { isOpen: isFirstModalOpen, onOpen: openFirstModal, onClose: closeFirstModal } = useDisclosure();
    const sizes = ['4xl'];



    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setOpenTd(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const [size, setSize] = React.useState('5xl')

    const sizess = ["5xl",];



    const { isOpen: isModalOpenM, onOpen: openModalM, onClose: closeModalM } = useDisclosure();
    const { isOpen: isModalOpenF, onOpen: openModalF, onClose: closeModalF } = useDisclosure();


    const limpiarCampos = () => {

        setCantidadBebida("");
        setBebidaSeleccionada('');
        setPrecioBebidaSeleccionada("");
        setBebidaSeleccionadaId('');

        setCantidadBebida1("");
        setBebida1Seleccionada('');
        setPrecioBebida1Seleccionada("");
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



        setCantidadBebidaDisponible("")
        setCantidadBebida1Disponible("")
        setCantidadBebida2Disponible("")
        setCantidadBebida3Disponible("")
        setCantidadBebida4Disponible("")
    }

    const limpiarCampos1 = () => {
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

        setCantidadFoodDisponible("")
        setCantidadFood1Disponible("")
        setCantidadFood2Disponible("")
        setCantidadFood3Disponible("")
        setCantidadFood4Disponible("")
    }

    const handleOpenm = async (userId) => {
        setSelectedClientId(userId);
        setOpenMd(true)

        limpiarCampos();


        const response = await AxiosInstance.get("/drinks");
        const filteredDrinks = response.data.filter(drink => drink.CantidadInicial > 0);
        setDrinks(filteredDrinks);


    };

    const [selectedSize, setSelectedSize] = React.useState('md');

    const handleOpenmf = async (userId) => {
        setSelectedSize(size);
        setSelectedClientId(userId);
        // openModalF();
        setOpenFz(true)

        limpiarCampos1();


        const responses = await AxiosInstance.get("/food");
        const snacksWithoutSubproducts = responses.data.filter(product =>
            (!product.subproductos || product.subproductos.length === 0) &&
            product.CantidadInicial > 0
        );
        setSnacks(snacksWithoutSubproducts);
        const response = await AxiosInstance.get("/food");
        const allProducts = response.data;
        let subProducts = [];
        allProducts.forEach(product => {
            if (product.CantidadInicial > 0) {
                if (product.subproductos) {
                    const subProductosConCantidadPadre = product.subproductos.map(sub => {
                        return { ...sub, cantidadPadre: product.CantidadInicial, idPadre: product._id };
                    });
                    subProducts = subProducts.concat(subProductosConCantidadPadre);
                }
            }
        });
        setComidas(subProducts);


    };

    const seleccionarCliente = async (identificacion) => {
        console.log("id: ", identificacion)
        const response = await AxiosInstance.get(`/pasadia-totalidad-pago/${identificacion}`)
        const { restaurante, bar, recepcion, descorche } = response.data
        console.log("datos del restaurante: ",restaurante)
        setResTotal(restaurante)
        setBarTotal(bar)
        setRecTotal(recepcion)
        setDesTotal(descorche)
        setSelectedClienteId(identificacion);
        calcularPagoPendiente(identificacion);
    };

    const calcularPagoPendiente = (identificacion) => {
        const clienteSeleccionado = users.find(user => user.identificacion === identificacion);
        if (clienteSeleccionado) {
            const totalPago = (clienteSeleccionado.cantidadPersonas.adultos * pasadiaAdultos) +
                (clienteSeleccionado.cantidadPersonas.ninios * pasadiaNinios);
            const pagoPendienteCalculado = totalPago - (clienteSeleccionado.pagoAnticipado + clienteSeleccionado.pagoPendiente);
            setFormDatas({
                ...formDatas,
                pagoPendiente: pagoPendienteCalculado.toString()
            });
        }
    };

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setFormDatas({ ...formDatas, [name]: value });
    };


    const actualizarDatosCliente = async (data1, data2, estado, userId) => {
        console.log("DATOS ENVIADOS: ", estado, userId)
        await handleStatus(estado, userId)

        if (selectedClienteId) {
            try {
                const responseData = await AxiosInstance.get(`/pasadia-totalidad-reserva-pago/${selectedClienteId}`);
                const { identificacion, restaurante, bar, recepcion, descorche, reserva, anticipado, posterior, pendiente } = responseData.data;
                if (reserva === "Si") {
                    console.log("ingresos al condicional")
                    const calculo1 = restaurante + bar + recepcion + descorche + anticipado + posterior + pendiente;
                    const calculo2 = calculo1 - anticipado;
                    console.log("id del usuario: ", selectedClienteId)
                    await AxiosInstance.put(`/pasadia-actualizar-valor`, { id: selectedClienteId, valor: calculo2 })
                    console.log("success")
                    toast.success("datos actualizados")
                    const responses = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
                    setUsers(responses.data.clientes);
                    setTotalPaginas(responses.data.totalPages);
                } else {
                    console.log("ingresos al condicional")
                    const calculo1 = restaurante + bar + recepcion + descorche + anticipado + posterior + pendiente;
                    console.log("id del usuario: ", selectedClienteId)
                    await AxiosInstance.put(`/pasadia-actualizar-valor`, { id: selectedClienteId, valor: calculo1 })
                    console.log("success")
                    toast.success("datos actualizados")
                    const responses = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
                    setUsers(responses.data.clientes);
                    setTotalPaginas(responses.data.totalPages);

                }

                if (pendiente !== 0) {
                    const clienteResponse = await AxiosInstance.get(`/pasadia-clientes-identificacion/${selectedClienteId}`);
                    const clienteData = clienteResponse.data;

                    const nuevoValorTotal = clienteData.valorTotal - formDatas.pagoPendiente;

                    const response = await AxiosInstance.put(`/pasadia-clientes/${selectedClienteId}/actualizar`, {
                        valorTotal: nuevoValorTotal,
                        pagoPendiente: formDatas.pagoPendiente,
                        mediosDePagoPendiente: formDatas.mediosDePagoPendiente
                    });

                    setFormDatas({
                        pagoPendiente: '',
                        mediosDePagoPendiente: ''
                    });

                    toast.success('Datos actualizados exitosamente');

                    const responses = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
                    setUsers(responses.data.clientes);
                    setTotalPaginas(responses.data.totalPages);

                }

                closeModal();

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
            const response = await AxiosInstance.put('/facturacion', datosActualizados);
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    }


    let fecha = new Date();

    fecha.setHours(fecha.getHours());

    const fechaAjustada = fecha.toLocaleString();

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




    let fecha2 = new Date();

    fecha2.setHours(fecha2.getHours());

    const hours = fecha2.toLocaleString();

    //#region




    //#endregion






    const limpiarItems = async () => {

        const response = await AxiosInstance.get("/food");
        const allProducts = response.data;

        let subProducts = [];
        allProducts.forEach(product => {
            if (product.subproductos) {
                const subProductosConCantidadPadre = product.subproductos.map(sub => {
                    return { ...sub, cantidadPadre: product.CantidadInicial, idPadre: product._id };
                });
                subProducts = subProducts.concat(subProductosConCantidadPadre);
            }
        });

        setComidas(subProducts);

    }

    const actualizarInventarioItem = async (foodId, subproductoId, cantidad) => {
        console.log("peticion actualizar inventario item: " + foodId, subproductoId, cantidad)
        try {
            const response = await AxiosInstance.post('/update-cantidad-inicial', {
                foodId,
                subproductoId,
                cantidad
            });

            console.log("Datos enviados al servidor - FoodID: " + foodId + ", SubProductoID: " + subproductoId);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error al actualizar el inventario. Estado de la respuesta: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al actualizar el inventario de comidas:', error.message);
            console.log("ID predeterminado: " + foodId);
            throw error;
        }
    };

    const guardarCortesiaItemInventory = async (foodId, subproductoId, cantidad) => {
        console.log("datos de las cortesias que se guardaran: ", foodId, subproductoId, cantidad)
        try {
            const response = await AxiosInstance.post('/guardar-cortesia-inventario', {
                foodId,
                subproductoId,
                cantidad
            });

            if (response.status === 200) {
                console.log('Cortesías guardadas correctamente:', response.data);
            } else {
                console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error.message);
        }
    };

    const handleGuardarItem = async () => {
        if (isSaving) return;
        setIsSaving(true);

        if (!selectedClientId || (!subItemSeleccionadoId && !subItemSeleccionadoId1 && !subItemSeleccionadoId2 && !subItemSeleccionadoId3 && !subItemSeleccionadoId4)) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
            return;
        }


        const checkStockAndUpdateInventory = async (foodId, subProductoId, cantidad) => {
            console.log("quiero ver quien pasa ese id y cantidad: ", foodId, cantidad)
            const response = await AxiosInstance.get(`/verificar-disponibilidad/${foodId}`);

            let fecha = new Date();

            fecha.setHours(fecha.getHours() - 5);

            const fechaAjustada = fecha.toLocaleString();

            const disponibleInventario = response.data.cantidadRestante;

            const clienteResponse = await AxiosInstance.get(`/pasadia-clientes/${selectedClientId}`);
            const { ninios, adultos } = clienteResponse.data.cantidadPersonas;
            const numeroDeFood = clienteResponse.data.cantidadDeFood.filter(food => food.mensaje === "Cortesía" && food.fechaDeMarca === "");
            const cantidadTotalCortesia = numeroDeFood.reduce((total, food) => total + food.cantidad, 0);
            console.log("numero de cortesias: " + cantidadTotalCortesia)
            console.log("cantidad de bebidas del usuario" + JSON.stringify(numeroDeFood, null, 2))
            const totalPersonas = ninios + adultos;
            console.log("cantidad de personas en cortesias: ", totalPersonas)

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
            }



            if (cantidad > disponibleInventario) {
                alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                return;
            } else if (disponibleInventario === 0 && !foodSeleccionada) {
                alert(`Ya no quedan ${foodSeleccionada} disponibles en el inventario `);
                return;
            } else if (disponibleInventario === 0 && !food1Seleccionada) {
                alert(`Ya no quedan ${food1Seleccionada} disponibles en el inventario `);
                return;
            }
            console.log("id de la comida seleccionada : " + foodSeleccionadaId)

            // let subproductoId = subItemSeleccionadoId;
            // console.log("..... muestra de datos", subproductoId)
            await actualizarInventarioItem(foodId, subProductoId, cantidad);
            // await actualizarSubproducto(foodId,subproductoId, cantidad)

            return true;
        };



        try {
            if (!selectedClientId || (!subItemSeleccionadoId && !subItemSeleccionadoId1 && !subItemSeleccionadoId2 && !subItemSeleccionadoId3 && !subItemSeleccionadoId4)) {
                setIsSaving(false);
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }


            if (esCortesia) {
                let atLeastOneCortesiaSaved = false;

                if (cantidadItem > 0 && itemSeleccionadoId) {
                    let subproductoId = subItemSeleccionadoId;
                    if (await checkStockAndUpdateInventory(itemSeleccionadoId, subproductoId, cantidadItem)) {
                        const itemCortesia = {
                            id: subItemSeleccionadoId,
                            nombre: itemSeleccionado,
                            cantidad: cantidadItem,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        let subproductoId = subItemSeleccionadoId;
                        await guardarItem(itemCortesia);
                        await guardarCortesiaItemInventory(itemSeleccionadoId, subproductoId, cantidadItem)
                        setItemSeleccionado("");
                        setCantidadItem("");
                        setPrecioItemSeleccionado("");
                        setItemSeleccionadoId("");
                        setSubItemSeleccionadoId("");
                        setCantidadFoodDisponible("");
                        setResetKey(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                if (cantidadItem1 > 0 && itemSeleccionadoId1) {
                    let subproductoId = subItemSeleccionadoId1;
                    if (await checkStockAndUpdateInventory(itemSeleccionadoId1, subproductoId, cantidadItem1)) {
                        const itemCortesia1 = {
                            id: subItemSeleccionadoId1,
                            nombre: itemSeleccionado1,
                            cantidad: cantidadItem1,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        let subproductoId = subItemSeleccionadoId1;
                        await guardarItem(itemCortesia1);
                        await guardarCortesiaItemInventory(itemSeleccionadoId1, subproductoId, cantidadItem1)
                        setItemSeleccionado1("");
                        setCantidadItem1("");
                        setPrecioItemSeleccionado1("");
                        setItemSeleccionadoId1("");
                        setSubItemSeleccionadoId1("");
                        setCantidadFood1Disponible("");
                        setResetKey1(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                if (cantidadItem2 > 0 && itemSeleccionadoId2) {
                    let subproductoId = subItemSeleccionadoId2;
                    if (await checkStockAndUpdateInventory(itemSeleccionadoId2, subproductoId, cantidadItem2)) {
                        const itemCortesia2 = {
                            id: subItemSeleccionadoId2,
                            nombre: itemSeleccionado2,
                            cantidad: cantidadItem2,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        let subproductoId = subItemSeleccionadoId2;
                        await guardarItem(itemCortesia2);
                        await guardarCortesiaItemInventory(itemSeleccionadoId2, subproductoId, cantidadItem2)
                        setItemSeleccionado2("");
                        setCantidadItem2("");
                        setPrecioItemSeleccionado2("");
                        setItemSeleccionadoId2("");
                        setSubItemSeleccionadoId2("");
                        setCantidadFood2Disponible("");
                        setResetKey2(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                if (cantidadItem3 > 0 && itemSeleccionadoId3) {
                    let subproductoId = subItemSeleccionadoId3;
                    if (await checkStockAndUpdateInventory(itemSeleccionadoId3, subproductoId, cantidadItem3)) {
                        const itemCortesia3 = {
                            id: subItemSeleccionadoId3,
                            nombre: itemSeleccionado3,
                            cantidad: cantidadItem3,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        let subproductoId = subItemSeleccionadoId3;
                        await guardarItem(itemCortesia3);
                        await guardarCortesiaItemInventory(itemSeleccionadoId3, subproductoId, cantidadItem3)
                        setItemSeleccionado3("");
                        setCantidadItem3("");
                        setPrecioItemSeleccionado3("");
                        setItemSeleccionadoId3("");
                        setSubItemSeleccionadoId3("");
                        setCantidadFood3Disponible("");
                        setResetKey3(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }

                if (cantidadItem4 > 0 && itemSeleccionadoId4) {
                    let subproductoId = subItemSeleccionadoId4;
                    if (await checkStockAndUpdateInventory(itemSeleccionadoId4, subproductoId, cantidadItem4)) {
                        const itemCortesia4 = {
                            id: subItemSeleccionadoId4,
                            nombre: itemSeleccionado4,
                            cantidad: cantidadItem4,
                            precio: 0,
                            mensaje: "Cortesía",
                            fechaDeMarca: "",
                            fecha: obtenerFechaConAjuste()
                        };
                        let subproductoId = subItemSeleccionadoId4;
                        await guardarItem(itemCortesia4);
                        await guardarCortesiaItemInventory(itemSeleccionadoId4, subproductoId, cantidadItem4)
                        setItemSeleccionado4("");
                        setCantidadItem4("");
                        setPrecioItemSeleccionado4("");
                        setItemSeleccionadoId4("");
                        setSubItemSeleccionadoId4("");
                        setCantidadFood4Disponible("");
                        setResetKey4(prevKey => prevKey + 1);
                        atLeastOneCortesiaSaved = true;
                    }
                }


                if (atLeastOneCortesiaSaved) {
                    onClose();
                }
                return;
            }


            let isBebidaAdded = false;

            if (cantidadItem > 0 && itemSeleccionadoId) {
                const item = {
                    id: subItemSeleccionadoId,
                    nombre: itemSeleccionado,
                    cantidad: cantidadItem,
                    precio: precioItemSeleccionado,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId;
                console.log("depuracion dentro del checkInventory: ", itemSeleccionadoId, subproductoId, cantidadItem)
                if (await checkStockAndUpdateInventory(itemSeleccionadoId, subproductoId, cantidadItem)) {
                    await guardarItem(item);
                    setItemSeleccionado("");
                    setCantidadItem("");
                    setPrecioItemSeleccionado("");
                    setItemSeleccionadoId("");
                    setSubItemSeleccionadoId("");
                    setCantidadFoodDisponible("");
                    setResetKey(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem1 > 0 && itemSeleccionadoId1) {
                const item1 = {
                    id: subItemSeleccionadoId1,
                    nombre: itemSeleccionado1,
                    cantidad: cantidadItem1,
                    precio: precioItemSeleccionado1,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId1;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId1, subproductoId, cantidadItem1)) {
                    await guardarItem(item1);
                    setItemSeleccionado1("");
                    setCantidadItem1("");
                    setPrecioItemSeleccionado1("");
                    setItemSeleccionadoId1("");
                    setSubItemSeleccionadoId1("");
                    setCantidadFood1Disponible("");
                    setResetKey1(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem2 > 0 && itemSeleccionadoId2) {
                const item2 = {
                    id: subItemSeleccionadoId2,
                    nombre: itemSeleccionado2,
                    cantidad: cantidadItem2,
                    precio: precioItemSeleccionado2,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId2;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId2, subproductoId, cantidadItem2)) {
                    await guardarItem(item2);
                    setItemSeleccionado2("");
                    setCantidadItem2("");
                    setPrecioItemSeleccionado2("");
                    setItemSeleccionadoId2("");
                    setSubItemSeleccionadoId2("");
                    setCantidadFood2Disponible("");
                    setResetKey2(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem3 > 0 && itemSeleccionadoId3) {
                const item3 = {
                    id: subItemSeleccionadoId3,
                    nombre: itemSeleccionado3,
                    cantidad: cantidadItem3,
                    precio: precioItemSeleccionado3,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId3;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId3, subproductoId, cantidadItem3)) {
                    await guardarItem(item3);
                    setItemSeleccionado3("");
                    setCantidadItem3("");
                    setPrecioItemSeleccionado3("");
                    setItemSeleccionadoId3("");
                    setSubItemSeleccionadoId3("");
                    setCantidadFood3Disponible("");
                    setResetKey3(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem4 > 0 && itemSeleccionadoId4) {
                const item4 = {
                    id: subItemSeleccionadoId4,
                    nombre: itemSeleccionado4,
                    cantidad: cantidadItem4,
                    precio: precioItemSeleccionado4,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId4;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId4, subproductoId, cantidadItem4)) {
                    await guardarItem(item4);
                    setItemSeleccionado4("");
                    setCantidadItem4("");
                    setPrecioItemSeleccionado4("");
                    setItemSeleccionadoId4("");
                    setSubItemSeleccionadoId4("");
                    setCantidadFood4Disponible("");
                    setResetKey4(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (!isBebidaAdded) {
                toast.promise("No se ha agregado ninguna comida");
                setIsSaving(false);
            }
        } catch (error) {
            toast.error('Error al guardar las bebidas en el cliente:', error.message);
            setIsSaving(false);
        }

    }

    const guardarItem = async (food) => {
        try {
            await AxiosInstance.post('/pasadia-agregar-food', {
                id: selectedClientId,
                food,
            });
            toast.success('Comida guardada exitosamente!');
            setEsCortesia(false);
            limpiarItems();
            closeModalF()
            setIsSaving(false);

            const response = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
            setUsers(response.data.clientes);
            setTotalPaginas(response.data.totalPages);
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la comida en el cliente:', error.message);
            throw error;
        }
    };

    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    const handleStatus = async (nuevoEstado, userId) => {
        console.log(userId, nuevoEstado)
        try {
            const response = await AxiosInstance.put('/pasadia-actualizar-estado', {
                userId: userId,
                estado: nuevoEstado
            });
            const responses = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
            setUsers(responses.data.clientes);
            setTotalPaginas(responses.data.totalPages);
        } catch (error) {
            console.error('Hubo un problema con la petición Axios:', error);
            cosnsole.log("depuración: ", error)
        }
    }

    const EstadoIcono = ({ estado }) => {
        let color;

        switch (estado) {
            case 'activo':
                color = green[500];
                break;
            case 'pendiente':
                color = blue[500];
                break;
            case 'cancelado':
                color = red[600];
                break;
            case 'finalizado':
                color = purple[500];
                break;
        }

        return <Brightness1Icon style={{ color, width: "14px" }} />;
    };

    //#endregion

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: "min-height-90vh",
        bgcolor: 'background.paper',
        overflow: "scroll",
        boxShadow: 0,
        p: 4,
        borderRadius: 5
    };

    const styleAdd = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        overflow: "scroll",
        boxShadow: 0,
        p: 4,
        borderRadius: 5,

    };

    const defaultOptionLoading = {
        loop: true,
        autoPlay: true,
        animationData: loading_progress,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }





    return (
        <div className="pt-20 flex justify-center items-center flex-col">
            <Toaster />
            <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
                <Lottie options={defaultOptionLoading} width={100} height={100} />
                {/* <p>Cargando recursos</p> */}
            </div>
            <div className="media-query-add-search">
                <div className="">
                    <Input
                        label="Search"
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
                    <div className=" flex  flex-wrap gap-3">
                        <Button
                            variant="flat"
                            onClick={handleOpen}
                            className="capitalize text-white bg-black"
                        >
                            <PlusIcon />Agregar
                        </Button>
                        <div className="flex items-center justify-center ml-7">
                            <Button className="bg-blue-500 w-28 text-white">
                                Exportar

                            </Button>
                        </div>
                    </div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        BackdropProps={{
                            style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                        }}>
                        < Box sx={styleAdd} style={{
                            maxHeight: "90vh",
                            minHeight: "min-content",
                            overflowY: "auto"
                        }} >
                            <>
                                <Typography className="flex flex-col justify-center items-center " style={{ height: "300px", }}>

                                    <img style={{ width: "450px" }} src={stats} alt="" />

                                </Typography>
                                <Typography component="h2" ><h2 className="text-2xl pt-5 pl-2 pb-4" >REGISTRAR USUARIO</h2></Typography>
                                <Typography componet="div" >
                                    <div className="flex pt-1 pb-2">
                                        <Input
                                            isRequired
                                            id="identificacion"
                                            name="identificacion"
                                            type="text"

                                            variant="flat"
                                            label="IDENTIFICACIÓN DE USUARIO"
                                            value={formData.identificacion}
                                            onChange={handleInputChange}
                                            className={`rounded-xl h-12 border-2 mr-2 ${errorIdentificacion ? 'border-red-500' : 'border-blue-400'}`}
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                    event.preventDefault();
                                                }
                                            }}
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
                                            className={`rounded-xl h-12 border-2 ml-2 ${errorNombre ? 'border-red-500' : 'border-blue-400'}`}
                                            style={{ textTransform: 'capitalize' }}
                                        />
                                    </div>



                                    <Select
                                        isRequired
                                        id="reserva"
                                        name="reserva"
                                        label="¿LA RESERVA FUE REALIZADA?"
                                        className={`rounded-xl border-2 ${errorReserva ? 'border-red-500' : 'border-blue-400'}`}
                                        value={formData.reserva}
                                        onChange={(event) => handleReservaChange(event.target.value)}
                                        style={{ height: "48px" }}
                                    >
                                        {options.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div className="flex mt-2">

                                        <Input
                                            isRequired
                                            id="adultos"
                                            name="adultos"
                                            type="text"
                                            variant="flat"
                                            label="CANTIDAD DE ADULTOS"
                                            value={formData.cantidadPersonas.adultos}
                                            onChange={(event) => handleInputChange(event, "adultos")}
                                            className={`rounded-xl h-12 border-2 mr-2 ${errorAdultos ? 'border-red-500' : 'border-green-400'}`}
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />

                                        <Input
                                            required
                                            id="ninios"
                                            name="ninios"
                                            type="text"
                                            variant="flat"
                                            label="CANTIDAD DE NIÑOS"
                                            value={formData.cantidadPersonas.ninios}
                                            onChange={(event) => handleInputChange(event, "ninios")}
                                            className={`rounded-xl h-12 border-2 ml-2 ${errorNinios ? 'border-red-500' : 'border-green-400'}`}
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex mt-2">

                                        <select
                                            id="mediosDePago"
                                            name="mediosDePago"

                                            value={formData.mediosDePago}
                                            onChange={(event) => handleInputChange(event)}
                                            className=" w-6/12 outline-none border-2 rounded-xl border-blue-400"
                                            style={{ height: "47px" }}
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
                                            className="w-6/12 ml-3 rounded-xl border-2 h-12  border-blue-400"
                                            type="text"
                                            variant="flat"
                                            label="PAGO ANTICIPADO"
                                            value={formData.pagoAnticipado}
                                            onChange={handleInputChange}
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                    <Input
                                        isRequired
                                        name="fechaPasadia"
                                        type="date"
                                        label="FECHA EN LA QUE DESEA DISFRUTAR EL PASADIA"
                                        className={`rounded-xl border-2 mt-2 mb-2 h-12 ${errorFechaPasadia ? 'border-red-500' : 'border-blue-400'}`}
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
                                            style={{ height: "47px" }}
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
                                            className="w-6/12 h-12 border-2 border-blue-400 rounded-xl"
                                            type="text"
                                            variant="flat"
                                            label="PAGO ANTICIPADO"
                                            value={formData.pagoPendiente}
                                            onChange={handleInputChange}
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>

                                </Typography>
                                <Typography component="div" className="pt-5">
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onClick={handleFormSubmit}>
                                        Guardar
                                    </Button>
                                </Typography>
                            </>

                        </Box>
                    </Modal>
                </div>
            </div>
            <span className="media-query-tittle"><h1>Pasadia</h1></span>
            <div className="flex w-full justify-end mb-5 pr-20">
                <Pagination
                    count={totalPaginas}
                    page={paginaActual}
                    onChange={cambiarPagina}
                    color="primary"
                    className={paginaActual === 1 ? "first-page-disabled" : ""}
                />
            </div>
            <section className="table-scroll-transform" style={{ width: "90vw" }}>
                <Table className="  bg-white p-5" style={{ paddingTop: "40px", width: "90vw" }}>
                    <thead className="html-table-thead ">
                        <tr className="html-table-tr border-b-2 border-red-100" >
                            <th className="html-table-tr-th"> <span className="html-table-thead-span pl-5"><p></p> +  <img className="cursor-pointer mr-2 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span pl-5"> <p></p>  Id<img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th pl-5"> <span className="html-table-thead-span"> <p></p>  Nombre <img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th pl-5"> <span className="html-table-thead-span"> <p></p>Fecha de Inicio<img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span pl-5"> <p></p>  Agregar bebida <img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th pl-5"> <span className="html-table-thead-span"> <p></p>  Agregar comida <img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th pl-5"> <span className="html-table-thead-span"> <p></p>  Pago pendiente <img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span pl-5"> <p></p>  Estado <img className="cursor-pointer mr-5 ml-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span-fn"><p></p> <img className="cursor-pointer mr-5  ml-3" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> <p></p> </span></th>
                        </tr>
                    </thead>
                    <span className="flex h-2"></span>
                    <tbody className="">
                        {users.map((cliente) => (
                            <tr key={cliente._id} className="">
                                <td className="text-left html-table-tbody ">
                                    {selectedUser && (
                                        <Modal open={openTd} onClose={handleCloseTd} className=""
                                            BackdropProps={{
                                                style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
                                            }}
                                        >
                                            <Box sx={styleAdd} style={{
                                                maxHeight: "90vh",
                                                minHeight: "min-content",
                                                overflowY: "auto"
                                            }} >
                                                <Typography component="div" className="border-b-3 border-blue-500 text-3xl flex  justify-between">
                                                    <div className="mb-0.5 text-2xl">History</div>
                                                    <div className="uppercase text-lg"> {selectedUser.nombre} - {selectedUser.identificacion}</div>
                                                </Typography>
                                                <Typography component="div" className="uppercase flex">
                                                    <div className="flex w-full">
                                                        <section className="flex justify-between w-full flex-wrap">

                                                            <div className="mx-5 my-1  w-full">
                                                                <div className="mt-2 mb-2" style={{ fontWeight: "600" }}> Pago pendiente cabaña {selectedUser.tipo_cabania} : {selectedUser.nuevoTotal}</div>
                                                                <h4 className="text-green-600">Productos (Bebidas y Comidas)</h4>

                                                                {/* Combina ambos arrays (bebidas y comidas) y verifica si tiene elementos */}
                                                                {selectedUser.bebidas && selectedUser.restaurante &&
                                                                    Array.isArray(selectedUser.bebidas) && Array.isArray(selectedUser.restaurante) && Array.isArray(selectedUser.descorche) && Array.isArray(selectedUser.recepcion) &&
                                                                    [...selectedUser.bebidas, ...selectedUser.restaurante, ...selectedUser.descorche, ...selectedUser.recepcion].length > 0 ? (
                                                                    <table className="w-full text-center">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className=" text-left">Nombre</th>
                                                                                <th style={{ width: "100px" }}>Cantidad</th>
                                                                                <th>mensaje</th>
                                                                                <th>Precio Unitario</th>
                                                                                <th>Total</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {[...selectedUser.bebidas, ...selectedUser.restaurante, ...selectedUser.descorche, ...selectedUser.recepcion].map((producto, index) => (
                                                                                <tr key={index}>
                                                                                    <td className="text-left" style={{ width: "280px" }}>{producto.nombre}</td>
                                                                                    <td>{producto.cantidad}</td>
                                                                                    <td>{producto.adicional}</td>
                                                                                    <td style={{ width: "280px" }} >{producto.precio}</td>
                                                                                    <td>{producto.cantidad * producto.precio}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                        <tfoot className="border-t-3 border-green-500 pt-2">
                                                                            <tr>
                                                                                <td className="text-left"></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td style={{ height: "60px", paddingRight: "20px", width: "150px" }} className="text-right">Total: {
                                                                                    [...selectedUser.bebidas, ...selectedUser.restaurante, ...selectedUser.recepcion, ...selectedUser.descorche].reduce((acc, producto) =>
                                                                                        acc + (producto.cantidad * producto.precio), 0
                                                                                    )
                                                                                }</td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                ) : (
                                                                    <p className=" w-full text-center">No hay productos que mostrar😔</p>
                                                                )}
                                                            </div>

                                                        </section>
                                                    </div>
                                                </Typography>
                                                <div className="flex flex-col">
                                                    {/* <span className=" flex w-full  pr-20">¿El cliente realizo un pago anticipado para reservar? <Checkbox checked={esPagoAnticipado}
                                                            onChange={handlePagoAnticipadoChange} className="ml-1"></Checkbox></span> */}
                                                    <hr className="bg-gray-400 mb-2 mt-2" style={{ height: "4px" }} />
                                                    {selectedUser.reserva === "Si" ? (
                                                        <div>
                                                            <span className=" flex w-full  pr-20">Pago pendiente cabania {selectedUser.tipo_cabania}: {selectedUser.nuevoTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Pago adelantado:<span className="text-red-500"> {selectedUser.pagoAnticipado || 0}</span></span>
                                                            <span className=" flex w-full  pr-20">Pago posterior: {selectedUser.pagoPendiente || 0}</span>
                                                            <span className=" flex w-full  pr-20">Bar: {barTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Adicional: {recTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Descorche: {desTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Restaurante: {resTotal || 0}</span>
                                                            <hr className="bg-gray-400 mt-2 flex justify-between" style={{ height: "3px" }} />
                                                            <span className=" flex w-full mt-2  pr-20">Tatal a pagar:
                                                                {(
                                                                    barTotal +
                                                                    resTotal +
                                                                    recTotal +
                                                                    desTotal +
                                                                    selectedUser.pagoPendiente +
                                                                    selectedUser.nuevoTotal +
                                                                    selectedUser.pagoAnticipado
                                                                ) - (selectedUser.pagoAnticipado)}</span>
                                                            <hr className="bg-gray-400 mt-2 mb-5" style={{ height: "3px" }} />
                                                            <span>Cancelado: {selectedUser.pago}</span>

                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className=" flex w-full  pr-20">Pago pendiente cabania {selectedUser.tipo_cabania}: {selectedUser.nuevoTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Pago adelantado:<span className="text-red-500"> {selectedUser.pagoAnticipado || 0}</span></span>
                                                            <span className=" flex w-full  pr-20">Pago posterior: {selectedUser.pagoPendiente || 0}</span>
                                                            <span className=" flex w-full  pr-20">Bar: {barTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Adicional: {recTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Descorche: {desTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20">Restaurante: {resTotal || 0}</span>
                                                            <span className=" flex w-full  pr-20 mt-2">Tatal a pagar: {(
                                                                barTotal +
                                                                resTotal +
                                                                recTotal +
                                                                desTotal +
                                                                selectedUser.pagoAnticipado +
                                                                selectedUser.pagoPendiente +
                                                                selectedUser.nuevoTotal)} </span>
                                                            <hr className="bg-gray-400 mt-2 mb-5" style={{ height: "3px" }} />
                                                            <span className="">Cancelado: {selectedUser.pago || 0}</span>
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="flex justify-between mt-5">
                                                    <Typography component="div" >
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
                                                        <Button className="ml-2" color="danger" variant="shadow" onClick={closeModal}>
                                                            Cerrar
                                                        </Button>
                                                    </Typography>

                                                    <Typography>
                                                        {/* {selectedUser.nuevoTotal > 0 && selectedUser.pago <= 0 ? ( */}
                                                        <Button color="secondary" variant="shadow" onClick={() => actualizarDatosCliente(selectedUser.nuevoTotal, selectedUser.identificacion, "finalizado", selectedUser._id)}>
                                                            Guardar
                                                        </Button>
                                                        {/* ) : (
                                                             <Button color="secondary" variant="shadow" >
                                                                 Inhabilitado
                                                             </Button>
                                                         )} */}
                                                    </Typography>

                                                </div>
                                            </Box>
                                        </Modal>
                                    )}
                                </td>
                                <td className=" html-table-tbody border-r-2 pr-3 border-blue-500 text-center">
                                    <Popover placement="top">
                                        <PopoverTrigger>
                                            <p onClick={() => seleccionarCliente(cliente.identificacion)}>{cliente.identificacion}</p>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            {cliente.reserva === "Si" && (cliente.nuevoTotal) !== 0 || cliente.reserva === "No" && (cliente.nuevoTotal) !== 0 ?
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">Información</div>
                                                    <div className="text-red-500">Datos del usuario</div>
                                                    <div>Identificacion: {cliente.identificacion}</div>
                                                    <div className="text-tiny">Nombre: {cliente.nombre}</div>
                                                    <div className="text-red-500 text-small font-bold">Pago pendiente</div>
                                                    <div>{cliente.nuevoTotal}</div>
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
                                </td>
                                <td className="text-center html-table-tbody border-r-2 pr-3 border-red-500 uppercase">
                                    <Popover placement="bottom" offset={20} showArrow>
                                        <PopoverTrigger>
                                            {cliente._id === editedUserId ? (
                                                <Input
                                                    value={editedName}
                                                    onChange={(e) => setEditedName(e.target.value)}
                                                />
                                            ) : (
                                                cliente.nombre
                                            )}
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="px-1 py-2 w-56">
                                                <div className="text-small font-bold flex justify-between ">Información <Button
                                                    color="primary"
                                                    className="h-6 w-5 rounded-lg  text-white text-small font-bold tracking-widest"
                                                    onClick={() => {
                                                        setEditClient(cliente._id)
                                                        setEditCantidadAdultos(cliente.cantidadPersonas.adultos)
                                                        setEditCantidadNinios(cliente.cantidadPersonas.ninios)
                                                        setEditMetodoPago(cliente.mediosDePago)
                                                        setEditPagoAnticipado(cliente.pagoAnticipado)
                                                        setEditMetodoPagoPendiente(cliente.mediosDePagoPendiente)
                                                    }
                                                    }
                                                >Editar</Button> </div>
                                                <div className="text-red-500">Cantidad de personas</div>
                                                <div className="text-tiny flex items-center mt-2">Adultos: {cliente._id === editClient ? (

                                                    <div className="flex">

                                                        <input
                                                            className="outline-none border-2 border-blue-300 rounded-xl h-6 pl-2 w-20 ml-1"
                                                            label="input"
                                                            value={editCantidadAdultos}
                                                            onChange={(e) => setEditCantidadAdultos(e.target.value)}
                                                        />

                                                    </div>
                                                ) : (
                                                    cliente.cantidadPersonas.adultos
                                                )}</div>
                                                <div className="flex mt-1">Niños: {
                                                    cliente._id === editClient ? (
                                                        <input
                                                            className="outline-none border-2 border-blue-300 rounded-xl h-6 pl-2 w-20 ml-1"
                                                            value={editCantidadNinios}
                                                            onChange={(e) => setEditCantidadNinios(e.target.value)}
                                                        />

                                                    ) : (
                                                        cliente.cantidadPersonas.ninios

                                                    )

                                                }</div>
                                                <div className="text-red-500">Anticipo de pasadia</div>
                                                <div className="flex ">Metodo de pago: {
                                                    cliente._id === editClient ? (
                                                        <input
                                                            className="outline-none border-2 border-blue-300 rounded-xl h-6 pl-2 w-20 ml-1"
                                                            value={editMetodoPago}
                                                            onChange={(e) => setEditMetodoPago(e.target.value)}
                                                        />
                                                    ) : (
                                                        cliente.mediosDePago

                                                    )

                                                }</div>
                                                <div>Anticipo: {
                                                    cliente._id === editClient ? (
                                                        <input
                                                            className="outline-none border-2 border-blue-300 rounded-xl h-6 pl-2 w-20 ml-1"
                                                            value={editPagoAnticipado}
                                                            onChange={(e) => setEditPagoAnticipado(e.target.value)}
                                                        />
                                                    ) : (
                                                        cliente.pagoAnticipado
                                                    )
                                                }</div>
                                                <div className="text-red-500">pago pendienete o total</div>
                                                <div>Metodo de pago: {
                                                    cliente._id === editClient ? (
                                                        <input
                                                            className="outline-none border-2 border-blue-300 rounded-xl h-6 pl-2 w-20 ml-1"
                                                            value={editMetodoPagoPendiente}
                                                            onChange={(e) => setEditMetodoPagoPendiente(e.target.value)}
                                                        />
                                                    ) : (

                                                        cliente.mediosDePagoPendiente
                                                    )
                                                }</div>
                                                <div>Pago pendiente: {cliente.pagoPendiente}</div>
                                                <div>pendiente: {cliente.nuevoTotal}</div>
                                                {cliente._id === editClient ? (
                                                    <Button color="primary" className="h-7 rounded-lg bg-green-700 text-small font-bold tracking-widest mt-2">Actualizar</Button>
                                                ) : null}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                                <td className="text-center html-table-tbody uppercase whitespace-nowrap pr-2">
                                    {new Date(new Date(cliente.fechaPasadia).getTime() + new Date().getTimezoneOffset() * 60000)
                                        .toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                </td>
                                <td className="text-center html-table-tbody">
                                    <div className=" flex justify-center">
                                        <div className="flex flex-wrap gap-3">

                                            <Button className="bg-white-100" onClick={() => handleOpenm(cliente._id)} disabled={cliente.estado !== "activo"} >
                                                <img className="w-5 h-5" src={plus} alt="" />
                                            </Button>

                                        </div>

                                        <Modal
                                            open={openMd}
                                            onClose={handleCloseMd}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            BackdropProps={{
                                                style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                                            }}>
                                            <Box sx={style} >
                                                <>
                                                    <Typography className="flex flex-col gap-1" variant="h6" component="h2" >
                                                        <h2>BEBIDAS</h2>


                                                    </Typography>
                                                    <Typography component="div"  >
                                                        <Checkbox
                                                            checked={esCortesia}
                                                            onChange={handleCortesiaChange}
                                                            name="esCortesia"
                                                            color="primary"
                                                        >Cortesia pasadia</Checkbox>
                                                        <div className="flex " style={{ height: "68px" }}>
                                                            <input
                                                                placeholder="Ingrese la cantidad"
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                name="bebidas"
                                                                label="Ingrese la cantidad"
                                                                type="number"
                                                                value={isNaN(cantidadBebida) ? '' : cantidadBebida}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    setCantidadBebida(isNaN(value) ? "" : value);
                                                                }}
                                                                style={{ height: "54px" }}
                                                            />

                                                            <input
                                                                disabled
                                                                label=" Stock "
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                style={{ height: "54px" }}
                                                                placeholder={` ${cantidadBebidaDisponible}`}
                                                            />

                                                            <Select
                                                                key={resetKey}
                                                                className="ml-2 mt-1 h-32"
                                                                name="bebidas"
                                                                label="Seleccionar bebida"
                                                                value={bebidaSeleccionada}
                                                                onChange={(e) => {
                                                                    const selectedBebida = e.target.value;
                                                                    setBebidaSeleccionada(selectedBebida);

                                                                    if (selectedBebida) {
                                                                        const bebidaSeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida);
                                                                        if (bebidaSeleccionadaInfo) {
                                                                            setPrecioBebidaSeleccionada(bebidaSeleccionadaInfo.ValorUnitario);
                                                                            setBebidaSeleccionadaId(bebidaSeleccionadaInfo._id);
                                                                            setCantidadBebidaDisponible(bebidaSeleccionadaInfo.CantidadInicial);
                                                                        }

                                                                    } else {
                                                                        setPrecioBebidaSeleccionada(0);
                                                                        setCantidadBebidaDisponible(0);
                                                                        setCantidadBebida("");
                                                                    }
                                                                }}
                                                            >
                                                                {drinks.map((bebida) => (
                                                                    <SelectItem key={bebida.Descripcion}>
                                                                        {bebida.Descripcion}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex">
                                                            <input
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                name="bebidas"
                                                                placeholder="Ingrese la cantidad"

                                                                type="number"
                                                                value={isNaN(cantidadBebida1) ? '' : cantidadBebida1}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    setCantidadBebida1(isNaN(value) ? "" : value);
                                                                }}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <input
                                                                disabled
                                                                label=" Stock "
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                placeholder={` ${cantidadBebida1Disponible}`}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <Select
                                                                key={resetKey1}
                                                                className="ml-2 mt-1"
                                                                name="bebidas"
                                                                label="Seleccionar bebida"
                                                                value={bebida1Seleccionada}
                                                                onChange={(e) => {
                                                                    const selectedBebida1 = e.target.value;
                                                                    setBebida1Seleccionada(selectedBebida1);

                                                                    if (selectedBebida1) {
                                                                        const bebida1SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida1);
                                                                        if (bebida1SeleccionadaInfo) {
                                                                            setPrecioBebida1Seleccionada(bebida1SeleccionadaInfo.ValorUnitario);
                                                                            setBebida1SeleccionadaId(bebida1SeleccionadaInfo._id);
                                                                            setCantidadBebida1Disponible(bebida1SeleccionadaInfo.CantidadInicial);
                                                                        }
                                                                    } else {
                                                                        setPrecioBebida1Seleccionada(0);
                                                                        setCantidadBebida1Disponible(0);
                                                                        setCantidadBebida1("");
                                                                    }
                                                                }}
                                                            >
                                                                {drinks.map((bebida) => (
                                                                    <SelectItem key={bebida.Descripcion}>
                                                                        {bebida.Descripcion}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>


                                                        </div>
                                                        <div className="flex">
                                                            <input
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                name="bebidas"
                                                                placeholder="Ingrese la cantidad"
                                                                type="number"
                                                                value={isNaN(cantidadBebida2) ? '' : cantidadBebida2}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    setCantidadBebida2(isNaN(value) ? "" : value);
                                                                }}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <input
                                                                disabled
                                                                label=" Stock "
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                placeholder={` ${cantidadBebida2Disponible}`}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <Select
                                                                key={resetKey2}
                                                                className="ml-2 mt-1"
                                                                name="bebidas"
                                                                label="Seleccionar bebida"
                                                                value={bebida2Seleccionada}
                                                                onChange={(e) => {
                                                                    const selectedBebida2 = e.target.value;
                                                                    setBebida2Seleccionada(selectedBebida2);

                                                                    if (selectedBebida2) {
                                                                        const bebida2SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida2);
                                                                        if (bebida2SeleccionadaInfo) {
                                                                            setPrecioBebida2Seleccionada(bebida2SeleccionadaInfo.ValorUnitario);
                                                                            setBebida2SeleccionadaId(bebida2SeleccionadaInfo._id);
                                                                            setCantidadBebida2Disponible(bebida2SeleccionadaInfo.CantidadInicial);
                                                                        }
                                                                    } else {
                                                                        setPrecioBebida2Seleccionada(0);
                                                                        setCantidadBebida2Disponible(0);
                                                                        setCantidadBebida2("");
                                                                    }

                                                                }}
                                                            >
                                                                {drinks.map((bebida) => (
                                                                    <SelectItem key={bebida.Descripcion}>
                                                                        {bebida.Descripcion}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex">
                                                            <input
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                name="bebidas"
                                                                placeholder="Ingrese la cantidad"
                                                                type="number"
                                                                value={isNaN(cantidadBebida3) ? '' : cantidadBebida3}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    setCantidadBebida3(isNaN(value) ? "" : value);
                                                                }}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <input
                                                                disabled
                                                                label=" Stock "
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                placeholder={` ${cantidadBebida3Disponible}`}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <Select
                                                                key={resetKey3}
                                                                className="ml-2 mt-1"
                                                                name="bebidas"
                                                                label="Seleccionar bebida"
                                                                value={bebida3Seleccionada}
                                                                onChange={(e) => {
                                                                    const selectedBebida3 = e.target.value;
                                                                    setBebida3Seleccionada(selectedBebida3);

                                                                    if (selectedBebida3) {
                                                                        const bebida3SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida3);
                                                                        if (bebida3SeleccionadaInfo) {
                                                                            setPrecioBebida3Seleccionada(bebida3SeleccionadaInfo.ValorUnitario);
                                                                            setBebida3SeleccionadaId(bebida3SeleccionadaInfo._id);
                                                                            setCantidadBebida3Disponible(bebida3SeleccionadaInfo.CantidadInicial);
                                                                        }
                                                                    } else {
                                                                        setPrecioBebida3Seleccionada(0);
                                                                        setCantidadBebida3Disponible(0);
                                                                        setCantidadBebida3("");
                                                                    }
                                                                }}
                                                            >
                                                                {drinks.map((bebida) => (
                                                                    <SelectItem key={bebida.Descripcion}>
                                                                        {bebida.Descripcion}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex">
                                                            <input
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                name="bebidas"
                                                                placeholder="Ingrese la cantidad"
                                                                type="number"
                                                                value={isNaN(cantidadBebida4) ? '' : cantidadBebida4}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    setCantidadBebida4(isNaN(value) ? "" : value);
                                                                }}
                                                                style={{ height: "54px" }}
                                                            />
                                                            <input
                                                                disabled
                                                                label=" Stock "
                                                                className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                placeholder={` ${cantidadBebida4Disponible}`}
                                                                style={{ height: "54px" }}
                                                            />

                                                            <Select
                                                                key={resetKey4}
                                                                className="ml-2 mt-1"
                                                                name="bebidas"
                                                                label="Seleccionar bebida"
                                                                value={bebida4Seleccionada}
                                                                onChange={(e) => {
                                                                    const selectedBebida4 = e.target.value;
                                                                    setBebida4Seleccionada(selectedBebida4);

                                                                    if (selectedBebida4) {
                                                                        const bebida4SeleccionadaInfo = drinks.find(bebida => bebida.Descripcion === selectedBebida4);
                                                                        if (bebida4SeleccionadaInfo) {
                                                                            setPrecioBebida4Seleccionada(bebida4SeleccionadaInfo.ValorUnitario);
                                                                            setBebida4SeleccionadaId(bebida4SeleccionadaInfo._id);
                                                                            setCantidadBebida4Disponible(bebida4SeleccionadaInfo.CantidadInicial);
                                                                        }
                                                                    } else {
                                                                        setPrecioBebida4Seleccionada(0);
                                                                        setCantidadBebida4Disponible(0);
                                                                        setCantidadBebida4("");
                                                                    }
                                                                }}
                                                            >
                                                                {drinks.map((bebida) => (
                                                                    <SelectItem key={bebida.Descripcion}>
                                                                        {bebida.Descripcion}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    </Typography>
                                                    <Typography component="div" >
                                                        <Button color="danger" variant="light" onPress={handleCloseMd}>
                                                            Close
                                                        </Button>
                                                        <Button color="primary" onClick={handleGuardarBebida} disabled={isSaving} >
                                                            Ahorrar
                                                        </Button>
                                                    </Typography>
                                                </>

                                            </Box>
                                        </Modal>


                                    </div>
                                </td>
                                <td className="html-table-tbody">
                                    <div>
                                        <div className="flex justify-center">
                                            <div className="flex flex-wrap gap-3">

                                                <Button className="bg-white-100" onClick={() => handleOpenmf(cliente._id)} disabled={cliente.estado !== "activo"}  >
                                                    <img className="w-5 h-5" src={plusb} alt="" />
                                                </Button>

                                            </div>
                                        </div>
                                        <Modal
                                            open={openFz}
                                            onClose={handleCloseFz}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            BackdropProps={{
                                                style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                                            }}
                                        >
                                            <Box sx={style}>
                                                <>
                                                    <Tabs className="">
                                                        <Tab key="productos" title="Productos">

                                                            <Typography className="flex flex-col gap-1" component="h2">COMIDAS  </Typography>
                                                            <Typography component="div">
                                                                <Checkbox
                                                                    checked={esCortesia}
                                                                    onChange={handleCortesiaChange}
                                                                >
                                                                    Cortesía pasadia
                                                                </Checkbox>
                                                                <div className="flex">
                                                                    <input
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                        name="restaurante"
                                                                        placeholder="Ingrese la cantidad"
                                                                        type="number"
                                                                        value={isNaN(cantidadFood) ? '' : cantidadFood}
                                                                        onChange={(e) => {
                                                                            const value = parseInt(e.target.value);
                                                                            setCantidadFood(isNaN(value) ? '' : value);
                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}

                                                                    />
                                                                    <input
                                                                        disabled
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                        placeholder={` ${cantidadFoodDisponible}`}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <Select
                                                                        key={resetKey}
                                                                        className="ml-2 mt-1 "
                                                                        name="restaurante"
                                                                        label="Seleccionar comida"
                                                                        value={foodSeleccionada}
                                                                        onChange={(e) => {
                                                                            const selectedFood = e.target.value;
                                                                            setFoodSeleccionada(selectedFood);


                                                                            if (selectedFood) {
                                                                                const foodSeleccionadaInfo = snacks.find(food => food.Descripcion === selectedFood);

                                                                                if (foodSeleccionadaInfo) {
                                                                                    setPrecioFoodSeleccionada(foodSeleccionadaInfo.ValorUnitario);
                                                                                    setFoodSeleccionadaId(foodSeleccionadaInfo._id);
                                                                                    setCantidadFoodDisponible(foodSeleccionadaInfo.CantidadInicial);
                                                                                }

                                                                            } else {
                                                                                setPrecioFoodSeleccionada(0);
                                                                                setCantidadFoodDisponible(0);
                                                                                setCantidadFood("");
                                                                            }


                                                                        }}

                                                                        style={{ height: "40px" }}

                                                                    >
                                                                        {snacks.map((food) => (
                                                                            <SelectItem key={food.Descripcion}>
                                                                                {food.Descripcion}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </Select>
                                                                </div>

                                                                <div className="flex">

                                                                    <input
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                        name="restaurante"
                                                                        placeholder="Ingrese la cantidad"
                                                                        type="number"
                                                                        value={isNaN(cantidadFood1) ? '' : cantidadFood1}
                                                                        onChange={(e) => {
                                                                            const value = parseInt(e.target.value);
                                                                            setCantidadFood1(isNaN(value) ? '' : value);
                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <input
                                                                        disabled
                                                                        label="Stock"
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                        placeholder={`   ${cantidadFood1Disponible}`}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <Select
                                                                        key={resetKey1}
                                                                        className="ml-2 mt-1"
                                                                        name="restaurante"
                                                                        label="Seleccionar comida"
                                                                        value={food1Seleccionada}
                                                                        onChange={(e) => {
                                                                            const selectedFood1 = e.target.value;
                                                                            setFood1Seleccionada(selectedFood1);


                                                                            if (selectedFood1) {
                                                                                const food1SeleccionadaInfo = snacks.find(food => food.Descripcion === selectedFood1 || selectedFood1 === food._id);
                                                                                if (food1SeleccionadaInfo) {
                                                                                    setPrecioFood1Seleccionada(food1SeleccionadaInfo.ValorUnitario);
                                                                                    setFood1SeleccionadaId(food1SeleccionadaInfo._id);
                                                                                    setCantidadFood1Disponible(food1SeleccionadaInfo.CantidadInicial);
                                                                                }

                                                                            } else {
                                                                                setPrecioFood1Seleccionada(0);
                                                                                setCantidadFood1Disponible(0);
                                                                                setCantidadFood1("");
                                                                            }
                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    >
                                                                        {snacks.map((food) => (
                                                                            <SelectItem key={food.Descripcion}>
                                                                                {food.Descripcion}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </Select>
                                                                </div>
                                                                <div className="flex">

                                                                    <input
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                        name="restaurante"
                                                                        placeholder="Ingrese la cantidad"
                                                                        type="number"
                                                                        value={isNaN(cantidadFood2) ? '' : cantidadFood2}
                                                                        onChange={(e) => {
                                                                            const value = parseInt(e.target.value);
                                                                            setCantidadFood2(isNaN(value) ? '' : value);
                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <input
                                                                        disabled
                                                                        label="Stock"
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                        placeholder={`   ${cantidadFood2Disponible}`}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <Select
                                                                        key={resetKey2}
                                                                        className="ml-2 mt-1"
                                                                        name="restaurante"
                                                                        label="Seleccionar comida"
                                                                        value={food2Seleccionada}
                                                                        onChange={(e) => {
                                                                            const selectedFood2 = e.target.value;
                                                                            setFood2Seleccionada(selectedFood2);

                                                                            if (selectedFood2) {
                                                                                const food2SeleccionadaInfo = snacks.find(food => food.Descripcion === selectedFood2);
                                                                                if (food2SeleccionadaInfo) {
                                                                                    setPrecioFood2Seleccionada(food2SeleccionadaInfo.ValorUnitario);
                                                                                    setFood2SeleccionadaId(food2SeleccionadaInfo._id);
                                                                                    setCantidadFood2Disponible(food2SeleccionadaInfo.CantidadInicial);
                                                                                }
                                                                            } else {
                                                                                setPrecioFood2Seleccionada(0);
                                                                                setCantidadFood2Disponible(0);
                                                                                setCantidadFood2("");
                                                                            }

                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    >
                                                                        {snacks.map((food) => (
                                                                            <SelectItem key={food.Descripcion}>
                                                                                {food.Descripcion}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </Select>
                                                                </div>
                                                                <div className="flex">

                                                                    <input
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                        name="restaurante"
                                                                        placeholder="Ingrese la cantidad"
                                                                        type="number"
                                                                        value={isNaN(cantidadFood3) ? '' : cantidadFood3}
                                                                        onChange={(e) => {
                                                                            const value = parseInt(e.target.value);
                                                                            setCantidadFood3(isNaN(value) ? '' : value);
                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <input
                                                                        disabled
                                                                        label="Stock"
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                        placeholder={`   ${cantidadFood3Disponible}`}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <Select
                                                                        key={resetKey3}
                                                                        className="ml-2 mt-1"
                                                                        name="restaurante"
                                                                        label="Seleccionar comida"
                                                                        value={food3Seleccionada}
                                                                        onChange={(e) => {
                                                                            const selectedFood3 = e.target.value;
                                                                            setFood3Seleccionada(selectedFood3);

                                                                            if (selectedFood3) {
                                                                                const food3SeleccionadaInfo = snacks.find(food => food.Descripcion === selectedFood3);
                                                                                if (food3SeleccionadaInfo) {
                                                                                    setPrecioFood3Seleccionada(food3SeleccionadaInfo.ValorUnitario);
                                                                                    setFood3SeleccionadaId(food3SeleccionadaInfo._id);
                                                                                    setCantidadFood3Disponible(food3SeleccionadaInfo.CantidadInicial);
                                                                                }
                                                                            } else {
                                                                                setPrecioFood3Seleccionada(0);
                                                                                setCantidadFood3Disponible(0);
                                                                                setCantidadFood3("");
                                                                            }

                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    >
                                                                        {snacks.map((food) => (
                                                                            <SelectItem key={food.Descripcion}>
                                                                                {food.Descripcion}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </Select>
                                                                </div>
                                                                <div className="flex">

                                                                    <input
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                        name="restaurante"
                                                                        placeholder="Ingrese la cantidad"
                                                                        type="number"
                                                                        value={isNaN(cantidadFood4) ? '' : cantidadFood4}
                                                                        onChange={(e) => {
                                                                            const value = parseInt(e.target.value);
                                                                            setCantidadFood4(isNaN(value) ? '' : value);
                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <input
                                                                        disabled
                                                                        label="Stock"
                                                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                        placeholder={`   ${cantidadFood4Disponible}`}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    />
                                                                    <Select
                                                                        key={resetKey4}
                                                                        className="ml-2 mt-1"
                                                                        name="restaurante"
                                                                        label="Seleccionar comida"
                                                                        value={food4Seleccionada}
                                                                        onChange={(e) => {
                                                                            const selectedFood4 = e.target.value;
                                                                            setFood4Seleccionada(selectedFood4);

                                                                            if (selectedFood4) {
                                                                                const food4SeleccionadaInfo = snacks.find(food => food.Descripcion === selectedFood4);
                                                                                if (food4SeleccionadaInfo) {
                                                                                    setPrecioFood4Seleccionada(food4SeleccionadaInfo.ValorUnitario);
                                                                                    setFood4SeleccionadaId(food4SeleccionadaInfo._id);
                                                                                    setCantidadFood4Disponible(food4SeleccionadaInfo.CantidadInicial);
                                                                                }
                                                                            } else {
                                                                                setPrecioFood4Seleccionada(0);
                                                                                setCantidadFood4Disponible(0);
                                                                                setCantidadFood4("");
                                                                            }

                                                                        }}
                                                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                    >
                                                                        {snacks.map((food) => (
                                                                            <SelectItem key={food.Descripcion}>
                                                                                {food.Descripcion}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </Select>
                                                                </div>
                                                            </Typography>
                                                            <Typography component="div" >
                                                                <Button color="danger" variant="light" onPress={closeModalF}>
                                                                    Close
                                                                </Button>
                                                                <Button color="primary" onClick={handleGuardarFood} disabled={isSaving} >
                                                                    Ahorrar
                                                                </Button>
                                                            </Typography>


                                                        </Tab>
                                                        <Tab key="menu2" title="subProductos" className=" flex flex-col p-1">
                                                            <Typography component="div" className="flex flex-col gap-1">COMIDAS  </Typography>
                                                            <Checkbox
                                                                checked={esCortesia}
                                                                onChange={handleCortesiaChange}
                                                            >
                                                                Cortesía pasadia
                                                            </Checkbox>


                                                            <div className="flex mb-1">
                                                                <input
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                    name="restaurante"
                                                                    placeholder="Ingrese la cantidad"
                                                                    type="number"
                                                                    value={isNaN(cantidadItem) ? '' : cantidadItem}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value);
                                                                        setCantidadItem(isNaN(value) ? '' : value);
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <input
                                                                    disabled
                                                                    label="Stock"
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                    placeholder={` ${cantidadFoodDisponible}`}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <Select
                                                                    key={resetKey}
                                                                    className="ml-2 mt-1"
                                                                    name="restaurante"
                                                                    label="Seleccionar comida"
                                                                    value={itemSeleccionado}
                                                                    onChange={(e) => {
                                                                        const selectedItem = e.target.value;
                                                                        setItemSeleccionado(selectedItem);

                                                                        if (selectedItem) {
                                                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                                                            if (itemSeleccionadaInfo) {
                                                                                setPrecioItemSeleccionado(itemSeleccionadaInfo.ValorUnitario);
                                                                                setItemSeleccionadoId(itemSeleccionadaInfo.idPadre);
                                                                                setSubItemSeleccionadoId(itemSeleccionadaInfo._id)
                                                                                setCantidadFoodDisponible(itemSeleccionadaInfo.cantidadPadre);
                                                                            }
                                                                        } else {
                                                                            setPrecioItemSeleccionado(0);
                                                                            setCantidadFoodDisponible(0);
                                                                            setCantidadItem("");
                                                                        }

                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                >
                                                                    {comidas.map((food) => (
                                                                        <SelectItem key={food.Descripcion}>
                                                                            {food.Descripcion}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>

                                                            <div className="flex mb-1">
                                                                <input
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                    name="restaurante"
                                                                    placeholder="Ingrese la cantidad"
                                                                    type="number"
                                                                    value={isNaN(cantidadItem1) ? '' : cantidadItem1}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value);
                                                                        setCantidadItem1(isNaN(value) ? '' : value);
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <input
                                                                    disabled
                                                                    label="Stock"
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                    placeholder={` ${cantidadFood1Disponible}`}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <Select
                                                                    key={resetKey1}
                                                                    className="ml-2 mt-1"
                                                                    name="restaurante"
                                                                    label="Seleccionar comida"
                                                                    value={itemSeleccionado1}
                                                                    onChange={(e) => {
                                                                        const selectedItem = e.target.value;
                                                                        setItemSeleccionado1(selectedItem);

                                                                        if (selectedItem) {
                                                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);
                                                                            if (itemSeleccionadaInfo) {
                                                                                setPrecioItemSeleccionado1(itemSeleccionadaInfo.ValorUnitario);
                                                                                setItemSeleccionadoId1(itemSeleccionadaInfo.idPadre);
                                                                                setSubItemSeleccionadoId1(itemSeleccionadaInfo._id);
                                                                                setCantidadFood1Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                                            }
                                                                        } else {
                                                                            setPrecioItemSeleccionado1(0);
                                                                            setCantidadFood1Disponible(0);
                                                                            setCantidadItem1("");
                                                                        }
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                >
                                                                    {comidas.map((food) => (
                                                                        <SelectItem key={food.Descripcion}>
                                                                            {food.Descripcion}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>

                                                            <div className="flex mb-1">
                                                                <input
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                    name="restaurante"
                                                                    placeholder="Ingrese la cantidad"
                                                                    type="number"
                                                                    value={isNaN(cantidadItem2) ? '' : cantidadItem2}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value);
                                                                        setCantidadItem2(isNaN(value) ? '' : value);
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <input
                                                                    disabled
                                                                    label="Stock"
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                    placeholder={` ${cantidadFood2Disponible}`}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <Select
                                                                    key={resetKey2}
                                                                    className="ml-2 mt-1"
                                                                    name="restaurante"
                                                                    label="Seleccionar comida"
                                                                    value={itemSeleccionado2}
                                                                    onChange={(e) => {
                                                                        const selectedItem = e.target.value;
                                                                        setItemSeleccionado2(selectedItem);

                                                                        if (selectedItem) {
                                                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                                                            if (itemSeleccionadaInfo) {
                                                                                setPrecioItemSeleccionado2(itemSeleccionadaInfo.ValorUnitario);
                                                                                setItemSeleccionadoId2(itemSeleccionadaInfo.idPadre);
                                                                                setSubItemSeleccionadoId2(itemSeleccionadaInfo._id);
                                                                                setCantidadFood2Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                                            }
                                                                        } else {
                                                                            setPrecioItemSeleccionado2(0);
                                                                            setCantidadFood2Disponible(0);
                                                                            setCantidadItem2("");
                                                                        }
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                >
                                                                    {comidas.map((food) => (
                                                                        <SelectItem key={food.Descripcion}>
                                                                            {food.Descripcion}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>

                                                            <div className="flex mb-1">
                                                                <input
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                    name="restaurante"
                                                                    placeholder="Ingrese la cantidad"
                                                                    type="number"
                                                                    value={isNaN(cantidadItem3) ? '' : cantidadItem3}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value);
                                                                        setCantidadItem3(isNaN(value) ? '' : value);
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <input
                                                                    disabled
                                                                    label="Stock"
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                    placeholder={` ${cantidadFood3Disponible}`}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <Select
                                                                    key={resetKey3}
                                                                    className="ml-2 mt-1"
                                                                    name="restaurante"
                                                                    label="Seleccionar comida"
                                                                    value={itemSeleccionado3}
                                                                    onChange={(e) => {
                                                                        const selectedItem = e.target.value;
                                                                        setItemSeleccionado3(selectedItem);

                                                                        if (selectedItem) {
                                                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                                                            if (itemSeleccionadaInfo) {
                                                                                setPrecioItemSeleccionado3(itemSeleccionadaInfo.ValorUnitario);
                                                                                setItemSeleccionadoId3(itemSeleccionadaInfo.idPadre);
                                                                                setSubItemSeleccionadoId3(itemSeleccionadaInfo._id);
                                                                                setCantidadFood3Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                                            }
                                                                        } else {
                                                                            setPrecioItemSeleccionado3(0);
                                                                            setCantidadFood3Disponible(0);
                                                                            setCantidadItem3("");
                                                                        }
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                >
                                                                    {comidas.map((food) => (
                                                                        <SelectItem key={food.Descripcion}>
                                                                            {food.Descripcion}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>

                                                            <div className="flex mb-1">
                                                                <input
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                                                    name="restaurante"
                                                                    placeholder="Ingrese la cantidad"
                                                                    type="number"
                                                                    value={isNaN(cantidadItem4) ? '' : cantidadItem4}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value);
                                                                        setCantidadItem4(isNaN(value) ? '' : value);
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <input
                                                                    disabled
                                                                    label="Stock"
                                                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                                                    placeholder={` ${cantidadFood4Disponible}`}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                />
                                                                <Select
                                                                    key={resetKey4}
                                                                    className="ml-2 mt-1"
                                                                    name="restaurante"
                                                                    label="Seleccionar comida"
                                                                    value={itemSeleccionado4}
                                                                    onChange={(e) => {
                                                                        const selectedItem = e.target.value;
                                                                        setItemSeleccionado4(selectedItem);

                                                                        if (selectedItem) {
                                                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                                                            if (itemSeleccionadaInfo) {
                                                                                setPrecioItemSeleccionado4(itemSeleccionadaInfo.ValorUnitario);
                                                                                setItemSeleccionadoId4(itemSeleccionadaInfo.idPadre);
                                                                                setSubItemSeleccionadoId4(itemSeleccionadaInfo._id);
                                                                                setCantidadFood4Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                                            }
                                                                        } else {
                                                                            setPrecioItemSeleccionado4(0);
                                                                            setCantidadFood4Disponible(0);
                                                                            setCantidadItem4("");
                                                                        }
                                                                    }}
                                                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                                                >
                                                                    {comidas.map((food) => (
                                                                        <SelectItem key={food.Descripcion}>
                                                                            {food.Descripcion}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>


                                                            <Typography component="div" >
                                                                <Button color="danger" variant="light" onPress={closeModalF}>
                                                                    Close                              </Button>
                                                                <Button color="primary" onClick={handleGuardarItem} disabled={isSaving}>
                                                                    Ahorrar
                                                                </Button>
                                                            </Typography>
                                                        </Tab>

                                                    </Tabs>
                                                </>


                                            </Box>
                                        </Modal>
                                    </div>
                                </td>
                                <td className="html-table-tbody text-center">
                                    {cliente.nuevoTotal}
                                </td>
                                <td className="html-table-tbody">
                                    <div className="flex items-center text-center ">
                                        <span className=" mr-2">
                                            <EstadoIcono estado={cliente.estado} />
                                        </span>
                                        {cliente.estado}
                                    </div>
                                </td>
                                <td className="html-table-tbody">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="bg-inherent" onClick={() => seleccionarCliente(cliente.identificacion)}>
                                                <VerticalDotsIcon />
                                            </Button>
                                        </DropdownTrigger>
                                        {cliente.estado === 'activo' && (
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem key="finalizado" color="primary" onClick={() => handleOpenModal(cliente)}>Finalizado</DropdownItem>
                                                <DropdownItem
                                                    key="new"
                                                    className="font-semibold"
                                                    style={{ fontWeight: "700" }}
                                                    onClick={() => adicionalCabania(cliente._id)}
                                                >
                                                    Agregar algo mas
                                                </DropdownItem>
                                                <DropdownItem key="finalizado" color="primary" onClick={() => handleOpenModal(cliente)}>Ver compras</DropdownItem>

                                            </DropdownMenu>
                                        )}
                                        {cliente.estado === 'pendiente' && (
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem key="activo" color="success" onClick={() => handleStatus("activo", cliente._id)}>Activo</DropdownItem>
                                                <DropdownItem key="cancelado" color="danger" onClick={() => handleStatus("cancelado", cliente._id)}>Cancelado</DropdownItem>
                                            </DropdownMenu>
                                        )}

                                        {cliente.estado === "finalizado" && (
                                            <DropdownMenu>
                                                <DropdownItem
                                                    key="new"
                                                    className="font-semibold"
                                                    style={{ fontWeight: "700" }}
                                                    onClick={() => adicionalCabania(cliente._id)}
                                                >
                                                    Agregar algo mas
                                                </DropdownItem>
                                                <DropdownItem key="finalizado" color="primary" onClick={() => handleOpenModal(cliente)}>Ver compras</DropdownItem>
                                            </DropdownMenu>
                                        )}
                                        {/* No se muestra ningún menú desplegable para los estados 'cancelado' y 'finalizado' */}
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        <span className="flex h-2"></span>
                    </tbody>
                </Table>
            </section>
        </div>
    )
}
