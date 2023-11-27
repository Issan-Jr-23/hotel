import { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,Input } from "@nextui-org/react";
import axios from "axios";
import editar from "../../images/boligrafo.png";
import borrar from "../../images/borrar.png";
import download from "../../images/download.png";
import toast, {Toaster} from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { useAuth } from "../../context/authContext.jsx";


import "./table.css"
import { API_URL } from "../../config.js";

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
    console
};




  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL+"/obtener-inventario");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);



  const handleFormSubmit = async () => {
    try {
      await axios.post(API_URL+"/inventario", formData);
      
      onClose();
      const response = await axios.get(API_URL+"/obtener-inventario");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  };


  const registrarEliminacion = async (productName) => {
    try {
      const mensaje = `${user.username} ha eliminado el ${productName}`;
      console.log(mensaje)
      await axios.post(`${API_URL}/registrar-eliminacion`, { mensaje });
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
      await axios.delete(`${API_URL}/eliminar-mekato/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      await registrarEliminacion(productName);
      setUsers(updatedUsers);
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const registrarEdicion = async (idProducto, cambios) => {
    try {
      const mensaje = `${user.username} ha editado el producto con ID ${idProducto}. Cambios: ${cambios.join(', ')}.`;
  
      await axios.post(`${API_URL}/registrar-edicion`, { mensaje });
    } catch (error) {
      console.error("Error al registrar la edición:", error);
    }
  };

  const handleEditUser = async (id) => {
    try {
      // Obtiene el inventario actual antes de la edición
      const inventarioActual = users.find(inventario => inventario._id === id);
  
      // Comprueba los cambios y registra los detalles específicos
      const detallesCambios = [];
      if (inventarioActual.Descripcion !== editedName) detallesCambios.push(`Descripcion: de '${inventarioActual.Descripcion}' a '${editedName}'`);
      if (inventarioActual.tipo !== editedType) detallesCambios.push(`Tipo: de '${inventarioActual.tipo}' a '${editedType}'`);
      if (inventarioActual.Caducidad !== editedDate) detallesCambios.push(`Caducidad: de '${inventarioActual.Caducidad}' a '${editedDate}'`);
      if (inventarioActual.CantidadInicial !== editedCantidad) detallesCambios.push(`CantidadInicial: de '${inventarioActual.CantidadInicial}' a '${editedCantidad}'`);
      if (inventarioActual.ValorUnitario !== editedValorUnitario) detallesCambios.push(`ValorUnitario: de '${inventarioActual.ValorUnitario}' a '${editedValorUnitario}'`);
  
      // Realiza la actualización solo si hay cambios
      if (detallesCambios.length > 0) {
        await axios.put(
          `${API_URL}/update-producto/${id}`,
          { Descripcion: editedName, tipo: editedType, Caducidad: editedDate, CantidadInicial: editedCantidad, ValorUnitario: editedValorUnitario }
        );
  
        // Registra la edición
        await registrarEdicion(id, detallesCambios);
  
        // Actualiza la lista de usuarios
        const updatedUsers = users.map((inventario) =>
          inventario._id === id ? { ...inventario, Descripcion: editedName, tipo: editedType, Caducidad: editedDate, CantidadInicial: editedCantidad, ValorUnitario: editedValorUnitario } : inventario
        );
        setUsers(updatedUsers);
      }
  
      // Resetea los estados de edición
      setEditedName(""); 
      setEditedType("")
      setEditedDate("")
      setEditedCantidad("")
      setEditedValorUnitario("")
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
      'Total de la venta': (item.CantidadInicial + item.ProductosVendidos) * item.ValorUnitario
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
      <img  className="h-10 w-10 ml-5 cursor-pointer" onClick={() => exportToExcel(filteredProducts)} src={download} alt="" />


    
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
          <Table  className=" text-center uppercase max-w-full overflow-y-auto" aria-label="Lista de Usuarios">
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
                 ): null
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
                  <TableCell>{ inventario.CantidadInicial}</TableCell>
                  <TableCell>
                    {isAdmin || isEditor ? (
                      <div>
                        {(inventario.CantidadInicial + inventario.ProductosVendidos) * inventario.ValorUnitario}
                      </div>

                    ) : null }
                    </TableCell>
                  
                  <TableCell className="flex justify-center align-center">
                    {isAdmin || isEditor ? (
                      <div className="flex w-40 justify-center items-center">
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
