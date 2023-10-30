import { useState, useEffect, useRef } from "react";
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
import { Select, SelectItem } from "@nextui-org/react";


export default function FormBebidas() {
  const options = ["pequeño", "mediano", "grande", "mega"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    nombre: "",
    tamaño: "",
    cantidad: "",
    fechaCaducidad: "",
    precioVenta: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTamañoChange = (selectedSize) => {
    setFormData({
      ...formData,
      tamaño: selectedSize,
    });
  };


  const handleFormSubmit = () => {
    axios.post("http://127.0.0.1:3000/api/alimentos", formData)
      .then((response) => {
        onClose();
      })
      .catch((error) => {
      });
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
          Agregar Mekatos
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
                id="nombre"
                  name="nombre"
                  className="input_form"
                  type="text"
                  variant="flat"
                  label="Nombre del producto"
                  onChange={handleInputChange}
                />
                <select
          id="tamaño"
          name="tamaño"
          value={formData.tamaño}
          onChange={(event) => handleTamañoChange(event.target.value)}
        >
          <option >Seleccione un tamaño</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
                <Input
                id="cantidad"
                  name="cantidad"
                  className="input_form"
                  type="number"
                  variant="flat"
                  label="Cantidad"
                  onChange= {
                    handleInputChange}
                />
                <Input
                id="fechaCaducidad"
                  name="fechaCaducidad"
                  className="input_form"
                  type="date"
                  variant="flat"
                  label="Fecha de caducidad"
                  placeholder="fecha"
                  onChange={handleInputChange}
                />
                


                <Input
                id="precioVenta"
                  name="precioVenta"
                  className="input_form"
                  type="Number"
                  variant="flat"
                  label="Precio de venta"
                  // value={numero}
                  onChange={
                    handleInputChange
                  }
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
