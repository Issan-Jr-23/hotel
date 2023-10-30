import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableColumn, Input, Button, TableHeader, TableRow } from "@nextui-org/react";
import Navbars from '../components/Navbars';

const MekatosTable = () => {
  const [mekatos, setMekatos] = useState([]);
  const [additionalQuantity, setAdditionalQuantity] = useState(0);
  const [additionalQuantities, setAdditionalQuantities] = useState({});


  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/food")
      .then((response) => {
        setMekatos(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al obtener los mekatos: ", error);
      });
  }, []);

  const confirmAdditionalQuantity = async (mekatoId) => {
    try {
      const additionalQuantityForProduct = additionalQuantities[mekatoId] || 0;
  
      const response = await axios.post("http://127.0.0.1:3000/api/agregar-cantidad", {
        mekatoId: mekatoId,
        additionalQuantity: additionalQuantityForProduct,
      });

      
      setAdditionalQuantities((prev) => ({
        ...prev,
        [mekatoId]: 0,
      }));
    } catch (error) {
      console.error("Error al agregar cantidad vendida:", error);
      // Manejar el error, mostrar mensajes al usuario, etc.
    }
  };

  return (
    <>
      <Navbars />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Valor Unitario</TableColumn>
          <TableColumn>Cantidad Vendida</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Acción</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No hay filas para mostrar.">
          {mekatos.map((food) => (
            <TableRow key={food._id}>
              <TableCell>{food.Descripcion}</TableCell>
              <TableCell>{food.CantidadInicial}</TableCell>
              <TableCell>{food.ValorUnitario}</TableCell>
              <TableCell>{food.productosVendidos}</TableCell>
              <TableCell>{food.ValorTotal}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={additionalQuantities[food._id] }
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setAdditionalQuantities((prev) => ({
                      ...prev,
                      [food._id]: value,
                    }));
                  }}
                />
                <Button onClick={() => confirmAdditionalQuantity(mekato._id)}>Agregar Más</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MekatosTable;
