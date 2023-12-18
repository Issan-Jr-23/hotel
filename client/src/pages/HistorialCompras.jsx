import React, { useState, useEffect, useMemo} from 'react'
import { Dropdown, DropdownTrigger, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, Input, Card, CardBody, CardHeader, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { AddNoteIcon } from "./iconos/AddNoteIcon.jsx";
import { VerticalDotsIcon } from './iconos/VerticalDotsIcon.jsx';
import AxiosInstance from '../api/axios.js';

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const TransferirData = () => {

    const navigate = useNavigate();

    const verHistorial = (id) => {
      navigate(`/historial/${id}`);
      console.log("id del usuario para ver el historial del usuario: "+id)
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





  return (
    <div className='pt-20 flex flex-col'>

      <h1 className='h-14 flex justify-center items-center text-4xl mb-10' >HISTORIAL DE USUARIO</h1>
        <div className='flex '>
          <div className="flex flex-col ml-5 mr-5">
            <form className="flex flex-col gap-6 w-80 border-2 border-emerald-400 pt-3 pb-3 pl-3 pr-3 rounded-xl" style={{ zIndex: "1" }} >
              <Input value={busqueda}
                onChange={handleSearchChange} label="Identificación" placeholder="Enter your email" type="text" className='mb-2' />

              <Input
                label="Nombre"
                placeholder="Enter your name"
                type="password"

              />
              <Input
                label="Apellidos"
                placeholder="Enter your last name"
                type="password"

              />
              <p className="text-center text-small">
                busqueda de usuarios {" "}
                <Link to="/home" size="sm" className='font-medium text-blue-500'>
                  Inicio
                </Link>
              </p>
            </form>
          </div>
          <Table aria-label="Example static collection table" className=' pl-5 pr-5' >
            <TableHeader className='text-center' >
              <TableColumn className='text-center' >IDENTIFICACIÓN</TableColumn>
              <TableColumn className='text-center' >HISTORIAL</TableColumn>
              {/* <TableColumn className='text-center' >STATUS</TableColumn> */}
            </TableHeader>
            <TableBody emptyContent="No hay elementos por mostrar">
              {users.map((data) => (
                <TableRow key={data._id} >
                  <TableCell className='text-center'>{data.identificacion}</TableCell>
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