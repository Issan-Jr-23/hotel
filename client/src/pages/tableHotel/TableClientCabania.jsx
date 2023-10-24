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
// import CardDesplegable from "./CardClientPasadia.jsx";
import toast, {Toaster} from 'react-hot-toast';


export default function App() {
  const [users, setUsers] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedUserId, setEditedUserId] = useState(null);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const options = ["Si", "No"];
  const optionBebidas = ["Corona", "Aguila"];
  const optionBocado = ["Boliqueso", "Chetos"];
  // const optionRol = ["user", "admin", "editor"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    identificacion:"",
    nombre: "",
    reserva: "",
    pagoPendienteTotal:"",
    bebidas:"",
    restaurante:"",
    // roles: ""
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
        const response = await axios.get("http://127.0.0.1:3000/api/cabanias-clientes");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  });

  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/cabanias-registrar-cliente", formData);
      onClose();
      toast.success('Cliente agregado exitosamente!');
      setFormData({
        identificacion: "",
        nombre: "",
        reserva: "",
        pagoPendienteTotal: "",
        bebidas: "",
        restaurante: "",
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
        `http://127.0.0.1:3000/api/cabanias/edit/${editedUserId}`,
        { nombre: editedName }
      );
      // Actualiza la lista de usuarios después de la edición
      const updatedUsers = users.map((user) =>
        user.identificacion === editedUserId ? { ...user, nombre: editedName } : user
      );
      setUsers(updatedUsers);
      setEditedName(""); 
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
      await axios.delete(`http://127.0.0.1:3000/api/cabanias/${identificacion}`);
      const updatedUsers = users.filter((user) => user.identificacion !== identificacion);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };


  useEffect(() => {
    const fetchData = async (newDrinksData) => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-bebidas", newDrinksData);
        setDrinks(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (newSnacksData) => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-alimentos", newSnacksData);
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
      <div className="flex my-5">
        <div className="mr-5 mx-5">
       
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
              <ModalHeader className="flex flex-col gap-1">
                
              </ModalHeader>
              <ModalBody>
                 <Input
                 required
                   name="identificacion"
                   type="number"
                   variant="flat"
                   label="Id de usuario"
                  onChange={handleInputChange}
                 />
                <Input
                required
                 name="nombre"
                   type="text"
                   variant="flat"
                   label="Nombre de usuario"
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
                   onChange= {
                     handleInputChange}
                 />

                  <Select 
                   name="bebidas"
                   label="Seleccionar bebida" 
                   className="max-w-full w-full" 
                   value={formData.bebidas}
                     onChange={(event) => handleBebidasChange(event.target.value)}
                 >
                   {drinks.map((bebidas) => (
                     <SelectItem key={bebidas.id}>
                       {bebidas.nombre}
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
                   {snacks.map((bocados) => (
                     <SelectItem key={bocados.id}>
                       {bocados.nombre}
                     </SelectItem>
                   ))}
                 </Select>
                 <Input
                   name="totalConsumo"
                   className=""
                   type="number"
                   variant="flat"
                   label="Total consumido"
                   onChange= {
                     handleInputChange}
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
                    <img
                    className="w-8 h-8 mr-4 cursor-pointer"
                    src={download}
                    alt="actualizar"
                    onClick={handleEditUser}
                  />
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
