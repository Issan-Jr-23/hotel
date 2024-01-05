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
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Button } from '@nextui-org/react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import pi from "../../images/personajes-ilustrados.png"
import "../css/inventario.css"

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
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    const [editedValues, setEditedValues] = React.useState({
        Descripcion: row.Descripcion,
        tipo: row.tipo,
        Caducidad: row.Caducidad,
        CantidadInicial: row.CantidadInicial,
        ValorUnitario: row.ValorUnitario,
        ProductosVendidos: row.ProductosVendidos
    });

    const [editedValuesSubproduct, setEditedValuesSubproduct] = React.useState({
        Descripcion: hasSubproducts.Descripcion,
        ValorUnitario: hasSubproducts.ValorUnitario,
        ProductosVendidos: hasSubproducts.ProductosVendidos,
        Cortesias: hasSubproducts.Cortesias
    });


    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditClickSubproducto = () => {
        setIsEditingSubproducto(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset edited values to the original values
        setEditedValues({
            Descripcion: row.Descripcion,
            tipo: row.tipo,
            Caducidad: row.Caducidad,
            CantidadInicial: row.CantidadInicial,
            ValorUnitario: row.ValorUnitario,
            ProductosVendidos: row.ProductosVendidos,
        });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues((prevValues) => ({
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
                <TableCell className='flex' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75px" }}>
                    <div style={{ width: "120px" }} className='flex justify-evenly items-center' >

                        {isEditing ? (
                            <>
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                < EditDocumentIcon onClick={handleEditClick} className="cursor-pointer" />
                                < DeleteDocumentIcon className='cursor-pointer' onClick={() => onDelete(row._id)} />
                            </>
                        )}
                    </div>
                </TableCell>
                {hasSubproducts ? (

                    null

                ) : (
                    <TableCell>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className='bg-inherent'>

                                    <VerticalDotsIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">Confirmacion entrega de dinero</DropdownItem>
                                <DropdownItem key="copy">Copy link</DropdownItem>
                                <DropdownItem key="edit" onClick={handleOpenM}>Edit file</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
                                        Detalles del productos
                                    </Typography>
                                    <Typography id="transition-modal-description">
                                        <div>
                                            <figure className='inventario-box-option-00-figure'>

                                                <img className='inventario-box-option-00-img' src={pi} alt="" />
                                            </figure>
                                            <section>
                                                <span className='inventario-box-option-cont-input-01 '>
                                                    <label htmlFor="" className='inventario-box-option-input-01-label'>Name</label>
                                                    <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                </span>
                                                <span className='inventario-box-option-cont-input-01 '>
                                                    <label htmlFor="" className='inventario-box-option-input-01-label'>Category</label>
                                                    <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                </span>

                                                <article className='inventario-box-option-cont-input-02-article'>
                                                    <span className='inventario-box-option-cont-input-01 mr-2'>
                                                        <label htmlFor="" className='inventario-box-option-input-01-label'>Price</label>
                                                        <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                    </span>
                                                    <span className='inventario-box-option-cont-input-01 ml-2'>
                                                        <label htmlFor="" className='inventario-box-option-input-01-label'>Quantity</label>
                                                        <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                    </span>
                                                </article>
                                            </section>
                                            <div className='flex justify-end mt-3'>
                                                <Button variant="outlined" startIcon={<DeleteIcon />} className="mr-2" style={{ border: "2px solid rgb(7, 182, 213)", color: "rgb(7, 182, 213)", fontWeight: "600" }}>
                                                    Cancelar
                                                </Button>
                                                <Button variant="contained" endIcon={<SendIcon />} style={{ backgroundColor: "rgb(7, 182, 213)", color: "white", fontWeight: "600" }}>
                                                    Guardar
                                                </Button>
                                            </div>
                                        </div>
                                    </Typography>
                                </Box>
                            </Fade>
                        </Modal>
                    </TableCell>



                )}

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
                                                    <TableCell align="center" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='h-20'>
                                                        <div style={{ width: "120px" }} className='flex justify-evenly items-center' >

                                                            {isEditing ? (
                                                                <>
                                                                    <button onClick={handleSaveEditSubproduct}> Save </button>
                                                                    <button onClick={handleCancelEditSubproduct}>Cancel</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <EditDocumentIcon onClick={handleEditClickSubproducto} className="cursor-pointer" />
                                                                    < DeleteDocumentIcon className='cursor-pointer' onClick={() => onDelete(row._id)} />
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button className='bg-inherent' >

                                                                    <VerticalDotsIcon />
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu aria-label="Static Actions">
                                                                <DropdownItem key="copy" color='primary'>Confirmación de pago</DropdownItem>
                                                                <DropdownItem key="new" onClick={() => onDeleteSubproducto(row._id, subproduct._id)} color='danger' className="text-danger" >Delete file</DropdownItem>
                                                                <DropdownItem key="edit" onClick={handleOpenM}>Edit file</DropdownItem>
                                                                <DropdownItem key="delete" className="text-danger" color="danger">
                                                                    Delete file
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
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
                                                                        Detalles del productos
                                                                    </Typography>
                                                                    <Typography id="transition-modal-description">
                                                                        <div>
                                                                            <figure className='inventario-box-option-00-figure'>

                                                                                <img className='inventario-box-option-00-img' src={pi} alt="" />
                                                                            </figure>
                                                                            <section>
                                                                                <span className='inventario-box-option-cont-input-01 '>
                                                                                    <label htmlFor="" className='inventario-box-option-input-01-label'>Name</label>
                                                                                    <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                </span>
                                                                                <span className='inventario-box-option-cont-input-01 '>
                                                                                    <label htmlFor="" className='inventario-box-option-input-01-label'>Category</label>
                                                                                    <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                </span>

                                                                                <article className='inventario-box-option-cont-input-02-article'>
                                                                                    <span className='inventario-box-option-cont-input-01 mr-2'>
                                                                                        <label htmlFor="" className='inventario-box-option-input-01-label'>Price</label>
                                                                                        <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                    </span>
                                                                                    <span className='inventario-box-option-cont-input-01 ml-2'>
                                                                                        <label htmlFor="" className='inventario-box-option-input-01-label'>Quantity</label>
                                                                                        <input type="text" className=' inventario-box-option-input-01 outline-none pl-2 mb-2' />
                                                                                    </span>
                                                                                </article>
                                                                            </section>
                                                                            <div className='flex justify-end mt-3'>
                                                                                <Button variant="outlined" startIcon={<DeleteIcon />} className="mr-2" style={{ border: "2px solid rgb(7, 182, 213)", color: "rgb(7, 182, 213)", fontWeight: "600" }}>
                                                                                    Cancelar
                                                                                </Button>
                                                                                <Button variant="contained" endIcon={<SendIcon />} style={{ backgroundColor: "rgb(7, 182, 213)", color: "white", fontWeight: "600" }}>
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
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        // Initial fetch of products
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar este producto?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await AxiosInstance.delete(`/eliminar-mekato/${id}`);
            const updatedProducts = rows.filter((product) => product._id !== id);
            setRows(updatedProducts);
            // Optional: Show a success message
            console.log('Product deleted successfully');
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Error al eliminar producto. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    const handleEdit = async (id, editedName, editedType, editedDate, editedCantidad, editedValorUnitario, editedProductosVendidos) => {
        try {
            await AxiosInstance.put(
                `/update-producto/${id}`,
                {
                    Descripcion: editedName,
                    tipo: editedType,
                    Caducidad: editedDate,
                    CantidadInicial: editedCantidad,
                    ValorUnitario: editedValorUnitario,
                    ProductosVendidos: editedProductosVendidos,
                }
            );
            // Optional: Show a success message
            console.log('Product updated successfully');
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("Error al actualizar producto. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    const handleDeleteSubproducto = async (id, idSubproducto) => {
        try {
            await AxiosInstance.delete(`eliminar-subproduct/${id}`, {
                data: {
                    idSubproducto: idSubproducto
                }
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='pl-5 pr-5 mt-10'>
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
                        {rows.map((filas, index) => (
                            <Row
                                key={index}
                                row={filas}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onDeleteSubproducto={handleDeleteSubproducto}
                                fetchProducts={fetchProducts}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
