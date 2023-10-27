import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,Input } from "@nextui-org/react";
import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import toast, {Toaster} from 'react-hot-toast';

export default function App() {

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    Descripcion: "",
    tipo: "",
    CantidadInicial: "",
    ValorUnitario: "",
    Caducidad:""
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let finalValue = value;

    if (name === "Caducidad") {
        const fecha = new Date(value);
        finalValue = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    }

    setFormData({
      ...formData,
      [name]: finalValue,
    });
    console.log(name)
    console
};




  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-inventario");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);



  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/inventario", formData);
      
      onClose();
      const response = await axios.get("http://127.0.0.1:3000/api/obtener-inventario");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return; 
    }

    try {
      await axios.delete(`http://127.0.0.1:3000/api/eliminar-mekato/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };


  const handleEditUser = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/cabanias/edit/${id}`,
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




  return (
    <div >
      <Toaster/>
        <div className='flex my-5 justify-between border-2'>
            <div className='mr-5 '>
        {/* <CardDesplegable /> */}
        <>
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
          Agregar producto
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar Producto
              </ModalHeader>
              <ModalBody>
                <Input
                  name="Descripcion"
                  className="input_form"
                  type="text"
                  variant="flat"
                  label="Descripción del producto"
                  onChange={handleInputChange}
                />
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={(event) => handleInputChange(event)}
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="comidas">Comidas</option>
                  <option value="mekatos">Mekatos</option>
                </select>
                <Input
                  name="Caducidad"
                  className="input_form"
                  type="Date"
                  variant="flat"
                  label="Fecha de caducidad"
                  placeholder="date"
                  onChange={handleInputChange}
                />
                <Input
                  name="CantidadInicial"
                  className="input_form"
                  type="number"
                  variant="flat"
                  label="Cantidad inicial"
                  onChange={handleInputChange}
                />
                <Input
                  name="ValorUnitario"
                  className="input_form"
                  type="number"
                  variant="flat"
                  label="Valor unitario"
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
    </>
            </div>
            
        
            
        </div>
        <section className="flex coluns-2 ">
          <Table className="mx-5 text-center" aria-label="Lista de Usuarios">
            <TableHeader className="text-center">
              <TableColumn className="text-center">descripcion del producto</TableColumn>
              <TableColumn className="text-center">Tipo</TableColumn>
              <TableColumn className="text-center">fecha de caducidad</TableColumn>
              <TableColumn className="text-center">Cantidad</TableColumn>
              <TableColumn className="text-center">Valor unitario</TableColumn>
              <TableColumn className="text-center">Cantidad vendida</TableColumn>
              <TableColumn className="text-center">Valor total</TableColumn>
              <TableColumn className="text-center">accion</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {users.map((inventario) => ( 
                <TableRow key={inventario._id}>
                  <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.Descripcion
                  )}
                </TableCell>
                  <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        value={editedType}
                        onChange={(e) => setEditedType(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.tipo
                  )}
                </TableCell>
                  <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.Caducidad
                  )}
                </TableCell>
                  <TableCell>{inventario.CantidadInicial}</TableCell>
                  <TableCell>{inventario.ValorUnitario}</TableCell>
                  <TableCell>{inventario.productosVendidos}</TableCell>
                  <TableCell>{inventario.ValorTotal}</TableCell>
                  <TableCell className="flex justify-center align-center"> 
                  {inventario._id === editedUserId && (
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
                      setEditedName(inventario.Descripcion);
                      setEditedType(inventario.tipo);
                      setEditedDate(inventario.Caducidad);
                      setEditedUserId(inventario._id)
                    }}
                  />
                  <img
                  className="w-8 h-8 cursor-pointer"
                  src={borrar}
                  alt="Delete"
                  onClick={() => handleDelete(inventario._id)}
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
