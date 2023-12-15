import React, { useState, useEffect } from "react";
import { Input, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import AxiosInstance from "../../api/axios.js";

export default function App() {
    const [snacks, setSnacks] = useState([]);
    const [selectedSnack, setSelectedSnack] = useState(null);


    const [cantidadItem, setCantidadItem] = useState("");
    const [itemSeleccionado, setItemSeleccionado] = useState("");
    const [precioItemSeleccinado, setPrecioItemSeleccionado] = useState("");
    const [itemSeleccionadoId, setItemSeleccionadoId] = useState(null);

    const [cantidadItem1, setCantidadItem1] = useState("");
    const [item1Seleccionado, setItem1Seleccionado] = useState("");
    const [precioItem1Seleccinado, setPrecioItem1Seleccionado] = useState("");
    const [item1SeleccionadoId, setItem1SeleccionadoId] = useState(null);

    const [cantidadItem2, setCantidadItem2] = useState("");
    const [item2Seleccionado, setItem2Seleccionado] = useState("");
    const [precioItem2Seleccinado, setPrecioItem2Seleccionado] = useState("");
    const [item2SeleccionadoId, setItem2SeleccionadoId] = useState(null);

    const [cantidadItem3, setCantidadItem3] = useState("");
    const [item3Seleccionado, setItem3Seleccionado] = useState("");
    const [precioItem3Seleccinado, setPrecioItem3Seleccionado] = useState("");
    const [item3SeleccionadoId, setItem3SeleccionadoId] = useState(null);

    const [cantidadItem4, setCantidadItem4] = useState("");
    const [item4Seleccionado, setItem4Seleccionado] = useState("");
    const [precioItem4Seleccinado, setPrecioItem4Seleccionado] = useState("");
    const [item4SeleccionadoId, setItem4SeleccionadoId] = useState(null);

    const [esCortesia, setEsCortesia] = useState(false);

    const handleCortesiaChange = (event) => {
        setEsCortesia(event.target.checked);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get("/food");
                const allProducts = response.data;

                let subProducts = [];
                allProducts.forEach(product => {
                    if (product.subproductos) {
                        const subProductosConCantidadPadre = product.subproductos.map(sub => {
                            return { ...sub, cantidadPadre: product.CantidadInicial };
                        });
                        subProducts = subProducts.concat(subProductosConCantidadPadre);
                    }
                });

                setSnacks(subProducts);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);

    const handleSelectChange = (e) => {
        const selectedId = e;
        const selected = snacks.find(snack => snack._id === selectedId);
        setSelectedSnack(selected);
        setCantidadItem('');
    };

    const guardarFood = async (food) => {

        try {
          const response = await AxiosInstance.post('/pasadia-agregar-food', {
            id: selectedClientId,
            food,
          });
          toast.success('Comida guardada exitosamente!');
    
          setEsCortesia(false);
          closeModalF();
          closeModalF();
          const responses = await AxiosInstance.get("/pasadia-clientes");
          const usuariosOrdenados = responses.data.sort((a, b) => new Date(b.fechaDeRegistro) - new Date(a.fechaDeRegistro));
          setUsers(usuariosOrdenados);
        } catch (error) {
          console.error('Error al guardar la comida en el cliente:', error.message);
          throw error;
        }
      };




    return (
        <div className="pl-5 pr-5">
            <Checkbox
                checked={esCortesia}
                onChange={handleCortesiaChange}
            >
                Cortesía pasadia
            </Checkbox>
            <div className="flex">
                <Input
                    label="Ingrese una cantidad"
                    placeholder="Enter quantity"
                    variant="bordered"
                    className="mr-2 w-96"
                    type="Number"
                    value={cantidadItem}
                    disabled={!selectedSnack || selectedSnack.cantidadPadre <= 0}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setCantidadItem(isNaN(value) ? '' : value);
                    }}
                />
                <Input
                    disabled
                    label="Stock"
                    value={selectedSnack ? selectedSnack.cantidadPadre : ''}
                    readOnly
                    variant="bordered"
                    className="w-40 text-blue-500 border-2 border-blue-400 rounded-xl"
                />
                <Select
                    label="Subproducto"
                    variant="bordered"
                    placeholder="Select a subproduct"
                    className="max-w-xs"
                    value={selectedSnack ? selectedSnack._id : ''}
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    {snacks.map((snack) => (
                        <SelectItem key={snack._id} value={snack._id}>
                            {snack.Descripcion}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex justify-end mt-5">
                <Button color="primary">
                    Ahorrar
                </Button>
            </div>
        </div>
    );
}






