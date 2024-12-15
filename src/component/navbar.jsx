import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import logo from "../assets/laundry-machine.png";
import { useEffect } from "react";
export default function MyNavbar({ showMenu }) {
  const [activeItem, setActiveItem] = useState("manajemen-pelanggan");
  const handleLogout = () => {
    localStorage.removeItem("apiToken");

    window.location.href = "/login";
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    console.log(item);
  };
  useEffect(() => {
    if (activeItem === "manajemen-produk") {
      showMenu("management-product");
    } else if (activeItem === "manajemen-pelanggan") {
      showMenu("manajemen-pelanggan");
    } else if (activeItem === "transaksi") {
      showMenu("transaksi");
    }
  }, [activeItem]);
  return (
    <Navbar>
      <NavbarBrand>
        <img src={logo} alt="" className="w-[30px] mr-[20px]" />
        <p className="font-bold text-inherit">Enigma Laundry</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeItem === "manajemen-produk"}>
          <Link
            color={
              activeItem === "manajemen-produk" ? "secondary" : "foreground"
            }
            href="#"
            onClick={() => handleItemClick("manajemen-produk")}
          >
            Manajemen Produk
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeItem === "manajemen-pelanggan"}>
          <Link
            color={
              activeItem === "manajemen-pelanggan" ? "secondary" : "foreground"
            }
            aria-current="page"
            href="#"
            onClick={() => handleItemClick("manajemen-pelanggan")}
          >
            Manajemen Pelanggan/Customer
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeItem === "transaksi"}>
          <Link
            color={activeItem === "transaksi" ? "secondary" : "foreground"}
            href="#"
            onClick={() => handleItemClick("transaksi")}
          >
            Transaksi
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link
                color={
                  activeItem === "manajemen-produk" ? "secondary" : "foreground"
                }
                href="#"
                onClick={() => handleItemClick("manajemen-produk")}
              >
                Manajemen Produk
              </Link>
            </DropdownItem>
            <DropdownItem key="team_settings">
              <Link
                color={
                  activeItem === "manajemen-pelanggan"
                    ? "secondary"
                    : "foreground"
                }
                aria-current="page"
                href="#"
                onClick={() => handleItemClick("manajemen-pelanggan")}
              >
                Manajemen Pelanggan/Customer
              </Link>
            </DropdownItem>
            <DropdownItem key="analytics">
              {" "}
              <Link
                color={activeItem === "transaksi" ? "secondary" : "foreground"}
                href="#"
                onClick={() => handleItemClick("transaksi")}
              >
                Transaksi
              </Link>
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => handleLogout()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
