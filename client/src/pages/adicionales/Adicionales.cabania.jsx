import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstances from "../../api/axios.js";
import { Button, Input, Select, SelectItem, Table, TableBody, TableColumn, TableCell, TableHeader, TableRow } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

const Adicionales = () => {
    const [user, setUser] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [recepcion, setRecepcion] = useState([]);


    //#region

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

    const [cantidadSubpDisponible, setCantidadSubpDisponible] = useState(0);
    const [cantidadSubp1Disponible, setCantidadSubp1Disponible] = useState(0);
    const [cantidadSubp2Disponible, setCantidadSubp2Disponible] = useState(0);
    const [cantidadSubp3Disponible, setCantidadSubp3Disponible] = useState(0);
    const [cantidadSubp4Disponible, setCantidadSubp4Disponible] = useState(0);

    //#endregion

    //#region

    const [cantidadFood, setCantidadFood] = useState("");
    const [foodSeleccionada, setFoodSeleccionada] = useState('');
    const [precioFoodSeleccionada, setPrecioFoodSeleccionada] = useState(0);
    const [foodSeleccionadaId, setFoodSeleccionadaId] = useState(null);

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

    const [cantidadFoodDisponible, setCantidadFoodDisponible] = useState(0);
    const [cantidadFood1Disponible, setCantidadFood1Disponible] = useState(0);
    const [cantidadFood2Disponible, setCantidadFood2Disponible] = useState(0);
    const [cantidadFood3Disponible, setCantidadFood3Disponible] = useState(0);
    const [cantidadFood4Disponible, setCantidadFood4Disponible] = useState(0);

    //#endregion

    //#region


    const [cantidadItemRec, setCantidadItemRec] = useState("");
    const [itemSeleccionadoRec, setItemSeleccionadoRec] = useState('');
    const [precioItemSeleccionadoRec, setPrecioItemSeleccionadoRec] = useState(0);
    const [itemSeleccionadoIdRec, setItemSeleccionadoIdRec] = useState(null);
    const [cantidadItemDisponibleRec, setCantidadItemDisponibleRec] = useState(0);

    const [cantidadItem1Rec, setCantidadItem1Rec] = useState("");
    const [itemSeleccionado1Rec, setItemSeleccionado1Rec] = useState('');
    const [precioItemSeleccionado1Rec, setPrecioItemSeleccionado1Rec] = useState(0);
    const [itemSeleccionadoId1Rec, setItemSeleccionadoId1Rec] = useState(null);
    const [cantidadItemDisponible1Rec, setCantidadItemDisponible1Rec] = useState(0);

    const [cantidadItem2Rec, setCantidadItem2Rec] = useState("");
    const [itemSeleccionado2Rec, setItemSeleccionado2Rec] = useState('');
    const [precioItemSeleccionado2Rec, setPrecioItemSeleccionado2Rec] = useState(0);
    const [itemSeleccionadoId2Rec, setItemSeleccionadoId2Rec] = useState(null);
    const [cantidadItemDisponible2Rec, setCantidadItemDisponible2Rec] = useState(0);

    const [cantidadItem3Rec, setCantidadItem3Rec] = useState("");
    const [itemSeleccionado3Rec, setItemSeleccionado3Rec] = useState('');
    const [precioItemSeleccionado3Rec, setPrecioItemSeleccionado3Rec] = useState(0);
    const [itemSeleccionadoId3Rec, setItemSeleccionadoId3Rec] = useState(null);
    const [cantidadItemDisponible3Rec, setCantidadItemDisponible3Rec] = useState(0);

    const [cantidadItem4Rec, setCantidadItem4Rec] = useState("");
    const [itemSeleccionado4Rec, setItemSeleccionado4Rec] = useState('');
    const [precioItemSeleccionado4Rec, setPrecioItemSeleccionado4Rec] = useState(0);
    const [itemSeleccionadoId4Rec, setItemSeleccionadoId4Rec] = useState(null);
    const [cantidadItemDisponible4Rec, setCantidadItemDisponible4Rec] = useState(0);


    //#endregion


    //#region
    const [cantidadBebida, setCantidadBebida] = useState("");
    const [bebidaSeleccionada, setBebidaSeleccionada] = useState('');
    const [precioBebidaSeleccionada, setPrecioBebidaSeleccionada] = useState(0);
    const [bebidaSeleccionadaId, setBebidaSeleccionadaId] = useState(null);

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
    //#endregion


    //#region

    const [cantidadBebidaDisponible, setCantidadBebidaDisponible] = useState(0);
    const [cantidadBebida1Disponible, setCantidadBebida1Disponible] = useState(0);
    const [cantidadBebida2Disponible, setCantidadBebida2Disponible] = useState(0);
    const [cantidadBebida3Disponible, setCantidadBebida3Disponible] = useState(0);
    const [cantidadBebida4Disponible, setCantidadBebida4Disponible] = useState(0);


    //#endregion


    const [comidas, setComidas] = useState([])
    const [snacks, setSnacks] = useState([])
    const [isSaving, setIsSaving] = useState(false);

    //#region

    const [descripcionDescorche, setDescripcionDescorche] = useState("")
    const [valorDescorche, setValorDescorche] = useState("")

    const [descripcionDescorche1, setDescripcionDescorche1] = useState("")
    const [valorDescorche1, setValorDescorche1] = useState("")

    const handleChange = (e) => {
        const valorInput = e.target.value;
        // Convierte el valor del input a un número usando parseFloat
        const nuevoValor = parseFloat(valorInput);
        // Verifica si el nuevo valor es un número válido
        if (!isNaN(nuevoValor)) {
            setValorDescorche(nuevoValor);
        }
    };

    const handleChanges = (e) => {
        const valorInput = e.target.value;
        // Convierte el valor del input a un número usando parseFloat
        const nuevoValor = parseFloat(valorInput);
        // Verifica si el nuevo valor es un número válido
        if (!isNaN(nuevoValor)) {
            setValorDescorche1(nuevoValor);
        }
    };



    const [resetKey, setResetKey] = useState(0);
    const [resetKey1, setResetKey1] = useState(0);
    const [resetKey2, setResetKey2] = useState(0);
    const [resetKey3, setResetKey3] = useState(0);
    const [resetKey4, setResetKey4] = useState(0);

    const [resetKeySubp, setResetKeySubp] = useState(0);
    const [resetKey1Subp, setResetKey1Subp] = useState(0);
    const [resetKey2Subp, setResetKey2Subp] = useState(0);
    const [resetKey3Subp, setResetKey3Subp] = useState(0);
    const [resetKey4Subp, setResetKey4Subp] = useState(0);

    const [resetKeyBar, setResetKeyBar] = useState(0);
    const [resetKey1Bar, setResetKey1Bar] = useState(0);
    const [resetKey2Bar, setResetKey2Bar] = useState(0);
    const [resetKey3Bar, setResetKey3Bar] = useState(0);
    const [resetKey4Bar, setResetKey4Bar] = useState(0);

    const [resetKeyRec, setResetKeyRec] = useState(0);
    const [resetKey1Rec, setResetKey1Rec] = useState(0);
    const [resetKey2Rec, setResetKey2Rec] = useState(0);
    const [resetKey3Rec, setResetKey3Rec] = useState(0);
    const [resetKey4Rec, setResetKey4Rec] = useState(0);

    function obtenerFechaConAjuste() {
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        return fechaActual.toISOString();
    }

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstances.get(`/cabania-cliente-info/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstances.get("/drinks");
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
                const response = await AxiosInstances.get("/recepcion");
                const responseRecepcion = response.data.filter(recepcion => recepcion.CantidadInicial > 0)
                setRecepcion(responseRecepcion);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);

    // const handleInputChanges = (e) => {
    //     setDrinks({ ...drinks, [e.target.name]: e.target.value });
    // };

    // const handleDrinkChange = (index, value) => {
    //     const drink = drinks.find(d => d._id === value);
    //     setSelectedDrink({ ...setSelectedDrink, [index]: drink });
    // };


    // const resetInput = async () => {
    //     const response = await AxiosInstances.get("/drinks");
    //     const filteredDrinks = response.data.filter(drink => drink.CantidadInicial > 0);
    //     setDrinks(filteredDrinks);
    // }

    //#region  guardar bebida

    const actualizarInventarioBebida = async (bebidaId, cantidad) => {
        try {
            const response = await AxiosInstances.post('/actualizar-inventario-bebida', {
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
            const response = await AxiosInstances.post(`/actualizar-stock-inicial/${bebidaId}`, { cantidad });
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

        if (!bebidaSeleccionadaId && !bebida1SeleccionadaId && !bebida2SeleccionadaId && !bebida3SeleccionadaId && !bebida4SeleccionadaId) {
            toast.error('No se ha seleccionado un cliente o una Bebida.');
            setIsSaving(false);
            return;
        }

        const checkStockAndUpdateInventory = async (bebidaId, cantidad) => {
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${bebidaId}`);
            let fecha = new Date();
            fecha.setHours(fecha.getHours() - 5);
            const disponibleInventario = response.data.cantidadRestante;
            {
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
            if (!bebidaSeleccionadaId && !bebida1SeleccionadaId && !bebida2SeleccionadaId && !bebida3SeleccionadaId && !bebida4SeleccionadaId) {
                setIsSaving(false);
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }


            let isBebidaAdded = false;

            if (cantidadBebida > 0 && bebidaSeleccionadaId) {
                const bebidaAdultos = {
                    itemId: bebidaSeleccionadaId,
                    nombre: bebidaSeleccionada,
                    cantidad: cantidadBebida,
                    precio: precioBebidaSeleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebidaSeleccionadaId, cantidadBebida)) {
                    await guardarBebida(bebidaAdultos);
                    setCantidadBebida("");
                    setBebidaSeleccionada('');
                    setPrecioBebidaSeleccionada("");
                    setBebidaSeleccionadaId('');
                    setCantidadBebidaDisponible("0")
                    setResetKeyBar(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadBebida1 > 0 && bebida1SeleccionadaId) {
                const bebidaAdultos1 = {
                    itemId: bebida1SeleccionadaId,
                    nombre: bebida1Seleccionada,
                    cantidad: cantidadBebida1,
                    precio: precioBebida1Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida1SeleccionadaId, cantidadBebida1)) {
                    await guardarBebida(bebidaAdultos1);
                    setCantidadBebida1("");
                    setBebida1Seleccionada('');
                    setPrecioBebida1Seleccionada("");
                    setBebida1SeleccionadaId('');
                    setCantidadBebida1Disponible("0")
                    setResetKey1Bar(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadBebida2 > 0 && bebida2SeleccionadaId) {
                const bebidaAdultos2 = {
                    itemId: bebida2SeleccionadaId,
                    nombre: bebida2Seleccionada,
                    cantidad: cantidadBebida2,
                    precio: precioBebida2Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida2SeleccionadaId, cantidadBebida2)) {
                    await guardarBebida(bebidaAdultos2);
                    setCantidadBebida2("");
                    setBebida2Seleccionada('');
                    setPrecioBebida2Seleccionada("");
                    setBebida2SeleccionadaId('');
                    setCantidadBebida2Disponible("0")
                    setResetKey2Bar(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadBebida3 > 0 && bebida3SeleccionadaId) {
                const bebidaAdultos3 = {
                    itemId: bebida3SeleccionadaId,
                    nombre: bebida3Seleccionada,
                    cantidad: cantidadBebida3,
                    precio: precioBebida3Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida3SeleccionadaId, cantidadBebida3)) {
                    await guardarBebida(bebidaAdultos3);
                    setCantidadBebida3("");
                    setBebida3Seleccionada('');
                    setPrecioBebida3Seleccionada("");
                    setBebida3SeleccionadaId('');
                    setCantidadBebida3Disponible("0")
                    setResetKey3Bar(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadBebida4 > 0 && bebida4SeleccionadaId) {
                const bebidaAdultos4 = {
                    itemId: bebida4SeleccionadaId,
                    nombre: bebida4Seleccionada,
                    cantidad: cantidadBebida4,
                    precio: precioBebida4Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(bebida4SeleccionadaId, cantidadBebida4)) {
                    await guardarBebida(bebidaAdultos4);
                    setCantidadBebida4("");
                    setBebida4Seleccionada('');
                    setPrecioBebida4Seleccionada("");
                    setBebida4SeleccionadaId('');
                    setCantidadBebida4Disponible("0");
                    setResetKey4Bar(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (!isBebidaAdded) {
                toast.error("No se ha agregado ninguna bebida");
                setIsSaving(false)
            } else {
            }
        } catch (error) {
            toast.error('Error al guardar las bebidas en el cliente:', error.message);
            setIsSaving(false)
        }
    };

    const guardarBebida = async (bebida) => {
        try {
            await AxiosInstances.post(`/cabania-agregar-bebida/${id}`, {
                bebida,
            });
            toast.success('Bebida guardada exitosamente!');
            const response = await AxiosInstances.get("/drinks");
            const filteredDrinks = response.data.filter(drink => drink.CantidadInicial > 0);
            setDrinks(filteredDrinks);
            setIsSaving(false);
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la bebida en el cliente:', error.message);
            // No llamar a resetInput aquí, para mantener los campos con sus valores actuales
            throw error;
        }
    };
    //#endregion


    //#region guardar recepcion


    const actualizarInventarioItem = async (itemRecId, cantidad) => {
        try {
            const response = await AxiosInstances.post('/actualizar-inventario-bebida', {
                id: itemRecId,
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

    const actualizarStockInicialItem = async (itemRecId, cantidad) => {
        try {
            const response = await AxiosInstances.post(`/actualizar-stock-inicial/${itemRecId}`, { cantidad });
            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error al actualizar el stock inicial. Estado de la respuesta: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al actualizar el stock inicial:', error.message);
            throw error;
        }
    };

    const handleGuardarItemRecepcion = async () => {

        if (!itemSeleccionadoIdRec && !itemSeleccionadoId1Rec && !itemSeleccionadoId2Rec && !itemSeleccionadoId3Rec && !itemSeleccionadoId4Rec) {

            toast.error('No se ha seleccionado un cliente o una Bebida.');
            toast.
                return;
        }

        const checkStockAndUpdateInventory = async (itemRecId, cantidad) => {
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${itemRecId}`);

            let fecha = new Date();

            fecha.setHours(fecha.getHours() - 5);

            const fechaAjustada = fecha.toLocaleString();

            const disponibleInventario = response.data.cantidadRestante;


            if (itemSeleccionado && disponibleInventario === 0) {
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


            if (cantidad > disponibleInventario) {
                alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                return false;
            } else
                if (cantidad > disponibleInventario) {
                    alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                    return false;
                }

            await actualizarInventarioItem(itemRecId, cantidad);
            await actualizarStockInicialItem(itemRecId, cantidad);
            return true;

        };

        try {
            if (!itemSeleccionadoIdRec && !itemSeleccionadoId1Rec && !itemSeleccionadoId2Rec && !itemSeleccionadoId3Rec && !itemSeleccionadoId4Rec) {
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }

            let isBebidaAdded = false;

            if (cantidadItemRec > 0 && itemSeleccionadoIdRec) {
                const bebidaAdultos = {
                    itemIdRec: itemSeleccionadoIdRec,
                    nombre: itemSeleccionadoRec,
                    cantidad: cantidadItemRec,
                    precio: precioItemSeleccionadoRec,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoIdRec, cantidadItemRec)) {
                    await guardarRecepcion(bebidaAdultos);
                    setCantidadItemRec("");
                    setItemSeleccionadoRec("");
                    setPrecioItemSeleccionadoRec("");
                    setItemSeleccionadoIdRec("");
                    setCantidadItemDisponibleRec("0")
                    setResetKeyRec(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem1Rec > 0 && itemSeleccionadoId1Rec) {
                const bebidaAdultos1 = {
                    itemIdRec: itemSeleccionadoId1Rec,
                    nombre: itemSeleccionado1Rec,
                    cantidad: cantidadItem1Rec,
                    precio: precioItemSeleccionado1Rec,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId1Rec, cantidadItem1Rec)) {
                    await guardarRecepcion(bebidaAdultos1);
                    setCantidadItemDisponibleRec("");
                    setCantidadItem1Rec("");
                    setItemSeleccionado1Rec("");
                    setPrecioItemSeleccionado1Rec("");
                    setCantidadItemDisponible1Rec("0")
                    setResetKey1Rec(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem2Rec > 0 && itemSeleccionadoId2Rec) {
                const bebidaAdultos2 = {
                    id: itemSeleccionadoId2Rec,
                    nombre: itemSeleccionado2Rec,
                    cantidad: cantidadItem2Rec,
                    precio: precioItemSeleccionado2Rec,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId2Rec, cantidadItem2Rec)) {
                    await guardarRecepcion(bebidaAdultos2);
                    setItemSeleccionadoId1Rec("");
                    setCantidadItemDisponible1Rec("");
                    setCantidadItem2Rec("");
                    setItemSeleccionado2Rec("");
                    setCantidadItemDisponible2Rec("0");
                    setResetKey2Rec(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem3Rec > 0 && itemSeleccionadoId3Rec) {
                const bebidaAdultos3 = {
                    id: itemSeleccionadoId3Rec,
                    nombre: itemSeleccionado3Rec,
                    cantidad: cantidadItem3Rec,
                    precio: precioItemSeleccionado3Rec,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId3Rec, cantidadItem3Rec)) {
                    await guardarRecepcion(bebidaAdultos3);
                    setItemSeleccionado3Rec("");
                    setPrecioItemSeleccionado3Rec("");
                    setItemSeleccionadoId3Rec("");
                    setCantidadItemDisponible3Rec("");
                    setCantidadItemDisponible3Rec("0")
                    setResetKey3Rec(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem4Rec > 0 && itemSeleccionadoId4Rec) {
                const bebidaAdultos4 = {
                    id: itemSeleccionadoId4Rec,
                    nombre: itemSeleccionado4Rec,
                    cantidad: cantidadItem4Rec,
                    precio: precioItemSeleccionado4Rec,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId4Rec, cantidadItem4Rec)) {
                    await guardarRecepcion(bebidaAdultos4);
                    setCantidadItem4Rec("");
                    setItemSeleccionado4Rec("");
                    setPrecioItemSeleccionado4Rec("");
                    setItemSeleccionadoId4Rec("");
                    setCantidadItemDisponible4Rec("0")
                    setResetKey4Rec(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (!isBebidaAdded) {
                alert("No se ha agregado ninguna bebida");
            }
        } catch (error) {
            console.error('Error al guardar las bebidas en el cliente:', error.message);
        }
    };

    const guardarRecepcion = async (bebida) => {
        try {
            const response = await AxiosInstances.post(`/cabania-agregar-item-recepcion/${id}`, {
                bebida,
            });
            toast.success('Item de recepcion guardado exitosamente!');
            const responses = await AxiosInstances.get("/recepcion");
            setRecepcion(responses.data);
        } catch (error) {
            console.error('Error al guardar el item en el cliente:', error.message);
            throw error;
        }
    };

    //#endregion 


    //#region guardar descorche

    const limpiarDescorches = () => {
        setDescripcionDescorche("");
        setDescripcionDescorche1("");
        setValorDescorche("");
        setValorDescorche1("");
    }

    const handleGuardarDescorche = async () => {
        try {

            if (valorDescorche > 0 && descripcionDescorche !== "") {
                const descorche1 = {
                    precio: valorDescorche,
                    nombre: descripcionDescorche,
                    adicional: "descorche",
                    cantidad: 1
                }
                await handleCrearDescorche(descorche1)
            }


            if (valorDescorche1 > 0 && descripcionDescorche1 !== "") {
                const descorche1 = {
                    precio: valorDescorche1,
                    nombre: descripcionDescorche1,
                    adicional: "descorche",
                    cantidad: 1
                }
                await handleCrearDescorche(descorche1)
            }


        } catch (error) {
            console.error("false")
        }
    }

    const handleCrearDescorche = async (descorche) => {
        try {
            await AxiosInstances.post(`/cabania-agregar-descorche/${id}`, { descorche })
            limpiarDescorches();
            toast.success("Descorche agregado con exito")
        } catch (error) {
            console.log("false")
        }
    }

    //#endregion


    //#region guardar subproducto
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstances.get("/food");
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
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);

    const refreshSubproductos = async () => {
        const response = await AxiosInstances.get("/food");
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

    const actualizarInventarioItemSub = async (foodId, subproductoId, cantidad) => {

        try {
            const response = await AxiosInstances.post('/update-cantidad-inicial', {
                foodId,
                subproductoId,
                cantidad
            });


            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error al actualizar el inventario. Estado de la respuesta: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al actualizar el inventario de comidas:', error.message);
            throw error;
        }
    };

    const handleGuardarItem = async () => {

        if (isSaving) return;
        setIsSaving(true);

        if (!subItemSeleccionadoId && !subItemSeleccionadoId1 && !subItemSeleccionadoId2 && !subItemSeleccionadoId3 && !subItemSeleccionadoId4) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
            return;
        }


        const checkStockAndUpdateInventory = async (foodId, subProductoId, cantidad) => {

            const response = await AxiosInstances.get(`/verificar-disponibilidad/${foodId}`);
            let fecha = new Date();
            fecha.setHours(fecha.getHours() - 5);
            const disponibleInventario = response.data.cantidadRestante;

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

            // let subproductoId = subItemSeleccionadoId;
            // console.log("..... muestra de datos", subproductoId)
            await actualizarInventarioItemSub(foodId, subProductoId, cantidad);
            // await actualizarSubproducto(foodId,subproductoId, cantidad)

            return true;
        };



        try {
            if (!subItemSeleccionadoId && !subItemSeleccionadoId1 && !subItemSeleccionadoId2 && !subItemSeleccionadoId3 && !subItemSeleccionadoId4) {
                setIsSaving(false);
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }



            let isBebidaAdded = false;

            if (cantidadItem > 0 && itemSeleccionadoId) {
                const item = {
                    itemId: subItemSeleccionadoId,
                    nombre: itemSeleccionado,
                    cantidad: cantidadItem,
                    precio: precioItemSeleccionado,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId;
                // console.log("depuracion dentro del checkInventory: ", itemSeleccionadoId, subproductoId, cantidadItem)
                if (await checkStockAndUpdateInventory(itemSeleccionadoId, subproductoId, cantidadItem)) {
                    await guardarItem(item);
                    setCantidadItem("")
                    setItemSeleccionado("")
                    setPrecioItemSeleccionado("")
                    setItemSeleccionadoId("")
                    setSubItemSeleccionadoId("")
                    setCantidadSubpDisponible("0")
                    setResetKeySubp(prevKey => prevKey + 1);
                    refreshSubproductos();
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem1 > 0 && itemSeleccionadoId1) {
                const item1 = {
                    itemId: subItemSeleccionadoId1,
                    nombre: itemSeleccionado1,
                    cantidad: cantidadItem1,
                    precio: precioItemSeleccionado1,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId1;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId1, subproductoId, cantidadItem1)) {
                    await guardarItem(item1);
                    setCantidadItem1("")
                    setItemSeleccionado1("")
                    setPrecioItemSeleccionado1("")
                    setItemSeleccionadoId1("")
                    setSubItemSeleccionadoId1("")
                    setCantidadSubp1Disponible("0")
                    setResetKey1Subp(prevKey => prevKey + 1);
                    refreshSubproductos();
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem2 > 0 && itemSeleccionadoId2) {
                const item2 = {
                    itemId: subItemSeleccionadoId2,
                    nombre: itemSeleccionado2,
                    cantidad: cantidadItem2,
                    precio: precioItemSeleccionado2,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId2;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId2, subproductoId, cantidadItem2)) {
                    await guardarItem(item2);
                    setCantidadItem2("")
                    setItemSeleccionado2("")
                    setPrecioItemSeleccionado2("")
                    setItemSeleccionadoId2("")
                    setSubItemSeleccionadoId2("")
                    setCantidadSubp2Disponible("0")
                    setResetKey2Subp(prevKey => prevKey + 1);
                    refreshSubproductos();
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem3 > 0 && itemSeleccionadoId3) {
                const item3 = {
                    itemId: subItemSeleccionadoId3,
                    nombre: itemSeleccionado3,
                    cantidad: cantidadItem3,
                    precio: precioItemSeleccionado3,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId3;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId3, subproductoId, cantidadItem3)) {
                    await guardarItem(item3);
                    setCantidadItem3("")
                    setItemSeleccionado3("")
                    setPrecioItemSeleccionado3("")
                    setItemSeleccionadoId3("")
                    setSubItemSeleccionadoId3("")
                    setCantidadSubp3Disponible("0")
                    setResetKey3Subp(prevKey => prevKey + 1);
                    refreshSubproductos();
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem4 > 0 && itemSeleccionadoId4) {
                const item4 = {
                    itemId: subItemSeleccionadoId4,
                    nombre: itemSeleccionado4,
                    cantidad: cantidadItem4,
                    precio: precioItemSeleccionado4,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId4;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId4, subproductoId, cantidadItem4)) {
                    await guardarItem(item4);
                    setCantidadItem4("")
                    setItemSeleccionado4("")
                    setPrecioItemSeleccionado4("")
                    setItemSeleccionadoId4("")
                    setSubItemSeleccionadoId4("")
                    setCantidadSubp4Disponible("0");
                    setResetKey4Subp(prevKey => prevKey + 1);
                    refreshSubproductos();
                    isBebidaAdded = true;
                }
            }

            if (!isBebidaAdded) {
                toast.promise("No se ha agregado ninguna comida");
                setIsSaving(false);
            }
        } catch (error) {
            toast.error('Error al guardar las comidas en el cliente:', error.message);
            setIsSaving(false);
        }

    }

    const guardarItem = async (food) => {
        try {
            await AxiosInstances.post(`/cabania-agregar-food-subproducto/${id}`, {
                food,
            });
            toast.success('Comida guardada exitosamente!');
            setIsSaving(false);
            const response = await AxiosInstances.get("/food");
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

        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la comida en el cliente:', error.message);
            throw error;
        }
    };

    //#endregion


    //#region guardar food

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstances.get("/food");

                const snacksWithoutSubproducts = response.data.filter(product => !product.subproductos || product.subproductos.length === 0);

                setSnacks(snacksWithoutSubproducts);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };

        fetchData();
    }, []);


    const actualizarInventarioFood = async (foodId, cantidad) => {
        try {
            const response = await AxiosInstances.post('/actualizar-inventario-food', {
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
            const response = await AxiosInstances.post(`/actualizar-stock-inicial-food/${foodId}`, { cantidad });
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

        if (!foodSeleccionadaId && !food1SeleccionadaId && food2SeleccionadaId && food3SeleccionadaId && food4SeleccionadaId) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
            return;
        }

        const checkStockAndUpdateInventory = async (foodId, cantidad) => {
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${foodId}`);

            let fecha = new Date();

            fecha.setHours(fecha.getHours() - 5);

            const disponibleInventario = response.data.cantidadRestante;



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



            if (cantidad > disponibleInventario) {
                alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                return false;
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
            if (!foodSeleccionadaId && !food1SeleccionadaId && !food2SeleccionadaId && !food3SeleccionadaId && !food4SeleccionadaId) {
                setIsSaving(false);
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }

            let isBebidaAdded = false;

            if (cantidadFood > 0 && foodSeleccionadaId) {
                const foodAdultos = {
                    itemId: foodSeleccionadaId,
                    nombre: foodSeleccionada,
                    cantidad: cantidadFood,
                    precio: precioFoodSeleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(foodSeleccionadaId, cantidadFood)) {
                    await guardarFood(foodAdultos);
                    setCantidadFood("");
                    setFoodSeleccionada('');
                    setPrecioFoodSeleccionada("");
                    setFoodSeleccionadaId('');
                    setCantidadFoodDisponible("0")
                    setResetKey(prevKey => prevKey + 1);

                    isBebidaAdded = true;
                }
            }

            if (cantidadFood1 > 0 && food1SeleccionadaId) {
                const foodAdultos1 = {
                    itemId: food1SeleccionadaId,
                    nombre: food1Seleccionada,
                    cantidad: cantidadFood1,
                    precio: precioFood1Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food1SeleccionadaId, cantidadFood1)) {
                    await guardarFood(foodAdultos1);
                    setCantidadFood1("");
                    setFood1Seleccionada('');
                    setPrecioFood1Seleccionada("");
                    setFood1SeleccionadaId('');
                    setCantidadFood1Disponible("0")
                    setResetKey1(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadFood2 > 0 && food2SeleccionadaId) {
                const foodAdultos2 = {
                    itemId: food2SeleccionadaId,
                    nombre: food2Seleccionada,
                    cantidad: cantidadFood2,
                    precio: precioFood2Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food2SeleccionadaId, cantidadFood2)) {
                    await guardarFood(foodAdultos2);
                    setCantidadFood2("");
                    setFood2Seleccionada('');
                    setPrecioFood2Seleccionada("");
                    setFood2SeleccionadaId('');
                    setCantidadFood2Disponible("0")
                    setResetKey2(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadFood3 > 0 && food3SeleccionadaId) {
                const foodAdultos3 = {
                    itemId: food3SeleccionadaId,
                    nombre: food3Seleccionada,
                    cantidad: cantidadFood3,
                    precio: precioFood3Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food3SeleccionadaId, cantidadFood3)) {
                    await guardarFood(foodAdultos3);
                    setCantidadFood3("");
                    setFood3Seleccionada('');
                    setPrecioFood3Seleccionada("");
                    setFood3SeleccionadaId('');
                    setCantidadFood3Disponible("0")
                    setResetKey3(prevKey => prevKey + 1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadFood4 > 0 && food4SeleccionadaId) {
                const foodAdultos4 = {
                    itemId: food4SeleccionadaId,
                    nombre: food4Seleccionada,
                    cantidad: cantidadFood4,
                    precio: precioFood4Seleccionada,
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(food4SeleccionadaId, cantidadFood4)) {
                    await guardarFood(foodAdultos4);
                    setCantidadFood4("");
                    setFood4Seleccionada('');
                    setPrecioFood4Seleccionada("");
                    setFood4SeleccionadaId('');
                    setCantidadFood4Disponible("0")
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
    };

    const guardarFood = async (food) => {

        try {
            const response = await AxiosInstances.post(`/cabania-agregar-food/${id}`, {
                food,
            });
            toast.success('Comida guardada exitosamente!');
            const responses = await AxiosInstances.get("/food");
            const snacksWithoutSubproducts = responses.data.filter(product => !product.subproductos || product.subproductos.length === 0);
            setSnacks(snacksWithoutSubproducts);
            setIsSaving(false);
        } catch (error) {
            console.error('Error al guardar la bebida en el cliente:', error.message);
            setIsSaving(false);
            throw error;
        }
    };

    //#endregion



    return (
        <div className='flex pb-20 flex-col bg-white'>
            <Toaster position="top-right" />
            <h1 className='uppercase flex justify-center items-center mt-20' style={{ fontSize: "36px" }}>Formulario de compra</h1>
            <div className='flex'>
                <section className='w-full min-h-screen  pl-5 pr-5'>

                    <article className='mt-10' >
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>1.</span> Comprador
                        </p>
                        <span className='flex w-12/12 mt-2 pb-2 rounded' >
                            <span className='flex flex-col w-6/12'>
                                <label htmlFor="" className='ml-1'>Nombre</label>
                                <input
                                    disabled
                                    type="text"
                                    name="nombre"
                                    className='w-12/12 mr-2 outline-red-300 h-10 border-b-2 uppercase border-gray-300 pl-2 pr-2 bg-white'
                                    value={user.nombre || ''}
                                    onChange={handleInputChange}
                                />
                            </span>

                            <span className='flex flex-col w-6/12'>
                                <label htmlFor="" className='ml-1'>Identificación</label>
                                <input
                                    disabled
                                    type="text"
                                    name="apellido"
                                    className='w-12/12 mr-2 outline-red-300 h-10 border-b-2 uppercase border-gray-300 pl-2 pr-2 bg-white'
                                    value={user.identificacion || ''}
                                    onChange={handleInputChange}
                                />

                            </span>
                        </span>
                    </article>

                    <div className='flex flex-wrap justify-between' >
                        {/*<---- ->bar <---->*/}
                        <article className='mt-6 p-5 rounded-xl mr-2' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6", width: "49%" }} >
                            <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                <span className='text-red-500' style={{ fontSize: "18px" }}>2.</span> Bar
                            </p>
                            <div className="flex flex-row-reverse">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="bebidas"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadBebida) ? '' : cantidadBebida}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setCantidadBebida(isNaN(value) ? "" : value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <input
                                    disabled
                                    label=" Stock "
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadBebidaDisponible}`}
                                />
                                <Select
                                    key={resetKeyBar}
                                    className="mr-2 mt-1"
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
                                    style={{ height: "40px" }}
                                >
                                    {drinks.map((bebida) => (
                                        <SelectItem key={bebida.Descripcion}>
                                            {bebida.Descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex flex-row-reverse">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="bebidas"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadBebida1) ? '' : cantidadBebida1}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setCantidadBebida1(isNaN(value) ? "" : value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <input
                                    disabled
                                    label=" Stock "
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadBebida1Disponible}`}
                                />
                                <Select
                                    key={resetKey1Bar}
                                    className="mr-2 mt-1"
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
                                    style={{ height: "40px" }}
                                >
                                    {drinks.map((bebida) => (
                                        <SelectItem key={bebida.Descripcion}>
                                            {bebida.Descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex flex-row-reverse">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="bebidas"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadBebida2) ? '' : cantidadBebida2}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setCantidadBebida2(isNaN(value) ? "" : value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <input
                                    disabled
                                    label=" Stock "
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadBebida2Disponible}`}
                                />
                                <Select
                                    key={resetKey2Bar}
                                    className="mr-2 mt-1"
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
                                    style={{ height: "40px" }}
                                >
                                    {drinks.map((bebida) => (
                                        <SelectItem key={bebida.Descripcion}>
                                            {bebida.Descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex flex-row-reverse">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="bebidas"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadBebida3) ? '' : cantidadBebida3}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setCantidadBebida3(isNaN(value) ? "" : value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <input
                                    disabled
                                    label=" Stock "
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadBebida3Disponible}`}
                                />
                                <Select
                                    key={resetKey3Bar}
                                    className="mr-2 mt-1"
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
                                    style={{ height: "40px" }}
                                >
                                    {drinks.map((bebida) => (
                                        <SelectItem key={bebida.Descripcion}>
                                            {bebida.Descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex flex-row-reverse">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="bebidas"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadBebida4) ? '' : cantidadBebida4}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setCantidadBebida4(isNaN(value) ? "" : value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <input
                                    disabled
                                    label=" Stock "
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadBebida4Disponible}`}
                                />
                                <Select
                                    key={resetKey4Bar}
                                    className="mr-2 mt-1"
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
                                    style={{ height: "40px" }}
                                >
                                    {drinks.map((bebida) => (
                                        <SelectItem key={bebida.Descripcion}>
                                            {bebida.Descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <span className='flex justify-end pr-2 mt-5'>

                                <Button className='w-32' color='primary' onClick={handleGuardarBebida}>
                                    Guardar
                                </Button>
                            </span>
                        </article>
                        {/*<---- -> fin bar <-----> */}

                        {/*<----> comidas <----> */}
                        <article className='mt-6 p-5 rounded-xl w-5/12 ml-2' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6", width: "49%" }} >
                            <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                <span className='text-red-500' style={{ fontSize: "18px" }}>3.</span> Restaurante
                            </p>
                            <div className="flex flex-row-reverse">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="restaurante"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadFood) ? '' : cantidadFood}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadFood(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}

                                />
                                <input
                                    disabled
                                    className="inventario-box-option-input-01 outline-none pl-4 mb-2 w-24"
                                    placeholder={` ${cantidadFoodDisponible}`}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <Select
                                    key={resetKey}
                                    className="mr-2 mt-1 "
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
                            <div className="flex flex-row-reverse">

                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="restaurante"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadFood1) ? '' : cantidadFood1}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadFood1(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
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
                                    className="mr-2 mt-1"
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
                            <div className="flex flex-row-reverse">

                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="restaurante"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadFood2) ? '' : cantidadFood2}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadFood2(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
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
                                    className="mr-2 mt-1"
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
                            <div className="flex flex-row-reverse">

                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="restaurante"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadFood3) ? '' : cantidadFood3}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadFood3(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
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
                                    className="mr-2 mt-1"
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
                            <div className="flex flex-row-reverse">

                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                    name="restaurante"
                                    placeholder="Ingrese la cantidad"
                                    type="text"
                                    value={isNaN(cantidadFood4) ? '' : cantidadFood4}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadFood4(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    onKeyDown={(event) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
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
                                    className="mr-2 mt-1"
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



                            <span className='flex justify-end pr-2 mt-5'>

                                <Button className='w-32 text-white' color='warning' onClick={handleGuardarFood}>
                                    Guardar
                                </Button>
                            </span>
                        </article>
                        {/*<----> fin comidas <----> */}
                    </div>


                    <div className='flex flex-wrap justify-between' >

                        {/* <----- -> subproductos <-----> */}
                        <article className='w-full p-5 mt-5 rounded-xl mr-2' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6", width: "49%" }}>
                            <article className='' >
                                <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                    <span className='text-red-500' style={{ fontSize: "18px" }}>4.</span> Restaurante subproductos
                                </p>

                                <div className="flex mb-1 flex-row-reverse">
                                    <input
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        name="restaurante"
                                        placeholder="Ingrese la cantidad"
                                        type="text"
                                        value={isNaN(cantidadItem) ? '' : cantidadItem}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem(isNaN(value) ? '' : value);
                                        }}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <input
                                        disabled
                                        label="Stock"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                        placeholder={` ${cantidadSubpDisponible}`}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    />
                                    <Select
                                        key={resetKeySubp}
                                        className="mr-2 mt-1"
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
                                                    setCantidadSubpDisponible(itemSeleccionadaInfo.cantidadPadre);
                                                }
                                            } else {
                                                setPrecioItemSeleccionado(0);
                                                setCantidadSubpDisponible(0);
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

                                <div className="flex mb-1 flex-row-reverse">
                                    <input
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        name="restaurante"
                                        placeholder="Ingrese la cantidad"
                                        type="text"
                                        value={isNaN(cantidadItem1) ? '' : cantidadItem1}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem1(isNaN(value) ? '' : value);
                                        }}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <input
                                        disabled
                                        label="Stock"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                        placeholder={` ${cantidadSubp1Disponible}`}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    />
                                    <Select
                                        key={resetKey1Subp}
                                        className="mr-2 mt-1"
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
                                                    setCantidadSubp1Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                }
                                            } else {
                                                setPrecioItemSeleccionado1(0);
                                                setCantidadSubp1Disponible(0);
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

                                <div className="flex mb-1 flex-row-reverse">
                                    <input
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        name="restaurante"
                                        placeholder="Ingrese la cantidad"
                                        type="text"
                                        value={isNaN(cantidadItem2) ? '' : cantidadItem2}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem2(isNaN(value) ? '' : value);
                                        }}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <input
                                        disabled
                                        label="Stock"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                        placeholder={` ${cantidadSubp2Disponible}`}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    />
                                    <Select
                                        key={resetKey2Subp}
                                        className="mr-2 mt-1"
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
                                                    setCantidadSubp2Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                }
                                            } else {
                                                setPrecioItemSeleccionado2(0);
                                                setCantidadSubp2Disponible(0);
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

                                <div className="flex mb-1 flex-row-reverse">
                                    <input
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        name="restaurante"
                                        placeholder="Ingrese la cantidad"
                                        type="text"
                                        value={isNaN(cantidadItem3) ? '' : cantidadItem3}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem3(isNaN(value) ? '' : value);
                                        }}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <input
                                        disabled
                                        label="Stock"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                        placeholder={` ${cantidadSubp3Disponible}`}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    />
                                    <Select
                                        key={resetKey3Subp}
                                        className="mr-2 mt-1"
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
                                                    setCantidadSubp3Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                }
                                            } else {
                                                setPrecioItemSeleccionado3(0);
                                                setCantidadSubp3Disponible(0);
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

                                <div className="flex mb-1 flex-row-reverse">
                                    <input
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        name="restaurante"
                                        placeholder="Ingrese la cantidad"
                                        type="text"
                                        value={isNaN(cantidadItem4) ? '' : cantidadItem4}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem4(isNaN(value) ? '' : value);
                                        }}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <input
                                        disabled
                                        label="Stock"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                        placeholder={` ${cantidadSubp4Disponible}`}
                                        style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                    />
                                    <Select
                                        key={resetKey4Subp}
                                        className="mr-2 mt-1"
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
                                                    setCantidadSubp4Disponible(itemSeleccionadaInfo.cantidadPadre);
                                                }

                                            } else {
                                                setPrecioItemSeleccionado4(0);
                                                setCantidadSubp4Disponible(0);
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

                                <span className='flex justify-end pr-2 mt-5'>

                                    <Button color="primary" className='w-32 text-white' onClick={handleGuardarItem}>
                                        Guardar
                                    </Button>
                                </span>


                            </article>
                        </article>
                        {/*<---- -> fin subproducto <----->*/}

                        {/* <---- -> recepcion <-----> */}

                        <article className='w-full p-5 mt-5 rounded-xl ml-2' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6", width: "49%" }}>
                            <article className='' >
                                <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                    <span className='text-red-500' style={{ fontSize: "18px" }}>5.</span> Recepción
                                </p>
                                <span className='flex w-12/12 mt-2 items-center flex-row-reverse'>



                                    <input
                                        type="text"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        value={isNaN(cantidadItemRec) ? '' : cantidadItemRec}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItemRec(isNaN(value) ? "" : value);
                                        }}
                                        placeholder='Ingrese la cantidad'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <span>
                                        <input
                                            disabled
                                            type="text"
                                            className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                            placeholder={`${cantidadItemDisponibleRec}`}

                                        />
                                    </span>
                                    <Select
                                        key={resetKeyRec}
                                        placeholder='seleccione un item'
                                        value={itemSeleccionadoRec}
                                        className='mr-2 '
                                        style={{ height: "40px" }}
                                        onChange={(e) => {
                                            const itemSelected = e.target.value;
                                            setItemSeleccionadoRec(itemSelected);
                                            if (itemSelected) {
                                                const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                                if (itemSeleccionadoInfo) {
                                                    setPrecioItemSeleccionadoRec(itemSeleccionadoInfo.ValorUnitario);
                                                    setItemSeleccionadoIdRec(itemSeleccionadoInfo._id);
                                                    setCantidadItemDisponibleRec(itemSeleccionadoInfo.CantidadInicial);
                                                }
                                            } else {
                                                setCantidadItemRec("");
                                                setCantidadItemDisponibleRec(0);
                                            }
                                        }}  >
                                        {recepcion.map((items) => (
                                            <SelectItem key={items.Descripcion}>
                                                {items.Descripcion}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </span>
                                <span className='flex w-12/12 mt-2 items-center '>

                                    <Select
                                        key={resetKey1Rec}
                                        placeholder='seleccione un item'
                                        value={itemSeleccionado1Rec}
                                        className=' h-10 mr-2 '
                                        style={{ height: "40px" }}
                                        onChange={(e) => {
                                            const itemSelected = e.target.value;
                                            setItemSeleccionado1Rec(itemSelected);

                                            if (itemSelected) {
                                                const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                                // console.log(itemSeleccionadoInfo)
                                                if (itemSeleccionadoInfo) {
                                                    setPrecioItemSeleccionado1Rec(itemSeleccionadoInfo.ValorUnitario);
                                                    setItemSeleccionadoId1Rec(itemSeleccionadoInfo._id);
                                                    setCantidadItemDisponible1Rec(itemSeleccionadoInfo.CantidadInicial);
                                                }
                                            } else {
                                                setCantidadItem1Rec("");
                                                setCantidadItemDisponible1Rec(0);
                                            }

                                        }}>
                                        {recepcion.map((items) => (
                                            <SelectItem key={items.Descripcion}>
                                                {items.Descripcion}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <span>
                                        <input
                                            disabled
                                            type="text"
                                            className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                            placeholder={`${cantidadItemDisponible1Rec}`}

                                        />
                                    </span>
                                    <input
                                        type="text"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        value={isNaN(cantidadItem1Rec) ? '' : cantidadItem1Rec}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem1Rec(isNaN(value) ? "" : value);
                                        }}
                                        placeholder='Ingrese la cantidad'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </span>
                                <span className='flex w-12/12 mt-2 items-center '>

                                    <Select
                                        key={resetKey2Bar}
                                        placeholder='seleccione un item'
                                        value={itemSeleccionado2Rec}
                                        className=' mr-2'
                                        style={{ height: "40px" }}
                                        onChange={(e) => {
                                            const itemSelected = e.target.value;
                                            setItemSeleccionado2Rec(itemSelected);

                                            if (itemSelected) {
                                                const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                                // console.log(itemSeleccionadoInfo)
                                                if (itemSeleccionadoInfo) {
                                                    setPrecioItemSeleccionado2Rec(itemSeleccionadoInfo.ValorUnitario);
                                                    setItemSeleccionadoId2Rec(itemSeleccionadoInfo._id);
                                                    setCantidadItemDisponible2Rec(itemSeleccionadoInfo.CantidadInicial);
                                                }
                                            } else {
                                                setCantidadItem2Rec("");
                                                setCantidadItemDisponible2Rec(0);
                                            }
                                        }}>
                                        {recepcion.map((items) => (
                                            <SelectItem key={items.Descripcion}>
                                                {items.Descripcion}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <span>
                                        <input
                                            disabled
                                            type="text"
                                            className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                            placeholder={`${cantidadItemDisponible2Rec}`}

                                        />
                                    </span>
                                    <input
                                        type="text"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        value={isNaN(cantidadItem2Rec) ? '' : cantidadItem2Rec}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem2Rec(isNaN(value) ? "" : value);
                                        }}
                                        placeholder='Ingrese la cantidad'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </span>
                                <span className='flex w-12/12 mr-2 items-center '>

                                    <Select
                                        key={resetKey3Rec}
                                        placeholder='seleccione un item'
                                        value={itemSeleccionado3Rec}
                                        className='  mr-2 '
                                        style={{ height: "40px" }}
                                        onChange={(e) => {
                                            const itemSelected = e.target.value;
                                            setItemSeleccionado3Rec(itemSelected);

                                            if (itemSelected) {
                                                const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                                // console.log(itemSeleccionadoInfo)
                                                if (itemSeleccionadoInfo) {
                                                    setPrecioItemSeleccionado3Rec(itemSeleccionadoInfo.ValorUnitario);
                                                    setItemSeleccionadoId3Rec(itemSeleccionadoInfo._id);
                                                    setCantidadItemDisponible3Rec(itemSeleccionadoInfo.CantidadInicial);
                                                }
                                            } else {
                                                setCantidadItem3Rec("");
                                                setCantidadItemDisponible3Rec(0);
                                            }
                                        }}>
                                        {recepcion.map((items) => (
                                            <SelectItem key={items.Descripcion}>
                                                {items.Descripcion}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <span>
                                        <input
                                            disabled
                                            type="text"
                                            className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                            placeholder={`${cantidadItemDisponible3Rec}`}
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        value={isNaN(cantidadItem3Rec) ? '' : cantidadItem3Rec}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem3Rec(isNaN(value) ? "" : value);
                                        }}
                                        placeholder='Ingrese la cantidad'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </span>
                                <span className='flex w-12/12 mt-2 items-center '>

                                    <Select
                                        key={resetKey4Rec}
                                        placeholder='seleccione un item'
                                        value={itemSeleccionado4Rec}
                                        className='mr-2 '
                                        style={{ height: "40px" }}
                                        onChange={(e) => {
                                            const itemSelected = e.target.value;
                                            setItemSeleccionado4Rec(itemSelected);

                                            if (itemSelected) {
                                                const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                                // console.log(itemSeleccionadoInfo)
                                                if (itemSeleccionadoInfo) {
                                                    setPrecioItemSeleccionado4Rec(itemSeleccionadoInfo.ValorUnitario);
                                                    setItemSeleccionadoId4Rec(itemSeleccionadoInfo._id);
                                                    setCantidadItemDisponible4Rec(itemSeleccionadoInfo.CantidadInicial);
                                                }
                                            } else {
                                                setCantidadItem4Rec("");
                                                setCantidadItemDisponible4Rec(0);
                                            }
                                        }}>
                                        {recepcion.map((items) => (
                                            <SelectItem key={items.Descripcion}>
                                                {items.Descripcion}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <span>
                                        <input
                                            disabled
                                            type="text"
                                            className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                            placeholder={`${cantidadItemDisponible4Rec}`}

                                        />
                                    </span>
                                    <input
                                        type="text"
                                        className="inventario-box-option-input-01 outline-none pl-2 mb-2 ml-2"
                                        value={isNaN(cantidadItem4Rec) ? '' : cantidadItem4Rec}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setCantidadItem4Rec(isNaN(value) ? "" : value);
                                        }}
                                        placeholder='Ingrese la cantidad'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </span>
                                <span className='flex justify-end pr-2 mt-5'>
                                    <Button className='w-32 text-white' color='success' onClick={handleGuardarItemRecepcion}>
                                        Guardar
                                    </Button>
                                </span>


                            </article>

                        </article>
                        {/* <---- -> fin recepcion <-----> */}

                    </div>


                    {/******************** handleGuardarItem ***************/}


                    <article className='mt-5 p-5 rounded-xl' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6" }}>
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>4.</span> cargo por descorche
                        </p>
                        <article>

                            <div>

                                <span className='flex w-12/12 rounded mt-2'>
                                    <p className='flex rounded-full    justify-center  text-white mr-2  pt-4' >
                                        <span className='rounded-full  bg-red-500' style={{ width: "15px", height: "15px" }}></span>
                                    </p>
                                    <input
                                        value={valorDescorche}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder='Valor del descorche'
                                        className='mb-5 w-6/12 h-14 mr-2 pl-2 outline-none border-b-2 border-gray-300'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <textarea
                                        value={descripcionDescorche}
                                        onChange={(e) => setDescripcionDescorche(e.target.value)}
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                        className='w-6/12 h-14 outline-none p-2 ml 2 border-b-2 border-gray-300' placeholder='Ingrese la descripción'></textarea>
                                </span>
                            </div>

                            <div>
                                <span className='flex w-12/12 rounded '>
                                    <p className='flex rounded-full    justify-center  text-white mr-2  pt-4' >
                                        <span className='rounded-full  bg-red-500' style={{ width: "15px", height: "15px" }}></span>
                                    </p>
                                    <input
                                        value={valorDescorche1}
                                        onChange={handleChanges}
                                        type="text"
                                        placeholder='Valor del descorche' className='mb-2 w-6/12 h-14 mr-2 pl-2 outline-none border-b-2 border-gray-300'
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <textarea
                                        value={descripcionDescorche1}
                                        onChange={(e) => setDescripcionDescorche1(e.target.value)}
                                        name="" id="" cols="30" rows="10" className='w-6/12 h-14 outline-none p-2 ml 2 border-b-2 border-gray-300' placeholder='Ingrese la descripción'></textarea>
                                </span>
                                <span className='flex justify-end'>
                                    <Button color='danger' className='mt-5 text-white' onClick={handleGuardarDescorche}>
                                        Crear descorche
                                    </Button>
                                </span>
                            </div>
                        </article>
                    </article>
                    {/*  **************************  */}
                </section>

            </div>
        </div>
    );
}

export default Adicionales;
