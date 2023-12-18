import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Accordion, AccordionItem, Avatar, AvatarIcon, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarContent } from "@nextui-org/react";
import Hotel from "../images/hotel1.png"
import AvatarPerfil from "../images/avatar_25.jpg"
import stock from "../images/bolsa-de-la-compra.png"
import Finca from "../images/vaquero.png"
import Dashboard from "../images/data-analytics.png"
import Home from "../images/variante-de-inicio.png"
import StockFinca from "../images/paquetes.png"
import open from "../images/menu.png"
import close from "../images/x.png"
import "../pages/global.css"
import './navbars.css'
import useOutsideClick from '../hooks/MenuOut.jsx';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../context/authContext.jsx";

const NavMenu = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const isSuperUser = user && user.role === 'superUser';
    const isEditor = user && user.role == "editor";
    const isUser = user && user.role == "user";
    console.log("nombre del usuario: " + JSON.stringify(user))
    // const userName = user.username;
    // console.log(userName)


    const [menuAbierto, setMenuAbierto] = useState(false);

    const menuRef = useRef();

    const location = useLocation();

    useEffect(() => {
        setMenuAbierto(false);
    }, [location]);

    useOutsideClick(menuRef, () => {
        if (menuAbierto) {
            setMenuAbierto(false);
        }
    });

    const abrirMenu = () => {
        setMenuAbierto(true);
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };


    return (
        <div className={`cont-nav text-white ${menuAbierto ? 'mostrar' : ''}`}>
            <div className='barra-superior ostias h-14 flex justify-between items-center border-2' style={{ zIndex: "8" }}>
                <img className='w-8 ml-5 z-10 cursor-pointer' src={open} alt="" onClick={abrirMenu} />

                <Dropdown placement="bottom-end">
                    <DropdownTrigger className="">
                        <Avatar   classNames={{ base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", icon: "text-black/80" }}
                            className='cursor-pointer'
                            src={AvatarPerfil}
                        />

                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem aria-label="prueba" key="profile" className="h-14 gap-2">

                            {user && <span>{user.email}</span>}

                        </DropdownItem>
                        <DropdownItem aria-label="prueba" key="logout" color="danger" to="/" onClick={() => logout()}>
                            <Link>
                                Logout
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <nav ref={menuRef} className={`navbar ${menuAbierto ? '' : 'trasladado'}`}>
                <img className='w-4 ml-6 mb-10 mt-5 cursor-pointer' src={close} alt="" onClick={cerrarMenu} />
                <NavLink
                    to={isAuthenticated ? "/home" : "/"}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    style={{ display: "flex", marginLeft: "10px", marginBottom: "10px", alignItems: "center" }}
                >
                    <img src={Home} style={{ width: "27px", }} className='mb-1 mr-4' />
                    Home
                </NavLink>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col text-white' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={Dashboard} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'  >Dashboard</span>
                        </div>
                    }
                        style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                            <Link className='mb-1 pt-2 pb-2' >Dashboard</Link>
                            <Link className='mb-1 pt-2 pb-2' >Dashboard</Link>
                        </div>
                    </AccordionItem>
                </Accordion>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col text-white' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={Hotel} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'>Hotel</span>
                        </div>
                    }
                        style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                            <Link to="/pasadia" className='mb-1 pt-2 pb-2' >Pasadia</Link>
                            <Link to="/cabanias" className='mb-1 pt-2 pb-2' >Cabaña</Link>
                            <Link to="/habitaciones" className='mb-1 pt-2 pb-2' >Habitaciones</Link>
                            {isSuperUser || isEditor && (
                                <Link to="/message" className='mb-1 pt-2 pb-2' >Notificaciones</Link>
                                )}
                                <Link to="price" className='mb-1 pt-2 pb-2' >Precios</Link>
                                <Link to="/transferencia-data" className='mb-1 pt-2 pb-2' >Transferencia de datos</Link>
                                <Link to="/historial-compras" className='mb-1 pt-2 pb-2' >Historial</Link>
                        </div>
                    </AccordionItem>
                </Accordion>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={Finca} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'>Finca</span>
                        </div>

                    }
                        style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                            <Link className='mb-1 pt-2 pb-2' >Producción</Link>
                            <Link className='mb-1 pt-2 pb-2' >Precios</Link>
                        </div>
                    </AccordionItem>
                </Accordion>
                <span className='pl-2' style={{ fontSize: "11px", fontWeight: "500" }} >CONCEPTS</span>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={stock} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'>Productos</span>
                        </div>

                    }
                        style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                            <Link to="/inventario" className='mb-1 pt-2 pb-2' >List</Link>
                            <Link className='mb-1 pt-2 pb-2' >Create</Link>
                        </div>
                    </AccordionItem>
                </Accordion>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={StockFinca} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'>Finca stock</span>
                        </div>

                    }
                        style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                            <Link className='mb-1 pt-2 pb-2' >List</Link>
                            <Link className='mb-1 pt-2 pb-2' >Create</Link>
                        </div>
                    </AccordionItem>
                </Accordion>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={StockFinca} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'>Cabañas stock</span>
                        </div>

                    }
                        style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                            <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                                <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                                    <div className='flex'>

                                        <span className='ml-2 text-white'>Cabañas 1</span>
                                    </div>

                                }
                                    style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                    <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                                        <Link className='mb-1 pt-2 pb-2' >List</Link>
                                        <Link className='mb-1 pt-2 pb-2' >Create</Link>
                                    </div>

                                </AccordionItem>


                            </Accordion>
                            <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                                <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                                    <div className='flex'>

                                        <span className='ml-2 text-white'>Cabañas 1</span>
                                    </div>

                                }
                                    style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                    <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                                        <Link className='mb-1 pt-2 pb-2' >List</Link>
                                        <Link className='mb-1 pt-2 pb-2' >Create</Link>
                                    </div>

                                </AccordionItem>


                            </Accordion>
                            <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                                <AccordionItem className='flex flex-col' key="1" aria-label="Accordion 1" title={
                                    <div className='flex'>

                                        <span className='ml-2 text-white'>Cabañas 1</span>
                                    </div>

                                }
                                    style={{ height: "auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                    <div className=' flex flex-col pl-9' style={{ overflow: "hidden" }} >
                                        <Link className='mb-1 pt-2 pb-2' >List</Link>
                                        <Link className='mb-1 pt-2 pb-2' >Create</Link>
                                    </div>

                                </AccordionItem>


                            </Accordion>
                        </div>

                    </AccordionItem>


                </Accordion>

            </nav>
        </div>
    )
}

export default NavMenu