import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import NavMenu from '../components/NavMenu.jsx'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import mockup from "../images/proyecto.png"
import hm from "../images/cover_1.jpeg"
import users from "../images/usuario.png"
import cabana from "../images/beach-cabana-st.png";
import PieYes from "../graphs/PeopleReservations.jsx";
import PieNo from "../graphs/DoughnutAndPie.jsx";
import LineGrafict from "../pages/apexCharts/LineGrafict.jsx";
import Pmc from "../pages/apexCharts/productoMasComprado.jsx";
import Umc from "../pages/apexCharts/UsuarioConMasCompras.jsx";
import { useAuth } from "../context/authContext.jsx";
import AxiosInstance from '../api/axios.js'
import userimg from '../images/usuariopng.png'
import userimg2 from '../images/usuariopng2.png'
import userimg3 from '../images/usuariopng3.png'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "./css/homeSu.css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const HomeSu = () => {
  const { user } = useAuth();
  const [totalUsers, setTotalUsers] = useState([])
  const [totalVentaPasadia, setTotalVentaPasadia] = useState([])
  const [totalUsersCab, setTotalUsersCab] = useState([])
  const [totalVentaCabania, setTotalVentaCabania] = useState([])
  const [totalUsersHab, setTotalUsersHab] = useState([])
  const [totalVentaHabitaciones, setTotalVentaHabitaciones] = useState([])




  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };







  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/obtain-pasadia-ventas');
        console.log(response);
        const { totalCompras, numeroCompras } = response.data;
        setTotalUsers(numeroCompras);
        setTotalVentaPasadia(totalCompras)

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/obtain-cabania-ventas');
        console.log(response);
        const { totalCompras, numeroCompras } = response.data;
        setTotalUsersCab(numeroCompras);
        setTotalVentaCabania(totalCompras)

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/obtain-habitaciones-ventas');
        console.log(response);
        const { totalCompras, numeroCompras } = response.data;
        setTotalUsersHab(numeroCompras);
        setTotalVentaHabitaciones(totalCompras)

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);




  return (
    <div className=' min-h-screen pb-20'>
      {/* <NavMenu/> */}
      <div style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "60px", fontSize: "black" }} >
        <section className=' container-card-home-mui' >
          <div className='card-home-mui'>
            <article className=' article-go'>
              <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#004b50" }} >Welcome back 👋 <br />  {user && <span className='uppercase'>{user.username}</span>} </h1>
              <p className='pt-2 go-now'>
                "Bienvenido de nuevo a Meqo: Tu herramienta clave para una administración hotelera eficaz y sencilla."</p>
              <Button className='btn-card-wb-user text-white' style={{ fontWeight: "700", backgroundColor: "#00a76f" }}>
                Go now
              </Button>
            </article>
            <article className='cont-cover1' style={{ borderRadius: " 0px 20px 20px 0px" }} >
              <img className='img-wb-user' src={mockup} alt="" style={{ borderRadius: "0px 20px 20px 0px" }} />
            </article>
          </div>
          <div className='cover1' style={{ width: "35%", height: "280px" }} >
            <>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                  <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              </Swiper>
            </>
          </div>

        </section>
        <section className='section-cards pt-2 mt-5 pb-2 flex '>
          <article className=' vista-cantidades bd-vc '>
            <span className='box-style-hs justify-around flex flex-col'>
              <h3 className='fondo-text-hs' style={{ fontWeight: "600" }} >Total Pasadia</h3>
              <p className='fondo-text-hs' style={{ fontWeight: "600" }}>
                ${typeof totalVentaPasadia === 'number' ? totalVentaPasadia.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className=' fondo-text-hs text-3xl flex' style={{ fontWeight: "600" }}>  {totalUsers}</p>
            </span>
            <img className='imagen-de-user-decoration' src={userimg} alt="" />

          </article>
          <article className=' vista-cantidades bd-vc1  flex'>
            <span className='box-style-hs justify-around flex flex-col'>
              <h3 className='fondo-text-hs' style={{ fontWeight: "600" }} >Total Cabañas</h3>
              <p className='fondo-text-hs' style={{ fontWeight: "600" }}>
                ${typeof totalVentaCabania === 'number' ? totalVentaCabania.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className=' fondo-text-hs text-3xl flex' style={{ fontWeight: "600" }}> {totalUsersCab}</p>

            </span>
            <img className='imagen-de-user-decoration' src={userimg2} alt="" />
          </article>
          <article className=' vista-cantidades bd-vc2     flex'>
            <span className='box-style-hs justify-around flex flex-col'>
              <h3 className='fondo-text-hs' style={{ fontWeight: "600" }} >Total Habitaciones</h3>
              <p className='fondo-text-hs' style={{ fontWeight: "600" }}>
                ${typeof totalVentaHabitaciones === 'number' ? totalVentaHabitaciones.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className='  fondo-text-hs text-3xl flex' style={{ fontWeight: "600" }}>{totalUsersHab}</p>
            </span>
            <img className='imagen-de-user-decoration' src={userimg3} alt="" />
          </article>
        </section>

        <section className='section-cont-pieyes flex'>
          <div className=' div-cont-pieyes '>
            <article className=' bg-white cont-pieYes2' >
              <PieYes />
            </article>
            <article className='article-alto article-alto-grf-pd bg-white border-2' >
              {/* <Table aria-label="Example static collection table" className='overflow-y-auto'>
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>CANTIDAD</TableColumn>
                  <TableColumn>VALOR TOTAL</TableColumn>
                </TableHeader>
                <TableBody>
                  {productos.slice(0, 10).map((producto, index) => (
                    <TableRow key={index} className='h-10'>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell>{producto.valorTotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
              <Umc />
            </article>
          </div>
          <div className='div-graf'>
            <div className=''>
              <article className='article-alto  article-alto article-alto-grf-pdl'>

                <LineGrafict />
              </article>

            </div>
            <div className='const-pieno'>
              <article className='article-alto cont-pieYes bg-white'>
                {/* <PieNo/> */}
                {/* <Table aria-label="Example dynamic collection table" className='overflow-y-auto '>
                  <TableHeader >
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Valor Total</TableColumn>
                  </TableHeader>
                  <TableBody >
                    {datos.map((item) => (
                      <TableRow key={item.identificacion} className='h-10 '>
                        <TableCell>{item.identificacion}</TableCell>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{item.valorTotal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                <Pmc />
              </article>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default HomeSu