import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import CardDesplegable from "./CardClientPasadia.jsx";
import toast, {Toaster} from 'react-hot-toast';


export default function App() {
  const [users, setUsers] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedUserId, setEditedUserId] = useState(null);

  
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

  const handleEditUser = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/pasadia/edit/${editedUserId}`,
        { nombre: editedName }
      );
      // Actualiza la lista de usuarios después de la edición
      const updatedUsers = users.map((user) =>
        user.identificacion === editedUserId ? { ...user, nombre: editedName } : user
      );
      setUsers(updatedUsers);
      setEditedName(""); // Limpia el campo de entrada después de la edición
      setEditedUserId(null); // Reinicia el ID de usuario editado
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Error al editar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleDeleteUser = async (identificacion) => {
    // Preguntar al usuario si está seguro de eliminar el usuario
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return; // Si el usuario no confirma, no hacemos nada
    }

    try {
      await axios.delete(`http://127.0.0.1:3000/api/pasadia/${identificacion}`);
      // Actualiza la lista de usuarios después de la eliminación
      const updatedUsers = users.filter((user) => user.identificacion !== identificacion);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      // Muestra un mensaje de error al usuario en caso de fallo
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="max-w-full w-98 mx-auto">
      <Toaster />
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
            <TableColumn className="text-center">Fecha de registro</TableColumn>
            <TableColumn className="text-center">add bebida</TableColumn>
            <TableColumn className="text-center">add comida</TableColumn>
            <TableColumn className="text-center">Consumo total</TableColumn>
            <TableColumn className="text-center">Acción</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No hay filas para mostrar.">
            {users.map((clientes) => (
              <TableRow key={clientes.identificacion}>
                <TableCell className="border-r-3 border-blue-600">
                  {clientes.identificacion}
                </TableCell>
                <TableCell>
                  {clientes.identificacion === editedUserId ? (
                    <div className="flex">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                  ) : (
                    clientes.nombre
                  )}
                </TableCell>
                <TableCell>{clientes.reserva}</TableCell>
                <TableCell>{clientes.pagoPendienteTotal}</TableCell>
                <TableCell>{clientes.fechaDeRegistro}</TableCell>
                <TableCell>{clientes.bebidas}</TableCell>
                <TableCell>{clientes.restaurante}</TableCell>
                <TableCell>{clientes.totalConsumido}</TableCell>
                <TableCell className="flex justify-center align-center">
                  {clientes.identificacion === editedUserId && (
                    <div className="flex">
                      <Button onClick={handleEditUser}>Guardar</Button>
                    </div>
                  )}
                  <img
                    className="w-8 h-8 mr-4 cursor-pointer"
                    src={editar}
                    alt="Edit"
                    onClick={() => {
                      setEditedName(clientes.nombre);
                      setEditedUserId(clientes.identificacion);
                    }}
                  />
                  <img
                    className="w-8 h-8 cursor-pointer"
                    src={borrar}
                    alt="Delete"
                    onClick={() => handleDeleteUser(clientes.identificacion)}
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
