import {Navbar,DropdownItem,Dropdown,DropdownTrigger,DropdownMenu,Avatar, NavbarBrand,NavbarMenu,NavbarMenuItem,NavbarMenuToggle, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import './navbars.css'
import { useAuth } from "../context/authContext";
import logo from "../images/logo.png"
export default function Navbars() {


  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)



  return (
    <Navbar isBordered className="bg-zinc-800 h-20 justify-beetween">
      {/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent> */}

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
                className="text-blue-700 font-medium text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                Hotel
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
              key="99_uptime_inv"
            >
              <Link className="link_nav" to='/inventario'>
            Invnetario
            </Link>
            </DropdownItem>
            <DropdownItem aria-label="prueba"
              key="production_ready_mk"
            >
              <Link className="link_nav" to='/mekatos'>
                Mekatos
            </Link>
            </DropdownItem>
            <DropdownItem aria-label="prueba"
              key="99_uptime_be"
            >
              <Link className="link_nav" to='/drinks'>
            Bebidas
            </Link>
            </DropdownItem>
            <DropdownItem aria-label="prueba"
              key="99_uptime_al"
            >
              <Link className="link_nav" to='/food'>
            Food
            </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive>
          <Link className="text-blue-700 font-medium text-base" href="#" aria-current="page" color="warning">
            Finca
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link className="text-blue-700 font-medium text-base" color="foreground" href="#">
            Energia Renovable
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/Register" className="text-blue-700 font-medium text-base" color="foreground">
            Registrar
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem aria-label="prueba" key="profile" className="h-14 gap-2">
              <p className="font-semibold"> Welcome {user.username}</p>
            </DropdownItem>
            <DropdownItem aria-label="prueba" key="logout" color="danger">
            <Link to="/" onClick={() => logout()}>
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
