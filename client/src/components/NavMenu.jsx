import React from 'react'
import { Link } from 'react-router-dom'
import { Accordion, AccordionItem, Avatar, AvatarIcon ,Dropdown, DropdownItem } from "@nextui-org/react";
import Hotel from "../images/hotel1.png"
import stock from "../images/bolsa-de-la-compra.png"
import Finca from "../images/vaquero.png"
import Dashboard from "../images/data-analytics.png"
import Home from "../images/variante-de-inicio.png"
import StockFinca from "../images/paquetes.png"

const NavMenu = () => {
    return (
        <div className='cont-nav  text-white'>

            <div className='barra-superior h-14 flex justify-end  items-center' >
                <Avatar
                    icon={<AvatarIcon />}
                    classNames={{
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                        icon: "text-black/80",
                    }}
                    className='cursor-pointer'
                />
            </div>
            <nav className='navbar pt-20'>
                <Link to="/home-super-user" className='flex mb-3' > <img src={Home} alt="" style={{ width: "23px", marginBottom: "5px" }} className='ml-3 mr-5' /> home </Link>
                <Accordion isCompact className="" style={{ overflow: "hidden" }}>
                    <AccordionItem className='flex flex-col text-white' key="1" aria-label="Accordion 1" title={
                        <div className='flex'>
                            <img src={Dashboard} style={{ width: "23px", marginBottom: "5px" }} className='ml-1 mr-3' />
                            <span className='ml-2 text-white'>Dashboard</span>
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
                            <Link className='mb-1 pt-2 pb-2' >Pasadia</Link>
                            <Link className='mb-1 pt-2 pb-2' >Cabaña</Link>
                            <Link className='mb-1 pt-2 pb-2' >Habitaciones</Link>
                            <Link className='mb-1 pt-2 pb-2' >Habitaciones</Link>
                            <Link className='mb-1 pt-2 pb-2' >Notificaciones</Link>
                            <Link className='mb-1 pt-2 pb-2' >Precios</Link>
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
                            <Link className='mb-1 pt-2 pb-2' >List</Link>
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