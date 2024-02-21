import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Button, Popover, PopoverContent, PopoverTrigger, Input, Listbox, ListboxItem, Textarea } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
// import { users } from "./data";
import { PlusIcon } from "./PlusIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { registrarProduction, obtenerData } from "../../api/ranch.api";

export default function App() {

  const [showPopover, setShowPopover] = useState(false);
  const [ranchData, setRanchData] = useState([])
  const [formData, setFormData] = React.useState({
    nombre: "",
    tipo: "",
    cantidadProducida: "",
    areaDeProduccion: "",
    notasEspeciales: ""

  })
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(ranchData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ranchData.slice(start, end);
  }, [page, ranchData]);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handdleFormSubmit = async () => {
    try {
      await registrarProduction(formData);
      const getData = await obtenerData();
      setRanchData(getData);
    } catch (error) {
      console.error("Error al registrar la producción");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await obtenerData();
        setRanchData(getData);
        // console.log("My data: " + getData)
      } catch (error) {
        console.error("los datos no se pudieron obtener en este momento")
      }
    }
    fetchData();
  }, [])

  return (

    <div>

      <div className="flex justify-between">
        <article>
          <Button
            endContent={<ChevronDownIcon className="text-small" />}
            size="sm"
            variant="flat"
            className="mr-2"
          >
            Columns
          </Button>

          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
                className="mr-2"
              >
                Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="flex flex-col ">
                <ListboxWrapper>
                  <Listbox
                    aria-label="Multiple selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    <ListboxItem key="text">Text</ListboxItem>
                    <ListboxItem key="number">Number</ListboxItem>
                    <ListboxItem key="date">Date</ListboxItem>
                    <ListboxItem key="single_date">Single Date</ListboxItem>
                    <ListboxItem key="iteration">Iteration</ListboxItem>
                  </Listbox>
                </ListboxWrapper>
              </div>
            </PopoverContent>
          </Popover>
        </article>
        <Popover placement="button" showArrow={true}>
          <PopoverTrigger>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              Add New
            </Button>

          </PopoverTrigger>
          <PopoverContent className="bg-white">
            <div>
              <h2 className="w-full text-center mt-2 mb-2 text-black">CONTENIDO</h2>
              <div>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  radius="none"
                  value={formData.nombre}
                  onChange={handleChange}
                  label="Nombre"
                  className="h-12 w-80 p-1" />
                <Input name="tipo" type="text" onChange={handleChange} value={formData.tipo} radius="none" className="h-12 w-80 p-1" label="Tipo" />
                <Input name="cantidadProducida" onChange={handleChange} value={formData.cantidadProducida} radius="none" className="h-12 w-80 p-1" label="Cantidad producida" />
                <Input name="areaDeProduccion" onChange={handleChange} value={formData.areaDeProduccion} radius="none" className="h-12 w-80 p-1" label="area de produccion" />
                <Textarea
                  name="notasEspeciales"
                  label="Description"
                  placeholder="Enter your description"
                  value={formData.notasEspeciales}
                  onChange={handleChange}
                  radius="none" className=" w-80 p-1" />
              </div>
              <Button onClick={handdleFormSubmit} color="primary" className="h-10 w-20 ml-1 mt-1 mb-5 mr-2">Enviar</Button>
              <Button className="text-red-500 font-bolt">Cerrar</Button>
            </div>
          </PopoverContent>

        </Popover>
      </div>


      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn className="text-center" key="name">DESCRIPCIÓN</TableColumn>
          <TableColumn className="text-center" key="role">TIPO</TableColumn>
          <TableColumn className="text-center" key="stat">CANTIDAD</TableColumn>
          <TableColumn className="text-center" key="statu">AREA</TableColumn>
          <TableColumn className="text-center" key="status">OBSERVACIONES</TableColumn>
          <TableColumn className="text-center">OPERACIÓN</TableColumn>
        </TableHeader>
        <TableBody >
          {ranchData.map((ranch) => (
            <TableRow key={ranch._id} className="text-center uppercase">
              <TableCell>{ranch.nombre}</TableCell>
              <TableCell>{ranch.tipo}</TableCell>
              <TableCell className="text-blue-500 font-semibold">{ranch.cantidadProducida}</TableCell>
              <TableCell>{ranch.areaDeProduccion}</TableCell>
              <TableCell>{ranch.notasEspeciales}</TableCell>
              <TableCell>RESULTADO</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
