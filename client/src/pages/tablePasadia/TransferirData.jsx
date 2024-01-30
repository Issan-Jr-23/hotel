import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, DropdownTrigger, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
import { Pagination } from "@mui/material"
import { Link } from "react-router-dom";
import { EditDocumentIcon } from "../iconos/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "../iconos/DeleteDocumentIcon.jsx";
import { CopyDocumentIcon } from "../iconos/CopyDocumentIcon.jsx";
import { AddNoteIcon } from "../iconos/AddNoteIcon.jsx";
import { VerticalDotsIcon } from "../iconos/VerticalDotsIcon.jsx";
import AxiosInstance from '../../api/axios.js';
import Swal from "sweetalert2"
import Lottie from "react-lottie"
import animacion from "../iconos/Animation.json"
import animacionPendiente from "../iconos/Animation-pendiente.json"
import "./trf.css"

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
          AxiosInstance.get("/obtener-clientes-pasadia-transferencia"),
          AxiosInstance.get("/obtener-clientes-cabania-transferencia"),
          AxiosInstance.get("/obtener-clientes-habitaciones-transferencia")
        ]);

        // Verifica si cada respuesta tiene la propiedad 'fechaDeRegistro'
        const validarPropiedadFecha = (element) => element.hasOwnProperty('fechaDeRegistro');

        const usuariosCombinados = [
          ...responsePasadia.data.filter(validarPropiedadFecha),
          ...responseCabania.data.filter(validarPropiedadFecha),
          ...responseHabitaciones.data.filter(validarPropiedadFecha)
        ].sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));

        setUsers(usuariosCombinados);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);


  const actualizartTabla = async () => {
    const [responsePasadia, responseCabania, responseHabitaciones] = await Promise.all([
      AxiosInstance.get("/obtener-clientes-pasadia-transferencia"),
      AxiosInstance.get("/obtener-clientes-cabania-transferencia"),
      AxiosInstance.get("/obtener-clientes-habitaciones-transferencia")
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

  const enviarDatos = async (
    id,
    identificacion,
    nombre,
    reserva,
    adultos,
    ninios,
    metodoPago,
    pago,
    metodoPagoPendiente,
    pagoPendiente,
    servicio,
    estado,
    fechaActivacion,
    bebidas,
    restaurante,
    recepcion,
    descorche

  ) => {
    if (!identificacion) {
      console.error("No hay usuario seleccionado para transferir");
      return;
    }

    const datosHistorial = {
      nombre,
      reserva,
      adultos,
      ninios,
      metodoPago,
      pago,
      metodoPagoPendiente,
      pagoPendiente,
      servicio,
      estado,
      fechaActivacion,
      bebidas,
      restaurante,
      recepcion,
      descorche




    };

    const datosParaEnviar = {
      identificacion: identificacion,
      datosHistorial
    };


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

  const defaultOption = {
    loop: true,
    autoPlay: true,
    animationData: animacion,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const defaultOption1 = {
    loop: true,
    autoPlay: true,
    animationData: animacionPendiente,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(datosFiltrados.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = datosFiltrados.slice(startIndex, endIndex);


  return (
    <div className=' div-trf pb-20'>

      <h1 className='trfd' >TRANSFERENCIA DE DATOS</h1>
      <div className='cont-trs'>
        <div className=" cont-form-00 flex flex-col pl-5 pr-5">
          <h2 className='cont-form-00-title' >Buscar usuario</h2>
          <form className="form-trs" style={{ zIndex: "1" }} >
            <Input value={busqueda}
              onChange={handleSearchChange} label="Identificación" placeholder="Ingrese el número de identificación" type="text" className='mb-2' />

            <Input
              label="Nombre"
              placeholder="Enter your name"
              type="password"

            />
            <Input
              className='mt-2'
              label="Apellidos"
              placeholder="Enter your last name"
              type="password"

            />
            <p className="text-center text-small mt-5">
              busqueda de usuarios {" "}
              <Link to="/home" size="sm" className='font-medium text-blue-500'>
                Inicio
              </Link>
            </p>
          </form>
        </div>
        <div className='flex flex-col w-full'>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
          <Table aria-label="Example static collection table" className=' pl-5 pr-5' >
            <TableHeader className='text-center' >
              <TableColumn className='text-center' >IDENTIFICACIÓN</TableColumn>

              <TableColumn className='text-center' >NAME</TableColumn>
              <TableColumn className='text-center' >STATUS</TableColumn>
              <TableColumn className='text-center' >SERVICIO</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay elementos por mostrar">
              {currentItems.map((data) => (
                <TableRow key={data._id} >
                  <TableCell className='text-center border-b-2 border-blue-300'>{data.identificacion}</TableCell>

                  <TableCell className='uppercase text-center border-b-2 border-green-300' >{data.nombre}</TableCell>
                  <TableCell className='uppercase text-center border-b-2 border-blue-300' >{data.servicio}</TableCell>
                  <TableCell key={data._id} className='text-center border-b-2 border-green-300'  >
                    {data.estado === "activo" ? (
                      <div className='flex justify-center'>
                        <span className='flex items-center'>
                          <Lottie options={defaultOption} height={25}
                            width={25} />
                          <p>En proceso</p>
                        </span>
                      </div>

                    ) : (
                      <div>
                        {data.estado === "pendiente" ? (
                          <div className='flex justify-center'>
                            <span className='flex items-center'>
                              <Lottie options={defaultOption1} height={25}
                                width={25} />
                              <p>En espera</p>
                            </span>
                          </div>
                        ) : (
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
                                          data.servicio,
                                          data.estado,
                                          data.fechaActivacion,
                                          data.bebidas,
                                          data.restaurante,
                                          data.recepcion,
                                          data.descorche
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
                        )}
                      </div>
                    )}

                  </TableCell>
                </TableRow>


              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  )
}

export default TransferirData