import React, {useState, useEffect} from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Select, SelectItem, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from "../iconos/MailIcon.jsx";
import { LockIcon } from "../iconos/LockIcon.jsx";
import AxiosInstance from "../../api/axios.js";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [value, setValue] = React.useState(new Set([]));
    const [touched, setTouched] = React.useState(false);
    const [snacks , setSnacks] = useState([])

    const isValid = value.has("cat");
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AxiosInstance.get("/food");
            const allProducts = response.data;
      
            const subProducts = allProducts.reduce((acc, product) => {
              if (product.subproductos && product.subproductos.length > 0) {
                acc.push(...product.subproductos);
              }
              return acc;
            }, []);
      
            setSnacks(subProducts); 
          } catch (error) {
            console.error("Error al obtener datos del servidor:", error);
          }
        };
        fetchData();
      }, []);

    return (
        <>
            <div className="pl-5 pr-5">
                <div className="flex">
                    <Input
                        autoFocus
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        className="mr-2 w-96"
                    />
                    <Input
                        label="Stock"
                        placeholder=""
                        type="password"
                        variant="bordered"
                        className="w-32 mr-2"
                    />
                    <Select
                        label="Favorite Animal"
                        variant="bordered"
                        placeholder="Select an animal"
                        description="The second most popular pet in the world"
                        errorMessage={isValid || !touched ? "" : "You must select a cat"}
                        isInvalid={isValid || !touched ? false : true}
                        selectedKeys={value}
                        className="max-w-xs"
                        onSelectionChange={setValue}
                        onClose={() => setTouched(true)}
                    >
                        {snacks.map((food) => (
                            <SelectItem key={food._id}>
                                {food.Descripcion}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label="Stock"
                        placeholder=""
                        type="password"
                        variant="bordered"
                        className="w-32 ml-2"
                    />
                </div>

            </div>
        </>
    );
}
