import {Navbar,DropdownItem,Dropdown,DropdownTrigger,DropdownMenu,Avatar, NavbarBrand,NavbarMenu,NavbarMenuItem,NavbarMenuToggle, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/authContext";
import './navbars.css'
import { useAuth } from "../context/authContext";
export default function Menu() {

  // const { isAuthenticated, logout, user } = useAuth();
  // console.log(isAuthenticated, user)

  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  const menuItems = [
    "Profile"
  ];

  return (
    <Navbar disableAnimation isBordered >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link to={isAuthenticated ? "/home" : "/"}>MEQO</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link to={isAuthenticated ? "/home" : "/"}>MEQO</Link>
        </NavbarBrand>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                // endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Hotel
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
            >
            <Link className="link_nav" to='/pasadia'>
            Pasadia
            </Link>
            </DropdownItem>
            <DropdownItem
              key="production_ready"
            //   startContent={icons.flash}
            >
              <Link className="link_nav" to='/cabanias'>
            Cabañas
            </Link>
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
            //   startContent={icons.server}
            >
              <Link className="link_nav" to='/bebidas'>
            Bebidas
            </Link>
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
            //   startContent={icons.server}
            >
              <Link className="link_nav" to='/alimentos'>
            Alimentos
            </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="warning">
            Finca
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Energia Renovable
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold"> Welcome {user.username}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
            <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
