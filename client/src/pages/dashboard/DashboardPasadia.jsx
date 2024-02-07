import React, { useEffect, useState } from 'react'
import ApexSpline from "../apexCharts/apexSpline.jsx"
import ApexLine from "../apexCharts/apexLine.jsx"
import ApexLine2 from "../apexCharts/apexLine2.jsx"
import ApexLine3 from "../apexCharts/apexLine3.jsx"
import ApexPie from "../apexCharts/apexChartSpline.jsx"
import TableUsers from "./tableUsersPasadia.jsx"
import Box from "./box.jsx"
import TableProductos from "./tableUsers.jsx"
import AxiosInstance from '../../api/axios.js'
import Lottie from "react-lottie"
import users from "../../images/iconly-glass-tick.svg"
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import "./styleDashboard.css"
import cubo from "../../images/forma-abstracta2.png"
import fa from "../../images/forma-abstracta.png"
import fa1 from "../../images/forma-abstracta1.png"
import animationDb from "../../images/Animation - 1705932434807.json"
import Mc from "../adicionales/MostrarClientes.jsx"

const dashboardPasadia = () => {






  const defaultOption = {
    loop: true,
    autoPlay: true,
    animationData: animationDb,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }


  return (
    <div className=' fondo pt-20 pl-5 pr-5 pb-20'>
      <div className='cont-icon-json'>
      <article className='cont-title-json'>
      <h1 className='text-4xl mb-5 uppercase border-b-3'>Dashboard Pasadia </h1>

      </article>
      <article className='animation-lottie-json'>
      <Lottie options={defaultOption} width="100%" height="100%"
                           />
      </article>

      </div>
      <div className='flex justify-between flex-wrap'>
        <div className='box-style  flex rounded-2xl '>
          <span className='box-grafic justify-between flex flex-col p-4' >
            <h3 className='fondo-text' style={{ fontWeight: "600", fontSize: "20px" }} >Sales operations</h3>
            <p className='fondo-text flex' style={{ fontWeight: "600" }}>
              ${typeof totalVentaPasadia === 'number' ? totalVentaPasadia.toLocaleString('es-CO') : '0'}
              {<span className='fondo-text alza flex flex-row items-center ml-2 text-green-600'>
                {/* <span className='alza'>
              <img className='down' src={down} alt="" /> </span>   */}</span>}
            </p>
            <p className=' fondo-text text-3xl flex' style={{ fontWeight: "600" }}>  {totalUsers}</p>

          </span>

              <img className='img-cubo-dasboard' src={cubo} alt="" />
        </div>
        <div className='box-style  flex rounded-2xl '>
          <span className='box-grafic justify-between flex flex-col p-4'>
            <h3 className='fondo-text' style={{ fontWeight: "600", fontSize: "20px" }} >Units Sold</h3>
            <p className='fondo-text flex' style={{ fontWeight: "600" }}>
              ${typeof totalVentaProducts === 'number' ? totalVentaProducts.toLocaleString('es-CO') : '0'}
              {<span className='fondo-text alza flex items-center ml-2 text-red-600'>
                {/* <span className='alza'> 
              <img className='down' src={down} alt="" /> </span>   */}
              </span>}
            </p>
            <p className=' fondo-text text-3xl flex' style={{ fontWeight: "600" }}>   {cantidadComprada}</p>

          </span>
          <img className='img-cubo-dasboard' src={fa} alt="" />
        </div>
        <div className='box-style  flex rounded-2xl '>
          <span className='box-grafic justify-between flex flex-col p-4'>
            <h3 className='fondo-text' style={{ fontWeight: "600", fontSize: "20px" }} >courtesies for clients</h3>
            <p className='fondo-text' style={{ fontWeight: "600" }}>
              ${0}
            </p>
            <p className=' fondo-text text-3xl flex' style={{ fontWeight: "600" }}>
              {cantidadCortesias}</p>

          </span>
          <img className='img-cubo-dasboard' src={fa1} alt="" />
        </div>

      </div>
      <div className=' flex mt-10 cont-table-apexg '>
        <div className='box-table'>
          <Mc />
        </div>

        {/* <div className='box-apex'>
 
</div> */}
      </div>
      <ApexSpline />
      <div className='box-table-ventas flex'>
        {/* <div className='box-pie-table' >
          <ApexPie />
        </div> */}
        <div className='cont-table-user'>

          <TableProductos />
        </div>
      </div>
      <div className='flex container-apexPie-box '>
        <div className='container-apex-pie'>
          <ApexPie />
        </div>
        <div className='container-apex-box'>

          <Box />
        </div>
      </div>
    </div>
  )
}

export default dashboardPasadia