import React, { useState } from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import Navbars from "../components/Navbars";
import AxiosInstance from "../api/axios.js";

export default function App() {
  const [selected, setSelected] = React.useState("login");
  const [formData, setFormData] = useState({
    tipo:"",
    precio:"",
  })
//   const [precios, setPrecios] = useState([])

const handlePasadiaSubmit = async () => {
    try {
      await AxiosInstance.post("/precio-pasadia", formData);
    //   const response = await AxiosInstance.get("/obtener-pasadia");
    //   setPasadiaData(response.data);
    } catch (error) {
      console.error("Error al agregar Pasadia: ", error);
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
        <div>
            <Navbars/>
        </div>
    <div className="flex justify-evenly mt-10">

    <Table aria-label="Example empty table" className="w-6/12">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>PRECIO</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {/* {precios.map((price) =>( */}
        <TableRow>
            <TableCell>hola</TableCell>
            <TableCell>hola</TableCell>
        </TableRow>

        {/* ))} */}
      </TableBody>
    </Table>

      <Card className="max-w-full w-[340px] h-[250px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
          >
            <Tab value="pasadia" key="pasadia" title="Pasadia">
              <form className="flex flex-col gap-4">
                <select 
                name="tipo" 
                type="text" 
                id=""
                value={formData.tipo}
                onChange={handleChange}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="ninios">Ninos</option>
                    <option value="adultos">Adultos</option>
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
            <Tab key="cabanias" title="Cabañas">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Precio" placeholder="Ingrese el precio" type="password" />
               
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Cabañas
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="habitaciones" title="Habitaciones">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Precio" placeholder="Ingrese el precio" type="password" />
                
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Habitaciones
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
