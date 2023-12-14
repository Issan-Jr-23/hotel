import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownTrigger, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, Input, Card, CardBody, CardHeader, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EditDocumentIcon } from "../iconos/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "../iconos/DeleteDocumentIcon.jsx";
import { CopyDocumentIcon } from "../iconos/CopyDocumentIcon.jsx";
import { AddNoteIcon } from "../iconos/AddNoteIcon.jsx";
import { VerticalDotsIcon } from "../iconos/VerticalDotsIcon.jsx";
import AxiosInstance from '../../api/axios.js';

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const TransferirData = () => {
  const [busqueda, setBusqueda] = useState('');
  const [users, setUsers] = useState([])
  const [transferencia, setTransferencia] = useState({
    identificacion: "",
    historial: []
  });
  
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const onSelectUser = (userId) => {
    const usuario = users.find(user => user._id === userId);
    setUsuarioSeleccionado(usuario);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/pasadia-clientes");
        const usuariosOrdenados = response.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
        setUsers(usuariosOrdenados);
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

  const enviarDatos = async (identificacion, userName, bebidas, restaurante, personas) => {
    console.log("id del usuario seleccionado: "+identificacion, userName, bebidas, restaurante, personas)
    if (!identificacion) {
      console.error("No hay usuario seleccionado para transferir");
      return;
    }
    try {
      const response = await AxiosInstance.post('/create-historial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(identificacion, userName, bebidas, restaurante, personas),
      });
  
      if (response.ok) {
        console.log("Datos transferidos con éxito");
      } else {
        console.error("Error al transferir datos");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };
  

  // const agregarHistorial = (usuario, datosTransferencia) => {
  //   const registroHistorial = {
  //     fechaTransferencia: new Date().toISOString(),
  //     ...datosTransferencia,
  //   };
  
  //   setTransferencia(prevState => {
  //     if (prevState.identificacion === usuario.identificacion) {
  //       return {
  //         ...prevState,
  //         historial: [...prevState.historial, registroHistorial]
  //       };
  //     } else {
  //       return {
  //         identificacion: usuario.identificacion,
  //         historial: [registroHistorial]
  //       };
  //     }
  //   });
  // };
  
  
  


  return (
    <div className='pt-20 flex'>

      <div className="flex flex-col ml-5 mr-5">
      <form className="flex flex-col gap-6 w-80 border-2 border-emerald-400 pt-3 pb-3 pl-3 pr-3 rounded-xl" style={{zIndex:"1"}} >
                  <Input   value={busqueda}
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
          <TableColumn className='text-center' >NAME</TableColumn>
          <TableColumn className='text-center' >STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {datosFiltrados.map((data) => (
            <TableRow key={data._id} >
              <TableCell className='text-center'>{data.identificacion}</TableCell>
              <TableCell className='uppercase text-center' >{data.nombre}</TableCell>
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
                        description="Transference a new file"
                        startContent={<AddNoteIcon className={iconClasses} />}
                        className="font-semibold"
                        style={{ fontWeight: "700" }}
                        onClick={() => enviarDatos(data._id, data.nombre, data.bebidas, data.restaurante, data.cantidadPersonas)}
                      >
                        Transferir datos
                      </DropdownItem>
                      <DropdownItem
                        key="copy"
                        shortcut="⌘C"
                        description="Copy the file link"
                        startContent={<CopyDocumentIcon className={iconClasses} />}
                      >
                        Copy link
                      </DropdownItem>
                      <DropdownItem
                        key="edit"
                        shortcut="⌘⇧E"
                        description="Allows you to edit the file"
                        startContent={<EditDocumentIcon className={iconClasses} />}
                      >
                        Edit file
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection title="Danger zone">
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        shortcut="⌘⇧D"
                        description="Permanently delete the file"
                        startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                      >
                        Delete file
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
  )
}

export default TransferirData