import React from "react";
import {Navbar,DropdownItem,Dropdown,DropdownTrigger,DropdownMenu,Avatar, NavbarBrand,NavbarMenu, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenuToggle,Accordion, AccordionItem} from "@nextui-org/react";
import { Link } from "react-router-dom";
import './navbars.css'
import { useAuth } from "../context/authContext";
import logo from "../images/logo.png"

export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { isAuthenticated, logout, user } = useAuth();
  const isAdmin = user && user.role === 'admin';
  const isEditor = user && user.role == "editor";


  // const menuItems = [
  //   "Profile",
  //   "Dashboard",
  //   "Activity",
  //   "Analytics",
  //   "System",
  //   "Deployments",
  //   "My Settings",
  //   "Team Settings",
  //   "Help & Feedback",
  //   "Log Out",
  // ];

  return (
    <div className=" flex justify-center mt-10">
    <Navbar isBordered className="bg-white/30 h-20 justify-beetween w-10/12 rounded-3xl" onMenuOpenChange={setIsMenuOpen}>

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
        <Dropdown>
          <NavbarItem >
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-white font-medium text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                Hotel
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="ACME features"
            className="w-[340px] "
            itemClasses={{
              base: "gap-4",
              
            }}
          >
            <DropdownItem aria-label="prueba"
              key="autoscaling"
              className=""
            >
            <Link className="link_nav" to='/pasadia'>
            Pasadia
            </Link>
            </DropdownItem>
            <DropdownItem aria-label="prueba"
              key="production_ready"
            >
              <Link className="link_nav" to='/cabanias'>
            Cabañas
            </Link>
            </DropdownItem>
            <DropdownItem aria-label="prueba"
              key="production_one"
            >
              <Link className="link_nav" to='/habitaciones'>
            Habitaciones
            </Link>
            </DropdownItem>
            <DropdownItem aria-label="prueba"
              key="99_uptime_inv"
            >
              <Link className="link_nav" to='/inventario'>
            Inventario
            </Link>
            </DropdownItem>
            {isEditor && (
            <DropdownItem aria-label="prueba"
              key="100_uptime_inv"
            >
              <Link className="link_nav" to='/message'>
            Mensajes
            </Link>
            </DropdownItem>
            )}
            {isEditor && (
            <DropdownItem aria-label="prueba"
              key="101_uptime_inv"
            >
              <Link className="link_nav" to='/hotel-graphs'>
            Graph
            </Link>
            </DropdownItem>
            )}
              {isEditor && (
            <DropdownItem aria-label="prueba"
              key="102_uptime_inv"
            >
              <Link className="link_nav" to='/price'>
            Precios
            </Link>
            </DropdownItem>
              )}
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive>
          <Link className="text-white font-medium text-base" to={'/finca'} aria-current="page" color="warning">
            Finca
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link className="text-white ml-4 font-medium text-base" color="foreground" href="#">
            Energia Renovable
          </Link>
        </NavbarItem>
        {isEditor && (
        
        <NavbarItem>
          <Link to="/Register" className="text-red-500 font-medium text-base">
            Registrar
          </Link>
        </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="">
      <p className="font-semibold text-white ">{user.username}</p>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
              <Avatar className="cursor-pointer" showFallback/>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem aria-label="prueba" key="profile" className="h-14 gap-2">
              <p className="font-semibold "> Welcome {user.username} {user.roles}</p>
            </DropdownItem>
            <DropdownItem aria-label="prueba" key="logout" color="danger"  to="/" onClick={() => logout()}>
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
  );
}
