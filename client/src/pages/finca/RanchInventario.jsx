import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AxiosInstance from "../../api/axios.js";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { DeleteDocumentIcon } from "../iconos/DeleteDocumentIcon.jsx"
import { EditDocumentIcon } from "../iconos/EditDocumentIcon.jsx"
import { VerticalDotsIcon } from '../iconos/VerticalDotsIcon.jsx';
import { useAuth } from "../../context/authContext.jsx";
import loading_progress from "../../images/Animation-alternativa-loading.json"
import Lottie from "react-lottie"
// import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Button } from '@nextui-org/react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import pi from "../../images/personajes-ilustrados.png"
import "../css/inventario.css"
import { MenuItem, Menu } from '@mui/material';
import Button from '@mui/material/Button';
import { SearchIcon } from "../tablePasadia/SearchIcon.jsx";
import { PlusIcon } from "../finca/PlusIcon.jsx";
import { Tabs, Tab, useDisclosure, Input } from "@nextui-org/react";



function createData(_id, Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario, ProductosVendidos, Cortesias, history, subproductsData) {
    return {
        _id,
        Descripcion,
        tipo,
        Caducidad,
        CantidadInicial,
        ValorUnitario,
        ProductosVendidos,
        Cortesias,
        history,
        subproductsData,
    };
}

