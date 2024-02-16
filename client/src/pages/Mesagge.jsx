import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import AxiosInstance from "../api/axios.js";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "../App.css";

export default function App() {
  const [message, setMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/notificaciones");
        setMessage(response.data.mensajesObtenidos);
        setTotalPages(response.data.totalPages);
        setPageSize(response.data.pageSize);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Calcula los índices de los mensajes que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const messagesToShow = message.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex justify-center items-center pt-20 flex-col">
        <h2 className="text-black text-4xl mb-5 text-center pl-2 pr-2">CAMBIOS REALIZADOS EN EL INVENTARIO</h2>

        <div className="tableMessage">
          <Table aria-label="Tabla de notificaciones" className=" overflow-y-auto mb-20">
            <TableHeader className="text-center">
              <TableColumn className="text-center uppercase">Notificaciones</TableColumn>
              <TableColumn className="text-center w-96 uppercase">Fecha</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay mensajes para mostrar.">
              {messagesToShow.map((msg) => (
                <TableRow key={msg._id} className="uppercase">
                  <TableCell className="border-b-1 border-slate-600">{msg.mensaje}</TableCell>
                  <TableCell className="text-center border-b-1 border-slate-600">
                    {new Date(msg.actionDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack spacing={2} justifyContent="center" className="mt-4">
            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
          </Stack>
        </div>
      </div>
    </div>
  );
}
