import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Formulariodes from './FormBebidas.jsx'

export default function App() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque') 

  const backdrops = [ "blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button  
            key={b}
            variant="flat" 
            color="primary" 
            onPress={() => handleOpen(b)}
            className="capitalize"
          >
          Agregar bebida
          </Button>
        ))}  
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Registrar Bebidas</ModalHeader>
              <ModalBody>
                <Formulariodes/>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
