import React, { useState, useEffect } from "react";
import { Table, TableHeader,Button, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from "axios";
import CardDesplegable from './CardBebidas.jsx';
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-bebidas");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
        <div className='flex my-5 justify-between border-2'>
            <div className='mr-5 '>
        <CardDesplegable />
            </div>
            
        <img
          className="w-9 h-9 mr-4 cursor-pointer"
          src={download}
          alt="Edit"
          />

            
        </div>
        <section className="flex coluns-2 ">
          <Table className="mx-5 text-center" aria-label="Lista de Usuarios">
            <TableHeader className="text-center">
              <TableColumn className="text-center">descripcion del producto</TableColumn>
              <TableColumn className="text-center">fecha de caducidad</TableColumn>
              <TableColumn className="text-center">Valor unitario</TableColumn>
              <TableColumn className="text-center">cantidad inicial</TableColumn>
              <TableColumn className="text-center">valor total</TableColumn>
              <TableColumn className="text-center">cantidad vendida</TableColumn>
              <TableColumn className="text-center">total vendido</TableColumn>
              <TableColumn className="text-center">accion</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {users.map((bebidas) => ( 
                <TableRow key={bebidas._id}>
                  <TableCell className="border-r-3 border-blue-600">{bebidas.nombre}</TableCell>
                  <TableCell>{bebidas.fechaCaducidad}</TableCell>
                  <TableCell>{bebidas.valor}</TableCell>
                  <TableCell>{bebidas.cantidad}</TableCell>
                  <TableCell>{bebidas.valorTotal}</TableCell>
                  <TableCell>{bebidas.cantidadVendida}</TableCell>
                  <TableCell>{bebidas.totalVendido}</TableCell>
                  <TableCell className="flex justify-center align-center"> 
                  <img
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
