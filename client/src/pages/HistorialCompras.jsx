import React, { useState, useEffect } from 'react';
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import AxiosInstance from '../api/axios.js';
import Lottie from "react-lottie";
import animationUser from "../images/Animation-user-form.json";
import { useNavigate } from "react-router-dom";
import { AddNoteIcon } from './iconos/AddNoteIcon.jsx';
import { VerticalDotsIcon } from './iconos/VerticalDotsIcon.jsx';
import { Pagination } from '@mui/material'
import check from "./iconos/check.png";
import NotResults from "../images/Animation-noresults.json"

const TransferirData = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    if (!busqueda) {
      const fetchData = async () => {
        try {
          const response = await AxiosInstance.get(`/obtener-historial?page=${currentPage}`);
          setUsers(response.data.resultado);
          setTotalPages(response.data.totalPages);
          setUserNotFound(false);
        } catch (error) {
          console.error("Error al obtener datos del servidor:", error);
        }
      };
      fetchData();
    }
  }, [currentPage, busqueda]);

  const buscarUsuario = async () => {
    setCurrentPage(1); // Establecer currentPage a 1 al realizar una búsqueda
    try {
      const response = await AxiosInstance.get(`/buscar-usuario?identificacion=${busqueda}`);
      if (response.data && response.data.resultado.length > 0) {
        setUsers(response.data.resultado);
        setUserNotFound(false);
        setTotalPages(1); // Establecer totalPages a 1 cuando se encuentra un usuario
      } else {
        setUsers([]);
        setUserNotFound(true);
        setTotalPages(0); // Restaurar totalPages a 0 si no se encuentra un usuario
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      setUsers([]);
      setUserNotFound(true);
      setTotalPages(0); // Restaurar totalPages a 0 en caso de error
    }
  };



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const verHistorial = (id) => {
    navigate(`/historial/${id}`);
  };

  const options = {
    loop: false,
    autoPlay: true,
    animationData: animationUser,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  const optionsResults = {
    loop: true,
    autoPlay: true,
    animationData: NotResults,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };




  return (
    <div className='pt-20 flex flex-col w-full' style={{ background: "linear-gradient(to right, #4ca1af, #c4e0e5)", height: "100vh", backgroundAttachment: "fixed", backgroundSize: "cover", position: "fixed", overflowY: "auto" }}>
      <h1 className='mhdu-h1'>HISTORIAL DE USUARIO</h1>
      <div className='hdu flex'>
        <div className="flex flex-col ml-5 mr-5">
          <form className="mhdu" style={{ zIndex: "1" }}>
            <h2 className='w-full text-center pt-2 pb-2'>FILTRO DE USUARIOS</h2>
            <Input
              label="Identificación"
              placeholder="Ingrese la identificación"
              type="text"
              className='mb-2 text-medium'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button className='h-12 text-white text-medium' color='success' onClick={buscarUsuario}>Buscar</Button>
            <Lottie options={options} height={100} width={100} />
          </form>
        </div>
        <div className='flex flex-col w-full'>
          {userNotFound ? (
            <div className='text-center mt-4 border-2 bg-white mr-5 flex justify-center items-center ' style={{ height: "293px", borderRadius:"14px" }}>

              <span className='flex ' style={{width:"330px", height:"330px"}}>
                <Lottie options={optionsResults} />
              </span>
            </div>
          ) : (
            <Table aria-label="Example static collection table" className='pt-3 pl-5 pr-5'>
              <TableHeader className='text-center'>
                <TableColumn>IDENTIFICACIÓN</TableColumn>
                <TableColumn className='text-center'>NOMBRE</TableColumn>
                <TableColumn className='text-center'>HISTORIAL</TableColumn>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.identificacion}>
                    <TableCell>{user.identificacion}</TableCell>
                    <TableCell className='text-center uppercase'>{user.nombre}</TableCell>
                    <TableCell className='text-center'>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button auto flat>
                            <VerticalDotsIcon />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownSection>
                            <DropdownItem key="view" textValue="Ver historial" onClick={() => verHistorial(user.identificacion)}>
                              <AddNoteIcon size="20" /> Ver Historial
                            </DropdownItem>
                          </DropdownSection>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {users.length > 0 && <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} className='mt-2' color='primary' />}
        </div>
      </div>
    </div>
  );
};

export default TransferirData;
