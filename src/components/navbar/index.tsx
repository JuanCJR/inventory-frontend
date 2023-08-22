"use client";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import { FiHome, FiPackage, FiTruck, FiUser } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
export const NavBar = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const isLoggedLocalStorage = localStorage.getItem("isLogged");

    if (!isLoggedLocalStorage) {
      router.push("/login");
    } else {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className={styles.navbar}>
      {isLogged && (
        <Box alignContent={"start"} ml={5}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
            />
            <MenuList color={"black"}>
              <MenuItem
                icon={<FiHome />}
                onClick={() => {
                  const store = localStorage.getItem("storeId");
                  router.push(`/dashboard/${store}`);
                }}
              >
                Inicio
              </MenuItem>
              <MenuItem
                icon={<FiUser />}
                onClick={() => {
                  router.push(`/users`);
                }}
              >
                Usuarios
              </MenuItem>
              <MenuItem
                icon={<FiTruck />}
                onClick={() => {
                  router.push(`/stores`);
                }}
              >
                Tiendas
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}

      <Flex
        ml={"auto"}
        mr={"auto"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div className={styles.navbar_icon}>
          <Icon as={FiPackage} boxSize={10} />
        </div>

        <Heading size={"lg"}>Control de Vencimiento</Heading>
      </Flex>
    </div>
  );
};
