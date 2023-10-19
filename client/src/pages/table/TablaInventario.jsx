import React, { useState, useEffect } from "react";
import { Table, TableHeader,Button, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from "axios";
import CardDesplegable from './CardBebidas.jsx'
import CardAlimentos from './CardAlimentos.jsx'

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/data");
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
        <CardAlimentos/>
        </div>
        <section className="flex coluns-2 ">
          <Table className="mx-5 text-center" aria-label="Lista de Usuarios">
            <TableHeader className="text-center">
              <TableColumn className="text-center">NAME</TableColumn>
              <TableColumn className="text-center">EMAIL</TableColumn>
              {/* Agrega más columnas según tus datos */}
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {users.map((user) => ( 
                <TableRow key={user.id}>
                  <TableCell className="border-r-3 border-blue-600"> {user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* Agrega más TableCell según tus datos */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
    </div>
  );
}
