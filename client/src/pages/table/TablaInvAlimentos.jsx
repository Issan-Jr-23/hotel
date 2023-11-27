import React, { useState, useEffect } from "react";
import { Table, TableHeader,Button, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from "axios";
import CardDesplegable from './CardAlimentos.jsx'
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import  AxiosInstance  from "../../api/axios.js";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async (newFoodData) => {
      try {
        const response = await AxiosInstance.get("/obtener-alimentos", newFoodData);
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div className='flex my-5'>
            <div className='mr-5'>
        <CardDesplegable />
            </div>
        </div>
        <section className="flex coluns-2 ">
          <Table className="mx-5 text-center" aria-label="Lista de Usuarios">
            <TableHeader className="text-center">
              <TableColumn className="text-center">Nombre</TableColumn>
              <TableColumn className="text-center">Tamaño</TableColumn>
              <TableColumn className="text-center">Cantidad</TableColumn>
              <TableColumn className="text-center">Fecha de caducidad</TableColumn>
              <TableColumn className="text-center">Alert</TableColumn>
              <TableColumn className="text-center">Precio de venta</TableColumn>
              <TableColumn className="text-center">Accion</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {users.map((mekatos) => ( 
                <TableRow key={mekatos.id}>
                  <TableCell className="border-r-3 border-blue-600"> {mekatos.nombre}</TableCell>
                  <TableCell>{mekatos.tamaño}</TableCell>
                  <TableCell>{mekatos.cantidad}</TableCell>
                  <TableCell>{mekatos.fechaCaducidad}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{mekatos.precioVenta}</TableCell>
                  <TableCell className="flex justify-center align-center"> <img
                    className="w-8 h-8 mr-4 cursor-pointer"
                    src={editar}
                    alt="Edit"
                  />
                  <img
                    className="w-8 h-8 cursor-pointer"
                    src={borrar}
                    alt="Delete"
                  /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
    </div>
  );
}
