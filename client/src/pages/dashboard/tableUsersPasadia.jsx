// BasicTable.js
import React, { useState, useEffect } from 'react';
import AxiosInstance from "../../api/axios.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GenderDetectionComponent from './generador.jsx'; // Asegúrate de importar correctamente el componente

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-obtener-compras'); // Usa el endpoint específico para obtener los datos
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} className='bg-red-500'>
      <Table sx={{ }} aria-label="simple table" className='table-users-box'> 
        <TableHead>
          <TableRow>
            <TableCell>Identificación</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Cantidad Total</TableCell>
            <TableCell align="center">Valor Total</TableCell>
            <TableCell align="center">Imagen</TableCell> {/* Nueva columna para la imagen */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.identificacion + index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.identificacion}
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.cantidadTotal}</TableCell>
              <TableCell align="center">{row.valorTotal}</TableCell>
              <TableCell align="center">
                {/* Integración del componente de detección de género */}
                <GenderDetectionComponent userText={row.nombre} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
