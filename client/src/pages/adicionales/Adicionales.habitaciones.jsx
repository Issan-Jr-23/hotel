import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstances from "../../api/axios.js";
import { Button, Input, Select, SelectItem, Table, TableBody, TableColumn, TableCell, TableHeader, TableRow } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

const Adicionales = () => {
    const [user, setUser] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [recepcion, setRecepcion] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);

    //#region

    const [cantidadItem, setCantidadItem] = useState("");
    const [itemSeleccionado, setItemSeleccionado] = useState('');
    const [precioItemSeleccionado, setPrecioItemSeleccionado] = useState(0);
    const [itemSeleccionadoId, setItemSeleccionadoId] = useState(null);
    const [cantidadItemDisponible, setCantidadItemDisponible] = useState(0);

    const [cantidadItem1, setCantidadItem1] = useState("");
    const [itemSeleccionado1, setItemSeleccionado1] = useState('');
    const [precioItemSeleccionado1, setPrecioItemSeleccionado1] = useState(0);
    const [itemSeleccionadoId1, setItemSeleccionadoId1] = useState(null);
    const [cantidadItemDisponible1, setCantidadItemDisponible1] = useState(0);

    const [cantidadItem2, setCantidadItem2] = useState("");
    const [itemSeleccionado2, setItemSeleccionado2] = useState('');
    const [precioItemSeleccionado2, setPrecioItemSeleccionado2] = useState(0);
    const [itemSeleccionadoId2, setItemSeleccionadoId2] = useState(null);
    const [cantidadItemDisponible2, setCantidadItemDisponible2] = useState(0);

    const [cantidadItem3, setCantidadItem3] = useState("");
    const [itemSeleccionado3, setItemSeleccionado3] = useState('');
    const [precioItemSeleccionado3, setPrecioItemSeleccionado3] = useState(0);
    const [itemSeleccionadoId3, setItemSeleccionadoId3] = useState(null);
    const [cantidadItemDisponible3, setCantidadItemDisponible3] = useState(0);

    const [cantidadItem4, setCantidadItem4] = useState("");
    const [itemSeleccionado4, setItemSeleccionado4] = useState('');
    const [precioItemSeleccionado4, setPrecioItemSeleccionado4] = useState(0);
    const [itemSeleccionadoId4, setItemSeleccionadoId4] = useState(null);
    const [cantidadItemDisponible4, setCantidadItemDisponible4] = useState(0);

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

    const [cantidadItemSub, setCantidadItemSub] = useState("");
    const [itemSeleccionadoSub, setItemSeleccionadoSub] = useState("");
    const [precioItemSeleccionadoSub, setPrecioItemSeleccionadoSub] = useState("");
    const [itemSeleccionadoIdSub, setItemSeleccionadoIdSub] = useState("");
    const [subItemSeleccionadoIdSub, setSubItemSeleccionadoIdSub] = useState("");

    const [cantidadItem1Sub, setCantidadItem1Sub] = useState("");
    const [itemSeleccionado1Sub, setItemSeleccionado1Sub] = useState("");
    const [precioItemSeleccionado1Sub, setPrecioItemSeleccionado1Sub] = useState("");
    const [itemSeleccionadoId1Sub, setItemSeleccionadoId1Sub] = useState("");
    const [subItemSeleccionadoId1Sub, setSubItemSeleccionadoId1Sub] = useState("");

    const [cantidadItem2Sub, setCantidadItem2Sub] = useState("");
    const [itemSeleccionado2Sub, setItemSeleccionado2Sub] = useState("");
    const [precioItemSeleccionado2Sub, setPrecioItemSeleccionado2Sub] = useState("");
    const [itemSeleccionadoId2Sub, setItemSeleccionadoId2Sub] = useState("");
    const [subItemSeleccionadoId2Sub, setSubItemSeleccionadoId2Sub] = useState("");

    const [cantidadItem3Sub, setCantidadItem3Sub] = useState("");
    const [itemSeleccionado3Sub, setItemSeleccionado3Sub] = useState("");
    const [precioItemSeleccionado3Sub, setPrecioItemSeleccionado3Sub] = useState("");
    const [itemSeleccionadoId3Sub, setItemSeleccionadoId3Sub] = useState("");
    const [subItemSeleccionadoId3Sub, setSubItemSeleccionadoId3Sub] = useState("");

    const [cantidadItem4Sub, setCantidadItem4Sub] = useState("");
    const [itemSeleccionado4Sub, setItemSeleccionado4Sub] = useState("");
    const [precioItemSeleccionado4Sub, setPrecioItemSeleccionado4Sub] = useState("");
    const [itemSeleccionadoId4Sub, setItemSeleccionadoId4Sub] = useState("");
    const [subItemSeleccionadoId4Sub, setSubItemSeleccionadoId4Sub] = useState("");

    const [cantidadFoodDisponibleSub, setCantidadFoodDisponibleSub] = useState(0);
    const [cantidadFood1DisponibleSub, setCantidadFood1DisponibleSub] = useState(0);
    const [cantidadFood2DisponibleSub, setCantidadFood2DisponibleSub] = useState(0);
    const [cantidadFood3DisponibleSub, setCantidadFood3DisponibleSub] = useState(0);
    const [cantidadFood4DisponibleSub, setCantidadFood4DisponibleSub] = useState(0);


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









    const [comidas, setComidas] = useState([])
    const [snacks, setSnacks] = useState([])
    const [isSaving, setIsSaving] = useState(false);

    //#region

    const [descripcionDescorche, setDescripcionDescorche] = useState("")
    const [valorDescorche, setValorDescorche] = useState("")

    const [descripcionDescorche1, setDescripcionDescorche1] = useState("")
    const [valorDescorche1, setValorDescorche1] = useState("")



    const [resetKey, setResetKey] = useState(0);

    function obtenerFechaConAjuste() {
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        return fechaActual.toISOString();
    }

    const resetSelect = () => {
        setItemSeleccionado("");
        setItemSeleccionado1("");
        setItemSeleccionado2("");
        setItemSeleccionado3("");
        setItemSeleccionado4("");
        setResetKey(prevKey => prevKey + 1);
    };

    const resetSelectItem = () => {
        setItemSeleccionadoRec("");
        setItemSeleccionado1Rec("");
        setItemSeleccionado2Rec("");
        setItemSeleccionado3Rec("");
        setItemSeleccionado4Rec("");
        setResetKey(prevKey => prevKey + 1);
    };


    const limpiarCampos = () => {

        setCantidadItem("");
        setPrecioItemSeleccionado("");
        setItemSeleccionadoId("");
        setCantidadItemDisponible("0");

        setCantidadItem1("");
        setPrecioItemSeleccionado1("");
        setItemSeleccionadoId1("");
        setCantidadItemDisponible1("0");

        setCantidadItem2("");
        setPrecioItemSeleccionado2("");
        setItemSeleccionadoId2("");
        setCantidadItemDisponible2("0");

        setCantidadItem3("");
        setPrecioItemSeleccionado3("");
        setItemSeleccionadoId3("");
        setCantidadItemDisponible3("0");

        setCantidadItem4("")
        setPrecioItemSeleccionado4("");
        setItemSeleccionadoId4("");
        setCantidadItemDisponible4("0");

        setCantidadItemRec("");
        setPrecioItemSeleccionadoRec("");
        setItemSeleccionadoIdRec("");
        setCantidadItemDisponibleRec("0");

        setCantidadItem1Rec("");
        setPrecioItemSeleccionado1Rec("");
        setItemSeleccionadoId1Rec("");
        setCantidadItemDisponible1Rec("0");

        setCantidadItem2Rec("");
        setPrecioItemSeleccionado2Rec("");
        setItemSeleccionadoId2Rec("");
        setCantidadItemDisponible2Rec("0");

        setCantidadItem3Rec("");
        setPrecioItemSeleccionado3Rec("");
        setItemSeleccionadoId3Rec("");
        setCantidadItemDisponible3Rec("0");

        setCantidadItem4Rec("")
        setPrecioItemSeleccionado4Rec("");
        setItemSeleccionadoId4Rec("");
        setCantidadItemDisponible4Rec("0");
    }

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstances.get(`/habitaciones-cliente-info/${id}`);
                console.log("Respuesta del servidor: ", response);
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
                // Filtrar las bebidas con cantidad mayor a 0
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

    const handleInputChanges = (e) => {
        setDrinks({ ...drinks, [e.target.name]: e.target.value });
    };

    const handleDrinkChange = (index, value) => {
        const drink = drinks.find(d => d._id === value);
        setSelectedDrink({ ...setSelectedDrink, [index]: drink });
    };


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
        console.log("items verificaion: ", itemSeleccionadoId, id)
        console.log("entra a la funcion")
        if (!itemSeleccionadoId && !itemSeleccionadoId1 && !itemSeleccionadoId2 && !itemSeleccionadoId3 && !itemSeleccionadoId4) {
            console.log("entra a la validacion")
            toast.error('No se ha seleccionado un cliente o una Bebida.');
            toast.
                return;
        }

        const checkStockAndUpdateInventory = async (bebidaId, cantidad) => {
            console.log("mostrar cantidad: ", cantidad)
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${bebidaId}`);
            console.log(response.data)

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

            await actualizarInventarioBebida(bebidaId, cantidad);
            await actualizarStockInicialBebida(bebidaId, cantidad);
            return true;

        };

        try {
            if (!itemSeleccionadoId && !itemSeleccionadoId1 && !itemSeleccionadoId2 && !itemSeleccionadoId3 && !itemSeleccionadoId4) {
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }

            let isBebidaAdded = false;

            if (cantidadItem > 0 && itemSeleccionadoId) {
                const bebidaAdultos = {
                    itemId: itemSeleccionadoId,
                    nombre: itemSeleccionado,
                    cantidad: cantidadItem,
                    precio: precioItemSeleccionado,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId, cantidadItem)) {
                    await guardarBebida(bebidaAdultos);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem1 > 0 && itemSeleccionadoId1) {
                const bebidaAdultos1 = {
                    id: itemSeleccionadoId1,
                    nombre: itemSeleccionado1,
                    cantidad: cantidadItem1,
                    precio: precioItemSeleccionado1,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId1, cantidadItem1)) {
                    await guardarBebida(bebidaAdultos1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem2 > 0 && itemSeleccionadoId2) {
                const bebidaAdultos2 = {
                    id: itemSeleccionadoId2,
                    nombre: itemSeleccionado2,
                    cantidad: cantidadItem2,
                    precio: precioItemSeleccionado2,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId2, cantidadItem2)) {
                    await guardarBebida(bebidaAdultos2);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem3 > 0 && itemSeleccionadoId3) {
                const bebidaAdultos3 = {
                    id: itemSeleccionadoId3,
                    nombre: itemSeleccionado3,
                    cantidad: cantidadItem3,
                    precio: precioItemSeleccionado3,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId3, cantidadItem3)) {
                    await guardarBebida(bebidaAdultos3);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem4 > 0 && itemSeleccionadoId4) {
                const bebidaAdultos4 = {
                    id: itemSeleccionadoId4,
                    nombre: itemSeleccionado4,
                    cantidad: cantidadItem4,
                    precio: precioItemSeleccionado4,
                    mensaje: "recepcion",
                    adicional: "adicional",
                    fecha: obtenerFechaConAjuste()
                };

                if (await checkStockAndUpdateInventory(itemSeleccionadoId4, cantidadItem4)) {
                    await guardarBebida(bebidaAdultos4);
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

    const guardarBebida = async (food) => {
        try {
            const response = await AxiosInstances.post(`/habitaciones-agregar-food/${id}`, {
                food,
            });
            toast.success('Bebida guardada exitosamente!');
            limpiarCampos();
            resetSelect();


        } catch (error) {
            console.error('Error al guardar la bebida en el cliente:', error.message);
            throw error;
        }
    };




    //**************************** */




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
        console.log("entra a la funcion")
        if (!itemSeleccionadoIdRec && !itemSeleccionadoId1Rec && !itemSeleccionadoId2Rec && !itemSeleccionadoId3Rec && !itemSeleccionadoId4Rec) {
            console.log("entra a la validacion")
            toast.error('No se ha seleccionado un cliente o una Bebida.');
            toast.
                return;
        }

        const checkStockAndUpdateInventory = async (itemRecId, cantidad) => {
            console.log("mostrar cantidad: ", cantidad)
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${itemRecId}`);
            console.log(response.data)

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
            const response = await AxiosInstances.post(`/habitaciones-agregar-item-recepcion/${id}`, {
                bebida,
            });
            toast.success('Item de recepcion guardado exitosamente!');
            limpiarCampos();
            resetSelectItem();
            const responses = await AxiosInstances.get("/recepcion");
            setRecepcion(responses.data);

        } catch (error) {
            console.error('Error al guardar el item en el cliente:', error.message);
            throw error;
        }
    };

    //****************************************** */

    const limpiarDescorches = () => {
        setDescripcionDescorche("");
        setDescripcionDescorche1("");
        setValorDescorche("");
        setValorDescorche1("");
    }

    const handleGuardarDescorche = async () => {
        if ((descripcionDescorche === "" && valorDescorche === "") || (descripcionDescorche1 === "" && valorDescorche1 === "")) {
            console.log("Successfully");
        } else {
            toast.error("Por favor, completa tanto la descripción como el valor antes de guardar.");
            return;
        }
        try {

            if (valorDescorche > 0 && descripcionDescorche !== "") {
                const descorche1 = {
                    valor: valorDescorche,
                    descripcion: descripcionDescorche,
                    mensaje: "descorche"
                }
                await handleCrearDescorche(descorche1)
                toast.success("datos guaraddos exitosamente")
            }


            if (valorDescorche1 > 0 && descripcionDescorche1 !== "") {
                const descorche1 = {
                    valor: valorDescorche1,
                    descripcion: descripcionDescorche1,
                    mensaje: "descorche"
                }
                await handleCrearDescorche(descorche1)
            }


        } catch (error) {

        }
    }

    const handleCrearDescorche = async (descorche) => {
        try {
            await AxiosInstances.post(`/habitaciones-agregar-descorche/${id}`, { descorche })
            limpiarDescorches();
            toast.success("Descorche agregado con exito")
        } catch (error) {
            console.log("false: ", error)
        }
    }

    //#endregion

    // new

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


    const actualizarInventarioItemSub = async (foodId, subproductoId, cantidad) => {
        console.log("peticion actualizar inventario item: " + foodId, subproductoId, cantidad)
        try {
            const response = await AxiosInstances.post('/update-cantidad-inicial', {
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

    const handleGuardarItem = async () => {
        if (isSaving) return;
        setIsSaving(true);

        if (!subItemSeleccionadoIdSub && !subItemSeleccionadoId1Sub && !subItemSeleccionadoId2Sub && !subItemSeleccionadoId3Sub && !subItemSeleccionadoId4Sub) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
            return;
        }


        const checkStockAndUpdateInventory = async (foodId, subProductoId, cantidad) => {
            console.log("quiero ver quien pasa ese id y cantidad: ", foodId, cantidad)
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${foodId}`);

            let fecha = new Date();

            fecha.setHours(fecha.getHours() - 5);

            const disponibleInventario = response.data.cantidadRestante;


            // if (foodSeleccionada && disponibleInventario === 0) {
            //   toast.error('Algun producto esta agotado',
            //     {
            //       style: {
            //         borderRadius: '10px',
            //         background: '#333',
            //         color: '#fff',
            //       },
            //     }
            //   );
            //   return false;
            // }




            if (cantidad > disponibleInventario) {
                alert(`Solo quedan ${disponibleInventario} unidades disponibles en el inventario.`);
                return;
            } else if (disponibleInventario === 0 && !foodSeleccionada) {
                alert(`Ya no quedan ${foodSeleccionada} disponibles en el inventario `);
                return;
            }
            await actualizarInventarioItemSub(foodId, subProductoId, cantidad);
            return true;
        };



        try {
            if (!subItemSeleccionadoIdSub && !subItemSeleccionadoId1Sub && !subItemSeleccionadoId2 && !subItemSeleccionadoId3Sub && !subItemSeleccionadoId4Sub) {
                setIsSaving(false);
                throw new Error('No se ha seleccionado un cliente o una bebida.');
            }




            let isBebidaAdded = false;

            if (cantidadItemSub > 0 && itemSeleccionadoIdSub) {
                const item = {
                    id: subItemSeleccionadoIdSub,
                    nombre: itemSeleccionadoSub,
                    cantidad: cantidadItemSub,
                    precio: precioItemSeleccionadoSub,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoIdSub;
                console.log("depuracion dentro del checkInventory: ", itemSeleccionadoIdSub, subproductoId, cantidadItemSub)
                if (await checkStockAndUpdateInventory(itemSeleccionadoIdSub, subproductoId, cantidadItemSub)) {
                    await guardarItem(item);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem1Sub > 0 && itemSeleccionadoId1Sub) {
                const item1 = {
                    id: subItemSeleccionadoId1Sub,
                    nombre: itemSeleccionado1Sub,
                    cantidad: cantidadItem1Sub,
                    precio: precioItemSeleccionado1Sub,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId1Sub;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId1Sub, subproductoId, cantidadItem1Sub)) {
                    await guardarItem(item1);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem2Sub > 0 && itemSeleccionadoId2Sub) {
                const item2 = {
                    id: subItemSeleccionadoId2Sub,
                    nombre: itemSeleccionado2Sub,
                    cantidad: cantidadItem2Sub,
                    precio: precioItemSeleccionado2Sub,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId2Sub;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId2Sub, subproductoId, cantidadItem2Sub)) {
                    await guardarItem(item2);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem3Sub > 0 && itemSeleccionadoId3Sub) {
                const item3 = {
                    id: subItemSeleccionadoId3Sub,
                    nombre: itemSeleccionado3Sub,
                    cantidad: cantidadItem3Sub,
                    precio: precioItemSeleccionado3Sub,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId3Sub;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId3Sub, subproductoId, cantidadItem3Sub)) {
                    await guardarItem(item3);
                    isBebidaAdded = true;
                }
            }

            if (cantidadItem4Sub > 0 && itemSeleccionadoId4Sub) {
                const item4 = {
                    id: subItemSeleccionadoId4Sub,
                    nombre: itemSeleccionado4Sub,
                    cantidad: cantidadItem4Sub,
                    precio: precioItemSeleccionado4Sub,
                    fechaDeMarca: "",
                    fecha: obtenerFechaConAjuste()
                };
                let subproductoId = subItemSeleccionadoId4Sub;
                if (await checkStockAndUpdateInventory(itemSeleccionadoId4Sub, subproductoId, cantidadItem4Sub)) {
                    await guardarItem(item4);
                    isBebidaAdded = true;
                }
            }

            if (!isBebidaAdded) {
                toast.promise("No se ha agregado ninguna comida");
                setIsSaving(false);
            } else {
            }
        } catch (error) {
            toast.error('Error al guardar las bebidas en el cliente: hola', error);
            setIsSaving(false);
        }

    }

    const guardarItem = async (food) => {
        try {
            await AxiosInstances.post(`/habitaciones-agregar-food/${id}`, {

                food,
            });
            toast.success('Comida guardada exitosamente!');
            //   limpiarItems();

            setIsSaving(false);

            //   const responses = await AxiosInstances.get("/pasadia-clientes");
            //   const usuariosOrdenados = responses.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));

            //   setUsers(usuariosOrdenados);
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la comida en el cliente:', error.message);
            throw error;
        }
    };



    // ********************

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

    const limpiarCampos1 = () => {
        setCantidadFood("");
        setFoodSeleccionada('');
        setPrecioFoodSeleccionada("");
        setFoodSeleccionadaId('');

        setCantidadFood1("");
        setFood1Seleccionada('');
        setPrecioFood1Seleccionada("");
        setFood1SeleccionadaId('');

        setCantidadFood2("");
        setFood2Seleccionada('');
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
    }

    const actualizarInventarioFood = async (foodId, cantidad) => {
        try {
            const response = await AxiosInstances.post('/actualizar-inventario-food', {
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
            if (!foodSeleccionadaId && !food1SeleccionadaId && !food2SeleccionadaId && !food3SeleccionadaId && !food4SeleccionadaId) {
                setIsSaving(false);
                throw new Error('No se ha seleccionado un cliente o una bebida.');
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
                    isBebidaAdded = true;
                }
            }



            if (!isBebidaAdded) {
                toast.error("No se ha agregado ninguna comida");
                setIsSaving(false);
            } else {
            }
        } catch (error) {
            toast.error('No se ha seleccionado un cliente o una comida.');
            setIsSaving(false);
        }
    };

    const guardarFood = async (food) => {

        try {
            await AxiosInstances.post(`/habitaciones-agregar-food/${id}`, {
                food
            });
            toast.success('Comida guardada exitosamente!');
            limpiarCampos1();
            //   setEsCortesia(false);
            //   closeModalF();
            setIsSaving(false);
            //   closeModalF();
        } catch (error) {
            setIsSaving(false);
            console.error('Error al guardar la comida en el cliente:', error.message);
            throw error;
        }
    };




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
                                    className='w-12/12 mr-2 uppercase outline-red-300 border-b-2 border-gray-300 h-10 pl-2 pr-2 bg-inherent'
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

                    <article className='mt-6 p-5 rounded-xl' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6" }} >
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>2.</span> Bar
                        </p>
                        <span className='flex w-12/12 mt-2 items-center' >
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-blue-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>
                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={itemSeleccionado}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem("")
                                        setCantidadItemDisponible(0)
                                    }

                                }}>
                                {drinks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible}`}

                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem) ? '' : cantidadItem}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>



                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-blue-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={itemSeleccionado1}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado1(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado1(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId1(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible1(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem1("");
                                        setCantidadItemDisponible1(0);
                                    }
                                }}>
                                {drinks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible1}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem1) ? '' : cantidadItem1}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem1(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>
                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-blue-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={itemSeleccionado2}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado2(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado2(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId2(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible2(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem2("")
                                        setCantidadItemDisponible2(0)
                                    }
                                }}>
                                {drinks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible2}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem2) ? '' : cantidadItem2}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem2(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-blue-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={itemSeleccionado3}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado3(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado3(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId3(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible3(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem3("")
                                        setCantidadItemDisponible3(0)
                                    }
                                }}>
                                {drinks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible3}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem3) ? '' : cantidadItem3}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem3(isNaN(value) ? "" : value);
                                }}
                                placeholder='ingrese la cantidad'
                            />
                        </span>
                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-blue-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={itemSeleccionado4}
                                className='w-5/12 h-10 mr-2'
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado4(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado4(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId4(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible4(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem4("")
                                        setCantidadItemDisponible4(0)
                                    }

                                }}>
                                {drinks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className=' mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible4}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-5/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem4) ? '' : cantidadItem4}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem4(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>
                        <span className='flex justify-end pr-2 mt-5'>

                            <Button className='w-32' color='primary' onClick={handleGuardarBebida}>
                                Guardar
                            </Button>
                        </span>
                    </article>

                    {/******************** handleGuardarFood ***************/}

                    <article className='mt-6 p-5 rounded-xl' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6" }} >
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>3.</span> Restaurante
                        </p>
                        <span className='flex w-12/12 mt-2 items-center' >
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-yellow-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>
                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={foodSeleccionada}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setFoodSeleccionada(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = snacks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioFoodSeleccionada(itemSeleccionadoInfo.ValorUnitario);
                                            setFoodSeleccionadaId(itemSeleccionadoInfo._id);
                                            setCantidadFoodDisponible(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadFood("")
                                        setCantidadFoodDisponible(0)
                                    }

                                }}>
                                {snacks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadFoodDisponible}`}

                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadFood) ? '' : cantidadFood}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadFood(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-yellow-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={food1Seleccionada}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setFood1Seleccionada(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = snacks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioFood1Seleccionada(itemSeleccionadoInfo.ValorUnitario);
                                            setFood1SeleccionadaId(itemSeleccionadoInfo._id);
                                            setCantidadFood1Disponible(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadFood1("");
                                        setCantidadFood1Disponible(0);
                                    }
                                }}>
                                {snacks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadFood1Disponible}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadFood1) ? '' : cantidadFood1}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadFood1(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-yellow-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={food2Seleccionada}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setFood2Seleccionada(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = snacks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioFood2Seleccionada(itemSeleccionadoInfo.ValorUnitario);
                                            setFood2SeleccionadaId(itemSeleccionadoInfo._id);
                                            setCantidadFood2Disponible(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadFood2("");
                                        setCantidadFood2Disponible(0);
                                    }
                                }}>
                                {snacks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadFood2Disponible}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadFood2) ? '' : cantidadFood2}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadFood2(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-yellow-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={food3Seleccionada}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setFood3Seleccionada(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = snacks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioFood3Seleccionada(itemSeleccionadoInfo.ValorUnitario);
                                            setFood3SeleccionadaId(itemSeleccionadoInfo._id);
                                            setCantidadFood3Disponible(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadFood3("");
                                        setCantidadFood3Disponible(0);
                                    }
                                }}>
                                {snacks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadFood3Disponible}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadFood3) ? '' : cantidadFood3}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadFood3(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                <span className='rounded-full  bg-yellow-400' style={{ width: "15px", height: "15px" }}></span>
                            </p>

                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={food4Seleccionada}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setFood4Seleccionada(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = snacks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioFood4Seleccionada(itemSeleccionadoInfo.ValorUnitario);
                                            setFood4SeleccionadaId(itemSeleccionadoInfo._id);
                                            setCantidadFood4Disponible(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadFood4("");
                                        setCantidadFood4Disponible(0);
                                    }
                                }}>
                                {snacks.map((items) => (
                                    <SelectItem key={items.Descripcion}>
                                        {items.Descripcion}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>
                                <input
                                    disabled
                                    type="text"
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadFood4Disponible}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadFood4) ? '' : cantidadFood4}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadFood4(isNaN(value) ? "" : value);
                                }}
                                placeholder='Ingrese la cantidad'
                            />
                        </span>



                        <span className='flex justify-end pr-2 mt-5'>

                            <Button className='w-32' color='warning' onClick={handleGuardarFood}>
                                Guardar
                            </Button>
                        </span>
                    </article>

                    {/******************** handleGuardarItem ***************/}

                    <article className='w-full p-5 mt-5 rounded-xl' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6" }}>
                        <article className='' >
                            <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                <span className='text-red-500' style={{ fontSize: "18px" }}>3.</span> Restaurante
                            </p>
                            <div className="flex mb-1">
                                <input
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 mr-2"
                                    name="restaurante"
                                    placeholder="Ingrese la cantidad"
                                    type="number"
                                    value={isNaN(cantidadItemSub) ? '' : cantidadItemSub}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItemSub(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <input
                                    disabled
                                    label="Stock"
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadFoodDisponibleSub}`}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <Select
                                    key={resetKey}
                                    className="ml-2 mt-1"
                                    name="restaurante"
                                    label="Seleccionar comida"
                                    value={itemSeleccionadoSub}
                                    onChange={(e) => {
                                        const selectedItem = e.target.value;
                                        setItemSeleccionadoSub(selectedItem);

                                        if (selectedItem) {
                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                            if (itemSeleccionadaInfo) {
                                                setPrecioItemSeleccionadoSub(itemSeleccionadaInfo.ValorUnitario);
                                                setItemSeleccionadoIdSub(itemSeleccionadaInfo.idPadre);
                                                setSubItemSeleccionadoIdSub(itemSeleccionadaInfo._id)
                                                setCantidadFoodDisponibleSub(itemSeleccionadaInfo.cantidadPadre);
                                            }
                                        } else {
                                            setPrecioItemSeleccionadoSub(0);
                                            setCantidadFoodDisponibleSub(0);
                                            setCantidadItemSub("");
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
                                    value={isNaN(cantidadItem1Sub) ? '' : cantidadItem1Sub}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem1Sub(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <input
                                    disabled
                                    label="Stock"
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadFood1DisponibleSub}`}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <Select
                                key={resetKey}
                                    className="ml-2 mt-1"
                                    name="restaurante"
                                    label="Seleccionar comida"
                                    value={itemSeleccionado1Sub}
                                    onChange={(e) => {
                                        const selectedItem = e.target.value;
                                        setItemSeleccionado1Sub(selectedItem);

                                        if (selectedItem) {
                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);
                                            if (itemSeleccionadaInfo) {
                                                setPrecioItemSeleccionado1Sub(itemSeleccionadaInfo.ValorUnitario);
                                                setItemSeleccionadoId1Sub(itemSeleccionadaInfo.idPadre);
                                                setSubItemSeleccionadoId1Sub(itemSeleccionadaInfo._id);
                                                setCantidadFood1DisponibleSub(itemSeleccionadaInfo.cantidadPadre);
                                            }
                                        } else {
                                            setPrecioItemSeleccionado1Sub(0);
                                            setCantidadFood1DisponibleSub(0);
                                            setCantidadItem1Sub("");
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
                                    value={isNaN(cantidadItem2Sub) ? '' : cantidadItem2Sub}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem2Sub(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <input
                                    disabled
                                    label="Stock"
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadFood2DisponibleSub}`}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <Select
                                key={resetKey}
                                    className="ml-2 mt-1"
                                    name="restaurante"
                                    label="Seleccionar comida"
                                    value={itemSeleccionado2Sub}
                                    onChange={(e) => {
                                        const selectedItem = e.target.value;
                                        setItemSeleccionado2Sub(selectedItem);

                                        if (selectedItem) {
                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                            if (itemSeleccionadaInfo) {
                                                setPrecioItemSeleccionado2Sub(itemSeleccionadaInfo.ValorUnitario);
                                                setItemSeleccionadoId2Sub(itemSeleccionadaInfo.idPadre);
                                                setSubItemSeleccionadoId2Sub(itemSeleccionadaInfo._id);
                                                setCantidadFood2DisponibleSub(itemSeleccionadaInfo.cantidadPadre);
                                            }
                                        } else {
                                            setPrecioItemSeleccionado2Sub(0);
                                            setCantidadFood2DisponibleSub(0);
                                            setCantidadItem2Sub("");
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
                                    value={isNaN(cantidadItem3Sub) ? '' : cantidadItem3Sub}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem3Sub(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <input
                                    disabled
                                    label="Stock"
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadFood3DisponibleSub}`}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <Select
                                key={resetKey}
                                    className="ml-2 mt-1"
                                    name="restaurante"
                                    label="Seleccionar comida"
                                    value={itemSeleccionado3Sub}
                                    onChange={(e) => {
                                        const selectedItem = e.target.value;
                                        setItemSeleccionado3Sub(selectedItem);

                                        if (selectedItem) {
                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                            if (itemSeleccionadaInfo) {
                                                setPrecioItemSeleccionado3Sub(itemSeleccionadaInfo.ValorUnitario);
                                                setItemSeleccionadoId3Sub(itemSeleccionadaInfo.idPadre);
                                                setSubItemSeleccionadoId3Sub(itemSeleccionadaInfo._id);
                                                setCantidadFood3DisponibleSub(itemSeleccionadaInfo.cantidadPadre);
                                            }
                                        } else {
                                            setPrecioItemSeleccionado3Sub(0);
                                            setCantidadFood3DisponibleSub(0);
                                            setCantidadItem3Sub("");
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
                                    value={isNaN(cantidadItem4Sub) ? '' : cantidadItem4Sub}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem4Sub(isNaN(value) ? '' : value);
                                    }}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <input
                                    disabled
                                    label="Stock"
                                    className="inventario-box-option-input-01 outline-none pl-2 mb-2 w-24"
                                    placeholder={` ${cantidadFood4DisponibleSub}`}
                                    style={{ height: "40px", backgroundColor: "#f4f4f5" }}
                                />
                                <Select
                                key={resetKey}
                                    className="ml-2 mt-1"
                                    name="restaurante"
                                    label="Seleccionar comida"
                                    value={itemSeleccionado4Sub}
                                    onChange={(e) => {
                                        const selectedItem = e.target.value;
                                        setItemSeleccionado4Sub(selectedItem);

                                        if (selectedItem) {
                                            const itemSeleccionadaInfo = comidas.find(food => food.Descripcion === selectedItem);

                                            if (itemSeleccionadaInfo) {
                                                setPrecioItemSeleccionado4Sub(itemSeleccionadaInfo.ValorUnitario);
                                                setItemSeleccionadoId4Sub(itemSeleccionadaInfo.idPadre);
                                                setSubItemSeleccionadoId4Sub(itemSeleccionadaInfo._id);
                                                setCantidadFood4DisponibleSub(itemSeleccionadaInfo.cantidadPadre);
                                            }
                                        } else {
                                            setPrecioItemSeleccionado4Sub(0);
                                            setCantidadFood4DisponibleSub(0);
                                            setCantidadItem4Sub("");
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

                                <Button color="primary" onClick={handleGuardarItem}>
                                    Ahorrar
                                </Button>
                            </span>


                        </article>
                    </article>

                    {/*  **************************  */}
                    <article className='w-full p-5 mt-5 rounded-xl' style={{ boxShadow: "0px 2px 8px 2px #D6D6D6" }}>
                        <article className='' >
                            <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                <span className='text-red-500' style={{ fontSize: "18px" }}>3.</span> Recepcion
                            </p>
                            <span className='flex w-12/12 mt-2 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    key={resetKey}
                                    placeholder='seleccione un item'
                                    value={itemSeleccionadoRec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionadoRec(itemSelected);

                                        if (itemSelected) {
                                            const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                            console.log(itemSeleccionadoInfo)
                                            if (itemSeleccionadoInfo) {
                                                setPrecioItemSeleccionadoRec(itemSeleccionadoInfo.ValorUnitario);
                                                setItemSeleccionadoIdRec(itemSeleccionadoInfo._id);
                                                setCantidadItemDisponibleRec(itemSeleccionadoInfo.CantidadInicial);
                                            }
                                        } else {
                                            setCantidadItemRec("");
                                            setCantidadItemDisponibleRec(0);
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponibleRec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItemRec) ? '' : cantidadItemRec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItemRec(isNaN(value) ? "" : value);
                                    }}
                                    placeholder='Ingrese la cantidad'
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    key={resetKey}
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado1Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado1Rec(itemSelected);

                                        if (itemSelected) {
                                            const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                            console.log(itemSeleccionadoInfo)
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible1Rec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem1Rec) ? '' : cantidadItem1Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem1Rec(isNaN(value) ? "" : value);
                                    }}
                                    placeholder='Ingrese la cantidad'
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    key={resetKey}
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado2Rec}
                                    className='w-6/12 h-10 mr-2'
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado2Rec(itemSelected);

                                        if (itemSelected) {
                                            const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                            console.log(itemSeleccionadoInfo)
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible2Rec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem2Rec) ? '' : cantidadItem2Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem2Rec(isNaN(value) ? "" : value);
                                    }}
                                    placeholder='Ingrese la cantidad'
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    key={resetKey}
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado3Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado3Rec(itemSelected);

                                        if (itemSelected) {
                                            const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                            console.log(itemSeleccionadoInfo)
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible3Rec}`}
                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem3Rec) ? '' : cantidadItem3Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem3Rec(isNaN(value) ? "" : value);
                                    }}
                                    placeholder='Ingrese la cantidad'
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    key={resetKey}
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado4Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado4Rec(itemSelected);

                                        if (itemSelected) {
                                            const itemSeleccionadoInfo = recepcion.find(recepcion => recepcion.Descripcion === itemSelected);
                                            console.log(itemSeleccionadoInfo)
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-2 border-gray-300 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible4Rec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem4Rec) ? '' : cantidadItem4Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem4Rec(isNaN(value) ? "" : value);
                                    }}
                                    placeholder='Ingrese la cantidad'
                                />
                            </span>
                            <span className='flex justify-end pr-2 mt-5'>

                                <Button className='w-32' color='success' onClick={handleGuardarItemRecepcion}>
                                    Guardar
                                </Button>
                            </span>
                        </article>
                    </article>

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
                                        onChange={(e) => setValorDescorche(e.target.value)}
                                        type="number"
                                        placeholder='Valor del descorche'
                                        className='mb-5 w-6/12 h-14 mr-2 pl-2 outline-none border-b-2 border-gray-300' />
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
                                        onChange={(e) => setValorDescorche1(e.target.value)}
                                        type="number"
                                        placeholder='Valor del descorche' className='mb-2 w-6/12 h-14 mr-2 pl-2 outline-none border-b-2 border-gray-300' />
                                    <textarea
                                        value={descripcionDescorche1}
                                        onChange={(e) => setDescripcionDescorche1(e.target.value)}
                                        name="" id="" cols="30" rows="10" className='w-6/12 h-14 outline-none p-2 ml 2 border-b-2 border-gray-300' placeholder='Ingrese la descripción'></textarea>
                                </span>
                                <span className='flex justify-end'>
                                    <Button color='danger' className='mt-5' onClick={handleGuardarDescorche}>
                                        Crear descorche
                                    </Button>
                                </span>
                            </div>
                        </article>
                    </article>
                </section>

                <section className='w-full min-h-screen pt-20 pr-5 pl-5'>
                    <Table className='mt-5' aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>ITEM</TableColumn>
                            <TableColumn className='text-center'>CANTIDAD</TableColumn>
                            <TableColumn className='text-center'>PRECIO</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {drinks.map((products) => (
                                <TableRow key={products.Descripcion}>
                                    <TableCell>{products.Descripcion}</TableCell>
                                    <TableCell className='text-center' >{products.CantidadInicial}</TableCell>
                                    <TableCell className='text-center' >{products.ValorUnitario}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>

                </section>



            </div>
        </div>
    );
}

export default Adicionales;
