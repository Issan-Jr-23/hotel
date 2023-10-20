import React, { useState, useEffect } from "react";
import { Table, TableHeader,Button, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from "axios";
import CardDesplegable from './CardClientPasadia.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  editar  from '../../images/boligrafo.png'
import  borrar from '../../images/borrar.png'


export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/pasadia-clientes");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-full w-98 mx-auto">
        <div className='flex my-5'>
            <div className='mr-5 mx-5'>
        <CardDesplegable />
            </div>
        </div>
        <section className="flex coluns-2 border-2">
          <Table className=" text-center" aria-label="Lista de Usuarios">
            <TableHeader className="text-center">
              <TableColumn className="text-center">Id</TableColumn>
              <TableColumn className="text-center">Nombre</TableColumn>
              <TableColumn className="text-center">Reserva</TableColumn>
              <TableColumn className="text-center">Pago pendiente o total</TableColumn>
              <TableColumn className="text-center">Fecha de registro</TableColumn>
              <TableColumn className="text-center">add bebida</TableColumn>
              <TableColumn className="text-center">add comida</TableColumn>
              <TableColumn className="text-center">Consumo total</TableColumn>
              <TableColumn className="text-center">Accion</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {users.map((user) => ( 
                <TableRow key={user.id}>
                  <TableCell className="border-r-3 border-blue-600"> {user.identificacion}</TableCell>
                  <TableCell>{user.nombre}</TableCell>
                  <TableCell>{user.reserva}</TableCell>
                  <TableCell>{user.pagoPendienteTotal}</TableCell>
                  <TableCell>{user.fechaDeRegistro}</TableCell>
                  <TableCell>{user.bebidas}  </TableCell>
                  <TableCell>{user.restaurante}  </TableCell>
                  <TableCell>{user.totalConsumido}</TableCell>
                  <TableCell className="flex justify-center aling-center">
                  <img className="w-8 h-8 mr-4 cursor-pointer" src={editar} alt="Edit" />
                  <img className="w-8 h-8 cursor-pointer" src={borrar} alt="Delete" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
    </div>
  );
}
