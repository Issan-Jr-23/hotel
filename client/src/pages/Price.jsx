import React, { useState, useEffect } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Badge } from "@nextui-org/react";
import Navbars from "../components/Navbars";
import AxiosInstance from "../api/axios.js";
import pen from "../images/pencil.png"
import update from "../images/update.png"
import toast, {Toaster} from 'react-hot-toast';

export default function App() {
  const [selected, setSelected] = React.useState("login");
  const [preciosData, setPreciosData] = useState([]);
  const [formData, setFormData] = useState({
    tipo: "",
    precio: "",
    servicio: ""
  })
  const [editedUserId, setEditedUserId] = useState(null);
  const [editPrecio, setEditPrecio] = useState("");
  const [editTipo, setEditTipo] = useState("");
  const [editServicio, setEditServicio] = useState("");
  //   const [precios, setPrecios] = useState([])


  const handlePasadiaSubmit = async () => {
    try {
      await AxiosInstance.post("/precio-pasadia", formData);
      setFormData({
        tipo: "",
        precio: "",
        servicio: ""
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
        const response = await AxiosInstance.get("/table-precios");
        setPreciosData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditSave = async () => {
    try {
        await AxiosInstance.put(`/precios/edit/${editedUserId}`, 
            {
                servicio: editServicio,
                tipo: editTipo,
                precio: editPrecio
            }
        );

        const updatedPrices = preciosData.map((price) =>
            price._id === editedUserId ? { ...price, servicio: editServicio, tipo: editTipo, precio: editPrecio } : price
        );
        setPreciosData(updatedPrices);

        setEditServicio("");
        setEditTipo("");
        setEditPrecio("");
        setEditedUserId(null);

        toast.success('Precio actualizado exitosamente!');
        const response = await AxiosInstance.get("/table-precios");
        setPreciosData(response.data);
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
       <Toaster/>
      <div>
        <Navbars />
      </div>
      <h1 className="uppercase text-4xl mt-6 text-white w-ful flex justify-center">precios de los servicios</h1>
      <div className="flex justify-evenly mt-10">

        <Table aria-label="Example empty table" className="w-8/12">
          <TableHeader className="text-center">
            <TableColumn className="text-center">SERVICIO</TableColumn>
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
                      price.servicio
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
                  <div className="flex w-28 justify-center items-center">
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

                  <div className="h-10 w-10 border-2 flex justify-center items-center rounded-full border-blue-400 cursor-pointer ml-2" onClick={() => {
                        setEditPrecio(price.precio),
                          setEditServicio(price.servicio),
                          setEditTipo(price.tipo),
                          setEditedUserId(price._id)

                      }
                      }>
                    <img
                      className="w-4"
                      
                      src={pen}
                      alt="" />
                  </div> 

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
                    name="servicio"
                    type="text"
                    id=""
                    value={formData.servicio}

                    onChange={handleChange}
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="pasadia">Pasadia</option>
                    <option value="cabanias">Cabaña</option>
                    <option value="cabaniaMayapo">Cabaña Mayapo</option>
                    <option value="habitaciones">Habitaciones</option>
                    <option value="adicional">Precio adicional</option>
                  </select>
                  <select
                    className="outline-none h-14 border-blue-500 border-3 rounded-xl"
                    name="tipo"
                    type="text"
                    id=""
                    value={formData.tipo}

                    onChange={handleChange}
                  >
                    <option value="">Seleccione el tipo</option>
                    <option value="ninios">Ninos</option>
                    <option value="adultos">Adultos</option>
                    <option value="todos">Todos</option>
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
                    <Button fullWidth color="primary" onClick={handlePasadiaSubmit}>
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