function Row(props) {
    const { row, subproduct, onDelete, onEdit, fetchProducts, onDeleteSubproducto, onEditSubproducto } = props;
    const hasSubproducts = Array.isArray(row.subproductsData) && row.subproductsData.length > 0;
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [isEditingSubproducto, setIsEditingSubproducto] = React.useState(false);
    const [openM, setOpenM] = React.useState(false);
    const [openMod, setOpenMod] = React.useState(false);
    // const handleOpenMod = () => setOpenMod(true);
    const handleCloseMod = () => setOpenMod(false);
    const handleCloseM = () => setOpenM(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const [subProductoSeleccionado, setSubProductoSeleccionado] = useState({})
    const [miValor, setMiValor] = useState('');
    const [miValorM, setMiValorM] = useState('');
    const [rows, setRows] = useState([]);
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOpenM = () => {
        setProductoSeleccionado(row);
        setOpenM(true)

    }

    const handleOpenMod = (idSubproducto) => {
        // console.log(idSubproducto)
        const subproductoEncontrado = row.subproductsData.find(subproducto => subproducto._id === idSubproducto);

        if (subproductoEncontrado) {
            setSubProductoSeleccionado(subproductoEncontrado);
            setOpenMod(true);
        } else {
            console.error("Subproducto no encontrado");
        }
    };


    // const handleChange = (event) => {
    //     setMiValor(event.target.value);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoSeleccionado((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleChanges = (event) => {
        setSubProductoSeleccionado({
            ...subProductoSeleccionado,
            [event.target.name]: event.target.value
        });
    };


    const [editedValues, setEditedValues] = React.useState({
        Descripcion: row.Descripcion,
        tipo: row.tipo,
        Caducidad: row.Caducidad,
        CantidadInicial: row.CantidadInicial,
        ValorUnitario: row.ValorUnitario,
        ProductosVendidos: row.ProductosVendidos
    });


    const handleEditClick = () => {
        setIsEditing(true);
    };



    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedValues({
            Descripcion: row.Descripcion,
            tipo: row.tipo,
            Caducidad: row.Caducidad,
            CantidadInicial: row.CantidadInicial,
            ValorUnitario: row.ValorUnitario,
            ProductosVendidos: row.ProductosVendidos,
        });
    };



    const handleSaveEdit = async () => {
        setIsEditing(false);
        onEdit(
            row._id,
            editedValues.Descripcion,
            editedValues.tipo,
            editedValues.Caducidad,
            editedValues.CantidadInicial,
            editedValues.ValorUnitario,
            editedValues.ProductosVendidos
        );
        await fetchProducts();
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    //*********************************** Edición de subproductos ***************************

    const [editedValuesSubproduct, setEditedValuesSubproduct] = React.useState({
        Descripcion: hasSubproducts.Descripcion,
        ValorUnitario: hasSubproducts.ValorUnitario,
        ProductosVendidos: hasSubproducts.ProductosVendidos,
        Cortesias: hasSubproducts.Cortesias
    });

    const handleEditClickSubproducto = () => {
        setIsEditingSubproducto(true);
    };


    const handleCancelEditSubproduct = () => {
        setIsEditingSubproducto(false);
        // Reset edited values to the original values
        setEditedValuesSubproduct({
            ValorUnitario: subproduct.ValorUnitario,
            ProductosVendidos: subproduct.ProductosVendidos,
            Cortesias: subproduct.Cortesias
        });
    };

    const handleSaveEditSubproduct = async () => {
        setIsEditingSubproducto(false);
        onEditSubproducto(
            row._id,
            editedValuesSubproduct.Descripcion,
            editedValuesSubproduct.CantidadInicial,
            editedValuesSubproduct.ValorUnitario,
            editedValuesSubproduct.ProductosVendidos
        );
        await fetchProducts();
    };

    const handleInputChangeSubproducto = (e) => {
        const { name, value } = e.target;
        setEditedValuesSubproduct((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: "90vh",
        width: 400,
        overflow: "scroll",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };




    const createMessage = (userName, userId, productId, productName, changes) => {
        return `${userName} (${userId}) ha editado el producto ${productName} (ID: ${productId}). Cambios realizados: ${JSON.stringify(changes)}.`;
    };

    const handleSave = async (id, editedName, editedTipo, editedCaducidad, editedPrecio, editedCi, editedCv) => {
        try {

            await AxiosInstance.put(`/update-producto/${id}`, {
                Descripcion: editedName,
                tipo: editedTipo,
                Caducidad: editedCaducidad,
                ValorUnitario: editedPrecio,
                CantidadInicial: editedCi,
                ProductosVendidos: editedCv,
            })
            const productBeforeUpdate = await AxiosInstance.get(`/obtener-inventario/${id}`);
            const { Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario, ProductosVendidos } = productBeforeUpdate.data;

            // Comparar los valores antiguos con los nuevos valores
            const changes = {};
            if (Descripcion !== editedName) changes.Descripcion = { old: Descripcion, new: editedName };
            if (tipo !== editedTipo) changes.tipo = { old: tipo, new: editedTipo };
            if (Caducidad !== editedCaducidad) changes.Caducidad = { old: Caducidad, new: editedCaducidad };
            if (CantidadInicial !== editedCi) changes.CantidadInicial = { old: CantidadInicial, new: editedCi };
            if (ValorUnitario !== editedPrecio) changes.ValorUnitario = { old: ValorUnitario, new: editedPrecio };
            if (ProductosVendidos !== editedCv) changes.ProductosVendidos = { old: ProductosVendidos, new: editedCv };

            const message = createMessage(user.username, user.id, id, editedName, changes);

            await AxiosInstance.post('/registrar-edicion', {
                message: message
            });

            handleCloseM();
            // console.log('Product updated successfully');
            fetchProducts();
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("Error al actualizar producto. Por favor, inténtalo de nuevo más tarde.");
        }
    };






    const handleDeleteSubproducto = async (id, idSubproducto) => {
        // console.log("eliminar subproducto", id, idSubproducto);
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este subproducto?");
        if (!confirmDelete) {
            return;
        }
        try {
            const options = {
                data: { idSubproducto: idSubproducto }
            };
            await AxiosInstance.delete(`/eliminar-subproduct/${id}`, options);
            // console.log("successfully");
            fetchProducts();
        } catch (error) {
            console.error("Error al encontrar el registro");
        }
    }


    const hadleUpdateSubProducto = async (id, idSubproducto, editedName, editedValorUnitario, editedProductosVendidos, editedCortesias) => {
        try {
            await AxiosInstance.put(`/update-prueba-subproducto/${id}` , {
                idSubproducto: idSubproducto,
                Descripcion: editedName,
                ValorUnitario: editedValorUnitario,
                ProductosVendidos: editedProductosVendidos,
                Cortesias: editedCortesias,
            });
            // Obtener el subproducto antes de la actualización para comparar
            const subproductoBeforeUpdate = await AxiosInstance.get(`/obtener/sub/productos/${id}/${idSubproducto}`);
            const { Descripcion, ValorUnitario, ProductosVendidos, Cortesias } = subproductoBeforeUpdate.data;

            // Comparar los valores antiguos con los nuevos valores
            const changes = {};
            if (Descripcion !== editedName) changes.Descripcion = { old: Descripcion, new: editedName };
            if (ValorUnitario !== editedValorUnitario) changes.ValorUnitario = { old: ValorUnitario, new: editedValorUnitario };
            if (ProductosVendidos !== editedProductosVendidos) changes.ProductosVendidos = { old: ProductosVendidos, new: editedProductosVendidos };
            if (Cortesias !== editedCortesias) changes.Cortesias = { old: Cortesias, new: editedCortesias };



            // Crear el mensaje con la información necesaria
            const message = createMessage(user.username, user.id, id, idSubproducto, editedName, changes);

            // Enviar los datos al servidor, incluyendo el ID del producto y del subproducto


            // Enviar el mensaje al servidor para registrarlo
            await AxiosInstance.post('/registrar-edicion', {
                message: message
            });

            fetchProducts();

            // console.log("successfully");
        } catch (error) {
            console.error("Error al encontrar el registro");
        }
    }







    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {hasSubproducts && (
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    )}
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: "230px", textTransform: "uppercase" }}>
                    {isEditing ? (
                        <input
                            className='outline-none h-10 w-32 border-2 border-blue-300 rounded-xl'
                            type="text"
                            name="Descripcion"
                            value={editedValues.Descripcion}
                            onChange={handleInputChange}
                        />
                    ) : (
                        row.Descripcion
                    )}
                </TableCell>
                <TableCell align="center" className='uppercase'>
                    {isEditing ? (
                        <input
                            className='outline-none h-10 w-32 border-2 border-blue-300 rounded-xl'
                            type="text"
                            name="tipo"
                            value={editedValues.tipo}
                            onChange={handleInputChange}
                        />
                    ) : (
                        row.tipo
                    )}
                </TableCell>
                <TableCell align="center">
                    {isEditing ? (
                        <input
                            className='outline-none h-10 w-32 border-2 border-blue-300 rounded-xl'
                            type="text"
                            name="Caducidad"
                            value={editedValues.Caducidad}
                            onChange={handleInputChange}
                        />

                    ) : (

                        row.Caducidad
                    )
                    }
                </TableCell>
                <TableCell align="center">
                    {isEditing ? (
                        <input
                            className='outline-none h-10 w-14 border-2 border-blue-300 rounded-xl'
                            type="text"
                            name="CantidadInicial"
                            value={editedValues.CantidadInicial}
                            onChange={handleInputChange}
                        />
                    ) : (

                        row.CantidadInicial
                    )
                    }
                </TableCell>
                <TableCell align="center">
                    {isEditing ? (
                        <input
                            className='outline-none h-10 w-32 border-2 border-blue-300 rounded-xl'
                            type="text"
                            name="ValorUnitario"
                            value={editedValues.ValorUnitario}
                            onChange={handleInputChange}
                        />
                    ) : (

                        row.ValorUnitario
                    )
                    }
                </TableCell>
                <TableCell align="center">
                    {isEditing ? (
                        <input
                            className='outline-none h-10 w-14 border-2 border-blue-300 rounded-xl'
                            type="text"
                            name="ProductosVendidos"
                            value={editedValues.ProductosVendidos}
                            onChange={handleInputChange}
                        />
                    ) : (
                        row.ProductosVendidos
                    )
                    }
                </TableCell>
                <TableCell align='center'>{row.Cortesias}</TableCell>
                <TableCell align="center">{(row.ProductosVendidos - row.Cortesias) * row.ValorUnitario}</TableCell>
                <TableCell align="center">{row.ValorUnitario * row.CantidadInicial}</TableCell>

                <TableCell>
                    <Button
                        id="basic-button"
                        aria-controls={opens ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={opens ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <VerticalDotsIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={opens}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleOpenM}>Edit file</MenuItem>
                        <MenuItem onClick={() => onDelete(row)}>Delete file</MenuItem>

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
                            },
                        }}
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
                                            <label htmlFor="" className='inventario-box-option-input-01-label'>Item</label>
                                            <input
                                                name='Descripcion'
                                                type="text"
                                                value={productoSeleccionado.Descripcion || ''}
                                                onChange={handleChange}
                                                className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                        </div>


                                        <div className='inventario-box-option-cont-input-01 '>
                                            <label htmlFor="" className='inventario-box-option-input-01-label'>Categoria</label>
                                            <input
                                                type="text"
                                                name='tipo'
                                                value={productoSeleccionado.tipo || ''}
                                                onChange={handleChange}
                                                className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                        </div>

                                        <div className='inventario-box-option-cont-input-01 '>
                                            <label htmlFor="" className='inventario-box-option-input-01-label'>Caducidad</label>
                                            <input
                                                type="text"
                                                name='Caducidad'
                                                value={productoSeleccionado.Caducidad || ''}
                                                onChange={handleChange}
                                                className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                        </div>


                                        <article className='inventario-box-option-cont-input-02-article'>
                                            <div className='inventario-box-option-cont-input-01 mr-2'>
                                                <label htmlFor="" className='inventario-box-option-input-01-label'>Pricio</label>
                                                <input
                                                    type="text"
                                                    name='ValorUnitario'
                                                    value={productoSeleccionado.ValorUnitario || ''}
                                                    onChange={handleChange}
                                                    onKeyDown={(event) => {
                                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                            </div>
                                            <div className='inventario-box-option-cont-input-01 ml-2'>
                                                <label htmlFor="" className='inventario-box-option-input-01-label'>Cantidad</label>
                                                <input
                                                    type="text"
                                                    name='CantidadInicial'
                                                    value={productoSeleccionado.CantidadInicial || ''}
                                                    onChange={handleChange}
                                                    onKeyDown={(event) => {
                                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    className='inventario-box-option-input-01 outline-none pl-2 mb-2' />

                                            </div>
                                        </article>


                                        <div className='inventario-box-option-cont-input-01 '>
                                            <label htmlFor="" className='inventario-box-option-input-01-label'>Productos Vendidos</label>
                                            <input
                                                type="text"
                                                name='ProductosVendidos'
                                                value={productoSeleccionado.ProductosVendidos || ''}
                                                onChange={handleChange}
                                                onKeyDown={(event) => {
                                                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                        </div>
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
            {hasSubproducts && (
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Subproducts
                                </Typography>
                                <Table size="" aria-label="subproducts">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Descripcion del subproducto</TableCell>
                                            <TableCell align="center">precio</TableCell>
                                            <TableCell align="center">cantidad vendida</TableCell>
                                            <TableCell align="center">#Cortesias</TableCell>
                                            <TableCell align="center">Total de la venta</TableCell>
                                            <TableCell align="center">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.isArray(row.subproductsData) &&
                                            row.subproductsData.map((subproduct) => (
                                                <TableRow key={subproduct._id}>
                                                    <TableCell >{subproduct.Descripcion}</TableCell>
                                                    <TableCell align="center" className='uppercase'>{subproduct.ValorUnitario}</TableCell>
                                                    <TableCell align="center" className='uppercase'>{subproduct.ProductosVendidos}</TableCell>
                                                    <TableCell align="center" className='uppercase'>{subproduct.Cortesias}</TableCell>
                                                    <TableCell align="center" className='uppercase'>{(subproduct.ProductosVendidos - subproduct.Cortesias) * subproduct.ValorUnitario}</TableCell>

                                                    <TableCell>
                                                        <Button
                                                            id="basic-button"
                                                            aria-controls={opens ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={opens ? 'true' : undefined}
                                                            onClick={() => handleOpenMod(subproduct._id)}

                                                        >
                                                            <VerticalDotsIcon />
                                                        </Button>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={opens}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => handleOpenMod(subproduct._id)}>edit file</MenuItem>
                                                            <MenuItem onClick={() => handleDeleteSubproducto()}>Delete file</MenuItem>
                                                        </Menu>
                                                        <Modal
                                                            aria-labelledby="transition-modal-title"
                                                            aria-describedby="transition-modal-description"
                                                            open={openMod}
                                                            onClose={handleCloseMod}
                                                            closeAfterTransition
                                                            slots={{ backdrop: Backdrop }}
                                                            slotProps={{
                                                                backdrop: {
                                                                    timeout: 500,
                                                                },
                                                            }}
                                                        >
                                                            <Fade in={openMod}>
                                                                <Box sx={style}>
                                                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                                                        Product Details
                                                                    </Typography>
                                                                    <Typography id="transition-modal-description" component="div">
                                                                        <div>
                                                                            <figure className='inventario-box-option-00-figure'>

                                                                                <img className='inventario-box-option-00-img' src={pi} alt="" />
                                                                            </figure>
                                                                            <section>
                                                                                <span className='inventario-box-option-cont-input-01 '>
                                                                                    <label htmlFor="" className='inventario-box-option-input-01-label'>Item</label>
                                                                                    <input
                                                                                        name='Descripcion'
                                                                                        type="text"
                                                                                        value={subProductoSeleccionado.Descripcion}
                                                                                        onChange={handleChanges}
                                                                                        className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                </span>
                                                                                <span className='inventario-box-option-cont-input-01 '>
                                                                                    <label htmlFor="" className='inventario-box-option-input-01-label'>Cortesias</label>
                                                                                    <input
                                                                                        name='Cortesias'
                                                                                        value={subProductoSeleccionado.Cortesias}
                                                                                        onChange={handleChanges}
                                                                                        type="text"
                                                                                        className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                </span>

                                                                                <article className='inventario-box-option-cont-input-02-article'>
                                                                                    <span className='inventario-box-option-cont-input-01 mr-2'>
                                                                                        <label htmlFor="" className='inventario-box-option-input-01-label'>Precio</label>
                                                                                        <input
                                                                                            name='ValorUnitario'
                                                                                            type="text"
                                                                                            value={subProductoSeleccionado.ValorUnitario}
                                                                                            onChange={handleChanges}
                                                                                            className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                    </span>
                                                                                    <span className='inventario-box-option-cont-input-01 ml-2'>
                                                                                        <label htmlFor="" className='inventario-box-option-input-01-label'>Cantidad</label>
                                                                                        <input
                                                                                            name='ProductosVendidos'
                                                                                            type="text"
                                                                                            value={subProductoSeleccionado.ProductosVendidos}
                                                                                            onChange={handleChanges}
                                                                                            className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                    </span>
                                                                                </article>
                                                                            </section>
                                                                            <div className='flex justify-end mt-3'>
                                                                                <Button variant="outlined" startIcon={<DeleteIcon />} className="mr-2" style={{ border: "2px solid rgb(7, 182, 213)", color: "rgb(7, 182, 213)", fontWeight: "600" }} onClick={handleCloseMod}>
                                                                                    Cancelar
                                                                                </Button>
                                                                                <Button variant="contained" className='ml-2' endIcon={<SendIcon />} style={{ backgroundColor: "rgb(7, 182, 213)", color: "white", fontWeight: "600", marginLeft: "10px" }} onClick={() => hadleUpdateSubProducto(
                                                                                    row._id,
                                                                                    subProductoSeleccionado._id,
                                                                                    subProductoSeleccionado.Descripcion,
                                                                                    subProductoSeleccionado.ValorUnitario, subProductoSeleccionado.ProductosVendidos,
                                                                                    subProductoSeleccionado.Cortesias,)}>
                                                                                    Guardar
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </Typography>
                                                                </Box>
                                                            </Fade>
                                                        </Modal>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    );
}



export default function CollapsibleTable() {

    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [backdrop, setBackdrop] = useState("blur");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedType, setSelectedType] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openFz, setOpenFz] = React.useState(false);
    const handleCloseFz = () => setOpenFz(false);
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
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

    const fetchProducts = async () => {
        try {
            const productsResponse = await AxiosInstance.get('/obtener-inventario');
            const productsData = productsResponse.data;

            const updatedRows = await Promise.all(
                productsData.map(async (product) => {
                    const subproductsResponse = await AxiosInstance.get(`/obtener-sub-productos/${product._id}`);
                    const subproductsData = subproductsResponse.data;

                    const historyArray = Array.isArray(product.history) ? product.history : [];
                    if (subproductsData.length > 0) {
                        const subproductsHistory = subproductsData.map((subproduct) => ({
                            date: 'Subproduct Date',
                            customerId: subproduct.id,
                            amount: 1,
                        }));

                        historyArray.push(...subproductsHistory);
                    }

                    return createData(
                        product._id,
                        product.Descripcion,
                        product.tipo,
                        product.Caducidad,
                        product.CantidadInicial,
                        product.ValorUnitario,
                        product.ProductosVendidos,
                        product.Cortesias,
                        historyArray,
                        subproductsData
                    );
                })
            );

            setRows(updatedRows);
            setFilteredProducts(updatedRows); // Aplicar filtros a todos los registros
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Initial fetch of products
        fetchProducts();
    }, []);

    const handleDelete = async (row) => {
        const userName = user.username;
        const productId = row._id;
        const productName = row.Descripcion;

        // console.log(userName, " ha borrado el producto ", productName, " con el id ", productId)

        const confirmDelete = window.confirm(
            `¿Estás seguro de que deseas eliminar este producto? Esta acción será realizada por ${userName}.`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await AxiosInstance.delete(`/eliminar-mekato/${productId}`);

            const updatedRows = rows.filter((product) => product._id !== productId);
            setRows(updatedRows);

            // console.log(`Producto "${productName}" eliminado exitosamente por ${userName}`);

            // Guardar el mensaje en la base de datos
            const deletionMessage = {
                userName,
                productName,
                productId,
                deletionDate: new Date().toISOString(), // Fecha y hora de la eliminación
            };

            // console.log("data enviada al servidor: ", deletionMessage)

            await AxiosInstance.post('/registrar-eliminacion', deletionMessage);
        } catch (error) {
            console.error("Error al eliminar producto");
            alert("Error al eliminar producto. Por favor, inténtalo de nuevo más tarde.");
        }
    };



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

    const handleFormSubmit = async () => {
        try {
            await AxiosInstance.post("/inventario", formData);
            fetchProducts();
            setOpenFz(false)
            // const response = await AxiosInstance.get("/obtener-inventario");
            // setUsers(response.data);
        } catch (error) {
            console.error("Error al agregar el producto: ", error);
        }
    };

    const handleInputChanges = (event) => {
        const { name, value } = event.target;
        setFormDatas((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmite = async () => {
        try {
            await AxiosInstance.post("/inventario", formDatas);
            setOpenFz(false)
            fetchProducts();

        } catch (error) {
            console.error("Error al agregar el producto: ", error);
        }
    };

    const handleOpemModalMui = () => {
        setOpenFz(true)
        setFormData({
            Descripcion: "",
            tipo: "",
            CantidadInicial: "",
            Caducidad: "",
            ValorUnitario: ""
        });

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: "min-height-90vh",
        bgcolor: 'background.paper',
        overflow: "scroll",
        boxShadow: 0,
        p: 4,
        borderRadius: 5
    };

    useEffect(() => {
        // Filtrar los productos según el tipo seleccionado
        if (selectedType === '') {
            setFilteredProducts(rows);
        } else {
            setFilteredProducts(rows.filter(producto => producto.tipo === selectedType));
        }
    }, [selectedType]);


    const applyFilters = (products) => {
        let filtered = [...products];

        if (selectedType !== '') {
            filtered = filtered.filter(producto => producto.tipo === selectedType);
        }

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(producto =>
                producto.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    useEffect(() => {
        applyFilters(rows);
    }, [selectedType, searchTerm])

    const defaultOptionLoadingHome = {
        loop: true,
        autoPlay: true,
        animationData: loading_progress,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }


    return (
        <div className='pl-5 pr-5 mt-10 pb-20 flex flex-col'>
            <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
                <Lottie options={defaultOptionLoadingHome} width={100} height={100} />
            </div>
            <div>
                <>
                    <div className=" flex justify-between w-12/12 gap-3 flex-col">
                        <div className="btnAdd flex flex-wrap"  >

                            <div className="inputSearch">
                                <Input
                                    label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
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
                                <Button className="w-28 mr-5" onClick={() => exportToExcel(filteredProducts)} style={{ backgroundColor: "#0070f0", color: "white", marginRight: "20px" }}>
                                    Exportar
                                </Button>
                                <Button
                                    variant="flat"
                                    onClick={() => handleOpemModalMui()}
                                    className=" ml-5 text-white bg-black" style={{ backgroundColor: "#18c964", color: "white" }}
                                >
                                    <PlusIcon />  Agregar
                                </Button>
                            </div>



                        </div>






                    </div>

                    <Modal
                        open={openFz}
                        onClose={handleCloseFz}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        BackdropProps={{
                            style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                        }}>
                        <Box className="h-5/6 overflow-y-auto" sx={style}>
                            <Tabs>
                                <Tab key="productos" title="Productos">
                                    <Typography className="flex flex-col gap-1" component="h2">
                                        Registrar Producto
                                    </Typography>
                                    <Typography className='flex flex-col' component="div">
                                        <Input
                                            name="Descripcion"
                                            className="input_form mb-3"
                                            type="text"
                                            variant="flat"
                                            label="Descripción del producto"
                                            onChange={handleInputChange}
                                        />


                                        <select
                                            className="outline-none h-16 border-3 rounded-xl border-blue-500 mb-3 text-black"
                                            name="tipo"
                                            value={formData.tipo}
                                            onChange={(event) => handleInputChange(event)}
                                        >
                                            <option value="">Seleccione un tipo</option>
                                            <option value="bebida">Bebidas</option>
                                            <option value="comida">Comidas</option>
                                            <option value="recepcion">Recepción</option>
                                            <option value="utensilios">Utensilios</option>
                                            <option value="despensa">Despensa</option>
                                        </select>


                                        <Input
                                            name="Caducidad"
                                            className="input_form mb-3"
                                            type="Date"
                                            variant="flat"
                                            label="Fecha de caducidad"
                                            placeholder="date"
                                            onChange={handleInputChange}
                                        />


                                        <Input
                                            name="CantidadInicial"
                                            className="input_form mb-3"
                                            type="number"
                                            variant="flat"
                                            label="Cantidad inicial"
                                            onChange={handleInputChange}
                                        />


                                        <Input
                                            name="ValorUnitario"
                                            className="input_form mb-3"
                                            type="number"
                                            variant="flat"
                                            label="Precio de venta"
                                            onChange={handleInputChange}
                                        />


                                    </Typography>
                                    <Typography component="div">
                                        <Button color="danger" variant="light" onClick={onClose}>
                                            Cerrar
                                        </Button>
                                        <Button color="primary" onClick={handleFormSubmit}>
                                            Guardar
                                        </Button>
                                    </Typography>


                                </Tab>
                                <Tab key="subProductos" title="SubProductos">
                                    <Typography component="div" className="flex flex-col gap-1">
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
                                            type='text'
                                            value={formDatas.CantidadInicial}
                                            onChange={handleInputChanges}
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <select
                                            className="outline-none h-16 border-3 rounded-xl border-blue-500 mb-2"
                                            name="tipo"
                                            value={formDatas.tipo}
                                            onChange={handleInputChanges}
                                        >
                                            <option value="">Seleccione un tipo</option>
                                            <option value="bebida">Bebidas</option>
                                            <option value="comida">Comidas</option>
                                            <option value="recepcion">Recepción</option>
                                            <option value="utensilios">Utensilios</option>
                                            <option value="despensa">Despensa</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                        <Input
                                            name="Caducidad"
                                            className="input_form mb-2"
                                            type="Date"
                                            variant="flat"
                                            label="Fecha de caducidad"
                                            placeholder="date"
                                            onChange={handleInputChanges}
                                        />

                                        {/* Campos para subproductos */}
                                        {formDatas.subproductos.map((subproducto, index) => (
                                            <div key={index} className='flex border-b-3'>
                                                <span className=' mr-2 flex justify-center items-center'>
                                                    <p className='h-5 w-5 bg-blue-500 text-white rounded-full flex justify-center items-center'>
                                                        {index + 1}

                                                    </p>
                                                </span>
                                                <Input
                                                    label={`Nombre del subproducto ${index + 1}`}
                                                    className="mb-2 mr-2"
                                                    name="Descripcion"
                                                    type="text"
                                                    value={subproducto.Descripcion}
                                                    onChange={(e) => handleSubproductoChange(index, 'Descripcion', e.target.value)}
                                                />
                                                <Input
                                                    label={`Precio del subproducto ${index + 1}`}
                                                    className="mb-2 ml-2"
                                                    type="text"
                                                    name="ValorInitario"
                                                    value={subproducto.ValorUnitario}
                                                    onChange={(e) => handleSubproductoChange(index, 'ValorUnitario', e.target.value)}
                                                    onKeyDown={(event) => {
                                                        if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <hr style={{ height: "3px" }} className='bg-gray-300' />
                                            </div>
                                        ))}
                                        <Button color="primary" onClick={handleFormSubmite}>Guardar</Button>
                                    </Typography>
                                </Tab>

                            </Tabs>
                        </Box>
                    </Modal>

                </>
            </div>
            <div className='w-full h-20 mt-5 mb-5 flex justify-center items-center text-4xl'>
                <h1>PRODUCTOS Y SUBPRODUCTOS</h1>
            </div>
            <div className=" flex justify-end mr-5 ml-5">
                <select
                    className="outline-0 h-8 w-32 px-2 rounded-2xl mr-5  text-black bg-white/0"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option id="p" className="w-52 text-black" value="">Todos</option>
                    <option className="w-52 text-black" value="bebida">Bar</option>
                    <option className="w-52 text-black" value="comida">Restaurante</option>
                    <option className="w-52 text-black" value="utensilios">Utensilios</option>
                    <option className="w-52 text-black" value="despensa">Despensa</option>
                    <option className="w-52 text-black" value="otro">Otro</option>

                </select>
            </div>
            <TableContainer component={Paper} style={{ borderRadius: "15px", overflow: "x" }}>
                <Table aria-label="collapsible table" >
                    <TableHead style={{ height: "20px", marginLeft: "10px" }} >
                        <TableRow>
                            <TableCell />
                            <TableCell style={{ width: "170px", textTransform: "uppercase" }} ><Typography variant="caption" style={{ fontWeight: "600", color: "#96969c" }} >Producto</Typography></TableCell>
                            <TableCell align="center"> <Typography style={{ fontWeight: "600", color: "#96969c", textTransform: "uppercase" }} variant="caption">tipo</Typography></TableCell>
                            <TableCell align="center"><Typography style={{ fontWeight: "600", color: "#96969c", textTransform: "uppercase" }} variant="caption">Fecha de Caducidad</Typography></TableCell>
                            <TableCell align="center"><Typography style={{ fontWeight: "600", color: "#96969c", textTransform: "uppercase" }} variant="caption">Cantidad</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px", textTransform: "uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">precio de venta</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px", textTransform: "uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">Productos vendidos</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px", textTransform: "uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">#Cortesias</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px", textTransform: "uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">Total de la venta</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px", textTransform: "uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">Valor total</Typography></TableCell>
                            <TableCell align="center"><Typography style={{ fontWeight: "600", color: "#96969c", textTransform: "uppercase" }} variant="caption">acción</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((filas, index) => (
                            <Row
                                key={index}
                                row={filas}
                                onDelete={handleDelete}
                                fetchProducts={fetchProducts}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
