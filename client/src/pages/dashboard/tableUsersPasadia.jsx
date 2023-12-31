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
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { green, purple, yellow, red } from '@mui/material/colors';
import GenderDetectionComponent from './generador.jsx';

export default function BasicTable() { 
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-obtener-compras');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const chooseIcon = (index) => {
    switch(index) {
      case 0:
        return <Brightness1Icon style={{ color: purple[500], width:"12px" }} />;
      case 1:
        return <Brightness1Icon style={{ color: yellow[700], width:"12px"}} />;
        case 2:
        return <Brightness1Icon style={{ color: green[300], width:"12px" }} />;
      default:
        return <Brightness1Icon style={{ color: red[500], width:"12px" }} />;
    }
  };


  return (
    <TableContainer component={Paper} className='h-full'>
      <Table sx={{height: 320 }} spacing={2} aria-label="simple table" className='table-users-box'> 
        <TableHead style={{backgroundColor:"#000135", color:"white"}}>
          <TableRow style={{color:"white"}} >
            <TableCell></TableCell>
            <TableCell className='uppercase' > <p className='text-white'>identification</p></TableCell>
            <TableCell className='uppercase ' align="center"> <p className='text-white' >Client Name</p></TableCell>
            <TableCell className='uppercase ' align="center"><p className='text-white' >Total Quantity</p></TableCell>
            <TableCell className='uppercase ' align="center"> <p className='text-white'> Total Value </p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.identificacion + index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell align="center">
                {chooseIcon(index)} {/* Ícono según el índice */}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.identificacion}
              </TableCell>

              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.cantidadTotal}</TableCell>
              <TableCell align="center">{row.valorTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
