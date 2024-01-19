import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AxiosInstance from '../api/axios.js';
import { Button } from '@nextui-org/react';
import "./global.css"

const Historial = () => {

    const [historial, setHistorial] = useState(null);
    const [error, setError] = useState(null);
    const [mostrarMas, setMostrarMas] = useState(false);
    const [historialExpandido, setHistorialExpandido] = useState(null);

    const { id } = useParams();
    console.log("id en historial component ", id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get(`/obtener-historial/${id}`);
                setHistorial(response.data);
                console.log(response.data)
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
                            <div className='border-1 mr-5 ml-5 mb-10 rounded-xl p-5 uppercase bg-white'>
                                <h3 className='text-3xl mb-5'>Historial {index + 1}</h3>
                                <p className='ml-1' style={{fontWeight:"600"}}> <span className='text-green-500'>ID Historial:</span> {item.idHistorial}</p>
                                <p className='uppercase mb-2 ml-1' style={{fontWeight:"600"}}> <span className='text-green-500'>Nombre:</span> {item.nombre}</p>
                                <div className={`informacion-adicional ml-1  ${historialExpandido === index ? 'expandido' : 'contraido'}`} style={{fontWeight:"600"}} >
                                    <p>Reserva: {item.reserva}</p>
                                    <p>Niños: {item.ninios}</p>
                                    <p>Adultos: {item.adultos}</p>
                                    <p>Servicio: {item.servicio}</p>
                                    <p>Metodo de pago: {item.metodoPago}</p>
                                    <p>pago: {item.pago}</p>
                                    <p>metodo de pago pendiente: {item.metodoPagoPendiente}</p>
                                    <p>pagoPendiente: {item.metodoPagoPendiente}</p>
                                    {item.bebidas && item.bebidas.length > 0 ? (
                                        <div style={{fontWeight:"600"}} >

                                            <p style={{fontWeight:"600"}}>Bebidas:</p>
                                            
                                               
                                                    <table className=' mt-5 mb-5'>
                                                        <tr>
                                                            <th className='w-32 p-2 '></th>
                                                            <th className='w-52 p-2  text-left'></th>
                                                            <th className='w-32 p-2 '></th>
                                                            <th className='w-32 p-2 '></th>
                                                            <th className='w-32 p-2 '></th>
                                                        </tr>
                                                        {item.bebidas.map((bebidas, idx) => (

                                                            
                                                        <tr>
                                                            <td className=' p-2 '>{idx + 1}</td>
                                                            <td className=' p-2 '>{bebidas.nombre}</td>
                                                            <td className=' p-2 text-center'>{bebidas.cantidad}</td>
                                                            <td className=' p-2 text-center'>{bebidas.precio}</td>
                                                            <td className='text-center'>{bebidas.cantidad * bebidas.precio}</td>
                                                        </tr>
                                                        ))}
                                                    </table>

                                                    {item.bebidas.map((x) =>{
                                                        const totalres = x.cantidad * x.precio;
                                                        <p>Total: {totalres}</p>
                                                    })}
                                             
                                                
                                            
                                        </div>
                                    ) : (
                                        <p>No hay compras en bebidas registradas.</p>
                                    )}
                                    {item.restaurante && item.restaurante.length > 0 ? (
                                        <div className='mb-5'>
                                            <p style={{fontWeight:"600"}} >Restaurante:</p>
                                            {item.restaurante.map((restaurante, idx) => (
                                                <div key={idx}>
                                                    <p> {idx + 1} - {restaurante.nombre} ... cantidad: {restaurante.cantidad} ... precio: {restaurante.precio}</p>
                                                </div>
                                            ))}
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