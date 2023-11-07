import { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,Input,Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import toast, {Toaster} from 'react-hot-toast';
import {html2pdf} from 'html2pdf.js';
import * as XLSX from 'xlsx';


import "./table.css"

export default function App() {

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
    Caducidad:"",
    ValorUnitario:""
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // let finalValue = value;

    // if (name === "Caducidad") {
    //     const fecha = new Date(value);
    //     finalValue = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    // }

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name)
    console
};




  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/obtener-inventario");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);



  const handleFormSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/inventario", formData);
      
      onClose();
      const response = await axios.get("http://127.0.0.1:3000/api/obtener-inventario");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmDelete) {
      return; 
    }

    try {
      await axios.delete(`http://127.0.0.1:3000/api/eliminar-mekato/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };


  const handleEditUser = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/update-producto/${id}`,
        { Descripcion: editedName, tipo: editedType, Caducidad: editedDate, CantidadInicial: editedCantidad, ValorUnitario: editedValorUnitario }
      );
      const updatedUsers = users.map((inventario) =>
        inventario._id === editedUserId ? { ...inventario, Descripcion: editedName, tipo: editedType, Caducidad: editedDate, CantidadInicial: editedCantidad, ValorUnitario: editedValorUnitario } : inventario
      );
      setUsers(updatedUsers);
      setEditedName(""); 
      setEditedType("")
      setEditedDate("")
      setEditedCantidad("")
      setEditedValorUnitario("")
      setEditedUserId(null); 
      toast.success('Cliente actualizado exitosamente!');
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Error al editar usuario. Por favor, inténtalo de nuevo más tarde.");
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
      'Cantidad Restante': item.CantidadInicial - item.ProductosVendidos
    }));
  
    // Crear una hoja de trabajo a partir de los datos formateados
    const ws = XLSX.utils.json_to_sheet(formattedData);
    
    // Añadir la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "ListaVista");
  
    // Guardar como archivo Excel
    XLSX.writeFile(wb, "ListaVista.xlsx");
  }
  


  

  return (
    <div className="w-full ">
      <Toaster/>
        <div className='flex  justify-between mt-5 mb-5'>
            <div className='w-full '>
        {/* <CardDesplegable /> */}
        <>
      <div className="flex justify-between w-12/12 gap-3">
      <button onClick={() => exportToExcel(filteredProducts)}>Descargar Excel</button>




        <Button
          variant="flat"
          color="primary"
          
          onClick={() => {
            setBackdrop("blur");
            onOpen();
          }}
          className="capitalize ml-5 text-white bg-gradient-to-r from-emerald-400 to-cyan-500"
        >
          Agregar producto
        </Button>

        {/* <Select
          value={selectedType} 
          onChange={(value) => setSelectedType(value)}
          label="Filtrar el tipo"
        >
          <SelectItem value="Bebida">Bebidas</SelectItem>
          <SelectItem value="comida">Comidas</SelectItem>
          <SelectItem value="mekato">Mekatos</SelectItem>
        </Select> */}
  <div className=" w-52 flex justify-center">
        <input
        id="s"
        type="search"
        label="busca el producto"
        value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-52 h-10 "
        >
          
      </input>
      </div>
       
        <select className="outline-0 h-10 w-32 px-2 rounded-2xl mr-5  text-white bg-gradient-to-r from-emerald-400 to-cyan-500" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>

        <option id="p" className="w-52 text-white bg-emerald-400  "  value="">Todos</option>
        <option className="w-52 text-white bg-emerald-400  " value="Bebida">Bebidas</option>
        <option className="w-52 text-white bg-emerald-400  "  value="comida">Comidas</option>
        <option className="w-52 text-white bg-emerald-400  "  value="mekato">MeKatos</option>

      </select>



      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
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
                  
                  name="tipo"
                  value={formData.tipo}
                  onChange={(event) => handleInputChange(event)} 
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Bebida">Bebidas</option>
                  <option value="comida">Comidas</option>
                  <option value="mekato">Mekatos</option>
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
                  label="Valor unitario"
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
            </div>
            
        
            
        </div>
        <section className="flex coluns-2  mx-5">
          <Table id="myTable" className=" text-center uppercase" aria-label="Lista de Usuarios">
            <TableHeader className="text-center bg-blue-500">
              <TableColumn className="text-center">descripcion del producto</TableColumn>
              <TableColumn className="text-center">Tipo</TableColumn>
              <TableColumn className="text-center">fecha de caducidad</TableColumn>
              <TableColumn className="text-center">Cantidad</TableColumn>
              {/* --------------------------------------------------------------- */}
              <TableColumn className="text-center">Valor Unitario</TableColumn>
              <TableColumn className="text-center">Productos Vendidos</TableColumn>
              {/* --------------------------------------------------------------- */}
              <TableColumn className="text-center">Total de la venta</TableColumn>
              <TableColumn className="text-center">Cantidad restante</TableColumn>
              <TableColumn className="text-center">Valor total</TableColumn>
              {/* <TableColumn className="text-center">accion</TableColumn> */}
            </TableHeader>
            <TableBody emptyContent="No hay filas para mostrar.">
              {filteredProducts.map((inventario) => ( 
                <TableRow key={inventario._id}>
                  <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
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
                        value={editedCantidad}
                        onChange={(e) => setEditedCantidad(e.target.value)}
                      />
                    </div>
                  ) : (
                    inventario.CantidadInicial
                  )}
                </TableCell>
                  <TableCell>
                  {inventario._id === editedUserId ? (
                    <div className="flex">
                      <Input
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
                  <TableCell>{ inventario.CantidadInicial - inventario.ProductosVendidos}</TableCell>
                  <TableCell>{inventario.CantidadInicial * inventario.ValorUnitario}</TableCell>
                  {/* <TableCell className="flex justify-center align-center"> 
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
                      setEditedUserId(inventario._id)
                    }}
                  />
                  <img
                  className="w-8 h-8 cursor-pointer"
                  src={borrar}
                  alt="Delete"
                  onClick={() => handleDelete(inventario._id)}
                />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        

    </div>
  );
}
