import React, { useState, useEffect } from 'react';
import AxiosInstance from "../../api/axios.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { green, purple, yellow, red } from '@mui/material/colors';

function ProductosTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-obtener-productosCop');
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchData();
  }, []);

  // Función para elegir el ícono según el índice
  const chooseIcon = (index) => {
    switch(index) {
      case 0:
        return <ArrowUpwardIcon style={{ color: purple[500] }} />;
      case 1:
        return <ArrowUpwardIcon style={{ color: yellow[700] }} />;
        case 2:
        return <ArrowUpwardIcon style={{ color: green[300] }} />;
      default:
        return <ArrowDownwardIcon style={{ color: red[500] }} />;
    }
  };

  return (
    <div className=' contenedor-table overflow-hidden'>
    <TableContainer component={Paper} className=''>
      <Table sx={{}} aria-label="simple table" className='table-users-box'>
        <TableHead className='bg-gray-200'>
          <TableRow>
            <TableCell align="center">Ranking</TableCell>
            <TableCell align="center" >Identificación</TableCell>
            <TableCell align="center">Cantidad Total</TableCell>
            <TableCell align="center">Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {chooseIcon(index)} {/* Ícono según el índice */}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.nombre}
              </TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
}

export default ProductosTable;
