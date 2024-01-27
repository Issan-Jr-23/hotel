import React, { useState, useEffect } from "react";
import { Table, Modal, Box, Typography, Pagination } from "@mui/material";
import { Button, Input, Select, SelectItem, useDisclosure, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import fd from "../../images/flechas-dobles.png"
import toast, { Toaster } from "react-hot-toast";
import Lottie from "react-lottie"
import loading_progress from "../../images/Animation-alternativa-loading.json"
import { SearchIcon } from "../tablePasadia/SearchIcon";
import { PlusIcon } from "../finca/PlusIcon";
import AxiosInstance from "../../api/axios.js"
import chevron from "../../images/right.png";





export default function cabaniaTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [busqueda, setBusqueda] = useState("")
    const [users, setUsers] = useState([])
    const handleOpenMod = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [openTd, setOpenTd] = React.useState(false);
    const handleCloseTd = () => setOpenTd(false);

    const [errorFechaPasadia, setErrorFechaPasadia] = useState(false);
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorReserva, setErrorReserva] = useState(false);
    const [errorAdultos, setErrorAdultos] = useState(false);
    const [errorCabania, setErrorCabania] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedClienteId, setSelectedClienteId] = useState(null);

    const [formData, setFormData] = useState({
        identificacion: "",
        nombre: "",
        reserva: "",
        cantidadPersonas: {
            adultos: "",
            ninios: "",
        },
        mediosDePago: "",
        pagoAnticipado: "",
        mediosDePagoPendiente: "",
        pagoPendiente: "",
        fechaPasadia: "",
        tipo_cabania: "",
        nuevoTotal: ""
    });

    const options = ["Si", "No"];

    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };


    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await AxiosInstance.get(`/cabania-clientes?page=${paginaActual}`);
                setUsers(response.data.clientes);
                setTotalPaginas(response.data.totalPages);
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            } catch (error) {
                console.error("Error al obtener los clientes: ", error);
            }
        };

        obtenerClientes();
    }, [paginaActual]);


    const cambiarPagina = (event, value) => {
        setIsLoading(true);
        setPaginaActual(value);
    };

    const handleInputChange = (event, fieldName) => {
        const { name, value } = event.target;
        let nuevoTotal, totalCosto;


        if (name === 'identificacion') {
            setErrorIdentificacion(!value);
        } else if (name === 'nombre') {
            setErrorNombre(!value);
        } else if (name === 'fechaPasadia') {
            setErrorFechaPasadia(!value);
        } else if (name === 'reserva') {
            setErrorReserva(!value);
        } else if (name === 'adultos') {
            setErrorAdultos(!value);
        } else if (name === 'tipo_cabania') {
            setErrorCabania(!value)
        }


        if (name === "tipo_cabania") {
            totalCosto = value === "Mayapo" ? valorCabaniaM : valorCabania;
        } else {
            totalCosto = formData.tipo_cabania === "Mayapo" ? valorCabaniaM : valorCabania;
        }

        const cantidadDeClientes = formData.cantidadPersonas.ninios + formData.cantidadPersonas.adultos;
        if (cantidadDeClientes > 4) {
            totalCosto += ((cantidadDeClientes - 4) * valorPorPersonaAdicional);
        }


        if (name === 'pagoPendiente' || name === 'pagoAnticipado') {
            const pagoPendiente = name === 'pagoPendiente' ? parseFloat(value) : parseFloat(formData.pagoPendiente || 0);
            const pagoAnticipado = name === 'pagoAnticipado' ? parseFloat(value) : parseFloat(formData.pagoAnticipado || 0);
            const totalPagos = pagoPendiente + pagoAnticipado;

            if (totalPagos > totalCosto) {
                alert('La suma de los montos no puede ser mayor que el costo total.');
            } else {
                nuevoTotal = totalCosto - totalPagos;
                formData.nuevoTotal = nuevoTotal;

                console.log("el total que debe pagar la persona: " + nuevoTotal)


                if (nuevoTotal > 0) {


                }
            }
        }


        console.log("alerta de nuevo total: " + formData.nuevoTotal)


        console.log("total de personas: " + formData.cantidadPersonas.ninios);
        console.log("total costo 3: " + totalCosto);

        const totalPendiente = totalCosto;
        console.log("total costo 2: " + totalPendiente);

        if ((name === 'pagoPendiente' && parseFloat(value) > totalPendiente) ||
            (name === 'pagoAnticipado' && parseFloat(value) > totalCosto)) {
            alert('El monto no puede ser mayor que el costo total o el monto pendiente.');
        } else {
            if ((name === 'ninios' || name === 'adultos')) {
                const nuevosValores = {
                    ...formData.cantidadPersonas,
                    [fieldName]: parseInt(value, 10)
                };
                const nuevoTotalClientes = nuevosValores.ninios + nuevosValores.adultos;

                if (nuevoTotalClientes !== cantidadDeClientes) {
                    formData.pagoAnticipado = "";
                }
            }

            setFormData({
                ...formData,
                [name]: value,
                totalCosto,
                nuevoTotal: formData.nuevoTotal,
                ...(name === "tipo_cabania" && { [name]: value }),
                ...(fieldName ? { cantidadPersonas: { ...formData.cantidadPersonas, [fieldName]: parseInt(value, 10) } } : {})
            });
        }
    };

    const handleFormSubmit = async (event) => {
        try {



            event.preventDefault();
            let formIsValid = true;

            //fecha pasadia 

            if (!formData.fechaPasadia) {
                setErrorFechaPasadia(true);
                formIsValid = false;
            } else {
                setErrorFechaPasadia(false);
            }

            //identificacion

            if (!formData.identificacion) {
                setErrorIdentificacion(true);
                formIsValid = false;
            } else {
                setErrorIdentificacion(false);
            }

            //nombre

            if (!formData.nombre) {
                setErrorNombre(true)
                formIsValid = false
            } else {
                setErrorNombre(false)
            }

            //reserva

            if (!formData.reserva) {
                setErrorReserva(true)
                formIsValid = false
            } else {
                setErrorReserva(false)
            }

            //adultos

            if (!formData.cantidadPersonas.adultos) {
                setErrorAdultos(true)
                formIsValid = false
            } else {
                setErrorAdultos(false)
            }

            if (!formData.tipo_cabania) {
                setErrorCabania(true)
                formIsValid = false
            } else {
                setErrorCabania(false)
            }

            if (formIsValid) {




                await AxiosInstance.post("/cabania-registrar-cliente", formData);
                onClose();
                toast.success('Cliente agregado exitosamente!');
                setFormData({
                    identificacion: "",
                    nombre: "",
                    reserva: "",
                    pagoPendienteTotal: "",
                    totalConsumo: "",
                    cantidadPersonas: {
                        adultos: "",
                        ninios: "",
                    },
                    tipo_cabania: ""
                });
                const response = await AxiosInstance.get(`/cabania-clientes?page=${page}`);
                setUsers(response.data.clientes);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            toast.error('Ocurrió un error al agregar el cliente.');
        }
    };

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setOpenTd(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const [formDatas, setFormDatas] = useState({
        pagoPendiente: '',
        mediosDePagoPendiente: ''
    });

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setFormDatas({ ...formDatas, [name]: value });
    };

    const seleccionarCliente = (identificacion) => {
        setSelectedClienteId(identificacion);
        calcularPagoPendiente(identificacion);
    };

    const calcularPagoPendiente = (identificacion) => {
        const clienteSeleccionado = users.find(user => user.identificacion === identificacion);
        if (clienteSeleccionado) {
            const valorCabaniaActual = clienteSeleccionado.nuevoTotal
            const pagoPendienteCalculado = valorCabaniaActual;
            setFormDatas({
                ...formDatas,
                pagoPendiente: pagoPendienteCalculado.toString()
            });
        }
    };

    const actualizarDatosCliente = async () => {
        if (!formDatas.pagoPendiente || !formDatas.mediosDePagoPendiente) {
            toast.error('Debe llenar todos los campos');
            return;
        }

        if (selectedClienteId) {
            console.log("identificacion del cliente: " + selectedClienteId)
            try {
                const clienteResponse = await AxiosInstance.get(`/cabania-clientes-identificacion/${selectedClienteId}`);
                const clienteData = clienteResponse.data;

                const nuevoValorTotal = clienteData.valorTotal - formDatas.pagoPendiente;

                const response = await AxiosInstance.put(`/cabania-clientes/${selectedClienteId}/actualizar`, {
                    valorTotal: nuevoValorTotal,
                    pagoPendiente: formDatas.pagoPendiente,
                    mediosDePagoPendiente: formDatas.mediosDePagoPendiente
                });

                setFormDatas({
                    pagoPendiente: '',
                    mediosDePagoPendiente: ''
                });

                toast.success('Datos actualizados exitosamente');

                const responses = await AxiosInstance.get(`/cabania-clientes?page=${paginaActual}`);
                setUsers(responses.data.clientes);
                setTotalPaginas(responses.data.totalPages);

            } catch (error) {
                console.error('Hubo un problema con la petición Axios:', error);
            }
        } else {
            console.error('No hay un cliente seleccionado para actualizar');
        }
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: "min-height-90vh",
        bgcolor: 'background.paper',
        overflow: "scroll",
        boxShadow: 0,
        p: 4,
        borderRadius: 5,
        outline: "none"
    };

    const styleAdd = {
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
        borderRadius: 5,
        outline: "none"
    };

    const defaultOptionLoading = {
        loop: true,
        autoPlay: true,
        animationData: loading_progress,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    return (
        <div className="pt-20 flex justify-center items-center flex-col">
            <Toaster />
            <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
                <Lottie options={defaultOptionLoading} width={100} height={100} />
                {/* <p>Cargando recursos</p> */}
            </div>

            <div className="media-query-add-search">
                <div className="">
                    <Input
                        label="Search"
                        value={busqueda}
                        onChange={handleSearchChange}
                        isClearable
                        radius="lg"
                        className="w-72 h-12"
                        classNames={{
                            label: "text-black/50 dark:text-white/90",
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-black/90",
                                "placeholder:text-black/60 dark:placeholder:text-black/60",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "shadow-xl",
                                "bg-default-200/50",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        placeholder="Type to search..."
                        startContent={
                            <SearchIcon className="text-black/50 mb-0.5 dark:text-black/90 text-black pointer-events-none flex-shrink-0" />
                        }
                    />
                </div>

                <div className="">
                    <div className="flex  flex-wrap gap-3">

                        <div>
                            <Button
                                variant="flat"
                                onClick={handleOpenMod}
                                className="capitalize text-white bg-black"
                            >
                                <PlusIcon /> Agregar
                            </Button>
                        </div>
                        <div className="flex items-center justify-center w-32 ">
                            <Button className="bg-blue-500 w-28 text-white">
                                Exportar
                            </Button>
                        </div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        BackdropProps={{
                            style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                        }}>
                        <Box sx={style} style={{
                            maxHeight: "90vh",
                            minHeight: "min-content",
                            overflowY: "auto"
                        }}>
                            <>
                                <Typography className="flex flex-col gap-1" component="div"></Typography>
                                <Typography component="div" >

                                    <Input
                                        isRequired
                                        id="identificacion"
                                        name="identificacion"
                                        type="number"
                                        variant="flat"
                                        label="IDENTIFICACIÓN DE USUARIO"
                                        value={formData.identificacion}
                                        onChange={handleInputChange}
                                        className={`rounded-xl border-2 h-12 ${errorIdentificacion ? 'border-red-500' : 'border-blue-400'}`}
                                    />
                                    <Input
                                        isRequired
                                        id="nombre"
                                        name="nombre"
                                        type="text"

                                        variant="flat"
                                        label="NOMBRE DE USUARIO"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        className={`rounded-xl border-2 h-12  ${errorNombre ? 'border-red-500' : 'border-blue-400'}`}
                                    />

                                    <Select
                                        isRequired
                                        id="reserva"
                                        name="reserva"
                                        label="¿LA RESERVA FUE REALIZADA?"
                                        className={`rounded-xl border-2  ${errorReserva ? 'border-red-500' : 'border-blue-400'}`}
                                        value={formData.reserva}
                                        onChange={(event) => handleReservaChange(event.target.value)}
                                    >
                                        {options.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <select
                                        required
                                        id="tipo_cabania"
                                        name="tipo_cabania"

                                        value={formData.tipo_cabania}
                                        onChange={(event) => handleInputChange(event)}
                                        className={`h-14 outline-none rounded-xl border-2 ${errorCabania ? 'border-red-500' : 'border-blue-400'}`}
                                    >
                                        <option value="">ELIGIR CABAÑA </option>
                                        <option value="Macuira">MACUIRA</option>
                                        <option value="Taroa">TAROA</option>
                                        <option value="Mayapo">MAYAPO</option>
                                    </select>
                                    <div className="flex">


                                        <Input
                                            isRequired
                                            id="adultos"
                                            name="adultos"
                                            type="number"
                                            variant="flat"
                                            label="CANTIDAD DE ADULTOS"
                                            value={formData.cantidadPersonas.adultos}
                                            onChange={(event) => handleInputChange(event, "adultos")}
                                            className={` rounded-xl border-2 h-12  ${errorAdultos ? 'border-red-500' : 'border-blue-400'}`}
                                        />
                                        <Input
                                            required
                                            id="ninios"
                                            name="ninios"
                                            type="number"
                                            variant="flat"
                                            label="CANTIDAD DE NIÑOS"
                                            value={formData.cantidadPersonas.ninios}
                                            onChange={(event) => handleInputChange(event, "ninios")}
                                            className="ml-3 h-12  border-green-400 border-2 rounded-xl"

                                        />
                                    </div>
                                    <div className="flex">

                                        <select
                                            id="mediosDePago"
                                            name="mediosDePago"

                                            value={formData.mediosDePago}
                                            onChange={(event) => handleInputChange(event)}
                                            className="mr-3 w-6/12 outline-none border-2 rounded-xl border-blue-400"
                                        >
                                            <option value="">METODO DE PAGO</option>
                                            <option value="efectivo">Efectivo</option>
                                            <option value="nequi">Nequi</option>
                                            <option value="daviplata">Daviplata</option>
                                            <option value="pse">PSE</option>
                                            <option value="efecty">Efecty</option>
                                            <option value="transferencia">Transferencia</option>
                                        </select>
                                        <Input
                                            required
                                            id="pagoAnticipado"
                                            name="pagoAnticipado"
                                            className="w-6/12 ml-3 rounded-xl border-2  border-blue-400"
                                            type="number"
                                            variant="flat"
                                            label="PAGO ANTICIPADO"
                                            value={formData.pagoAnticipado}
                                            onChange={handleInputChange}

                                        />
                                    </div>
                                    <Input
                                        isRequired
                                        name="fechaPasadia"
                                        type="date"
                                        label="FECHA EN LA QUE DESEA DISFRUTAR DE LA CABAÑA"
                                        className={` rounded-xl border-2 ${errorFechaPasadia ? 'border-red-500' : 'border-blue-400'}`}
                                        placeholder="Fecha en la desea disfrutar el pasadia"
                                        value={formData.fechaPasadia}
                                        onChange={handleInputChange}
                                    />
                                    <div className="flex">
                                        <select
                                            className="w-6/12 mr-3 outline-none rounded-xl border-2 border-blue-400"
                                            id="mediosDePagoPendiente"
                                            name="mediosDePagoPendiente"
                                            value={formData.mediosDePagoPendiente}
                                            onChange={(event) => handleInputChange(event)}
                                        >
                                            <option value="">METODO DE PAGO</option>
                                            <option value="efectivo">Efectivo</option>
                                            <option value="nequi">Nequi</option>
                                            <option value="daviplata">Daviplata</option>
                                            <option value="pse">PSE</option>
                                            <option value="efecty">Efecty</option>
                                            <option value="transferencia">Transferencia</option>
                                        </select>
                                        <Input
                                            id="pagoPendiente"
                                            name="pagoPendiente"
                                            className="w-6/12 ml-3 border-2 border-blue-400 rounded-xl"
                                            type="number"
                                            variant="flat"
                                            label="PAGO ANTICIPADO"
                                            value={formData.pagoPendiente}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </Typography>
                                <Typography component="div" >
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onClick={handleFormSubmit}>
                                        Guardar
                                    </Button>
                                </Typography>
                            </>

                        </Box>
                    </Modal>
                </div>
            </div>


            <span className="media-query-tittle"><h1>Pasadia</h1></span>
            <section style={{ width: "90vw" }}>
                <div className="flex justify-end mb-5">
                    <Pagination
                        count={totalPaginas}
                        page={paginaActual}
                        onChange={cambiarPagina}
                        color="primary"
                    />
                </div>
                <Table>
                    <thead className="html-table-thead">
                        <tr className="html-table-tr border-b-2 border-red-100" >
                            <th className="html-table-tr-th"> <span className="html-table-thead-span">+ <p></p>  <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span"> <p></p>  Id<img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span"> <p></p>  Nombre <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span"> <p></p>  Agregar bebida <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span"> <p></p>  Agregar comida <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span"> <p></p>  Pago pendiente <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span"> <p></p>  Estado <img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                            <th className="html-table-tr-th"> <span className="html-table-thead-span-fn"> <p></p><img className="cursor-pointer mr-2" src={fd} alt="" style={{ width: "12px", height: "12px", }} /> </span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((cliente) => (
                            <tr>
                                <td className="text-left html-table-tbody">
                                    <Button className="bg-white" onClick={() => handleOpenModal(cliente)}>
                                        <img className="w-4" src={chevron} alt="" />
                                    </Button>
                                    {selectedUser && (
                                        <Modal open={openTd} onClose={handleCloseTd} className=""

                                        >
                                            <Box sx={styleAdd} style={{
                                                maxHeight: "90vh",
                                                minHeight: "min-content",
                                                overflowY: "auto"
                                            }} >
                                                <Typography component="div" className="border-b-3 border-blue-500 text-3xl flex  justify-between">
                                                    <div className="mb-0.5 text-2xl">History</div>
                                                    <div className="uppercase text-lg"> {selectedUser.nombre} - {selectedUser.identificacion}</div>
                                                </Typography>
                                                <Typography component="div" className="uppercase flex">
                                                    <div className="flex w-full">
                                                        <section className="flex justify-between w-full flex-wrap">

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


                                                <Typography component="div" >
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
                                    )}
                                </td>
                                <td className="text-left html-table-tbody">
                                    <Popover placement="top">
                                        <PopoverTrigger>
                                            <p onClick={() => seleccionarCliente(cliente.identificacion)}>{cliente.identificacion}</p>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            {cliente.reserva === "Si" && cliente.tipo_cabania !== "Mayapo" && ((cliente.nuevoTotal)) || cliente.reserva === "Si" && cliente.tipo_cabania === "Mayapo" && ((cliente.nuevoTotal)) ||
                                                cliente.reserva === "No" && cliente.tipo_cabania === "Mayapo" && ((cliente.nuevoTotal)) !== 0 ?
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">Información</div>
                                                    <div className="text-red-500">Datos del usuario</div>
                                                    <div>Identificacion: {cliente.identificacion}</div>
                                                    <div className="text-tiny">Nombre: {cliente.nombre}</div>
                                                    <div className="text-red-500 text-small font-bold">Pago pendiente</div>
                                                    <div>{cliente.tipo_cabania === "Mayapo" ? ((cliente.nuevoTotal))
                                                        : ((cliente.nuevoTotal))}</div>
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
                                    </Popover>
                                </td>
                                <td className="text-left html-table-tbody">
                                    <Popover placement="bottom" offset={20} showArrow>
                                        <PopoverTrigger>
                                            <p>{cliente.nombre}</p>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="px-1 py-2">
                                                <div className="text-small font-bold">Información</div>
                                                <div className="text-red-500">Cantidad de personas</div>
                                                <div className="text-tiny">Adultos: {cliente.cantidadPersonas.adultos}</div>
                                                <div>Niños: {cliente.cantidadPersonas.ninios}</div>
                                                <div className="text-red-500">Anticipo de pasadia</div>
                                                <div>Metodo de pago: {cliente.mediosDePago}</div>
                                                <div>Anticipo: {cliente.pagoAnticipado}</div>
                                                <div className="text-red-500">pago pendienete o total</div>
                                                <div>Metodo de pago: {cliente.mediosDePagoPendiente}</div>
                                                <div>Pago pendiente: {cliente.pagoPendiente}</div>
                                                <div>pendiente: {cliente.tipo_cabania === "Mayapo" ? ((cliente.nuevoTotal))
                                                    : ((cliente.nuevoTotal))}</div>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </td>
                                <td className="text-left html-table-tbody"></td>
                                <td className="html-table-tbody"></td>
                                <td className="html-table-tbody"></td>
                                <td className="html-table-tbody"></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
        </div>
    )
}