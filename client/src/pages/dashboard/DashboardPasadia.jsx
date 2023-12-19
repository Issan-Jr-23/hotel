import React,{useEffect, useState} from 'react'
import ApexSpline from "../apexCharts/apexSpline.jsx"
import ApexLine from "../apexCharts/apexLine.jsx"
import  AxiosInstance  from '../../api/axios.js'
import users from "../../images/iconly-glass-tick.svg"

const dashboardPasadia = () => {

    const [totalUsers, setTotalUsers] = useState([])
    const [totalVentaPasadia, setTotalVentaPasadia] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AxiosInstance.get('/obtener-cantidad-usuarios');
            console.log(response);
    
            const { totalNinios, totalAdultos } = response.data;
            console.log("Total niños: ", totalNinios);
            console.log("Total adultos: ", totalAdultos);
            setTotalUsers(totalNinios + totalAdultos)
    
          } catch (error) {
            console.error('Error al obtener los datos: ', error);
          }
        };
    
        fetchData();
      }, []);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AxiosInstance.get('/total-generado-pasadia');
            console.log(response);
    
            const { totalPago, totalPagoPendiente } = response.data;
            console.log("Total generados: ", totalPago);
            console.log("Total generado: ", totalPagoPendiente);
            setTotalVentaPasadia(totalPago + totalPagoPendiente);
    
          } catch (error) {
            console.error('Error al obtener los datos: ', error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <div className='pt-20 ml-5 mr-5'>
        <h1 className='text-4xl mb-5'>Descripción general</h1>
        <div className='w-4/12 border-2 flex h-36 rounded-2xl'>
        <span className='w-1/2 justify-around flex flex-col p-4'>
              <p style={{ fontWeight: "600" }}>
                ${typeof totalVentaPasadia === 'number' ? totalVentaPasadia.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" />  {totalUsers}</p>

            </span>
            
        </div>
        <div className=' flex justify-center'>

        <div className='' style={{width:"100vw"}}>

        <ApexSpline/>
        </div>
        </div>
    </div>
  )
}

export default dashboardPasadia