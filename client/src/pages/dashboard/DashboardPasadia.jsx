import React, { useEffect, useState } from 'react'
import ApexSpline from "../apexCharts/apexSpline.jsx"
import ApexLine from "../apexCharts/apexLine.jsx"
import ApexLine2 from "../apexCharts/apexLine2.jsx"
import ApexLine3 from "../apexCharts/apexLine3.jsx"
import ApexPie from "../apexCharts/apexPie.jsx"
import TableUsers from "./tableUsersPasadia.jsx"
import AxiosInstance from '../../api/axios.js'
import users from "../../images/iconly-glass-tick.svg"
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import "./styleDashboard.css"

const dashboardPasadia = () => {

  const [totalUsers, setTotalUsers] = useState()
  const [totalVentaPasadia, setTotalVentaPasadia] = useState()

  const [cantidadVendida, setCantidadVendida] = useState()
  const [valorVenta, setValorVenta] = useState()

  const [cantidadVendidaPasadia, setCantidadVendidaPasadia] = useState()
  const [valorVentaPasadia, setValorVentaPasadia] = useState()

  const [cantidadVendidaCortesias, setCantidadVendidaCortesias] = useState()
  const [valorVentaCortesias, setValorVentaCortesias] = useState()

  const [sumaDeValores, setSumaDeValores] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-productos-vendidos');
        console.log(response);

        const { totalPago, cantidadVendidos } = response.data;
        setValorVentaPasadia(totalPago)
        setCantidadVendidaPasadia(cantidadVendidos)
        console.log("Total niños: ", totalPago);
        console.log("Total adultos: ", cantidadVendidos);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/productos-vendidos-pasadia');
        console.log(response);
        const { totalPago, cantidadVendidos } = response.data;
        setValorVenta(totalPago)
        setCantidadVendida(cantidadVendidos)
        console.log("Total niños: ", totalPago);
        console.log("Total adultos: ", cantidadVendidos);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const total = valorVenta + valorVentaPasadia;
    setSumaDeValores(total);
  }, [valorVenta, valorVentaPasadia])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/productos-cortesias-pasadia');
        console.log(response);

        const { totalPago, cantidadVendidos } = response.data;
        setValorVentaCortesias(totalPago)
        setCantidadVendidaCortesias(cantidadVendidos)
        console.log("Total niños: ", totalPago);
        console.log("Total adultos: ", cantidadVendidos);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);


  // const tv = valorVentaPasadia + valorVenta;
  // setSumaDeValores(tv)
  // console.log("suma de valores: ",sumaDeValores)
  
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
    <div className=' fondo pt-20 pl-5 pr-5 pb-20'>
      <h1 className='text-4xl mb-5'>Descripción general</h1>
      <div className='flex justify-evenly flex-wrap'>
        <div className='box-style  flex rounded-2xl '>
          <span className='box-grafic justify-around flex flex-col p-4'>
            <h3 style={{ fontWeight: "600", fontSize: "20px" }} >Ventas</h3>
            <p style={{ fontWeight: "600" }}>
              ${typeof totalVentaPasadia === 'number' ? totalVentaPasadia.toLocaleString('es-CO') : '0'} COP
            </p>
            <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" />  {totalUsers}</p>

          </span>
          <span className='box-grafica'>
            <ApexLine />
          </span>

        </div>
        <div className='box-style  flex rounded-2xl '>
          <span className='box-grafic justify-around flex flex-col p-4'>
            <h3 style={{ fontWeight: "600", fontSize: "20px" }} >Products</h3>
            <p style={{ fontWeight: "600" }}>
              ${typeof sumaDeValores  === 'number' ? sumaDeValores.toLocaleString('es-CO') : '0'} COP
            </p>
            <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" />  {cantidadVendida + cantidadVendidaPasadia}</p>

          </span>
          <span className='box-grafica'>
            <ApexLine2 />
          </span>

        </div>
        <div className='box-style  flex rounded-2xl '>
          <span className='box-grafic justify-around flex flex-col p-4'>
          <h3 style={{ fontWeight: "600", fontSize: "20px" }} >Cortesias</h3>
            <p style={{ fontWeight: "600" }}>
              ${typeof valorVentaCortesias === 'number' ? valorVentaCortesias.toLocaleString('es-CO') : '0'} COP
            </p>
            <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" />  {cantidadVendidaCortesias}</p>

          </span>
          <span className='box-grafica'>
            <ApexLine3 />
          </span>

        </div>

      </div>
      <div className=' flex mt-10'>
        <div className='box-table'>
          <TableUsers />
        </div>

        <div className='box-apex'>

          <ApexSpline />
        </div>
      </div>
      <div className='box-table-ventas flex'>
        <div className='box-pie-table' >
          <ApexPie />
        </div>
        <div className='cont-table-user'>

          <TableUsers />
        </div>
      </div>
    </div>
  )
}

export default dashboardPasadia