import React, { useState, useEffect } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import Navbars from "../../components/Navbars.jsx";
import AxiosInstance from "../../api/axios.js";
import pen from "../../images/pencil.png"
import update from "../../images/update.png"
import toast, { Toaster } from 'react-hot-toast';
import { DeleteIcon } from "./DeleteIcon.jsx";
import { EditIcon } from "./EditIcon.jsx";
import { EyeIcon } from "./EyeIcon.jsx";
import { registrarPrecios, obtenerPrecios } from "../../api/ranch.api.js";
export default function App() {
    const [selected, setSelected] = React.useState("login");
    const [preciosData, setPreciosData] = useState([]);
    const [formData, setFormData] = useState({
        tipo: "",
        precio: "",
        producto: ""
    })

    const [editedUserId, setEditedUserId] = useState(null);
    const [editPrecio, setEditPrecio] = useState("");
    const [editTipo, setEditTipo] = useState("");
    const [editServicio, setEditServicio] = useState("");
    //   const [precios, setPrecios] = useState([])


    const handleSubmitInvR = async () => {
        try {
            await registrarPrecios( formData);
            setFormData({
                tipo: "",
                precio: "",
                producto: ""
            })
            const response = await AxiosInstance.get("/table-precios");
            setPreciosData(response.data);
        } catch (error) {
            console.error("Error al agregar Pasadia: ", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerPrecios("/precios-ranch");
                setPreciosData(response);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);
  
    
    const handleEditSave = async () => {
        try {
            await AxiosInstance.put(`/precios-ranch/edit/${editedUserId}`,
                {
                    producto: editServicio,
                    tipo: editTipo,
                    precio: editPrecio
                }
            );

            const updatedPrices = preciosData.map((price) =>
                price._id === editedUserId ? { ...price, producto: editServicio, tipo: editTipo, precio: editPrecio } : price
            );
            setPreciosData(updatedPrices);

            setEditServicio("");
            setEditTipo("");
            setEditPrecio("");
            setEditedUserId(null);

            toast.success('Precio actualizado exitosamente!');
            const response = await obtenerPrecios("/table-precios");
            setPreciosData(response);
        } catch (error) {
            console.error("Error al editar el precio:", error);
            alert("Error al editar el precio. Por favor, inténtalo de nuevo más tarde.");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className="flex flex-col w-full">
            <Toaster />
            <div>
                <Navbars />
            </div>
            <h1 className="uppercase text-4xl mt-6 text-white w-ful flex justify-center">precios de los servicios</h1>
            <div className="flex justify-evenly mt-10">

                <Table aria-label="Example empty table" className="w-8/12">
                    <TableHeader className="text-center">
                        <TableColumn className="text-center">PRODUCTO</TableColumn>
                        <TableColumn className="text-center">TIPO</TableColumn>
                        <TableColumn className="text-center">PRECIO</TableColumn>
                        <TableColumn className="text-center">FECHA DE CREACIÓN</TableColumn>
                        <TableColumn className="text-center">ACCIÓN</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {preciosData.map((price) => (
                            <TableRow key={price._id} className="text-center">
                                <TableCell>
                                    {
                                        price._id === editedUserId ? (
                                            <div>
                                                <Input
                                                    className="bg-white border-2 border-blue-500 rounded-xl w-28"
                                                    value={editServicio}
                                                    onChange={(e) => setEditServicio(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            price.producto
                                        )
                                    }</TableCell>
                                <TableCell>
                                    {
                                        price._id === editedUserId ? (
                                            <div>
                                                <Input
                                                    className="bg-white border-2 border-blue-500 rounded-xl w-28"
                                                    value={editTipo}
                                                    onChange={(e) => setEditTipo(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            price.tipo
                                        )
                                    }</TableCell>
                                <TableCell>{
                                    price._id === editedUserId ? (
                                        <div>
                                            <Input
                                                className="bg-white border-2 border-blue-500 rounded-xl w-28"
                                                value={editPrecio}
                                                onChange={(e) => setEditPrecio(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        price.precio
                                    )
                                }</TableCell>
                                <TableCell>
                                    {
                                        new Date(price.fecha).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                    }
                                </TableCell>
                                <TableCell className="text-3xl flex text-center justify-center items-center">
                                    <div className="flex w-32 justify-center items-center">
                                        {price._id === editedUserId && (
                                            <div className="h-10 w-10 border-2 flex justify-center items-center rounded-full border-green-400 cursor-pointer mr-2">
                                                <img
                                                    className="w-6 h-6  cursor-pointer"
                                                    src={update}
                                                    alt="actualizar"
                                                    onClick={() => handleEditSave(price._id)}
                                                />
                                            </div>
                                        )}

                                        <Tooltip color="primary" content="Edit user">
                                            <span className="text-lg text-blue-500 cursor-pointer active:opacity-50 ml-5">
                                                <EditIcon onClick={() => {
                                                setEditPrecio(price.precio),
                                                setEditServicio(price.producto),
                                                setEditTipo(price.tipo),
                                                setEditedUserId(price._id)

                                        }
                                        } />
                                            </span>
                                        </Tooltip>

                                        <Tooltip color="danger" content="Delete user">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50 ml-5">
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>

                                        


                                    </div>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

                <Card className="max-w-full w-[340px] h-[350px]">
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                        >
                            <Tab key="pasadia" title="REGISTRO">
                                <form className="flex flex-col gap-4">
                                    <select
                                        className="outline-none h-14 border-blue-500 border-3 rounded-xl"
                                        name="producto"
                                        type="text"
                                        id=""
                                        value={formData.producto}

                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccione el producto</option>
                                        <option value="huevo">Huevo</option>
                                        <option value="leche">Leche</option>
                                        <option value="queso">Queso</option>
                                        <option value="cerdo">Cerdo</option>
                                        <option value="pollo">Pollo</option>
                                    </select>
                                    <select
                                        className="outline-none h-14 border-blue-500 border-3 rounded-xl"
                                        name="tipo"
                                        type="text"
                                        id=""
                                        value={formData.tipo}

                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccione una opcion</option>
                                        <option value="unidad">Unidad</option>
                                        <option value="carton">Carton</option>
                                        <option value="litro">Litro</option>
                                        <option value="gramoCerdo">Gramo cerdo</option>
                                        <option value="libraCerdo">Libra cerdo</option>
                                        <option value="KiloCerdo">Kilo cerdo</option>
                                        <option value="gramoQueso">Gramo queso</option>
                                        <option value="Libraqueso">Libra queso</option>
                                        <option value="Kiloqueso">Kilo queso</option>
                                    </select>
                                    <Input
                                        name="precio"
                                        isRequired
                                        label="Precio"
                                        placeholder="Ingrese el precio"
                                        type="email"
                                        value={formData.precio}
                                        onChange={handleChange}
                                    />

                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary" onClick={handleSubmitInvR}>
                                            Pasadia
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
