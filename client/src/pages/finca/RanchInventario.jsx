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
import EditIcon from '@mui/icons-material/Edit';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function createData(_id, Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario, ProductosVendidos,Cortesias, history, subproductsData) {
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
    const { row, onDelete, onEdit, fetchProducts } = props;
    const hasSubproducts = Array.isArray(row.subproductsData) && row.subproductsData.length > 0;
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
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
        // After saving the edit, fetch the updated data
        await fetchProducts();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
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
                <TableCell component="th" scope="row" style={{ width: "230px", textTransform:"uppercase" }}>
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

                    ): (

                        row.Caducidad
                    )
                    }
                </TableCell>
                <TableCell align="center">
                    {isEditing ? (
                           <input
                           className='outline-none h-10 w-32 border-2 border-blue-300 rounded-xl'
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
                    ):(

                        row.ValorUnitario
                    )
                    }
                </TableCell>
                <TableCell align="center">
                    {isEditing ? (
                           <input
                           className='outline-none h-10 w-32 border-2 border-blue-300 rounded-xl'
                           type="text"
                           name="ProductosVendidos"
                           value={editedValues.ProductosVendidos}
                           onChange={handleInputChange}
                       />
                    ):(
                        row.ProductosVendidos
                    )
                    }
                </TableCell>
                    <TableCell align='center'>{row.Cortesias}</TableCell>
                <TableCell align="center">{(row.ProductosVendidos - row.Cortesias) * row.ValorUnitario}</TableCell>
                <TableCell align="center">{row.ValorUnitario * row.CantidadInicial}</TableCell>
                <TableCell className='flex' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75px" }}>
                    <div style={{width:"120px"}} className='flex justify-evenly items-center' >

                    {isEditing ? (
                        <>
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <EditIcon onClick={handleEditClick} />
                            <DeleteIcon className='cursor-pointer' onClick={() => onDelete(row._id)} />
                        </>
                    )}
                    </div>
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
                                            {/* <TableCell align="center">Acciones</TableCell> */}
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
                                                    <TableCell align="center" className='uppercase'>{(subproduct.ProductosVendidos - subproduct.Cortesias ) * subproduct.ValorUnitario}</TableCell>
                                                    {/* <TableCell align="center" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <CloudDownloadIcon />
                                                        <EditIcon onClick={handleEditClick} />
                                                        <DeleteIcon onClick={() => onDelete(row._id)} />
                                                    </TableCell> */}
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

    return (
        <div className='pl-5 pr-5 mt-10'>
            <TableContainer component={Paper} style={{ borderRadius: "15px", overflow: "x" }}>
                <Table aria-label="collapsible table" >
                    <TableHead style={{ height: "20px", marginLeft: "10px" }} >
                        <TableRow>
                            <TableCell />
                            <TableCell style={{ width: "170px", textTransform:"uppercase" }} ><Typography variant="caption" style={{ fontWeight: "600", color: "#96969c" }} >Producto</Typography></TableCell>
                            <TableCell align="center"> <Typography style={{ fontWeight: "600", color: "#96969c",  textTransform:"uppercase" }} variant="caption">tipo</Typography></TableCell>
                            <TableCell align="center"><Typography style={{ fontWeight: "600", color: "#96969c",  textTransform:"uppercase" }} variant="caption">Fecha de Caducidad</Typography></TableCell>
                            <TableCell align="center"><Typography style={{ fontWeight: "600", color: "#96969c",  textTransform:"uppercase" }} variant="caption">Cantidad</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px",  textTransform:"uppercase"}} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">precio de venta</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px",  textTransform:"uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">Productos vendidos</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px",  textTransform:"uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">#Cortesias</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px",  textTransform:"uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">Total de la venta</Typography></TableCell>
                            <TableCell style={{ padding: "10px", width: "175px",  textTransform:"uppercase" }} align="center"><Typography style={{ fontWeight: "600", color: "#96969c" }} variant="caption">Valor total</Typography></TableCell>
                            <TableCell align="center"><Typography style={{ fontWeight: "600", color: "#96969c",  textTransform:"uppercase" }} variant="caption">acción</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((filas, index) => (
                            <Row
                                key={index}
                                row={filas}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                fetchProducts={fetchProducts}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
