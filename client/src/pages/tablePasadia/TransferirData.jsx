import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownTrigger, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, Input, Card, CardBody, CardHeader, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EditDocumentIcon } from "../iconos/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "../iconos/DeleteDocumentIcon.jsx";
import { CopyDocumentIcon } from "../iconos/CopyDocumentIcon.jsx";
import { AddNoteIcon } from "../iconos/AddNoteIcon.jsx";
import { VerticalDotsIcon } from "../iconos/VerticalDotsIcon.jsx";
import AxiosInstance from '../../api/axios.js';
import Swal from "sweetalert2"

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
        const [responsePasadia, responseCabania, responseHabitaciones] = await Promise.all([
          AxiosInstance.get("/pasadia-clientes"),
          AxiosInstance.get("/cabania-clientes"),
          AxiosInstance.get("/habitaciones-clientes")
        ]);

        const usuariosCombinados = [...responsePasadia.data, ...responseCabania.data, ...responseHabitaciones.data]
          .sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
        setUsers(usuariosCombinados);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  const actualizartTabla = async () => {
    const [responsePasadia, responseCabania, responseHabitaciones] = await Promise.all([
      AxiosInstance.get("/pasadia-clientes"),
      AxiosInstance.get("/cabania-clientes"),
      AxiosInstance.get("/habitaciones-clientes")
    ]);
    const usuariosCombinados = [...responsePasadia.data, ...responseCabania.data, ...responseHabitaciones.data]
      .sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
    setUsers(usuariosCombinados);
  }

  const datosFiltrados = useMemo(() => {
    if (!busqueda) return users;

    return users.filter((user) => {
      return user && user.identificacion.toString().includes(busqueda.toString());
    });
  }, [busqueda, users]);

  const handleSearchChange = (event) => {
    setBusqueda(event.target.value);
  };

  const enviarDatos = async (id, identificacion, nombre, reserva, ninios, adultos, metodoPago, pago, metodoPagoPendiente, pagoPendiente, bebidas, restaurante, servicio) => {
    if (!identificacion) {
      console.error("No hay usuario seleccionado para transferir");
      return;
    }

    const datosHistorial = {
      nombre,
      reserva,
      ninios,
      adultos,
      metodoPago,
      pago,
      metodoPagoPendiente,
      pagoPendiente,
      bebidas,
      restaurante,
      servicio

    };

    const datosParaEnviar = {
      identificacion: identificacion,
      datosHistorial
    };

    console.log("datos del usuario: ", datosParaEnviar)

    await realizarSolicitudHTTP(datosParaEnviar);
    await handleDelete(id)
  };

  const realizarSolicitudHTTP = async (datos) => {
    try {
      const response = await AxiosInstance.post('create-historial', datos);
      if (response.status === 200) {
        console.log("Datos transferidos con éxito");
      } else {
        console.error("Error al transferir datos: ", response);
      }
    } catch (error) {
      console.error("Error de red: ", error);

    }
  };

  const handleDelete = async (id) => {
    let isDeleted = false;
    let errorMessages = [];
  
    try {
      await AxiosInstance.delete(`/pasadia/${id}`);
      console.log("Pasadia eliminado con éxito");
      isDeleted = true;
      actualizartTabla();
    } catch (error) {
        console.log("error delete register")
    }
    
    if (!isDeleted) {
      try {
        await AxiosInstance.delete(`/cabania/${id}`);
        console.log("Cabania eliminada con éxito");
        isDeleted = true;
        actualizartTabla();
      } catch (error) {

      }
    }
    if (!isDeleted) {
      try {
        await AxiosInstance.delete(`/habitaciones/${id}`);
        console.log("Habitación eliminada con éxito");
        isDeleted = true;
        actualizartTabla();
      } catch (error) {
        
      }
    }
    if (!isDeleted) {
      alert("No se encontró el usuario en ninguna de las colecciones para eliminar. Errores: " + errorMessages.join(", "));
    }
  };
  
  
  
  









  return (
    <div className='pt-20 flex'>

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
          <TableColumn className='text-center' >NAME</TableColumn>
          <TableColumn className='text-center' >STATUS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No hay elementos por mostrar">
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
                        onClick={() => {
                          Swal.fire({
                            title: "Quieres transferir los datos?",
                            text: "¡No podrás revertir esto!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#28a745",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "¡Sí, realizar!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                              enviarDatos(
                                data._id,
                                data.identificacion,
                                data.nombre,
                                data.reserva,
                                data.cantidadPersonas.adultos,
                                data.cantidadPersonas.ninios,
                                data.mediosDePago,
                                data.pagoAnticipado,
                                data.mediosDePagoPendiente,
                                data.pagoPendiente,
                                data.bebidas,
                                data.restaurante,
                                data.servicio
                              );
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                            }
                          });
                        }}
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