import React, { useState, useEffect } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure, Input, Tabs, Tab, Card, CardBody
} from "@nextui-org/react";
import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import { PlusIcon } from "../finca/PlusIcon.jsx";
import { SearchIcon } from "../tablePasadia/SearchIcon.jsx";
import toast, { Toaster } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { useAuth } from "../../context/authContext.jsx";
import "./table.css"
import AxiosInstance from "../../api/axios.js";

export default function App() {
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';
  const isEditor = user && user.role === 'editor';

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedCantidad, setEditedCantidad] = useState("");
  const [editedValorUnitario, setEditedValorUnitario] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [formData, setFormData] = useState({
    Descripcion: "",
    tipo: "",
    CantidadInicial: "",
    Caducidad: "",
    ValorUnitario: ""

  });


  const [formDatas, setFormDatas] = useState({
    Descripcion: '',
    tipo: '',
    CantidadInicial: '',
    Caducidad: '',
    subproductos: [
      { Descripcion: '', ValorUnitario: '' },
      { Descripcion: '', ValorUnitario: '' },
    ],
  });

  // Función para manejar cambios en los campos del producto principal
  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setFormDatas((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Función para manejar cambios en los campos de los subproductos
  const handleSubproductoChange = (index, field, value) => {
    setFormDatas((prevFormData) => {
      const subproductos = [...prevFormData.subproductos];
      subproductos[index][field] = value;
      return { ...prevFormData, subproductos };
    });
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;


    setFormData({
      ...formData,
      [name]: value,
    });
  };




  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/obtener-inventario");
        setUsers(response.data);
        console.log("response data: " + JSON.stringify(response.data))
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);



  const handleFormSubmit = async () => {
    try {
      await AxiosInstance.post("/inventario", formData);

      onClose();
      const response = await AxiosInstance.get("/obtener-inventario");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  };

  const handleFormSubmite = async () => {
    try {
      await AxiosInstance.post("/inventario", formDatas);
      onClose();
      const response = await AxiosInstance.get("/obtener-inventario");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  };



  const registrarEliminacion = async (productName) => {
    try {
      const mensaje = `${user.username} ha eliminado el producto ${productName}`;
      await AxiosInstance.post(`/registrar-eliminacion`, { mensaje });
    } catch (error) {
      console.error("Error al registrar la eliminación:", error);
    }
  };


  const handleDelete = async (id, productName) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await AxiosInstance.delete(`/eliminar-mekato/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      await registrarEliminacion(productName);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const registrarEdicion = async (idProducto, nombreProducto, cambios) => {
    try {
      const mensaje = `${user.username} ha editado el producto ${nombreProducto} con ID ${idProducto} . Cambios: ${cambios.join(', ')}.`;

      await AxiosInstance.post(`/registrar-edicion`, { mensaje });
    } catch (error) {
      console.error("Error al registrar la edición:", error);
    }
  };

  const handleEditUser = async (id) => {
    try {
      const inventarioActual = users.find(inventario => inventario._id === id);

      const detallesCambios = [];
      if (inventarioActual.Descripcion !== editedName) detallesCambios.push(`Descripcion: de '${inventarioActual.Descripcion}' a '${editedName}'`);
      if (inventarioActual.tipo !== editedType) detallesCambios.push(`Tipo: de '${inventarioActual.tipo}' a '${editedType}'`);
      if (inventarioActual.Caducidad !== editedDate) detallesCambios.push(`Caducidad: de '${inventarioActual.Caducidad}' a '${editedDate}'`);
      if (inventarioActual.CantidadInicial !== editedCantidad) detallesCambios.push(`CantidadInicial: de '${inventarioActual.CantidadInicial}' a '${editedCantidad}'`);
      if (inventarioActual.ValorUnitario !== editedValorUnitario) detallesCambios.push(`ValorUnitario: de '${inventarioActual.ValorUnitario}' a '${editedValorUnitario}'`);

      if (detallesCambios.length > 0) {
        await AxiosInstance.put(
          `/update-producto/${id}`,
          { Descripcion: editedName, tipo: editedType, Caducidad: editedDate, CantidadInicial: editedCantidad, ValorUnitario: editedValorUnitario }
        );

        await registrarEdicion(id, inventarioActual.Descripcion, detallesCambios);

        const updatedUsers = users.map((inventario) =>
          inventario._id === id ? { ...inventario, Descripcion: editedName, tipo: editedType, Caducidad: editedDate, CantidadInicial: editedCantidad, ValorUnitario: editedValorUnitario } : inventario
        );
        setUsers(updatedUsers);
      }

      setEditedName("");
      setEditedType("");
      setEditedDate("");
      setEditedCantidad("");
      setEditedValorUnitario("");
      setEditedUserId(null);

      toast.success('Producto actualizado exitosamente!');
    } catch (error) {
      console.error("Error al editar producto:", error);
      alert("Error al editar el producto. Por favor, inténtalo de nuevo más tarde.");
    }
  };




  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const filteredProducts = users
    .filter(product => !selectedType || product.tipo === selectedType) // Si no hay tipo seleccionado, no filtra por tipo
    .filter(product => product.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())); // Filtra por término de búsqueda


  function exportToExcel(data) {
    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new();

    // Convertir los datos en un formato que xlsx pueda entender
    const formattedData = data.map(item => ({
      'Descripción del Producto': item.Descripcion,
      'Tipo': item.tipo,
      'Fecha de Caducidad': item.Caducidad,
      'Cantidad': item.CantidadInicial,
      'Valor Unitario': item.ValorUnitario,
      'Productos Vendidos': item.ProductosVendidos,
      'Total de la Venta': item.ProductosVendidos * item.ValorUnitario,
      'Cantidad Restante': item.CantidadInicial,
      'Valor total': (item.CantidadInicial + item.ProductosVendidos) * item.ValorUnitario
    }));

    // Crear una hoja de trabajo a partir de los datos formateados
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Añadir la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "ListaVista");

    // Guardar como archivo Excel
    XLSX.writeFile(wb, "ListaVista.xlsx");
  }



  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));


  return (
    <div className="w-full">
      <Toaster />
      <div className='flex  justify-between mt-5 '>
        <div className='w-full '>
          {/* <CardDesplegable /> */}
          <>
            <div className=" flex justify-between w-12/12 gap-3 flex-col">
              <div className="btnAdd flex flex-wrap"  >

                <div className="inputSearch">
                  <Input
                    label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    isClearable
                    radius="lg"
                    className="w-72 h-12"
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent",
                        "text-black/90 dark:text-black/90",
                        "placeholder:text-black/60 dark:placeholder:text-black/60",
                      ],
                      innerWrapper: "bg-transparent",
                      inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                      ],
                    }}
                    placeholder="Type to search..."
                    startContent={
                      <SearchIcon className="text-black/50 mb-0.5 dark:text-black/90 text-black pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>

                <div className="btns flex ">
                  <Button className="bg-blue-500 w-28 text-white" onClick={() => exportToExcel(filteredProducts)}>
                    Exportar
                  </Button>
                  <Button
                    variant="flat"
                    onClick={() => {
                      setBackdrop("blur");
                      onOpen();
                    }}
                    className="capitalize ml-5 text-white bg-black"
                  >
                    <PlusIcon />  Agregar
                  </Button>
                </div>



              </div>



              <div className=" flex justify-end mr-5 ml-5">
                <select className="outline-0 h-8 w-32 px-2 rounded-2xl mr-5  text-white bg-white/0" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  <option id="p" className="w-52 text-black" value="">Todos</option>
                  <option className="w-52 text-black" value="bebida">Bebidas</option>
                  <option className="w-52 text-black" value="comida">Comidas</option>
                  <option className="w-52 text-black" value="utensilios">Utensilios</option>
                  <option className="w-52 text-black" value="despensa">Despensa</option>
                </select>

              </div>




            </div>

            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
              <ModalContent className="h-5/6 overflow-y-auto">
                {(onClose) => (
                  <Tabs>
                    <Tab key="productos" title="Productos">



                      <ModalHeader className="flex flex-col gap-1">
                        Registrar Producto
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          name="Descripcion"
                          className="input_form"
                          type="text"
                          variant="flat"
                          label="Descripción del producto"
                          onChange={handleInputChange}
                        />


                        <select
                          className="outline-none h-16 border-3 rounded-xl border-blue-500"
                          name="tipo"
                          value={formData.tipo}
                          onChange={(event) => handleInputChange(event)}
                        >
                          <option value="">Seleccione un tipo</option>
                          <option value="bebida">Bebidas</option>
                          <option value="comida">Comidas</option>
                          <option value="utensilios">Utensilios</option>
                          <option value="despensa">Despensa</option>
                        </select>


                        <Input
                          name="Caducidad"
                          className="input_form"
                          type="Date"
                          variant="flat"
                          label="Fecha de caducidad"
                          placeholder="date"
                          onChange={handleInputChange}
                        />


                        <Input
                          name="CantidadInicial"
                          className="input_form"
                          type="number"
                          variant="flat"
                          label="Cantidad inicial"
                          onChange={handleInputChange}
                        />


                        <Input
                          name="ValorUnitario"
                          className="input_form"
                          type="number"
                          variant="flat"
                          label="Precio de venta"
                          onChange={handleInputChange}
                        />


                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>
                          Cerrar
                        </Button>
                        <Button color="primary" onClick={handleFormSubmit}>
                          Guardar
                        </Button>
                      </ModalFooter>


                    </Tab>
                    <Tab key="subProductos" title="SubProductos">
                      <ModalHeader className="flex flex-col gap-1">
                        Registrar Producto
                        <Input
                          label="Descripcion del producto base"
                          type="Text"
                          className="mb-2"
                          name="Descripcion"
                          value={formDatas.Descripcion}
                          onChange={handleInputChanges}
                        />
                        <Input
                          label="Cantidad inicial"
                          className="mb-2"
                          name="CantidadInicial"
                          value={formDatas.CantidadInicial}
                          onChange={handleInputChanges}
                        />
                        <select
                          className="outline-none h-16 border-3 rounded-xl border-blue-500"
                          name="tipo"
                          value={formDatas.tipo}
                          onChange={handleInputChanges}
                        >
                          <option value="">Seleccione un tipo</option>
                          <option value="bebida">Bebidas</option>
                          <option value="comida">Comidas</option>
                          <option value="utensilios">Utensilios</option>
                          <option value="despensa">Despensa</option>
                        </select>
                        <Input
                          name="Caducidad"
                          className="input_form"
                          type="Date"
                          variant="flat"
                          label="Fecha de caducidad"
                          placeholder="date"
                          onChange={handleInputChanges}
                        />

                        {/* Campos para subproductos */}
                        {formDatas.subproductos.map((subproducto, index) => (
                          <div key={index}>
                            <Input
                              label={`Nombre del subproducto ${index + 1}`}
                              className="mb-2"
                              name="Descripcion"
                              type="text"
                              value={subproducto.Descripcion}
                              onChange={(e) => handleSubproductoChange(index, 'Descripcion', e.target.value)}
                            />
                            <Input
                              label={`Precio del subproducto ${index + 1}`}
                              className="mb-2"
                              type="number"
                              name="ValorInitario"
                              value={subproducto.ValorUnitario}
                              onChange={(e) => handleSubproductoChange(index, 'ValorUnitario', e.target.value)}
                            />
                          </div>
                        ))}
                        <Button color="primary" onClick={handleFormSubmite}>Guardar</Button>
                      </ModalHeader>
                    </Tab>

                  </Tabs>
                )}
              </ModalContent>
            </Modal>

          </>
        </div>



      </div>
      <section className="flex coluns-2  mx-5">
        <Table className=" text-center uppercase max-w-full overflow-y-auto table-fixed" aria-label="Lista de Usuarios"
          color="danger"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader className="text-center bg-blue-500">
            <TableColumn className="text-center">descripcion del producto</TableColumn>
            <TableColumn className="text-center">Tipo</TableColumn>
            <TableColumn className="text-center">fecha de caducidad</TableColumn>
            <TableColumn className="text-center">Cantidad</TableColumn>
            {/* --------------------------------------------------------------- */}
            <TableColumn className="text-center">Valor De Venta</TableColumn>
            <TableColumn className="text-center">Productos Vendidos</TableColumn>
            {/* --------------------------------------------------------------- */}
            <TableColumn className="text-center">Total de la venta</TableColumn>
            <TableColumn className="text-center">Cantidad restante</TableColumn>
            <TableColumn className="text-center">
              {isAdmin || isEditor ? (
                <div>
                  Valor total
                </div>
              ) : null
              }
            </TableColumn>

            <TableColumn className="text-center">
              {isAdmin || isEditor ? (
                <div>
                  accion
                </div>
              ) : null
              }
            </TableColumn>


          </TableHeader>
          <TableBody emptyContent="No hay filas para mostrar.">
            {filteredProducts.map((inventario) => (
              <TableRow key={inventario._id}>
                <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        className="w-52"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.Descripcion
                  )}
                </TableCell>

                <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        className="w-52"
                        value={editedType}
                        onChange={(e) => setEditedType(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.tipo
                  )}
                </TableCell>
                <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        className="w-52"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                      />
                    </div>
                  ) : (
                    new Date(inventario.Caducidad).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  )}
                </TableCell>
                <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        className="w-32"
                        value={editedCantidad}
                        onChange={(e) => setEditedCantidad(e.target.value)}
                      />
                    </div>
                  ) : (
                    <span style={{
                      color: inventario.CantidadInicial <= 10 ? 'red' : 'inherit',
                      border: inventario.CantidadInicial >= 0 && inventario.CantidadInicial <= 10 ? '1px solid red' : 'none',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: inventario.CantidadInicial >= 0 && inventario.CantidadInicial <= 10 ? '30px' : 'auto',
                      height: inventario.CantidadInicial >= 0 && inventario.CantidadInicial <= 10 ? '30px' : 'auto',
                    }}>
                      {inventario.CantidadInicial}
                    </span>
                  )}
                </TableCell>




                <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
                        className="w-32"
                        value={editedValorUnitario}
                        onChange={(e) => setEditedValorUnitario(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.ValorUnitario
                  )}
                </TableCell>

                <TableCell>{inventario.ProductosVendidos}</TableCell>
                <TableCell>{inventario.ProductosVendidos * inventario.ValorUnitario}</TableCell>
                <TableCell>{inventario.CantidadInicial}</TableCell>
                <TableCell>
                  {isAdmin || isEditor ? (
                    <div>
                      {(inventario.CantidadInicial + inventario.ProductosVendidos) * inventario.ValorUnitario}
                    </div>

                  ) : null}
                </TableCell>

                <TableCell className="flex justify-center align-center">

                  {isAdmin || isEditor ? (
                    <div className="flex w-40 justify-center items-center h-10">
                      {inventario._id === editedUserId && (
                        <img
                          className="w-8 h-8 mr-4 cursor-pointer"
                          src={download}
                          alt="actualizar"
                          onClick={() => handleEditUser(inventario._id)}
                        />
                      )}
                      <img
                        className="w-8 h-8 mr-4 cursor-pointer"
                        src={editar}
                        alt="Edit"
                        onClick={() => {
                          setEditedName(inventario.Descripcion);
                          setEditedType(inventario.tipo);
                          setEditedDate(inventario.Caducidad);
                          setEditedCantidad(inventario.CantidadInicial);
                          setEditedValorUnitario(inventario.ValorUnitario);
                          setEditedUserId(inventario._id);
                        }}
                      />
                      <img
                        className="w-8 h-8 cursor-pointer"
                        src={borrar}
                        alt="Delete"
                        onClick={() => handleDelete(inventario._id, inventario.Descripcion)}
                      />
                    </div>
                  ) : null}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>


    </div>
  );
}
