import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import "./formulario.css";

export default function FormBebidas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    Descripcion: "",
    tipo: "",
    Caducidad: "",
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

  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/inventario", formData);
      onClose();
      // Podrías también realizar alguna acción adicional, como recargar la lista de productos después de guardar.
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
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
  );
}
