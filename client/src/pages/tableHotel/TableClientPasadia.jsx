import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import CardDesplegable from "./CardClientPasadia.jsx";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/pasadia-clientes"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (identificacion) => {
    // Preguntar al usuario si está seguro de eliminar el usuario
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return; // Si el usuario no confirma, no hacemos nada
    }

    try {
      await axios.delete(
        `http://127.0.0.1:3000/api/pasadia/${identificacion}`
      );
      // Actualiza la lista de usuarios después de la eliminación
      const updatedUsers = users.filter(
        (user) => user.identificacion !== identificacion
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      // Muestra un mensaje de error al usuario en caso de fallo
      alert(
        "Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="max-w-full w-98 mx-auto">
      <div className="flex my-5">
        <div className="mr-5 mx-5">
          <CardDesplegable />
        </div>
      </div>
      <section className="flex coluns-2 border-2">
        <Table className=" text-center" aria-label="Lista de Usuarios">
          <TableHeader className="text-center">
            <TableColumn className="text-center">Id</TableColumn>
            <TableColumn className="text-center">Nombre</TableColumn>
            <TableColumn className="text-center">Reserva</TableColumn>
            <TableColumn className="text-center">
              Pago pendiente o total
            </TableColumn>
            <TableColumn className="text-center">
              Fecha de registro
            </TableColumn>
            <TableColumn className="text-center">add bebida</TableColumn>
            <TableColumn className="text-center">add comida</TableColumn>
            <TableColumn className="text-center">Consumo total</TableColumn>
            <TableColumn className="text-center">Acción</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No hay filas para mostrar.">
            {users.map((user) => (
              <TableRow key={user.identificacion}>
                <TableCell className="border-r-3 border-blue-600">
                  {user.identificacion}
                </TableCell>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.reserva}</TableCell>
                <TableCell>{user.pagoPendienteTotal}</TableCell>
                <TableCell>{user.fechaDeRegistro}</TableCell>
                <TableCell>{user.bebidas}</TableCell>
                <TableCell>{user.restaurante}</TableCell>
                <TableCell>{user.totalConsumido}</TableCell>
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
                    onClick={() => handleDeleteUser(user.identificacion)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
