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

export default function App() {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    Descripcion: "",
    tipo: "",
    CantidadInicial: "",
    ValorUnitario: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      // Podrías también realizar alguna acción adicional, como recargar la lista de productos después de guardar.
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };










  return (
    <div >
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
              <TableColumn className="text-center">Tipo</TableColumn>
              <TableColumn className="text-center">fecha de caducidad</TableColumn>
              <TableColumn className="text-center">Cantidad</TableColumn>
              <TableColumn className="text-center">Valor unitario</TableColumn>
              <TableColumn className="text-center">accion</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {users.map((bebidas) => ( 
                <TableRow key={bebidas._id}>
                  <TableCell className="border-r-3 border-blue-600">{bebidas.Descripcion}</TableCell>
                  <TableCell>{bebidas.tipo}</TableCell>
                  <TableCell>{bebidas.Caducidad}</TableCell>
                  <TableCell>{bebidas.CantidadInicial}</TableCell>
                  <TableCell>{bebidas.ValorUnitario}</TableCell>
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
