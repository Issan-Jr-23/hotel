import React, { useState, useEffect } from "react"
import fd from "../../images/flechas-dobles.png"
import { Table } from "@mui/material"
import AxiosInstance from "../../api/axios.js"
import { Pagination, Modal, Box, Typography } from "@mui/material"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, Input } from "@nextui-org/react"
import { green, purple, blue, red } from '@mui/material/colors';
import chevron from "../../images/right.png";
import { VerticalDotsIcon } from "../iconos/VerticalDotsIcon.jsx"
import Brightness1Icon from '@mui/icons-material/Brightness1';


export default function review() {
    const [formDatas, setFormDatas] = useState({
        pagoPendiente: '',
        mediosDePagoPendiente: ''
      });
    const [users, setUsers] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [openTd, setOpenTd] = React.useState(false);
    const handleCloseTd = () => setOpenTd(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [pasadiaAdultos, setPasadiaAdultos] = useState(null)
    const [pasadiaNinios, setPasadiaNinios] = useState(null)



    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
                setUsers(response.data.clientes);
                setTotalPaginas(response.data.totalPages);
            } catch (error) {
                console.error("Error al obtener los clientes: ", error);
            }
        };

        obtenerClientes();
    }, [paginaActual]);

    // Función para manejar el cambio de página
    const cambiarPagina = (event, value) => {
        setPaginaActual(value);
    };

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setOpenTd(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: "min-height-90vh",
        bgcolor: 'background.paper',
        overflow: "scroll",
        boxShadow: 0,
        p: 4,
        borderRadius: 5
    };

    const handleStatus = async (nuevoEstado, userId) => {
        console.log(userId, nuevoEstado)
        try {
            const response = await AxiosInstance.put('/pasadia-actualizar-estado', {
                userId: userId,
                estado: nuevoEstado
            });
            const responses = await AxiosInstance.get(`/pasadia-clientes?page=${paginaActual}`);
            setUsers(responses.data.clientes);
            setTotalPaginas(responses.data.totalPages);
        } catch (error) {
            console.error('Hubo un problema con la petición Axios:', error);
            console.log("depuración: ", error)
        }
    }

    const EstadoIcono = ({ estado }) => {
        let color;

        switch (estado) {
            case 'activo':
                color = green[500];
                break;
            case 'pendiente':
                color = blue[500];
                break;
            case 'cancelado':
                color = red[600];
                break;
            case 'finalizado':
                color = purple[500];
                break;
        }

        return <Brightness1Icon style={{ color, width: "14px" }} />;
    };

    const seleccionarCliente = (identificacion) => {
        setSelectedClienteId(identificacion);
        calcularPagoPendiente(identificacion);
      };

      const calcularPagoPendiente = (identificacion) => {
        const clienteSeleccionado = users.find(user => user.identificacion === identificacion);
        if (clienteSeleccionado) {
          const totalPago = (clienteSeleccionado.cantidadPersonas.adultos * pasadiaAdultos) +
            (clienteSeleccionado.cantidadPersonas.ninios * pasadiaNinios);
          const pagoPendienteCalculado = totalPago - (clienteSeleccionado.pagoAnticipado + clienteSeleccionado.pagoPendiente);
          setFormDatas({
            ...formDatas,
            pagoPendiente: pagoPendienteCalculado.toString()
          });
        }
      };
    
      const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setFormDatas({ ...formDatas, [name]: value });
      };
    
    
      const actualizarDatosCliente = async () => {
        if (!formDatas.pagoPendiente || !formDatas.mediosDePagoPendiente) {
          toast.error('Debe llenar todos los campos');
          return;
        }
    
        if (selectedClienteId) {
          console.log("identificacion del cliente: " + selectedClienteId)
          try {
            const clienteResponse = await AxiosInstances.get(`/pasadia-clientes-identificacion/${selectedClienteId}`);
            const clienteData = clienteResponse.data;
    
            const nuevoValorTotal = clienteData.nuevoTotal - formDatas.pagoPendiente;
            console.log("nuevo total: " + nuevoValorTotal)
    
            const response = await AxiosInstances.put(`/pasadia-clientes/${selectedClienteId}/actualizar`, {
              nuevoTotal: nuevoValorTotal,
              pagoPendiente: formDatas.pagoPendiente,
              mediosDePagoPendiente: formDatas.mediosDePagoPendiente
            });
    
            setFormDatas({
              pagoPendiente: '',
              mediosDePagoPendiente: ''
            });
    
            toast.success('Datos actualizados exitosamente');
    
            const responses = await AxiosInstances.get("/pasadia-clientes");
            const usuariosOrdenados = responses.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
            setUsers(usuariosOrdenados);
    
          } catch (error) {
            console.error('Hubo un problema con la petición Axios:', error);
          }
        } else {
          console.error('No hay un cliente seleccionado para actualizar');
        }
      };
    
      return (
        <div className="pt-20 flex justify-center items-center flex-col">
            <section className="" style={{ width: "90vw" }}>
                <div className="flex justify-end mb-5">
                    <Pagination
                        count={totalPaginas}
                        page={paginaActual}
                        onChange={cambiarPagina}
                        color="primary"
                    />
                </div>
                <Table className="" style={{ paddingTop: "40px", width: "90vw" }}>
                    <thead className="mt-20">
                        <tr className="" >
                            <th className="border-2"> <span className="flex justify-between items-center pl-2">+ <p></p>  <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p>  Id<img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p>  Nombre <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p>  Agregar bebida <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p>  Agregar comida <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p>  Pago pendiente <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p>  Estado <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="border-2"> <span className="flex justify-between items-center"> <p></p><img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((cliente) => (
                            <tr key={cliente._id}>
                                <td className="text-left">
                                    <Button className="bg-inherent" onClick={() => handleOpenModal(cliente)}>
                                        <img className="w-4" src={chevron} alt="" />
                                    </Button>

                                    {selectedUser && (
                                        <Modal open={openTd} onClose={handleCloseTd} className=""
                                            classNames={{
                                                body: "py-6",
                                                backdrop: "bg-inherit",
                                            }}
                                            BackdropProps={{
                                                style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                                            }}
                                        >
                                            <Box sx={style} className="max-h-96 overflow-y-auto overflow-x-auto">
                                                <Typography className="border-b-3 border-blue-500 text-3xl flex  justify-between" component="div">
                                                    <div className="mb-0.5 text-2xl">History</div>
                                                    <div className="uppercase text-lg"> {selectedUser.nombre} - {selectedUser.identificacion}</div>
                                                </Typography>
                                                <Typography className="uppercase flex" component="div" >
                                                    <div className="flex w-full">
                                                        <section className="flex justify-between w-full flex-wrap ">

                                                            {/* Sección de Productos (Bebidas + Comidas) */}
                                                            <div className="mx-5 my-1  w-full">
                                                                <h4 className="text-green-600">Productos (Bebidas y Comidas)</h4>

                                                                {/* Combina ambos arrays (bebidas y comidas) y verifica si tiene elementos */}
                                                                {selectedUser.bebidas && selectedUser.restaurante &&
                                                                    Array.isArray(selectedUser.bebidas) && Array.isArray(selectedUser.restaurante) && Array.isArray(selectedUser.descorche) && Array.isArray(selectedUser.recepcion) &&
                                                                    [...selectedUser.bebidas, ...selectedUser.restaurante, ...selectedUser.descorche, ...selectedUser.recepcion].length > 0 ? (
                                                                    <table className="w-full text-center">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className=" text-left">Nombre</th>
                                                                                <th style={{ width: "100px" }}>Cantidad</th>
                                                                                <th>mensaje</th>
                                                                                <th>Precio Unitario</th>
                                                                                <th>Total</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {/* Muestra los productos (bebidas y comidas) */}
                                                                            {[...selectedUser.bebidas, ...selectedUser.restaurante, ...selectedUser.descorche, ...selectedUser.recepcion].map((producto, index) => (
                                                                                <tr key={index}>
                                                                                    <td className="text-left" style={{ width: "280px" }}>{producto.nombre}</td>
                                                                                    <td>{producto.cantidad}</td>
                                                                                    <td>{producto.adicional}</td>
                                                                                    <td style={{ width: "280px" }} >{producto.precio}</td>
                                                                                    <td>{producto.cantidad * producto.precio}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                        <tfoot className="border-t-3 border-green-500 pt-2">
                                                                            <tr>
                                                                                <td className="text-left"></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td style={{ height: "60px", paddingRight: "20px", width: "150px" }} className="text-right">Total: {
                                                                                    [...selectedUser.bebidas, ...selectedUser.restaurante, ...selectedUser.recepcion, ...selectedUser.descorche].reduce((acc, producto) =>
                                                                                        acc + (producto.cantidad * producto.precio), 0
                                                                                    )
                                                                                }</td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                ) : (
                                                                    <p className=" w-full text-center">No hay productos que mostrar😔</p>
                                                                )}
                                                            </div>

                                                        </section>
                                                    </div>
                                                </Typography>


                                                <Typography component="div">
                                                    <Button color="primary" onClick={() => {
                                                        Swal.fire({
                                                            title: '¿Estás seguro?',
                                                            text: "¿Quieres guardar esto como PDF?",
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Sí, guardar',
                                                            cancelButtonText: 'No, cancelar'
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                generarPDF(selectedUser._id);
                                                                // Muestra un nuevo SweetAlert con el chulito de confirmación
                                                                Swal.fire({
                                                                    title: '¡Guardado!',
                                                                    text: 'El archivo PDF ha sido guardado exitosamente.',
                                                                    icon: 'success',
                                                                    confirmButtonColor: '#3085d6',
                                                                    confirmButtonText: 'Ok'
                                                                });
                                                            }
                                                        })
                                                    }}>
                                                        Guardar como PDF
                                                    </Button>

                                                    <Button color="danger" variant="light" onClick={closeModal}>
                                                        Cerrar
                                                    </Button>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    )}</td>
                                <td className="text-left"><Popover placement="top">
                                    <PopoverTrigger>
                                        <p onClick={() => seleccionarCliente(cliente.identificacion)}>{cliente.identificacion}</p>
                                    </PopoverTrigger>
                                    <PopoverContent >
                                        {cliente.reserva === "Si" && (cliente.nuevoTotal) !== 0 || cliente.reserva === "No" && (cliente.nuevoTotal) !== 0 ?
                                            <div className="px-1 py-2">
                                                <div className="text-small font-bold">Información</div>
                                                <div className="text-red-500">Datos del usuario</div>
                                                <div>Identificacion: {cliente.identificacion}</div>
                                                <div className="text-tiny">Nombre: {cliente.nombre}</div>
                                                <div className="text-red-500 text-small font-bold">Pago pendiente</div>
                                                <div>{cliente.nuevoTotal}</div>
                                                <Input
                                                    disabled
                                                    type="number"
                                                    name="pagoPendiente"
                                                    placeholder="Ingrse la cantidad"
                                                    className="border-2 border-blue-500 rounded-xl mt-2"
                                                    value={formDatas.pagoPendiente}
                                                    onChange={handleInputChanges}
                                                />

                                                <div><select
                                                    className="w-full h-10 mt-2 outline-none rounded-xl border-2 border-blue-400"
                                                    id="mediosDePagoPendiente"
                                                    name="mediosDePagoPendiente"
                                                    value={formDatas.mediosDePagoPendiente}
                                                    onChange={handleInputChanges}
                                                >
                                                    <option value="">METODO DE PAGO</option>
                                                    <option value="efectivo">Efectivo</option>
                                                    <option value="nequi">Nequi</option>
                                                    <option value="daviplata">Daviplata</option>
                                                    <option value="pse">PSE</option>
                                                    <option value="efecty">Efecty</option>
                                                    <option value="transferencia">Transferencia</option>
                                                </select></div>
                                                <div className=" flex justify-end mt-2">

                                                    <Button color="danger" onClick={actualizarDatosCliente}>Guardar</Button>
                                                </div>
                                            </div>
                                            : "Pago completado🤩"
                                        }
                                    </PopoverContent>
                                </Popover></td>
                                <td className="text-left">{cliente.nombre}</td>
                                <td className="text-center">{cliente.nombre}</td>
                                <td>{cliente.fechaDeRegistro}</td>
                                <td><Dropdown>
                                    <DropdownTrigger>
                                        <Button className="bg-inherent">
                                            <VerticalDotsIcon />
                                        </Button>
                                    </DropdownTrigger>
                                    {cliente.estado === 'activo' && (
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem key="finalizado" color="primary" onClick={() => handleStatus("finalizado", cliente._id)}>Finalizado</DropdownItem>
                                            <DropdownItem
                                                key="new"
                                                className="font-semibold"
                                                style={{ fontWeight: "700" }}
                                                onClick={() => adicional(cliente._id)}
                                            >
                                                Agregar algo mas
                                            </DropdownItem>

                                        </DropdownMenu>
                                    )}
                                    {cliente.estado === 'pendiente' && (
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem key="activo" color="success" onClick={() => handleStatus("activo", cliente._id)}>Activo</DropdownItem>
                                            <DropdownItem key="cancelado" color="danger" onClick={() => handleStatus("cancelado", cliente._id)}>Cancelado</DropdownItem>
                                        </DropdownMenu>
                                    )}

                                    {cliente.estado === "finalizado" && (
                                        <DropdownMenu>
                                            <DropdownItem
                                                key="new"
                                                className="font-semibold"
                                                style={{ fontWeight: "700" }}
                                                onClick={() => adicional(cliente._id)}
                                            >
                                                Agregar algo mas
                                            </DropdownItem>
                                        </DropdownMenu>
                                    )}
                                </Dropdown></td>
                                <td><div className="flex items-center text-center ">
                                    <span className=" mr-2">
                                        <EstadoIcono estado={cliente.estado} />
                                    </span>
                                    {cliente.estado}
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
        </div>
    )
}
