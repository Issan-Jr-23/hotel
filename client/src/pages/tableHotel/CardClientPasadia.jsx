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
  Select,
  SelectItem
} from "@nextui-org/react";
import { Input } from "@nextui-org/react"; 


export default function FormBebidas() {
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

  // const handleRolChange = (selectedSize) => {
  //   setFormData({
  //     ...formData,
  //     roleses: selectedSize,
  //   });
  // };


  const handleFormSubmit = () => {
    axios.post("http://127.0.0.1:3000/api/pasadia-registrar-cliente", formData)
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
                   {optionBebidas.map((bebidas) => (
                     <SelectItem key={bebidas} value={bebidas}>
                       {bebidas}
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
                   {optionBocado.map((bocados) => (
                     <SelectItem key={bocados} value={bocados}>
                       {bocados}
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

                {/* <Select 
                   name="roles"
                   label="Seleccionar rol" 
                   className="max-w-full w-full" 
                   value={formData.roles}
                     onChange={(event) => handleRolChange(event.target.value)}
                 >
                   {optionRol.map((rol) => (
                     <SelectItem key={rol} value={rol}>
                       {rol}
                     </SelectItem>
                   ))}
                 </Select> */}
        

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
