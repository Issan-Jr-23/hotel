import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstances from "../../api/axios.js";
import { Button, Input, Select, SelectItem, Table, TableBody, TableColumn, TableCell, TableHeader, TableRow } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

const Adicionales = () => {
    const [user, setUser] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);

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


    const limpiarCampos = () => {

        setCantidadItem("0");
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
    }

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstances.get(`/pasadia-cliente-info/${id}`);
                console.log("Respuesta del servidor: ", response);
                setUser(response.data); // Establecer el usuario obtenido
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
                setDrinks(response.data);
                // setCantidadDeBebidas(response.data)
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

    const guardarBebida = async (bebida) => {
        try {
            const response = await AxiosInstances.post(`/pasadia-agregar-bebida/${id}`, {
                bebida,
            });
            toast.success('Bebida guardada exitosamente!');
            limpiarCampos();
            resetSelect();


        } catch (error) {
            console.error('Error al guardar la bebida en el cliente:', error.message);
            throw error;
        }
    };


    const actualizarInventarioItem = async (itemRecId, cantidad) => {
        try {
            const response = await AxiosInstances.post('/actualizar-inventario-item-recepcion', {
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
            const response = await AxiosInstances.post(`/actualizar-stock-inicial-item-recepcion/${itemRecId}`, { cantidad });
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
            const response = await AxiosInstances.get(`/verificar-disponibilidad/${itemRecIdId}`);
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
                    itemId: itemSeleccionadoIdRec,
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
                    id: itemSeleccionadoId1Rec,
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

    const guardarRecepcion = async (item) => {
        try {
            const response = await AxiosInstances.post(`/pasadia-recepcion-agregar-item/${id}`, {
                item,
            });
            toast.success('Item de recepcion guardado exitosamente!');
            limpiarCampos();
            resetSelect();


        } catch (error) {
            console.error('Error al guardar el item en el cliente:', error.message);
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
                                value={itemSeleccionadoRec}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionadoRec(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionadoRec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoIdRec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponibleRec(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItemRec("")
                                        setCantidadItemDisponibleRec(0)
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
                                    placeholder={`${cantidadItemDisponibleRec}`}

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
                                value={itemSeleccionado1Rec}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado1Rec(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
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
                                    placeholder={`${cantidadItemDisponible1Rec}`}
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
                                value={itemSeleccionado2Rec}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado2(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado2Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId2Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible2Rec(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem2Rec("")
                                        setCantidadItemDisponible2Rec(0)
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
                                    placeholder={`${cantidadItemDisponible2Rec}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem2Rec) ? '' : cantidadItem2Rec}
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
                                value={itemSeleccionado3Rec}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado3Rec(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado3Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId3Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible3Rec(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem3Rec("")
                                        setCantidadItemDisponible3Rec(0)
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
                                    placeholder={`${cantidadItemDisponible3Rec}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem3Rec) ? '' : cantidadItem3Rec}
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
                                value={itemSeleccionado4Rec}
                                className='w-5/12 h-10 mr-2'
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado4Rec(itemSelected);

                                    if (itemSelected) {
                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado4Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId4Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible4Rec(itemSeleccionadoInfo.CantidadInicial);
                                        }
                                    } else {
                                        setCantidadItem4Rec("")
                                        setCantidadItemDisponible4Rec(0)
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
                                    placeholder={`${cantidadItemDisponible4Rec}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-5/12 mr-2 border-b-2 border-gray-300 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem4Rec) ? '' : cantidadItem4Rec}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem4Rec(isNaN(value) ? "" : value);
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
                                    placeholder='seleccione un item'
                                    value={itemSeleccionadoRec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionadoRec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionadoRec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoIdRec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponibleRec(itemSeleccionadoInfo.CantidadInicial);
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
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado1Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado1Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado1Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId1Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible1Rec(itemSeleccionadoInfo.CantidadInicial);
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
                                    value={isNaN(cantidadItem1Rec) ? '' : cantidadItem1Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem1Rec(isNaN(value) ? "" : value);
                                    }}
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado2Rec}
                                    className='w-6/12 h-10 mr-2'
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado2Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado2Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId2Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible2Rec(itemSeleccionadoInfo.CantidadInicial);
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
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado3Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado3Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado3Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId3Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible3Rec(itemSeleccionadoInfo.CantidadInicial);
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
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <p className='flex rounded-full   justify-center  text-white mr-2' style={{ width: "20px", height: "20px" }}>
                                    <span className='rounded-full  bg-green-400' style={{ width: "15px", height: "15px" }}></span>
                                </p>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado4Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado4Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(recepcion => recepcion.Descripcion === itemSelected);
                                        console.log(itemSeleccionadoInfo)
                                        if (itemSeleccionadoInfo) {
                                            setPrecioItemSeleccionado4Rec(itemSeleccionadoInfo.ValorUnitario);
                                            setItemSeleccionadoId4Rec(itemSeleccionadoInfo._id);
                                            setCantidadItemDisponible4Rec(itemSeleccionadoInfo.CantidadInicial);
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
                                />
                            </span>
                            <span className='flex justify-end pr-2 mt-5'>

                                <Button className='w-32' color='success'>
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
                                    <input type="number" placeholder='Valor del descorche' className='mb-5 w-6/12 h-14 mr-2 pl-2 outline-none border-b-2 border-gray-300' />
                                    <textarea name="" id="" cols="30" rows="10" className='w-6/12 h-14 outline-none p-2 ml 2 border-b-2 border-gray-300' placeholder='Ingrese la descripción'></textarea>
                                </span>
                            </div>

                            <div>
                                <span className='flex w-12/12 rounded '>
                                    <p className='flex rounded-full    justify-center  text-white mr-2  pt-4' >
                                        <span className='rounded-full  bg-red-500' style={{ width: "15px", height: "15px" }}></span>
                                    </p>
                                    <input type="number" placeholder='Valor del descorche' className='mb-2 w-6/12 h-14 mr-2 pl-2 outline-none border-b-2 border-gray-300' />
                                    <textarea name="" id="" cols="30" rows="10" className='w-6/12 h-14 outline-none p-2 ml 2 border-b-2 border-gray-300' placeholder='Ingrese la descripción'></textarea>
                                </span>
                                <span className='flex justify-end'>
                                    <Button color='danger' className='mt-5'>
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
