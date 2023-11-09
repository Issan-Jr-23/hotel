import {Navbar,DropdownItem,Dropdown,DropdownTrigger,DropdownMenu,Avatar, NavbarBrand,NavbarMenu, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import './navbars.css'
import { useAuth } from "../context/authContext";
import logo from "../images/logo.png"
export default function Navbars() {


  const { isAuthenticated, logout, user } = useAuth();
  const { isAdmin } = useAuth();


  return (
    <Navbar isBordered className="bg-zinc-800 h-20 justify-beetween">

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link to={isAuthenticated ? "/home" : "/"}>Obraix</Link>
        </NavbarBrand>
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
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive>
          <Link className="text-white font-medium text-base" href="#" aria-current="page" color="warning">
            Finca
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link className="text-white ml-4 font-medium text-base" color="foreground" href="#">
            Energia Renovable
          </Link>
        </NavbarItem>
        {isAdmin && ( 
        <NavbarItem>
          <Link to="/Register" className="text-blue-700 font-medium text-base">
            Registrar
          </Link>
        </NavbarItem>
      )}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="">
      <p className="font-semibold text-white "> Welcome {user.username}</p>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
              <Avatar className="cursor-pointer" showFallback/>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem aria-label="prueba" key="profile" className="h-14 gap-2">
              <p className="font-semibold "> Welcome {user.username}</p>
            </DropdownItem>
            <DropdownItem aria-label="prueba" key="logout" color="danger"  to="/" onClick={() => logout()}>
            <Link>
                Logout
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        
      </NavbarMenu>
    </Navbar>
  );
}
