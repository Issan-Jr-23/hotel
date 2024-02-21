import React, { useState, useEffect } from "react"
import "./css/infovb.css"
import AxiosInstance from "../../api/axios.js"
import { Link, useParams } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import Vaca from "../../images/vaca.png"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, Pagination, Select, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const info = () => {
 const { id } = useParams();
 const [data, setData] = useState(null)
 const [selectedItem, setSelectedItem] = useState({});
 const [selectedItemCow, setSelectedItemCow] = useState({});
 const [becerroData, setBecerroData] = useState(null)
 const [open, setOpen] = React.useState(false);
 const handleOpen = item => {
  setSelectedItem(item)
  // console.log("item a mostrar: ", item)
  setOpen(true)
 };

 const handleClose = () => setOpen(false);
 const [openModal, setOpenModal] = React.useState(false);
 const handleOpenModal = (data) => {
  setSelectedItemCow(data)
  setOpenModal(true);
 }
 const handleCloseModal = () => setOpenModal(false);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await AxiosInstance.get(`/obtain/register/becerro/vb/${id}`)
    // console.log("data becerro", response.data.historialTerneros)
    setBecerroData(response.data.historialTerneros)
   } catch (error) {
    console.error("Error al encontrar el registro")
   }
  };
  fetchData();
 }, [])

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await AxiosInstance.get(`/obtain/register/vb/${id}`)
    setData(response.data)
   } catch (error) {
    console.error("Error al encontrar el registro")
   }
  };
  fetchData();
 }, [])

 const handleUpdate = async () => {
  try {
   await AxiosInstance.put(`/update/register/vb/${id}/${selectedItem._id}`, selectedItem);
   // console.log("Registro actualizado correctamente");
   handleClose(); // Cerrar el modal después de la actualización
  } catch (error) {
   console.error("Error al actualizar el registro:");
  }
 };

 const handleUpdateCow = async () => {
  try {
   await AxiosInstance.put(`/update/register/vb/${id}`, selectedItemCow);
   // console.log("Registro actualizado correctamente");
   handleClose(); // Cerrar el modal después de la actualización
  } catch (error) {
   console.error("Error al actualizar el registro");
  }
 };

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 571,
  height: "min-height-90vh",
  bgcolor: 'background.paper',
  overflow: "scroll",
  boxShadow: 0,
  p: 4,
  borderRadius: 5
 };


 return (
  <div className="pt-20 pb-20">
   <section>
    {data ? (
     <article className="flex container-info-vb">
      <div className="ml-5 flex flex-col cont-info-bv p-2 rounded-xl">
       <span className="span-infovc-cont-img bg-gray-200 mb-3"><img src={Vaca} alt="" /></span>
       <span className="text-center"><p className="font-semibold">{data.identificationNumber}</p></span>
       <span className="text-center"><p className="font-semibold">{data.name}</p></span>
       <span className="text-center"><p className="font-semibold">{data.breed}</p></span>
       <span className="text-center"><p className="font-semibold">{data.gender}</p></span>
       <span className="text-center"><p className="font-semibold">{new Date(data.birthDate).toLocaleDateString('es-ES')}</p></span>
       <Button onClick={() => handleOpenModal(data)} className="mt-5 mb-2 text-white" color="success">Editar</Button>
       <Button color="primary"> <Link to="/bovinos/table" className="w-full h-full flex justify-center items-center">Volver</Link></Button>
      </div>
      <div className="w-full ml-5 mr-5 bg-white p-2 rounded-xl">
       <table className="w-full">
        <thead>
         <tr className="border-b-2 h-12">
          <th><span className="flex w-12 "></span></th>
          <th className="pr-2 pl-2 text-center">Id</th>
          <th className="pr-2 pl-2 text-center">Name</th>
          <th className="pr-2 pl-2 text-center">Raza</th>
          <th className="pr-2 pl-2 text-center">Genero</th>
          <th className="pr-2 pl-2 text-center">F - Nacimiento</th>
          <th className="pr-2 pl-2 text-center">Acción</th>
         </tr>
        </thead>
        <tbody>
         {becerroData && becerroData.map((item, index) => (
          <tr key={item._id} className="border-b-2">
           <td><span className="flex w-12 text-center justify-center">{index + 1}</span></td>
           <td className="pr-2 pl-2 text-center text-blue-500">{item.identificationNumber}</td>
           <td className="pr-2 pl-2 text-center h-16">{item.name}</td>
           <td className="pr-2 pl-2 text-center h-16">{item.breed}</td>
           <td className="pr-2 pl-2 text-center h-16">{item.gender}</td>
           <td className="text-center td-table-ganado pl-2 pr-2">{new Date(item.birthDate).toLocaleDateString('es-ES')}</td>
           <td className="pr-2 pl-2 text-center h-16">
            <Button onClick={() => handleOpen(item)}>Open modal</Button>
           </td>
           {/* Aquí puedes agregar más columnas según sea necesario */}
          </tr>
         ))}
        </tbody>

       </table>
      </div>
     </article>
    ) : (

     <div>
      not data
     </div>

    )}
    <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
    >
     {selectedItem && (
      <Box sx={style} style={{
       maxHeight: "90vh",
       minHeight: "min-content",
       overflowY: "auto"
      }}>
       <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center uppercase">
        Adicionar bezerro
       </Typography>
       <Typography id="modal-modal-description" componet="" sx={{ mt: 2 }}>
        <div className="registro-01-div-form">
         <span className="form-001-span mb-2">
          <TextField
           className="form-00-span-textFiel mr-2"
           required
           id="identificationNumber"
           name="identificationNumber"
           label="Identificación"
           placeholder="123456789"
           value={selectedItem.identificationNumber}
           onChange={(event) => setSelectedItem({ ...selectedItem, identificationNumber: event.target.value })}
          />
          <TextField
           className="form-00-span-textFiel ml-2"
           required
           id="name"
           name="name"
           label="Nombre"
           placeholder="Vaca"
           value={selectedItem.name}
           onChange={(event) => setSelectedItem({ ...selectedItem, name: event.target.value })}
          />

         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-01-span-textField"
           required
           id="breed"
           name="breed"
           label="Raza"
           placeholder="Braman"
           value={selectedItem.breed}
           onChange={(event) => setSelectedItem({ ...selectedItem, breed: event.target.value })}
          />
         </span>
         <span className="form-001-span mb-2">
          <FormControl required className="form-01-span-textField">
           <InputLabel id="gender-label">Género</InputLabel>
           <Select
            required
            labelId="gender-label"
            id="gender" name="gender" value={selectedItem.gender} onChange={(event) => setSelectedItem({ ...selectedItem, gender: event.target.value })}>
            <MenuItem value="hembra">Hembra</MenuItem>
            <MenuItem value="macho">Macho</MenuItem>
           </Select>
          </FormControl>
         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-01-span-textField"
           required
           id="birthDate"
           name="birthDate"
           label="Fecha de nacimiento"
           type="text"
           InputLabelProps={{
            shrink: true,
           }}
           value={selectedItem.birthDate}
           onChange={(event) => setSelectedItem({ ...selectedItem, birthDate: event.target.value })}
          />
         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-00-span-textFiel mr-2"
           id="color"
           name="color"
           label="Color"
           placeholder="Blanco"
           value={selectedItem.color}
           onChange={(event) => setSelectedItem({ ...selectedItem, color: event.target.value })}
          />
          <TextField
           className="form-00-span-textFiel mr-2"
           id="distinctiveMark"
           name="distinctiveMark"
           label="Marca distintiva"
           placeholder="Mancha en la frente"
           value={selectedItem.distinctiveMark}
           onChange={(event) => setSelectedItem({ ...selectedItem, distinctiveMark: event.target.value })}
          />

         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-01-span-textField"
           id="description"
           name="description"
           label="Descripción"
           multiline
           rows={4}
           value={selectedItem.description}
           onChange={(event) => setSelectedItem({ ...selectedItem, description: event.target.value })}
          />
         </span>
         <Button color="primary" onClick={handleUpdate} > Cargar</Button>
        </div>
       </Typography>
      </Box>
     )}

    </Modal>



    <Modal
     open={openModal}
     onClose={handleCloseModal}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
    >
     {selectedItemCow && (
      <Box sx={style} style={{
       maxHeight: "90vh",
       minHeight: "min-content",
       overflowY: "auto"
      }}>
       <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center uppercase">
        Adicionar bezerro
       </Typography>
       <Typography id="modal-modal-description" componet="" sx={{ mt: 2 }}>
        <div className="registro-01-div-form">
         <span className="form-001-span mb-2">
          <TextField
           className="form-00-span-textFiel mr-2"
           required
           id="identificationNumber"
           name="identificationNumber"
           label="Identificación"
           placeholder="123456789"
           value={selectedItemCow.identificationNumber}
           onChange={(event) => setSelectedItemCow({ ...selectedItemCow, identificationNumber: event.target.value })}
          />
          <TextField
           className="form-00-span-textFiel ml-2"
           required
           id="name"
           name="name"
           label="Nombre"
           placeholder="Vaca"
           value={selectedItemCow.name}
           onChange={(event) => setSelectedItemCow({ ...selectedItemCow, name: event.target.value })}
          />

         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-01-span-textField"
           required
           id="breed"
           name="breed"
           label="Raza"
           placeholder="Braman"
           value={selectedItemCow.breed}
           onChange={(event) => setSelectedItemCow({ ...selectedItemCow, breed: event.target.value })}
          />
         </span>
         <span className="form-001-span mb-2">
          <FormControl required className="form-01-span-textField">
           <InputLabel id="gender-label">Género</InputLabel>
           <Select
            required
            labelId="gender-label"
            id="gender" name="gender" value={selectedItemCow.gender || "Not Data"} onChange={(event) => setSelectedItem({ ...selectedItemCow, gender: event.target.value })}>
            <MenuItem value="hembra">Hembra</MenuItem>
            <MenuItem value="macho">Macho</MenuItem>
           </Select>
          </FormControl>
         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-01-span-textField"
           required
           id="birthDate"
           name="birthDate"
           label="Fecha de nacimiento"
           type="text"
           InputLabelProps={{
            shrink: true,
           }}
           value={selectedItemCow.birthDate}
           onChange={(event) => setSelectedItem({ ...selectedItemCow, birthDate: event.target.value })}
          />
         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-00-span-textFiel mr-2"
           id="color"
           name="color"
           label="Color"
           placeholder="Blanco"
           value={selectedItemCow.color}
           onChange={(event) => setSelectedItem({ ...selectedItemCow, color: event.target.value })}
          />
          <TextField
           className="form-00-span-textFiel mr-2"
           id="distinctiveMark"
           name="distinctiveMark"
           label="Marca distintiva"
           placeholder="Mancha en la frente"
           value={selectedItemCow.distinctiveMark}
           onChange={(event) => setSelectedItem({ ...selectedItemCow, distinctiveMark: event.target.value })}
          />

         </span>

         <span className="form-001-span mb-2">
          <TextField
           className="form-01-span-textField"
           id="description"
           name="description"
           label="Descripción"
           multiline
           rows={4}
           value={selectedItemCow.description}
           onChange={(event) => setSelectedItem({ ...selectedItemCow, description: event.target.value })}
          />
         </span>
         <Button color="primary" onClick={handleUpdateCow} > Cargar</Button>
        </div>
       </Typography>
      </Box>
     )}
    </Modal>

   </section>
  </div>
 )
}

export default info