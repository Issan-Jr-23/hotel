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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem
} from "@nextui-org/react";

import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [users, setUsers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editPago, setEditPago] = useState("");
  const [editReserva, setEditReserva] = useState("");
  const [editBebidas, setEditBebidas] = useState("");
  const [editedUserId, setEditedUserId] = useState(null);
  const options = ["Si", "No"];
  const optionBebidas = ["Corona", "Aguila"];
  const optionBocado = ["Boliqueso", "Chetos"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    identificacion: "",
    nombre: "",
    reserva: "",
    pagoPendienteTotal: "",
    bebidas: "",
    restaurante: "",
    totalConsumo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReservaChange = (selectedSize) => {
    setFormData({
      ...formData,
      reserva: selectedSize,
    });
  };

  const handleRestauranteChange = (selectedSize) => {
    setFormData({
      ...formData,
      restaurante: selectedSize,
    });
  };

  const handleBebidasChange = (selectedSize) => {
    setFormData({
      ...formData,
      bebidas: selectedSize,
    });
  };

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

  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/pasadia-registrar-cliente", formData);
      onClose();
      toast.success('Cliente agregado exitosamente!');
      setFormData({
        identificacion: "",
        nombre: "",
        reserva: "",
        pagoPendienteTotal: "",
        bebidas: "",
        restaurante: "",
        totalConsumo: "",
      });
      const response = await axios.get("http://127.0.0.1:3000/api/cabanias-clientes");
      setUsers(response.data);
    } catch (error) {
      toast.error('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/pasadia/edit/${editedUserId}`,
        {
          nombre: editedName,
          pagoPendienteTotal: editPago,
          reserva: editReserva,
          bebidas: editBebidas,

        }
      );
      // Actualiza la lista de usuarios después de la edición
      const updatedUsers = users.map((user) =>
        user.identificacion === editedUserId ? { ...user, 
          nombre: editedName, 
          pagoPendienteTotal: editPago, 
          reserva: editReserva,
          bebidas: editBebidas, } : user
      );
      setUsers(updatedUsers);
      setEditedName("");
      setEditPago("");
      setEditReserva("");
      setEditBebidas("");
      setEditedUserId(null);
      toast.success('Cliente actualizado exitosamente!');
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Error al editar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleDeleteUser = async (identificacion) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:3000/api/pasadia/${identificacion}`);
      const updatedUsers = users.filter((user) => user.identificacion !== identificacion);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-bebidas");
        setDrinks(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-alimentos");
        setSnacks(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-full w-98 mx-auto">
      <Toaster />
      <div className="flex justify-between px-5">
        <div className=" ">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="flat"
              color="primary"
              onClick={() => {
                setBackdrop("blur");
                onOpen();
              }}
              className="capitalize"
            >
              Agregar Cliente
            </Button>
          </div>
          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                  <ModalBody>
                    <Input
                      required
                      name="identificacion"
                      type="number"
                      variant="flat"
                      label="Id de usuario"
                      value={formData.identificacion}
                      onChange={handleInputChange}
                    />
                    <Input
                      required
                      name="nombre"
                      type="text"
                      variant="flat"
                      label="Nombre de usuario"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                    <Select
                      required
                      name="reserva"
                      label="¿La reserva fue realizada?"
                      className="max-w-full w-full"
                      value={formData.reserva}
                      onChange={(event) => handleReservaChange(event.target.value)}
                    >
                      {options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      required
                      name="pagoPendienteTotal"
                      className=""
                      type="number"
                      variant="flat"
                      label="Pago pendiente o total"
                      value={formData.pagoPendienteTotal}
                      onChange={handleInputChange}
                    />
                    <Select
                      name="bebidas"
                      label="Seleccionar bebida"
                      className="max-w-full w-full"
                      value={formData.bebidas}
                      onChange={(event) => handleBebidasChange(event.target.value)}
                    >
                      {drinks.map((bebida) => (
                        <SelectItem key={bebida.id} value={bebida.nombre}>
                          {bebida.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      name="restaurantes"
                      label="Seleccionar bocado"
                      className="max-w-full w-full"
                      value={formData.restaurante}
                      onChange={(event) => handleRestauranteChange(event.target.value)}
                    >
                      {snacks.map((bocado) => (
                        <SelectItem key={bocado.id} value={bocado.nombre}>
                          {bocado.nombre}, {bocado.precio}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      name="totalConsumo"
                      className=""
                      type="number"
                      variant="flat"
                      label="Total consumido"
                      value={formData.totalConsumo}
                      onChange={handleInputChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onClick={handleFormSubmit}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="flex items-center justify-center ">
          <img
            className="w-10 h-10 cursor-pointer flex items-center justify-center "
            src={download}
            alt="actualizar"
          />
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
            {users.map((cliente) => (
              <TableRow key={cliente.identificacion}>
                <TableCell className="border-r-3 border-blue-600">
                  {cliente.identificacion}
                </TableCell>
                <TableCell>
                  {cliente.identificacion === editedUserId ? (
                    <div className="flex">
                      <Input
                      className="w-56"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                  ) : (
                    cliente.nombre
                  )}
                </TableCell>
                <TableCell>
                {cliente.identificacion === editedUserId ? (
                  <div className="flex">
                    <Select
                    className=" w-52"
                    label="selecciona una opcion"
                      value={editReserva}
                      onChange={(e) => setEditReserva(e.target.value)}
                    >
                      {options.map((opcion) => (
                        <SelectItem key={opcion} value={opcion}>
                          {opcion}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                ) : (
                  cliente.reserva
                )}
              </TableCell>
                <TableCell>
                  {cliente.identificacion === editedUserId ? (
                    <div className="flex">
                      <Input
                      className="w-56"
                        type="number"
                        value={editPago}
                        onChange={(e) => setEditPago(e.target.value)}
                      />
                    </div>
                  ) : (
                    cliente.pagoPendienteTotal
                  )}
                </TableCell>
                
                <TableCell>{cliente.fechaDeRegistro}</TableCell>
                <TableCell>      {cliente.identificacion === editedUserId ? (
        <div className="flex">
          <Select
            name="bebidas"
            label="Seleccionar bebida"
            className="max-w-full w-full"
            value={editBebidas} // Usa el estado editBebidas para preseleccionar el valor
            onChange={(event) => setEditBebidas(event.target.value)}
          >
            {drinks.map((bebida) => (
              <SelectItem key={bebida.id} value={bebida.nombre}>
                {bebida.nombre}
              </SelectItem>
            ))}
          </Select>
        </div>
      ) : (
        cliente.bebidas
      )}</TableCell>
                <TableCell>{cliente.restaurante}</TableCell>
                <TableCell>{cliente.totalConsumo}</TableCell>
                <TableCell className="flex justify-center align-center pr-5">
                  {cliente.identificacion === editedUserId && (
                    <div className="flex">
                      <img
                        className="w-8 h-8 mr-4 cursor-pointer"
                        src={download}
                        alt="actualizar"
                        onClick={handleEditUser}
                      />
                    </div>
                  )}
                  <img
                    className="w-8 h-8 mr-4 cursor-pointer"
                    src={editar}
                    alt="Edit"
                    onClick={() => {
                      setEditedUserId(cliente.identificacion);
                      setEditPago(cliente.pagoPendienteTotal);
                      setEditedName(cliente.nombre);
                      setEditBebidas(cliente.bebidas);
                      setEditReserva(cliente.reserva);
                    }}
                  />
                  <img
                    className="w-8 h-8 cursor-pointer"
                    src={borrar}
                    alt="Delete"
                    onClick={() => handleDeleteUser(cliente.identificacion)}
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
