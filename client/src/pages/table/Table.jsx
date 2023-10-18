// import { useState, useEffect } from 'react';
// import './table.css';
// import { Table, Input, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
// import CardDesplegable from './CardDesplegable.jsx';
// import axios from 'axios';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:3000/api/data');
//         setUsers(response.data); 
//       } catch (error) {
//         console.error('Error al obtener datos del servidor:', error);
        
//       }
//     };

//     fetchData(); 
//   }, []); 

//   return (
//     <div>
//       <h1>Lista de Usuarios</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.forEach(user => (
//             <tr key={user.id}>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;



