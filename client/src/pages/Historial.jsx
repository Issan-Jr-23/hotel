import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AxiosInstance from '../api/axios.js';
import { Button } from '@nextui-org/react';
import "./global.css"

const Historial = () => {

    const [historial, setHistorial] = useState(null);
    const [error, setError] = useState(null);
    const [historialExpandido, setHistorialExpandido] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get(`/obtener-historial/${id}`);
                setHistorial(response.data);
            } catch (err) {
                setError(err);
                console.error('Error al cargar el historial:', err);
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return <div>Error al cargar el historial: {error.message}</div>;
    }

    if (!historial) {
        return <div>Cargando historial...</div>;
    }



    const toggleExpandido = (id) => {
        if (historialExpandido === id) {
            setHistorialExpandido(null); // Contrae el historial si ya está expandido
        } else {
            setHistorialExpandido(id); // Expande el historial seleccionado
        }
    };



    const obtenerHistorialUsuario = (idUsuario) => {
        const usuario = users.find(user => user.identificacion === idUsuario);
        return usuario ? usuario.historial : [];
    };

    let total = 0;


    return (
        <div className='pt-20 pb-20' >
            <h1 className='hdlu'>Historial del Usuario</h1>
            <section className='mt-10'>
                {historial && historial.length > 0 ? (
                    historial.map((item, index) => (
                        <div key={index} className=''>
                            <div className='border-1 mr-5 ml-5 mb-10 rounded-xl p-5 uppercase bg-white '>
                                <h3 className='text-3xl mb-5'>Historial {index + 1}</h3>
                                <p className='ml-1' style={{ fontWeight: "600" }}> <span className='text-blue-500'>ID Historial:</span> {item.idHistorial}</p>
                                <p className='uppercase  ml-1' style={{ fontWeight: "600" }}> <span className='text-blue-500'>Nombre:</span> {item.nombre}</p>
                                <div className={`informacion-adicional ml-1  ${historialExpandido === index ? 'expandido' : 'contraido'}`} style={{ fontWeight: "600" }} >
                                    <table className=' mb-2 mt-2 border-b-1 border-t-1' >
                                        <tr >
                                            <th className='pb-2'>Reserva</th>
                                            <th className='pl-2 pr-2 pb-2'>Niños</th>
                                            <th className='pl-2 pr-2 pb-2'>Adultos</th>
                                            <th className='pl-2 pr-2 pb-2'>Servicio</th>
                                            <th className='pl-2 pr-2 pb-2'>Metodo de Pago</th>
                                            <th className='pl-2 pr-2 pb-2'>Pago Anticipado</th>
                                            <th className='pl-2 pr-2 pb-2'>Metodo de pago pendiente</th>
                                            <th className='pl-2 pr-2 pb-2'>Pago pendiente</th>
                                            <th className='pl-2 pr-2 pb-2'></th>
                                            <th className='pl-2 pr-2 pb-2' >finalización</th>
                                        </tr>
                                        <tr>
                                            <td className=''>{item.reserva}</td>
                                            <td className='text-center'>{item.ninios}</td>
                                            <td className='text-center'>{item.adultos}</td>
                                            <td className='text-center'>{item.servicio}</td>
                                            <td className='text-center'>{item.metodoPago}</td>
                                            <td className='text-center'>{item.pago}</td>
                                            <td className='text-center'>{item.metodoPagoPendiente || "No aplica"}</td>
                                            <td className='text-center'>{item.pagoPendiente || 0}</td>
                                            <td className='text-center'>{item.finalizacion}</td>
                                        </tr>
                                    </table>
                                    {item.bebidas && item.bebidas.length > 0 ? (
                                        <div style={{ fontWeight: "600" }} >

                                            <p style={{ fontWeight: "600" }}><span >Bebidas:</span></p>


                                            <table className=''>
                                                <tr>
                                                    <th className='w-12 p-2 '></th>
                                                    <th className='w-52 p-2  text-left'></th>
                                                    <th className='w-32 p-2 '></th>
                                                    <th className='w-32 p-2 '></th>
                                                    <th className='w-24 p-2 '></th>
                                                </tr>
                                                {item.bebidas.map((bebidas, idx) => (


                                                    <tr>
                                                        <td className=' '>{idx + 1}</td>
                                                        <td className=' '>{bebidas.nombre}</td>
                                                        <td className=' text-center'>{bebidas.cantidad}</td>
                                                        <td className=' text-center'>{bebidas.precio}</td>
                                                        <td className='text-right'>{bebidas.cantidad * bebidas.precio}</td>
                                                    </tr>
                                                ))}
                                               
                                            </table>
                                            <p className='flex justify-end w-96 text-red-500' style={{width:"608px"}}>{
                                                item.bebidas.reduce((total, bebida) => total + (bebida.cantidad * bebida.precio), 0)
                                            }</p>
                                        </div>
                                    ) : (
                                        <p>No hay compras en bebidas registradas.</p>
                                    )}

                                    {item.restaurante && item.restaurante.length > 0 ? (
                                        <div className='mb-5'>
                                            <p style={{ fontWeight: "600" }} >Restaurante:</p>

                                            <table className=''>
                                                <tr>
                                                    <th className='w-12 p-2 '></th>
                                                    <th className='w-52 p-2  text-left'></th>
                                                    <th className='w-32 p-2 '></th>
                                                    <th className='w-32 p-2 '></th>
                                                    <th className='w-24 p-2 '></th>
                                                </tr>
                                                {item.restaurante.map((restaurante, idx) => (
                                                    <tr>
                                                        <td className=' '>{idx + 1}</td>
                                                        <td className=' '>{restaurante.nombre}</td>
                                                        <td className=' text-center'>{restaurante.cantidad}</td>
                                                        <td className=' text-center'>{restaurante.precio}</td>
                                                        <td className='text-right'>{restaurante.cantidad * restaurante.precio}</td>
                                                    </tr>
                                                ))}
                                               
                                            </table>

                                            <p className='flex justify-end w-96 text-red-500' style={{width:"608px"}}> {
                                                item.restaurante.reduce((total, restaurante) => total + (restaurante.cantidad * restaurante.precio), 0)
                                            }</p>
                                        </div>
                                    ) : (
                                        <p>No hay compras en restaurantes registradas.</p>
                                    )}

                                </div>
                                <Button className='bg-black text-white' onClick={() => toggleExpandido(index)}>
                                    {historialExpandido === index ? 'Ver Menos' : 'Ver Más'}
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay historial disponible para este usuario.</p>
                )}
            </section>
        </div>
    )
}

export default Historial