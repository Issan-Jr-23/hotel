// import React, { useState, useEffect } from "react";
// import { Table, TableHeader,Button, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
// import axios from "axios";
// import CardDesplegable from './CardDesplegable.jsx'

// export default function TablePrueba() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:3000/api/data");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error al obtener datos del servidor:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//         <CardDesplegable/>
//     <Table aria-label="Lista de Usuarios">
//       <TableHeader>
//         <TableColumn>NAME</TableColumn>
//         <TableColumn>EMAIL</TableColumn>
//         {/* Agrega más columnas según tus datos */}
//       </TableHeader>
//       <TableBody emptyContent="No hay filas para mostrar.">
//         {users.map((user) => ( 
//           <TableRow key={user.id}>
//             <TableCell> {user.username}</TableCell>
//             <TableCell>{user.email}</TableCell>
//             {/* Agrega más TableCell según tus datos */}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     </div>
//   );
// }
