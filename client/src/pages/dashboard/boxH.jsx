import React, {useEffect, useState} from 'react'
import "./styleDashboard.css"
import Forbidden from "../../images/forbidden.png"
import Eye from "../../images/eye.png"
import Crown from "../../images/crown.png"
import AxiosInstance from "../../api/axios.js"

const box = () => {

  const [datos, setDatos] = useState({
    pendientes: 0,
    activos: 0,
    finalizados: 0,
    cancelados: 0,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/afph');
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className='container-card-box'>
      <section className='box-box mb-5' >
        {/* <span className='box-span-img'>
            <img className='img-box' src={Crown} alt="" />
          </span> */}
        <span className='box-box-content'>
          <h3 className='mb-2 text-white uppercase'>Finalizado</h3>
          <p className=' text-white'>{datos.finalizados}</p>
        </span>
        <span className='box-span-img2'>
          <img className='img-box2' src={Crown} alt="" />
        </span>
      </section>
      <section className='box-box2 mb-5' >
        {/* <span className='box-span-img'>
            <img className='img-box' src={Crown} alt="" />
          </span> */}
        <span className='box-box-content'>
          <h3 className='mb-2 text-white uppercase'>Activos</h3>
          <p className=' text-white'>{datos.activos}</p>
        </span>
        <span className='box-span-img2'>
          <img className='img-box2' src={Eye} alt="" />
        </span>
      </section>
      <section className='box-box3 mb-2' >
        {/* <span className='box-span-img'>
            <img className='img-box' src={Crown} alt="" />
          </span> */}
        <span className='box-box-content'>
          <h3 className='mb-2 text-white uppercase'>Pendientes</h3>
          <p className=' text-white'>{datos.pendientes}</p>
        </span>
        <span className='box-span-img2'>
          <img className='img-box2' src={Forbidden} alt="" />
        </span>
      </section>
    </div>
  )
}

export default box