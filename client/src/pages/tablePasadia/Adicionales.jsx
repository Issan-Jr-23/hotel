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
        setResetKey(prevKey => prevKey + 1);
    };


    const limpiarCampos = () => {

        setCantidadItem("0");
        setPrecioItemSeleccionado("");
        setItemSeleccionadoId("");
        setCantidadItemDisponible("0");

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


    return (
        <div className='flex pb-20 flex-col'>
            <Toaster position="top-right" />
            <h1 className='uppercase flex justify-center items-center mt-20' style={{ fontSize: "36px" }}>Formulario de compra</h1>
            <div className='flex'>
                <section className='w-full min-h-screen  pl-5 pr-5'>

                    <article className='mt-10'>
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>1.</span> Comprador
                        </p>
                        <span className='flex w-12/12 mt-2 '>
                            <span className='flex flex-col w-6/12'>
                                <label htmlFor="" className='ml-1'>Nombre</label>
                                <input
                                    disabled
                                    type="text"
                                    name="nombre"
                                    className='w-12/12 mr-2 outline-red-300 h-10 pl-2 pr-2 border-b-3 border-blue-500 bg-white'
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
                                    className='w-12/12 mr-2 outline-red-300 h-10 border-b-3 border-blue-500 pl-2 pr-2 bg-white'
                                    value={user.identificacion || ''}
                                    onChange={handleInputChange}
                                />

                            </span>
                        </span>
                    </article>

                    <article className='mt-6'>
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>2.</span> Producto
                        </p>
                        <span className='flex w-12/12 mt-2 items-center'>
                            <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-blue-400 text-white'></span>
                            <Select
                                key={resetKey}
                                placeholder='seleccione un item'
                                value={itemSeleccionado}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado(itemSelected);

                                    const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                    console.log(itemSeleccionadoInfo)
                                    if (itemSeleccionadoInfo) {
                                        setPrecioItemSeleccionado(itemSeleccionadoInfo.ValorUnitario);
                                        setItemSeleccionadoId(itemSeleccionadoInfo._id);
                                        setCantidadItemDisponible(itemSeleccionadoInfo.CantidadInicial);
                                    }
                                    console.log("info: ", itemSeleccionadoInfo)
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
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-blue-500 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible}`}

                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem) ? '' : cantidadItem}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem(isNaN(value) ? "" : value);
                                }}
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <span className='flex mr-3 w-4 h-4 rounded-full justify-center items-center bg-blue-400 text-white'></span>

                            <Select
                                placeholder='seleccione un item'
                                value={itemSeleccionado1}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado1(itemSelected);

                                    const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                    console.log(itemSeleccionadoInfo)
                                    if (itemSeleccionadoInfo) {
                                        setPrecioItemSeleccionado1(itemSeleccionadoInfo.ValorUnitario);
                                        setItemSeleccionadoId1(itemSeleccionadoInfo._id);
                                        setCantidadItemDisponible1(itemSeleccionadoInfo.CantidadInicial);
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
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-blue-500 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible1}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem1) ? '' : cantidadItem1}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem1(isNaN(value) ? "" : value);
                                }}
                            />
                        </span>
                        <span className='flex w-12/12 mt-10 items-center'>
                            <span className='flex mr-3 w-4 h-4 rounded-full justify-center items-center bg-blue-400 text-white'></span>

                            <Select
                                placeholder='seleccione un item'
                                value={itemSeleccionado2}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado2(itemSelected);

                                    const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                    console.log(itemSeleccionadoInfo)
                                    if (itemSeleccionadoInfo) {
                                        setPrecioItemSeleccionado2(itemSeleccionadoInfo.ValorUnitario);
                                        setItemSeleccionadoId2(itemSeleccionadoInfo._id);
                                        setCantidadItemDisponible2(itemSeleccionadoInfo.CantidadInicial);
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
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-blue-500 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible2}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem2) ? '' : cantidadItem2}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem2(isNaN(value) ? "" : value);
                                }}
                            />
                        </span>

                        <span className='flex w-12/12 mt-10 items-center'>
                            <span className='flex mr-3 w-4 h-4 rounded-full justify-center items-center bg-blue-400 text-white'></span>

                            <Select
                                placeholder='seleccione un item'
                                value={itemSeleccionado3}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado3(itemSelected);

                                    const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                    console.log(itemSeleccionadoInfo)
                                    if (itemSeleccionadoInfo) {
                                        setPrecioItemSeleccionado3(itemSeleccionadoInfo.ValorUnitario);
                                        setItemSeleccionadoId3(itemSeleccionadoInfo._id);
                                        setCantidadItemDisponible3(itemSeleccionadoInfo.CantidadInicial);
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
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-blue-500 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible3}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem3) ? '' : cantidadItem3}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem3(isNaN(value) ? "" : value);
                                }}
                            />
                        </span>
                        <span className='flex w-12/12 mt-10 items-center'>
                            <span className='flex mr-3 w-4 h-4 rounded-full justify-center items-center bg-blue-400 text-white'></span>

                            <Select
                                placeholder='seleccione un item'
                                value={itemSeleccionado4}
                                className='w-6/12 h-10 mr-2 '
                                style={{ height: "40px" }}
                                onChange={(e) => {
                                    const itemSelected = e.target.value;
                                    setItemSeleccionado4(itemSelected);

                                    const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
                                    console.log(itemSeleccionadoInfo)
                                    if (itemSeleccionadoInfo) {
                                        setPrecioItemSeleccionado4(itemSeleccionadoInfo.ValorUnitario);
                                        setItemSeleccionadoId4(itemSeleccionadoInfo._id);
                                        setCantidadItemDisponible4(itemSeleccionadoInfo.CantidadInicial);
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
                                    className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-blue-500 pl-2 pr-2 bg-white text-center'
                                    placeholder={`${cantidadItemDisponible4}`}
                                />
                            </span>
                            <input
                                type="Number"
                                className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                value={isNaN(cantidadItem4) ? '' : cantidadItem4}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCantidadItem4(isNaN(value) ? "" : value);
                                }}
                            />
                        </span>
                        <span className='flex justify-end pr-2 mt-5'>

                            <Button className='w-32' color='primary' onClick={handleGuardarBebida}>
                                Guardar
                            </Button>
                        </span>
                    </article>

                    <article className='w-full'>
                        <article className=''>
                            <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                                <span className='text-red-500' style={{ fontSize: "18px" }}>3.</span> Recepcion
                            </p>
                            <span className='flex w-12/12 mt-2 items-center'>
                                <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-green-500 text-white'></span>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionadoRec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionadoRec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-green-500 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponibleRec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItemRec) ? '' : cantidadItemRec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItemRec(isNaN(value) ? "" : value);
                                    }}
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-green-500 text-white'></span>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado1Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado1Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-green-500 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem1Rec) ? '' : cantidadItem1Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem1Rec(isNaN(value) ? "" : value);
                                    }}
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-green-500 text-white'></span>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado2Rec}
                                    className='w-6/12 h-10 mr-2'
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado2Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-green-500 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible2Rec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem2Rec) ? '' : cantidadItem2Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem2Rec(isNaN(value) ? "" : value);
                                    }}
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-green-500 text-white'></span>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado3Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado3Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-green-500 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible3Rec}`}
                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
                                    value={isNaN(cantidadItem3Rec) ? '' : cantidadItem3Rec}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        setCantidadItem3Rec(isNaN(value) ? "" : value);
                                    }}
                                />
                            </span>
                            <span className='flex w-12/12 mt-8 items-center'>
                                <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-green-500 text-white'></span>
                                <Select
                                    placeholder='seleccione un item'
                                    value={itemSeleccionado4Rec}
                                    className='w-6/12 h-10 mr-2 '
                                    style={{ height: "40px" }}
                                    onChange={(e) => {
                                        const itemSelected = e.target.value;
                                        setItemSeleccionado4Rec(itemSelected);

                                        const itemSeleccionadoInfo = drinks.find(bebida => bebida.Descripcion === itemSelected);
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
                                        className='w-12/12 mr-2 outline-red-300 h-10 w-32 border-b-3 border-green-500 pl-2 pr-2 bg-white text-center'
                                        placeholder={`${cantidadItemDisponible4Rec}`}

                                    />
                                </span>
                                <input
                                    type="Number"
                                    className='w-6/12 mr-2 border-b-3 border-red-500 outline-none  h-10  pl-2 pr-2'
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

                    <article>
                        <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                            <span className='text-red-500' style={{ fontSize: "18px" }}>4.</span> cargo por descorche
                        </p>
                        <article>
                            <span className='flex mr-5 w-4 h-4 rounded-full justify-center items-center bg-red-500 text-white '></span>
                            <div>
                            <span className='flex w-12/12 rounded mt-2'>
                                <input type="number" placeholder='Valor del descorche' className='mb-5 w-6/12 h-14 mr-2 rounded-xl pl-2 outline-green-500' />
                                <textarea name="" id="" cols="30" rows="10" className='w-6/12 h-14 outline-blue-500 p-2 ml 2 rounded-xl' placeholder='Ingrece la descripción'></textarea>
                            </span>
                            </div>

                            <div>
                            <span className='flex w-12/12 rounded '>
                                <input type="number" placeholder='Valor del descorche' className='mb-2 w-6/12 h-14 mr-2 rounded-xl pl-2 outline-green-500' />
                                <textarea name="" id="" cols="30" rows="10" className='w-6/12 h-14 outline-blue-500 p-2 ml 2 rounded-xl' placeholder='Ingrece la descripción'></textarea>
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
