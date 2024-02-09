import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownTrigger, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, Input, Card, CardBody, CardHeader, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { AddNoteIcon } from "./iconos/AddNoteIcon.jsx";
import { VerticalDotsIcon } from './iconos/VerticalDotsIcon.jsx';
import check from "./iconos/check.png"
import AxiosInstance from '../api/axios.js';
import "./global.css"
import Lottie from "react-lottie"
import animationUser from "../images/Animation-user-form.json"

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const TransferirData = () => {

  const navigate = useNavigate();

  const verHistorial = (id) => {
    navigate(`/historial/${id}`);
    console.log("id del usuario para ver el historial del usuario: " + id)
  };


  const [busqueda, setBusqueda] = useState('');
  const [users, setUsers] = useState([])


  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const onSelectUser = (userId) => {
    const usuario = users.find(user => user._id === userId);
    setUsuarioSeleccionado(usuario);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseHistorial] = await Promise.all([
          AxiosInstance.get("/obtener-historial")
        ]);

        const usuariosCombinados = [...responseHistorial.data]
          .sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
        setUsers(usuariosCombinados);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);



  const datosFiltrados = useMemo(() => {
    if (!busqueda) return users;

    return users.filter((user) => {
      return user && user.identificacion.toString().includes(busqueda.toString());
    });
  }, [busqueda, users]);

  const handleSearchChange = (event) => {
    setBusqueda(event.target.value);
  };


    const options = {
        loop: true,
        autoPlay: true,
        animationData: animationUser,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }




  return (
    <div className='pt-20 flex flex-col w-full' style={{  background:"linear-gradient(to right, #4ca1af, #c4e0e5)", height:"100vh", backgroundAttachment:"fixed", backgroundSize:"cover", position:"fixed", overflowY:"auto"}}>

      <h1 className='mhdu-h1' >HISTORIAL DE USUARIO</h1>
      <div className=' hdu flex '>
        <div className=" flex flex-col ml-5 mr-5">
          <form className=" mhdu" style={{ zIndex: "1" }}>
            <Input value={busqueda}
              onChange={handleSearchChange} label="Identificación" placeholder="Enter your email" type="text" className='mb-2'/>
            <Lottie options={options}/>
            <p className="text-center text-small">
              busqueda de usuarios {" "}
              <Link to="/home" size="sm" className='font-medium text-blue-500'>
                Inicio
              </Link>
            </p>
          </form>
        </div>
        <Table aria-label="Example static collection table" className='pt-3 pl-5 pr-5' >
          <TableHeader className='text-center' >
            <TableColumn className='' >IDENTIFICACIÓN</TableColumn>
            <TableColumn className='text-center' >NOMBRE</TableColumn>
            <TableColumn className='text-center' >HISTORIAL</TableColumn>
            {/* <TableColumn className='text-center' >STATUS</TableColumn> */}
          </TableHeader>
          <TableBody emptyContent="No hay elementos por mostrar">
            {users.map((data) => (
              <TableRow key={data._id}>
                <TableCell className='flex items-center'><img className='check-historial w-3 h-3 mr-1' src={check} alt="" />{data.identificacion}</TableCell>
                <TableCell className='text-center uppercase'>
                  {data.historial.length > 0 && data.historial[0].nombre}
                </TableCell>
                <TableCell key={data._id} className='text-center'  >
                  <Dropdown >
                    <DropdownTrigger>
                      <Button
                        className="bg-inherit "
                      >
                        <VerticalDotsIcon />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                      <DropdownSection title="Actions" showDivider>
                        <DropdownItem
                          key="new"
                          shortcut="⌘N"
                          description="View user history."
                          startContent={<AddNoteIcon className={iconClasses} />}
                          className="font-semibold"
                          style={{ fontWeight: "700" }}
                          onClick={() => verHistorial(data.identificacion)}
                        >
                          Ver historial
                        </DropdownItem>


                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>


            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

export default TransferirData