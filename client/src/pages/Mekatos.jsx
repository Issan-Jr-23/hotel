import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Navbars from '../components/Navbars';

const MekatosTable = () => {
  const [mekatos, setMekatos] = useState([]);
 


  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/mekatos")
      .then((response) => {
        setMekatos(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error al obtener los mekatos: ", error);
      });
  }, []);


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
        <TableBody>
          {mekatos.map((mekato) => (
            <TableRow key={mekato._id}>
              <TableCell>{mekato.Descripcion}</TableCell>
              <TableCell>{mekato.CantidadInicial}</TableCell>
              <TableCell>{mekato.ValorAdultos}</TableCell>
              <TableCell>{mekato.VentaAdultos}</TableCell>
              <TableCell>{mekato.ValorTotal}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MekatosTable;
