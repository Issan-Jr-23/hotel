import { useState, useEffect } from 'react';
import './table.css';
import { Table, Input, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import CardDesplegable from './CardDesplegable.jsx';
import axios from 'axios';

export default function TablaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET al servidor Node.js cuando el componente se monta
    axios.get('/api/usuarios') // La ruta '/api/usuarios' está definida en rutas.js
      .then(response => {
        // Actualizar el estado con los datos recibidos del servidor
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []); // El segundo argumento vacío [] asegura que useEffect se ejecute solo una vez (equivalente a componentDidMount en las clases)

  const columns = [
    {
      key: "name",
      label: "NOMBRE",
    },
    {
      key: "acompañantes",
      label: "ACOMPAÑANTES",
    },
    {
      key: "reserva",
      label: "RESERVA",
    },
    {
      key: "pago",
      label: "PAGO",
    },
    {
      key: "pedidos",
      label: "PEDIDOS",
    },
  ];

  return (
    <div>
      <section>
        <div className="header">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            type="search"
          />
          <CardDesplegable />
        </div>
        <Table aria-label="Controlled table example with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={usuarios}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
