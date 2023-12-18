import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import  AxiosInstance  from '../api/axios.js';
import { Button } from '@nextui-org/react';

const Historial = () => {

    const [historial, setHistorial] = useState(null);
    const [error, setError] = useState(null);

    const { id } = useParams();
    console.log("id en historial component ",id)

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



      
      const obtenerHistorialUsuario = (idUsuario) => {
        const usuario = users.find(user => user.identificacion === idUsuario);
        return usuario ? usuario.historial : [];
      };


    return (
        <div className='pt-20' style={{height:"500px"}}>
        <h1 className=' h-20 flex justify-center items-center text-4xl uppercase '>Historial del Usuario</h1>
        <section className='mt-10'>
        {historial && historial.length > 0 ? (
            historial.map((item, index) => (
                <div key={index} className=''>

                    <div className='border-1 mr-5 ml-5 mb-10 rounded-xl p-5 uppercase'>
                        <h3 className='text-3xl mb-5'>Historial {index + 1} </h3>
                    <p className='uppercase mb-2'>Nombre: {item.nombre}</p>
                    <p className=''>Reserva: {item.reserva}</p>
                    <Button className='mt-5 bg-black text-white'>
                        Ver mas
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