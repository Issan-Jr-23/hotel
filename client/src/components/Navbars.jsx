import React from "react";
import { Navbar, DropdownItem, Dropdown, DropdownTrigger, DropdownMenu, Avatar, NavbarBrand, NavbarMenu, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenuToggle, Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './navbars.css'
import { useAuth } from "../context/authContext";
import logo from "../images/logo.png"
import home from "../images/home-icon.png"
import hotel from "../images/hotel-bell.png"
import finca from "../images/cowboy-hat.png"
import energy from "../images/solar-energy.png"
import add from "../images/add-user1.png"
import inventory from "../images/stock-rotation.png"
import notification from "../images/chat.png"
import cabania from "../images/beach-cabana.png"
import pasadia from "../images/cocktails.png"
import habitaciones from "../images/bed.png"
import price from "../images/dollar.png"
import grafic from "../images/growth.png"

export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { isAuthenticated, logout, user } = useAuth();
  const isSuperUser = user && user.role === 'superUser';
  const isEditor = user && user.role == "editor";
  console.log(isSuperUser, isEditor)



  return (
    <div className="mobile flex justify-center">
      <div className="mobileNav">
        <Navbar isBordered className="pruebacss bg-white/30 h-20 justify-beetween" onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden text-white"
            />
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
              <Link to={isAuthenticated ? "/home" : "/"}><img className="w-14" src={logo} alt="" /> </Link>
            </NavbarBrand>
            <NavbarItem>
              <Link className="text-white font-medium text-base flex justify-center items-center" to="/home">
                <img className="mr-1 w-4 h-4" src={home} alt="" /> Inicio
              </Link>
            </NavbarItem>
            <Dropdown>
              <NavbarItem >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="text-white font-medium text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                    radius="sm"
                    variant="light"
                  >
                    <img className="mb-1" src={hotel} alt="" style={{ width: "20px" }} />Hotel
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",

                }}
              >
                <DropdownItem aria-label="prueba"
                  key="autoscaling"
                  className=""
                >
                  <Link className="link_nav" to='/pasadia'>
                    <img className="mr-1" src={pasadia} alt="" style={{ width: "20px" }} />Pasadia
                  </Link>
                </DropdownItem>
                <DropdownItem aria-label="prueba"
                  key="production_ready"
                >
                  <Link className="link_nav" to='/cabanias'>
                    <img className="mr-1" src={cabania} alt="" style={{ width: "20px" }} />Cabañas
                  </Link>
                </DropdownItem>
                <DropdownItem aria-label="prueba"
                  key="production_one"
                >
                  <Link className="link_nav" to='/habitaciones'>
                    <img className="mr-1 " src={habitaciones} alt="" style={{ width: "20px" }} />Habitaciones
                  </Link>
                </DropdownItem>
                <DropdownItem aria-label="prueba"
                  key="99_uptime_inv"
                >
                  <Link className="link_nav" to='/inventario'>
                    <img className="mr-1 " src={inventory} alt="" style={{ width: "20px" }} /> Inventario
                  </Link>
                </DropdownItem>



                {(isEditor || isSuperUser) && (
                  <DropdownItem aria-label="prueba"
                    key="100_uptime_inv"
                  >
                    <Link className="link_nav" to='/message'>
                      <img className="mr-1" src={notification} alt="" style={{ width: "20px" }} />Notificaciones
                    </Link>
                  </DropdownItem>
                )}

                {(isEditor || isSuperUser) && (
                  <DropdownItem aria-label="prueba" key="101_uptime_inv">
                    <Link className="link_nav" to='/hotel-graphs'>
                      <img className="mr-1" src={grafic} alt="" style={{ width: "20px" }} />Graph
                    </Link>
                  </DropdownItem>
                )}


                {(isEditor || isSuperUser) && (
                  <DropdownItem aria-label="prueba"
                    key="102_uptime_inv"
                  >
                    <Link className="link_nav" to='/price'>
                      <img className="mr-1 " src={price} alt="" style={{ width: "20px" }} />Precios
                    </Link>
                  </DropdownItem>
                )}
                {(isEditor || isSuperUser) && (
                  <DropdownItem aria-label="prueba"
                    key="103_uptime_inv"
                  >
                    <Link className="link_nav" to='/inventario-finca'>
                      <img className="mr-1" src={price} alt="" style={{ width: "20px" }} />Table Finca
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <NavbarItem isActive>
                <DropdownTrigger>
                  {/* <Link className="text-white font-medium text-base flex justify-center items-center" to={'/finca'} aria-current="page" color="warning">
          <img className="mt-1 mr-1 w-5 h-5" src={finca} alt=""  /> Finca
          </Link> */}
                  <Button
                    disableRipple
                    className="text-white font-medium text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                    radius="sm"
                    variant="light"
                  >
                    <img className="mb-1" src={finca} alt="" style={{ width: "20px" }} />Finca
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",

                }}
              >
                <DropdownItem aria-label="prueba"
                  key="autoscaling101"
                  className=""
                >
                  <Link className="link_nav" to='/finca'>
                    <img className="mr-1" src={pasadia} alt="" style={{ width: "20px" }} />Producción
                  </Link>
                </DropdownItem>
                <DropdownItem aria-label="prueba"
                  key="autoscaling102"
                  className=""
                >
                  <Link className="link_nav" to='/inventario-ranch'>
                    <img className="mr-1" src={pasadia} alt="" style={{ width: "20px" }} />Inventario
                  </Link>
                </DropdownItem>
                <DropdownItem aria-label="prueba"
                  key="autoscaling103"
                  className=""
                >
                  <Link className="link_nav" to='/precios'>
                    <img className="mr-1" src={pasadia} alt="" style={{ width: "20px" }} />Precios
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavbarItem >
              <Link className="text-white font-medium text-base flex justify-center items-center" color="foreground" href="#">
                <img className="mr-1 w-5 h-5" src={energy} alt="" />Energia Renovable
              </Link>
            </NavbarItem>
            {isEditor && (

              <NavbarItem>
                <Link to="/Register" className="text-white font-medium text-base flex justify-center items-center">
                  <img className="mr-1 w-4 h-4" src={add} alt="" />Add user
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>

          <NavbarContent as="div" className="items-center justify-center flex  w-56" justify="">
            <p className="font-semibold text-white ">{user.username}</p>
            <Dropdown placement="bottom-end">
              <DropdownTrigger className=" border-3 h-9 w-2">
                <Avatar className="cursor-pointer" showFallback />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem aria-label="prueba" key="profile" className="h-14 gap-2">
                  <p className="font-semibold "> Welcome {user.username} {user.roles}</p>
                </DropdownItem>
                <DropdownItem aria-label="prueba" key="logout" color="danger" to="/" onClick={() => logout()}>
                  <Link>
                    Logout
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>

          <NavbarMenu className="">
            <NavbarContent className=" flex flex-col mt-5">
              {/* <NavbarBrand>
        </NavbarBrand> */}
              <NavbarItem>

              </NavbarItem>
              <NavbarItem>
                <Link className="w-80 pl-2 text-blue-600 font-medium text-lg " to={isAuthenticated ? "/home" : "/"}>Inicio</Link>

                <Accordion isCompact className="border-b-2 border-blue-400 w-80 font-medium text-lg" >
                  <AccordionItem key="1" aria-label="Hotel" title="Hotel" className="">

                    <Link className="link_nav" to='/pasadia'>
                      Pasadia
                    </Link>
                    <Link className="link_nav" to='/cabanias'>
                      Cabañas
                    </Link>
                    <Link className="link_nav" to='/habitaciones'>
                      Habitaciones
                    </Link>
                    <Link className="link_nav" to='/inventario'>
                      Inventario
                    </Link>
                    <Link className="link_nav" to='/message'>
                      Mensajes
                    </Link>
                    <Link className="link_nav" to='/hotel-graphs'>
                      Graph
                    </Link>
                  </AccordionItem>
                </Accordion>
              </NavbarItem>

              <NavbarItem isActive className="w-80 text-black">
                <Link className="text-black font-medium text-lg pl-2" to={'/finca'} aria-current="page" color="warning">
                  Finca
                </Link>
              </NavbarItem>


              <NavbarItem className="w-80">
                <Link className="text-black pl-2 font-medium text-lg" color="foreground" href="#">
                  Energia Renovable
                </Link>
              </NavbarItem>

              {isEditor && (
                <NavbarItem className="w-80" >
                  <Link to='/hotel-graphs' className="text-black pl-2 font-medium text-lg" color="foreground" >
                    grapsh
                  </Link>
                </NavbarItem>

              )}
              {isEditor && (

                <NavbarItem className="w-80">
                  <Link to="/Register" className="text-red-500 pl-2 font-medium text-lg">
                    Registrar
                  </Link>
                </NavbarItem>
              )}

            </NavbarContent>

            {/* {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))} */}
          </NavbarMenu>
        </Navbar>

      </div>

    </div>
  );
}
