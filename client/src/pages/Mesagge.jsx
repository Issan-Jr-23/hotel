import React, { useState, useEffect } from "react";
// import Navbars from '../components/Navbars.jsx'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import AxiosInstance from "../api/axios.js";
import "../App.css"

export default function App() {
    
    const [message, setMessage] = useState([])
    const [rowsToShow, setRowsToShow] = useState(5); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AxiosInstance.get("/notificaciones");
            setMessage(response.data);
            const usuariosOrdenados = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          } catch (error) {
            console.error("Error al obtener datos del servidor:", error);
          }
        };
        fetchData();
      }, []);

  return (
    <div>
        <div>
            {/* <Navbars/> */}
        </div>
        <div className="flex justify-center items-center mt-10 flex-col">
            <h2 className="text-white text-4xl mb-5 text-center pl-2 pr-2">CAMBIOS REALIZADOS EN EL INVENTARIO</h2>
            <div className="w-2/3 flex justify-end">
        <div >
                    <label htmlFor="rows" className="text-white">Filas a mostrar: </label>
                    <select className="h-8 w-32 rounded-xl outline-none mb-5" id="rows" value={rowsToShow} onChange={(e) => setRowsToShow(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

            </div>

    <div className="tableMessage">

    <Table aria-label="Example empty table" className=" max-h-screen overflow-y-auto mb-20">
      <TableHeader className="text-center">
        <TableColumn className="text-center uppercase">Notificaciones</TableColumn>
        <TableColumn className="text-center w-96 uppercase ">Fecha</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
       {message.slice(0, rowsToShow).map((notify => (
        <TableRow key={notify._id} className="uppercase">
        <TableCell className=" border-b-1 border-slate-600">{notify.mensaje}</TableCell>
        <TableCell className="text-center  border-b-1 border-slate-600">
            {new Date(notify.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
        </TableCell>
        </TableRow>
       )))}
      </TableBody>
    </Table>
    </div>
        </div>

    </div>
  );
}

