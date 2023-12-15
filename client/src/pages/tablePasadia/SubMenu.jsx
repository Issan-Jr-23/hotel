import React, { useState, useEffect } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import AxiosInstance from "../../api/axios.js";

export default function App() {
    const [snacks, setSnacks] = useState([]);
    const [selectedSnack, setSelectedSnack] = useState(null);

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
        const selectedId = e; // Aquí puede necesitar ajustar según cómo el Select maneja el valor
        const selected = snacks.find(snack => snack._id === selectedId);
        setSelectedSnack(selected);
    };

    return (
        <div className="pl-5 pr-5">
            <div className="flex">
                <Input
                    label="Ingrese una cantidad"
                    placeholder="Enter your email"
                    variant="bordered"
                    className="mr-2 w-96"
                    type="Number"
                />
                <Input
                    disabled
                    label="Stock"
                    value={selectedSnack ? selectedSnack.cantidadPadre : ''}
                    readOnly
                    variant="bordered"
                    className="w-32 mr-2"
                />
                <Select
                    label="Subproducto"
                    variant="bordered"
                    placeholder="Select a subproduct"
                    className="max-w-xs"
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    {snacks.map((snack) => (
                        <SelectItem key={snack._id} value={snack._id}>
                            {snack.Descripcion}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}
