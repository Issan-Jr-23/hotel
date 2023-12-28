import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstances from "../../api/axios.js";
import { Input, Select, SelectItem } from '@nextui-org/react';

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


    return (
        <div className='flex pb-20'>
            <section className='w-full min-h-screen  pt-14 pl-5 pr-5'>
                <h1 className='uppercase flex justify-center items-center mt-5' style={{ fontSize: "36px" }}>Formulario de compra</h1>
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
                        />
                    </span>
                </article>
                <article className='mt-10'>
                <p style={{ fontSize: "18px", fontWeight: "100" }} className='text-blue-300'>
                        <span className='text-red-500' style={{ fontSize: "18px" }}>3.</span> Recepcion
                    </p>
                </article>
            </section>

            <section className='w-full min-h-screen  '>
                {/* ...resto del componente, si hay más contenido aquí... */}
            </section>
        </div>
    );
}

export default Adicionales;
