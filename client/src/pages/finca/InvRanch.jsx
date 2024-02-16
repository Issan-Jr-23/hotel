import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Tooltip } from "@nextui-org/react";
// import Navbars from "../../components/Navbars.jsx";
import { EditIcon } from "./EditIcon.jsx";
import { DeleteIcon } from "./DeleteIcon.jsx";
import { EyeIcon } from "./EyeIcon.jsx";
import { obtenerInventario, registrarData, deleteRegistro } from "../../api/ranch.api.js";
import { PlusIcon } from "./PlusIcon.jsx";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

export default function App() {
    const [selectedColor, setSelectedColor] = React.useState("default");
    const [inventario, setInventario] = useState([]);
    const [formData, setFormData] = React.useState({
        Descripcion: "",
        Ubicacion: "",
        Cantidad: ""
    })
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await obtenerInventario();
                setInventario(getData);
                console.log("My data: " + getData)
            } catch (error) {
                console.log("los datos no se pudieron obtener en este momento")
            }
        }
        fetchData();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFormSubmit = async () => {
        try {
            await registrarData(formData)
            toast.success('Datos actualizados exitosamente');
            const getData = await obtenerInventario();
            setInventario(getData);
            onClose();
        } catch (error) {
            toast.error('Error al guardar los datos');
            console.log("Error al guardar los datos", error)
        }
    }

    const handleOpen = async () => {
        setFormData({
            Descripcion: "",
            Ubicacion: "",
            Cantidad: ""
        })
        onOpen();
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await deleteRegistro(id);
            const updatedUsers = inventario.filter((inv) => inv._id !== id);
            setInventario(updatedUsers);
            Swal.fire({
                title: "Good job!",
                text: "Registro eliminado exitosamente!",
                icon: "success"
            });
        } catch (error) {
            alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div className="flex flex-col gap-3 pt-20">
            <Toaster position="top-right" />
            <h1 className="W-FULL H text-center" style={{ fontSize: "32px" }}>INVENTARIO FINCA</h1>
            {/* <Navbars /> */}
            <div>
                <>
                    <Button color="success" onPress={() => handleOpen()} className="text-white ml-5" >Agregar <PlusIcon /> </Button>
                    <Modal
                        backdrop="transparent"
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        motionProps={{
                            variants: {
                                enter: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut",
                                    },
                                },
                                exit: {
                                    y: -20,
                                    opacity: 0,
                                    transition: {
                                        duration: 0.2,
                                        ease: "easeIn",
                                    },
                                },
                            }
                        }}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col justify-center items-center gap-1 ">Registro</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            required
                                            label="Descripcion"
                                            type="text"
                                            name="Descripcion"
                                            value={formData.Descripcion}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            required
                                            label="Ubicación"
                                            type="text"
                                            name="Ubicacion"
                                            value={formData.Ubicacion}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            required
                                            label="Cantidad"
                                            type="text"
                                            name="Cantidad"
                                            value={formData.Cantidad}
                                            onChange={handleInputChange}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onClick={handleFormSubmit}>
                                            Action
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
                <div className="ml-5 mr-5">
                    <RadioGroup
                        className="mb-5"
                        label="Selection color"
                        orientation="horizontal"
                        value={selectedColor}
                        onValueChange={setSelectedColor}
                        style={{ color: "white" }}
                    >
                        {colors.map((color) => (
                            <Radio
                                key={color}
                                color={color}
                                value={color}
                                className="capitalize"

                            >
                                {color}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <Table
                        color={selectedColor}
                        selectionMode="single"
                        defaultSelectedKeys={["1"]}
                        aria-label="Example static collection table"
                    >
                        <TableHeader>
                            <TableColumn>Descripcion</TableColumn>
                            <TableColumn>Cantidad</TableColumn>
                            <TableColumn>Ubicacion</TableColumn>
                            {/* <TableColumn className="text-center" >Acciones</TableColumn> */}
                        </TableHeader>
                        <TableBody emptyContent="No hay elementos por mostrar">
                            {inventario.map((data) => (
                                <TableRow key={data._id} className="h-12">
                                    <TableCell>{data.Descripcion}</TableCell>
                                    <TableCell>{data.Cantidad}</TableCell>
                                    <TableCell>{data.Ubicacion}</TableCell>
                                    {/* <TableCell className="flex h-12  justify-center items-center">
                                        <Tooltip content="Details">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="primary" content="Edit user">
                                            <span className="text-lg text-primary cursor-pointer active:opacity-50 ml-5">
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete user">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50 ml-5">
                                                <DeleteIcon onClick={() => handleDelete(data._id)} />
                                            </span>
                                        </Tooltip>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    );
}
