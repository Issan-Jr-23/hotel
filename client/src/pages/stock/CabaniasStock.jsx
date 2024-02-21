import React, { useEffect, useState } from 'react'
import AxiosInstance from "../../api/axios.js"
import "../css/cabaniaStock.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PlusIcon } from '../finca/PlusIcon.jsx';
import { Input } from '@nextui-org/react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import join from "../../images/join.svg"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { SearchIcon } from '../tablePasadia/SearchIcon.jsx';
import { VerticalDotsIcon } from '../iconos/VerticalDotsIcon.jsx';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import pi from "../../images/personajes-ilustrados.png"
import loading_progress from "../../images/Animation-alternativa-loading.json"
import Lottie from "react-lottie"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: "90vh",
    overflow: "scroll",
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
};


const CabaniasStock = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [cabaniaFilter, setCabaniaFilter] = useState('');
    const [ubicacionFilter, setUbicacionFilter] = useState('');
    const [data, setData] = useState([])
    const handleCloseM = () => setOpenM(false);
    const [openM, setOpenM] = React.useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);



    const handleClicked = (id) => (event) => {
        setSelectedId(id);
        setAnchorEl(event.currentTarget);
    };


    const handleOpenM = (id) => {
        // console.log("depuracion del id seleccionado: ", id);
        const itemSeleccionado = data.find(item => item._id === id);
        // console.log("depuración del item seleccionado: ", itemSeleccionado);

        if (itemSeleccionado) {
            setProductoSeleccionado(itemSeleccionado);
            setOpenM(true);
        } else {
            console.error('Item no encontrado');
        }
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);



    const handleCloseMn = () => {
        setAnchorEl(null);
    };


    const [formData, setFormData] = useState({
        item: "",
        descripcion: "",
        cantidad: "",
        cabania: "",
        ubicacion: "",
        contenido: ""
    })

    const handlePost = async () => {
        // Crear una copia del formData para no modificar el estado directamente
        let dataToSend = { ...formData };

        // Recorrer cada clave en dataToSend y cambiar cadenas vacías por "No definido"
        Object.keys(dataToSend).forEach(key => {
            if (dataToSend[key].trim() === "") {
                dataToSend[key] = "No definido";
            }
        });

        try {
            // Envía los datos al servidor
            await AxiosInstance.post(`/register-cabania-stock`, dataToSend);
            // console.log("succesfully");

            // Obtener la respuesta actualizada
            const response = await AxiosInstance.get("/view-cabania-stock");
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log("false");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get("/view-cabania-stock");
                // console.log(response.data)
                setData(response.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            } catch (error) {
                console.error("Error al obtener datos del servidor:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );

        if (!confirmDelete) {
            return;
        }
        try {
            await AxiosInstance.delete(`/delete-cabania-stock/${id}`)
            const response = await AxiosInstance.get("/view-cabania-stock");
            setData(response.data);
            console.log("succefully")
        } catch (error) {
            console.log("false")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleInputChanges = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const filterData = () => {
        return data.filter(x =>
            (cabaniaFilter ? x.cabania === cabaniaFilter : true) &&
            (ubicacionFilter ? x.ubicacion === ubicacionFilter : true) &&
            (searchFilter ? x.item?.toLowerCase().includes(searchFilter.toLowerCase()) : true)
        );
    };

    const filteredData = filterData();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoSeleccionado((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const defaultOptionLoadingHome = {
        loop: true,
        autoPlay: true,
        animationData: loading_progress,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    // const handleEdit = async(id,editedItem,editedCantidad, editedUbicacion, )

    return (
        <div className='pt-20 flex flex-col pl-5 pr-5 pb-20'>
            <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
                <Lottie options={defaultOptionLoadingHome} width={100} height={100} />
            </div>
            <div className='flex justify-between'>
                <div>
                    <Button
                        variant="flat"
                        onClick={handleOpen}
                        className="capitalize ml-5 text-white"
                        style={{ backgroundColor: "#18c964", color: "white", textTransform: "capitalize", padding: "8px 15px", fontWeight: "600", borderRadius: "13px" }}
                    >
                        <PlusIcon />  Agregar
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Product Details
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
                                <form action="" className=' flex flex-col'>
                                    <figure className='inventario-box-option-00-figure'>

                                        <img className='inventario-box-option-00-img' src={join} alt="" />
                                    </figure>
                                    <span className='cabania-stock-form-modal-01'>
                                        <label htmlFor="" className='cabania-stock-form-modal-01-label'>Name</label>
                                        <input type="text"
                                            placeholder='Escribe el nombre'
                                            name='item'
                                            onChange={handleInputChange}
                                            value={formData.item}
                                            className='cabania-stock-form-modal-01-input' />
                                    </span>
                                    <span className='cabania-stock-form-modal-01 mt-2'>
                                        <label htmlFor="" className='cabania-stock-form-modal-01-label'>Descripción</label>
                                        <textarea type="text"
                                            name='descripcion'
                                            placeholder='Descripción del producto'
                                            onChange={handleInputChange}
                                            value={formData.descripcion}
                                            className='cabania-stock-form-modal-01-textarea' />
                                    </span>
                                    <select
                                        className="cabania-stock-form-modal-01-input mt-3 mb-3"
                                        name="cabania"
                                        value={formData.cabania}
                                        onChange={(event) => handleInputChanges(event)}
                                    >
                                        <option value="">Seleccione una cabaña</option>
                                        <option value="cabania1">Cabaña #1</option>
                                        <option value="cabania2">Cabaña #2</option>
                                        <option value="cabania3">Cabaña #3</option>
                                    </select>
                                    <select
                                        className="cabania-stock-form-modal-01-input mb-3"
                                        name="ubicacion"
                                        value={formData.ubicacion}
                                        onChange={(event) => handleInputChanges(event)}
                                    >
                                        <option value="">Seleccione la ubicación</option>
                                        <option value="cocina">Cocina</option>
                                        <option value="banio">Baño</option>
                                        <option value="sala">Sala</option>
                                        <option value="cuarto">Cuarto</option>
                                    </select>
                                    <article className='cabania-stock-form-article'>
                                        <span className='cabania-stock-form-modal-01 pr-2'>
                                            <label htmlFor="" className='cabania-stock-form-modal-01-label'>Cantidad</label>
                                            <input type="text"
                                                placeholder='Ingrese la cantidad'
                                                name='cantidad'
                                                onChange={handleInputChange}
                                                value={formData.cantidad}
                                                className='cabania-stock-form-modal-01-input' />
                                        </span>
                                        <span className='cabania-stock-form-modal-01 pl2'>
                                            <label htmlFor="" className='cabania-stock-form-modal-01-label'>Contenido</label>
                                            <input type="text"
                                                name='contenido'
                                                onChange={handleInputChange}
                                                value={formData.contenido}
                                                placeholder='No aplica' className='cabania-stock-form-modal-01-input' />
                                        </span>
                                    </article>
                                    <div className='flex justify-end mt-5'>
                                        <Button variant="outlined" startIcon={<DeleteIcon />} className="mr-2" style={{ border: "2px solid rgb(7, 182, 213)", color: "rgb(7, 182, 213)", fontWeight: "600", width: "120px" }} >
                                            Cancelar
                                        </Button>
                                        <Button variant="contained" className='ml-2' endIcon={<SendIcon />} style={{ backgroundColor: "rgb(7, 182, 213)", color: "white", fontWeight: "600", marginLeft: "10px", width: "120px" }} onClick={handlePost} >
                                            Guardar
                                        </Button>
                                    </div>

                                </form>
                            </Typography>
                        </Box>
                    </Modal>

                </div>
                <div className="filters">
                    <Input
                        label="Search"
                        value={searchFilter}
                        onChange={e => setSearchFilter(e.target.value)}
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


            </div>
            <h2 className='text-4xl uppercase mt-14 flex justify-center items-center'>stock de cabañas</h2>

            <div className='mt-2'>
                <div className='cont-filter-00'>
                    <select
                        className="cabania-stock-form-modal-01-input-filter mgi"
                        value={cabaniaFilter}
                        onChange={e => setCabaniaFilter(e.target.value)}
                    >
                        <option value="">Cabaña</option>
                        <option value="cabania1">Cabaña #1</option>
                        <option value="cabania2">Cabaña #2</option>
                        <option value="cabania3">Cabaña #3</option>
                    </select>
                    <select
                        className="cabania-stock-form-modal-01-input-filter mgi"
                        value={ubicacionFilter}
                        onChange={e => setUbicacionFilter(e.target.value)}
                    >
                        <option value="">Ubicación</option>
                        <option value="cocina">Cocina</option>
                        <option value="banio">Baño</option>
                        <option value="sala">Sala</option>
                        <option value="cuarto">Cuarto</option>
                    </select>
                </div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn >ITEM</TableColumn>
                        <TableColumn className='text-center' >CANTIDAD</TableColumn>
                        <TableColumn className='text-center' >UBICACIÓN</TableColumn>
                        <TableColumn className='text-center' >DESCRIPCIÓN</TableColumn>
                        <TableColumn className='text-center' >CONTENIDO</TableColumn>
                        <TableColumn className='text-center' >ACCIÓN</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="No hay filas para mostrar.">
                        {filteredData.map((x, index) => (
                            <TableRow key={index}>
                                <TableCell className='uppercase' >{x.item}</TableCell>
                                <TableCell className='uppercase text-center' >{x.cantidad}</TableCell>
                                <TableCell className='uppercase text-center' >{x.ubicacion}</TableCell>
                                <TableCell className='uppercase text-center' >{x.descripcion}</TableCell>
                                <TableCell className='uppercase text-center' >{x.contenido}</TableCell>
                                <TableCell className='text-center' >
                                    <Button
                                        id="basic-button"
                                        aria-controls={opens ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={opens ? 'true' : undefined}
                                        onClick={handleClicked(x._id)}
                                    >
                                        <VerticalDotsIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={opens}
                                        onClose={handleCloseMn}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        PaperProps={{
                                            style: { boxShadow: '0px 3px 5px 1px #D2D2D2' }, // Aquí se elimina el box-shadow
                                        }}
                                    >
                                        <MenuItem onClick={() => handleOpenM(selectedId)}>Edit file</MenuItem>
                                        <MenuItem onClick={() => handleDelete(selectedId)}>Delete file</MenuItem>

                                    </Menu>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={openM}
                                        onClose={handleCloseM}
                                        closeAfterTransition
                                        slots={{ backdrop: Backdrop }}
                                        slotProps={{
                                            backdrop: {
                                                timeout: 500,
                                                style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                                            },
                                        }}
                                    // BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
                                    >
                                        <Fade in={openM}>
                                            <Box sx={style}>
                                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                                    Product Details
                                                </Typography>
                                                <div id="transition-modal-description">
                                                    <figure className='inventario-box-option-00-figure'>
                                                        <img className='inventario-box-option-00-img' src={pi} alt="" />
                                                    </figure>
                                                    <section>

                                                        <div className='inventario-box-option-cont-input-01 '>
                                                            <label htmlFor="" className='inventario-box-option-input-01-label'>Name</label>
                                                            <input
                                                                name='item'
                                                                type="text"
                                                                value={productoSeleccionado.item || ''}
                                                                onChange={handleChange}
                                                                className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                        </div>


                                                        <span className='cabania-stock-form-modal-01 mt-2'>
                                                            <label htmlFor="" className='cabania-stock-form-modal-01-label'>Descripción</label>
                                                            <textarea type="text"
                                                                name='descripcion'
                                                                placeholder='Descripción del producto'
                                                                onChange={handleInputChange}
                                                                value={productoSeleccionado.descripcion}
                                                                className='cabania-stock-form-modal-01-textarea pt-2' />
                                                        </span>


                                                        <div className='inventario-box-option-cont-input-01 '>
                                                            <label htmlFor="" className='inventario-box-option-input-01-label'>Cantidad</label>
                                                            <input
                                                                type="text"
                                                                name='Caducidad'
                                                                value={productoSeleccionado.cantidad || ''}
                                                                onChange={handleChange}
                                                                className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                        </div>


                                                        <article className='inventario-box-option-cont-input-02-article'>
                                                            <div className='inventario-box-option-cont-input-01 mr-2'>
                                                                <label htmlFor="" className='inventario-box-option-input-01-label'>Cabaña</label>
                                                                <input
                                                                    type="text"
                                                                    name='ValorUnitario'
                                                                    value={productoSeleccionado.cabania || ''}
                                                                    onChange={handleChange}
                                                                    onKeyDown={(event) => {
                                                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                    className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                            </div>
                                                            <div className='inventario-box-option-cont-input-01 ml-2'>
                                                                <label htmlFor="" className='inventario-box-option-input-01-label'>Ubicacion</label>
                                                                <input
                                                                    type="text"
                                                                    name='CantidadInicial'
                                                                    value={productoSeleccionado.ubicacion || ''}
                                                                    onChange={handleChange}
                                                                    onKeyDown={(event) => {
                                                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                    className='inventario-box-option-input-01 outline-none pl-2 mb-2' />

                                                            </div>
                                                        </article>



                                                    </section>

                                                    <div className='flex justify-end mt-3'>
                                                        <Button variant="outlined" startIcon={<DeleteIcon />} className="mr-2" style={{ border: "2px solid rgb(7, 182, 213)", color: "rgb(7, 182, 213)", fontWeight: "600" }} onClick={handleCloseM}>
                                                            Cancelar
                                                        </Button>
                                                        <Button variant="contained" className='ml-2' endIcon={<SendIcon />} style={{ backgroundColor: "rgb(7, 182, 213)", color: "white", fontWeight: "600", marginLeft: "10px" }} onClick={() => handleSave(productoSeleccionado._id,
                                                            productoSeleccionado.Descripcion,
                                                            productoSeleccionado.tipo,
                                                            productoSeleccionado.Caducidad,
                                                            productoSeleccionado.ValorUnitario,
                                                            productoSeleccionado.CantidadInicial,
                                                            productoSeleccionado.ProductosVendidos)}>
                                                            Guardar
                                                        </Button>
                                                    </div>

                                                </div>
                                            </Box>
                                        </Fade>
                                    </Modal>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default CabaniasStock