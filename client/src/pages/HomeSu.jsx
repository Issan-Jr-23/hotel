import React, { useEffect, useState } from 'react'
import NavMenu from '../components/NavMenu.jsx'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import mockup from "../images/proyecto.png"
import hm from "../images/cover_1.jpeg"
import users from "../images/usuario.png"
import cabana from "../images/beach-cabana-st.png"
import PieYes from "../graphs/PeopleReservations.jsx"
import PieNo from "../graphs/DoughnutAndPie.jsx"
import { useAuth } from "../context/authContext.jsx";
import AxiosInstance from '../api/axios.js'

const HomeSu = () => {
  const { user } = useAuth();
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
    <div className='bg-white min-h-screen'>
      {/* <NavMenu/> */}
      <div style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "60px", fontSize: "black" }} >
        <section className=' flex justify-between flex-wrap' >
          <div className=' rounded-3xl mr-5 flex' style={{ width: "60%", height: "280px", backgroundColor: "#d5f4e7", border: " 5px solid #d5f4e7" }}>
            <article className=' w-2/4 pl-8 pt-8 pr-4' style={{ borderRadius: " 20px 0px 0px 20px" }} >
              <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#004b50" }} >Welcome back 👋 <br />  {user && <span className='uppercase'>{user.username}</span>} </h1>
              <p style={{ fontSize: "14.2px", color: "#58918e" }} className='pt-2' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus molestiae illo natus.</p>
              <Button className='mt-5 text-white' style={{ fontWeight: "700", backgroundColor: "#00a76f" }}>
                Go now
              </Button>
            </article>
            <article className='cont-cover1 w-2/4' style={{ borderRadius: " 0px 20px 20px 0px" }} >
              <img className='h-full w-full' src={mockup} alt="" style={{ borderRadius: "0px 20px 20px 0px" }} />
            </article>
          </div>
          <div className='cover1 ml-5 rounded-3xl' style={{ width: "35%", height: "280px" }} >
            <h2 className=' text-cover'>Title</h2>
            <p className=' text-cover1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe delectus voluptate aliquam et eos molestias nisi amet ut ipsam iure...</p>
          </div>

        </section>
        <section className=' pt-2 mt-5 pb-2 flex justify-between'>
          <article className=' vista-cantidades  border-1 pl-5 flex'>
            <span className='w-1/2 justify-around flex flex-col'>
              <h3 style={{ fontWeight: "600" }} >Total Pasadia</h3>
              <p style={{ fontWeight: "600" }}>
                ${typeof totalVentaPasadia === 'number' ? totalVentaPasadia.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" />  {totalUsers}</p>

            </span>
            <article className='w-1/2 h-full flex items-center justify-center' >
              <span className='flex items-end'>
                <span className='barrag'></span>
                <span className='barrag1'></span>
                <span className='barrag2'></span>
                <span className='barrag3'></span>
                <span className='barrag4'></span>
                <span className='barrag5'></span>
                <span className='barrag6'></span>
                <span className='barrag7'></span>

              </span>

            </article>
          </article>
          <article className=' separadores vista-cantidades  border-1 pl-5 flex'>
            <span className='w-1/2 justify-around flex flex-col'>
              <h3 style={{ fontWeight: "600" }} >Total Cabañas</h3>
              <p style={{ fontWeight: "600" }} > $200,000 COP</p>
              <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" /> 332.000</p>

            </span>
            <article className='w-1/2 h-full flex items-center justify-center' >
              <span className='flex items-end'>
                <span className='barragf'></span>
                <span className='barragf1'></span>
                <span className='barragf2'></span>
                <span className='barragf3'></span>
                <span className='barragf4'></span>
                <span className='barragf5'></span>
                <span className='barragf6'></span>
                <span className='barragf7'></span>

              </span>

            </article>
          </article>
          <article className=' separadores vista-cantidades  border-1 pl-5 flex'>
            <span className='w-1/2 justify-around flex flex-col'>
              <h3 style={{ fontWeight: "600" }} >Total Habitaciones</h3>
              <p style={{ fontWeight: "600" }} >$723,000 COP</p>
              <p className='text-3xl flex' style={{ fontWeight: "600" }}> <img className='w-8' src={users} alt="" />  700.120</p>

            </span>
            <article className='w-1/2 h-full flex items-center justify-center' >
              <span className='flex items-end'>
                <span className='barra'></span>
                <span className='barra1'></span>
                <span className='barra2'></span>
                <span className='barra3'></span>
                <span className='barra4'></span>
                <span className='barra5'></span>
                <span className='barra6'></span>
                <span className='barra7'></span>

              </span>

            </article>
          </article>
        </section>

        <section className='flex'>
          <div className='flex flex-col w-6/12'>
            <article className='' >
              <PieYes />
            </article>
            <h3 className='flex justify-center items-center text-3xl mt-10 mb-10'>PROMEDIO DE RESERVAS</h3>
            <article className=''>
              <PieNo />
            </article>
          </div>
          <div className='w-6/12'>
            <div>
            <h3 className='flex justify-center items-center text-3xl mt-10 mb-10'>USUARIOS MAS CONCURRENTES</h3>
              <article>

              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </article>

            </div>
            <div className='mt-20'>
            <h3 className='flex justify-center items-center text-3xl mt-10 mb-10'>COMPRAS DE USUARIOS</h3>
              <article>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Tony Reichert</TableCell>
                      <TableCell>CEO</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Zoey Lang</TableCell>
                      <TableCell>Technical Lead</TableCell>
                      <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Jane Fisher</TableCell>
                      <TableCell>Senior Developer</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>William Howard</TableCell>
                      <TableCell>Community Manager</TableCell>
                      <TableCell>Vacation</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </article>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default HomeSu