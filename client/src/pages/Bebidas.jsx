import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableColumn, Input, Button, TableHeader, TableRow } from "@nextui-org/react";
import Navbars from '../components/Navbars';

const MekatosTable = () => {
  const [bebidas, setBebidas] = useState([]);
  const [additionalQuantity, setAdditionalQuantity] = useState(0);
  const [additionalQuantities, setAdditionalQuantities] = useState({});


  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/drinks")
      .then((response) => {
        setBebidas(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al obtener los mekatos: ", error);
      });
  }, []);

  // const confirmAdditionalQuantity = async (mekatoId) => {
  //   try {
  //     const additionalQuantityForProduct = additionalQuantities[mekatoId] || 0;
  
  //     const response = await axios.post("http://127.0.0.1:3000/api/agregar-cantidad", {
  //       mekatoId: mekatoId,
  //       additionalQuantity: additionalQuantityForProduct,
  //     });

      
  //     setAdditionalQuantities((prev) => ({
  //       ...prev,
  //       [mekatoId]: 0,
  //     }));
  //   } catch (error) {
  //     console.error("Error al agregar cantidad vendida:", error);
  //     // Manejar el error, mostrar mensajes al usuario, etc.
  //   }
  // };

  return (
    <>
      <Navbars />
      <h2 className="w-full h-16 flex justify-center items-center text-4xl text-white font-medium">BEBIDAS</h2>
      <Table className="" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Valor Unitario</TableColumn>
          <TableColumn>Productos vendidos</TableColumn>
          <TableColumn>Total</TableColumn>
          {/* <TableColumn>Acción</TableColumn> */}
        </TableHeader>
        <TableBody>
          {bebidas.map((bebidas) => (
            <TableRow key={bebidas._id}>
              <TableCell>{bebidas.Descripcion}</TableCell>
              <TableCell>{bebidas.CantidadInicial}</TableCell>
              <TableCell>{bebidas.ValorUnitario}</TableCell>
              <TableCell>{bebidas.ProductosVendidos}</TableCell>
              <TableCell>{bebidas.ValorTotal}</TableCell>
              {/* <TableCell>
                <Input
                  type="number"
                  value={additionalQuantities[mekato._id] }
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setAdditionalQuantities((prev) => ({
                      ...prev,
                      [mekato._id]: value,
                    }));
                  }}
                />
                <Button onClick={() => confirmAdditionalQuantity(mekato._id)}>Agregar Más</Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MekatosTable;
