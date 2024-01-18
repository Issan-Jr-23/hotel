import React, { useEffect, useState } from 'react'
import NavMenu from '../components/NavMenu.jsx'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import mockup from "../images/proyecto.png"
import hm from "../images/cover_1.jpeg"
import users from "../images/usuario.png"
import cabana from "../images/beach-cabana-st.png";
import PieYes from "../graphs/PeopleReservations.jsx";
import PieNo from "../graphs/DoughnutAndPie.jsx";
import LineGrafict from "../pages/apexCharts/LineGrafict.jsx"
import { useAuth } from "../context/authContext.jsx";
import AxiosInstance from '../api/axios.js'
import "./css/homeSu.css"


const HomeSu = () => {
  const { user } = useAuth();
  const [totalUsers, setTotalUsers] = useState([])
  const [totalVentaPasadia, setTotalVentaPasadia] = useState([])
  const [totalUsersC, setTotalUsersC] = useState([])
  const [totalVentaCabania, setTotalVentaCabania] = useState([])
  const [totalUsersH, setTotalUsersH] = useState([])
  const [totalVentaHabitaciones, setTotalVentaHabitaciones] = useState([])
  const [productos, setProductos] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await AxiosInstance.get('/productos-mas-comprados'); // Reemplaza con la ruta correcta de tu API
        const datos = respuesta.data;

        let productosCombinados = [...datos.bebidas, ...datos.restaurante];
        productosCombinados.sort((a, b) => a.valorTotal - b.valorTotal);

        setProductos(productosCombinados.slice(0, 10));
      } catch (error) {
        console.error('Hubo un error al obtener los productos:', error);
      }
    };
    obtenerProductos();
  }, []);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuestaMayorCompra = await AxiosInstance.get('/mayor-compra');
        const datosMayorCompra = respuestaMayorCompra.data;

        const respuestaTotal = await AxiosInstance.get('/obtener-historial-usuarios');
        const datosTotal = respuestaTotal.data;

        const datosCombinados = combinarYProcesarDatos(datosMayorCompra, datosTotal);

        const datosOrdenados = datosCombinados.sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 10);

        setDatos(datosOrdenados);

      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  const combinarYProcesarDatos = (datosMayorCompra, datosTotal) => {
    const mapaUsuarios = new Map();

    datosMayorCompra.forEach(usuario => {
      mapaUsuarios.set(usuario.identificacion, usuario);
    });

    datosTotal.forEach(usuario => {
      if (mapaUsuarios.has(usuario.identificacion)) {
        const usuarioExistente = mapaUsuarios.get(usuario.identificacion);
        usuarioExistente.valorTotal += usuario.valorTotal;
        mapaUsuarios.set(usuario.identificacion, usuarioExistente);
      } else {
        mapaUsuarios.set(usuario.identificacion, usuario);
      }
    });

    return Array.from(mapaUsuarios.values());
  };


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/cabania-obtener-cantidad-usuarios');
        console.log(response);

        const { totalNinios, totalAdultos } = response.data;
        console.log("Total niños: ", totalNinios);
        console.log("Total adultos: ", totalAdultos);
        setTotalUsersC(totalNinios + totalAdultos)

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/cabania-total-generado');
        console.log(response);

        const { totalPago, totalPagoPendiente } = response.data;
        console.log("Total generados: ", totalPago);
        console.log("Total generado: ", totalPagoPendiente);
        setTotalVentaCabania(totalPago + totalPagoPendiente);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/habitaciones-obtener-cantidad-usuarios');
        console.log(response);

        const { totalNinios, totalAdultos } = response.data;
        console.log("Total niños: ", totalNinios);
        console.log("Total adultos: ", totalAdultos);
        setTotalUsersH(totalNinios + totalAdultos)

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/habitaciones-total-generado');
        console.log(response);

        const { totalPago, totalPagoPendiente } = response.data;
        console.log("Total generados: ", totalPago);
        console.log("Total generado: ", totalPagoPendiente);
        setTotalVentaHabitaciones(totalPago + totalPagoPendiente);

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
        <section className=' container-card-home-mui flex justify-between flex-wrap' >
          <div className='card-home-mui rounded-3xl flex'>
            <article className=' article-go  pr-4' style={{ borderRadius: " 20px 0px 0px 20px" }} >
              <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#004b50" }} >Welcome back 👋 <br />  {user && <span className='uppercase'>{user.username}</span>} </h1>
              <p className='pt-2 go-now' >
                "Bienvenido de nuevo a Meqo: Tu herramienta clave para una administración hotelera eficaz y sencilla."</p>
              <Button className='mt-5 text-white' style={{ fontWeight: "700", backgroundColor: "#00a76f" }}>
                Go now
              </Button>
            </article>
            <article className='cont-cover1' style={{ borderRadius: " 0px 20px 20px 0px" }} >
              <img className='h-full w-full' src={mockup} alt="" style={{ borderRadius: "0px 20px 20px 0px" }} />
            </article>
          </div>
          <div className='cover1 ml-5 rounded-3xl' style={{ width: "35%", height: "280px" }} >
            <h2 className=' text-cover text-inherit'>Title</h2>
            <p className=' text-cover1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe delectus voluptate aliquam et eos molestias nisi amet ut ipsam iure...</p>
          </div>

        </section>
        <section className='section-cards pt-2 mt-5 pb-2 flex '>
          <article className=' vista-cantidades bd-vc'>
            <span className='box-style-hs justify-around flex flex-col'>
              <h3 className='fondo-text-hs' style={{ fontWeight: "600" }} >Total Pasadia</h3>
              <p className='fondo-text-hs' style={{ fontWeight: "600" }}>
                ${typeof totalVentaPasadia === 'number' ? totalVentaPasadia.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className=' fondo-text-hs text-3xl flex' style={{ fontWeight: "600" }}>  {totalUsers}</p>

            </span>
          </article>
          <article className=' vista-cantidades bd-vc1  flex'>
            <span className='box-style-hs justify-around flex flex-col'>
              <h3 className='fondo-text-hs' style={{ fontWeight: "600" }} >Total Cabañas</h3>
              <p className='fondo-text-hs' style={{ fontWeight: "600" }}>
                ${typeof totalVentaCabania === 'number' ? totalVentaCabania.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className=' fondo-text-hs text-3xl flex' style={{ fontWeight: "600" }}> {totalUsersC}</p>

            </span>
          </article>
          <article className=' vista-cantidades bd-vc2    flex'>
            <span className='box-style-hs justify-around flex flex-col'>
              <h3 className='fondo-text-hs' style={{ fontWeight: "600" }} >Total Habitaciones</h3>
              <p className='fondo-text-hs' style={{ fontWeight: "600" }}>
                ${typeof totalVentaHabitaciones === 'number' ? totalVentaHabitaciones.toLocaleString('es-CO') : '0'} COP
              </p>
              <p className='  fondo-text-hs text-3xl flex' style={{ fontWeight: "600" }}>{totalUsersH}</p>

            </span>
          </article>
        </section>

        <section className='section-cont-pieyes flex'>
          <div className=' div-cont-pieyes'>
            <h3 className='flex justify-center items-center text-xl mb-2'>PROMEDIO DE RESERVAS</h3>
            <article className=' bg-white cont-pieYes2' >
              <PieYes />
            </article>
            <h3 className='flex justify-center items-center text-xl mt-4'>COMPRAS DE USUARIOS</h3>
            <article className='article-alto'>
              <Table aria-label="Example static collection table" className='overflow-y-auto'>
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
              </Table>
            </article>
          </div>
          <div className='div-graf'>
            <div className=''>
              <h3 className='flex justify-center items-center text-xl uppercase mb-2'  >Clientes con mas compras</h3>
              <article className='article-alto'>

                <LineGrafict />
              </article>

            </div>
            <div className='const-pieno'>
              <h3 className='flex justify-center items-center text-xl'>COMPRAS DE USUARIOS</h3>
              <article className='article-alto cont-pieYes bg-white'>
                {/* <PieNo/> */}
                <Table aria-label="Example dynamic collection table" className='overflow-y-auto '>
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