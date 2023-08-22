"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { StoreApiHandler } from "@/api/store/store.api";
import { UserApiHandler } from "@/api/user/user.api";
export const NavBar = () => {
  const params = useParams();
  console.log();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [store, setStore] = useState({
    name: "",
  });
  const [user, setUser] = useState({
    username: "",
  });

  const storeApiHandler = new StoreApiHandler();
  const userApiHandler = new UserApiHandler();

  const fetchData = async () => {
    const storeData = await storeApiHandler.findOne(
      Number(localStorage.getItem("storeId"))
    );
    setStore((state) => ({ ...state, name: storeData.data.name }));

    const { data } = await userApiHandler.findOne(
      Number(localStorage.getItem("userId"))
    );
    setUser((state) => ({
      ...state,
      username: data.username,
    }));
  };
  useEffect(() => {
    const isLoggedLocalStorage = localStorage.getItem("isLogged");

    if (!isLoggedLocalStorage) {
      router.push("/login");
    } else {
      setIsLogged(true);
      fetchData();
    }
  }, [params.storeId]);

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
          <Icon as={FiPackage} boxSize={8} />
        </div>

        <Heading size={{ xs: "xs", md: "lg" }}>
          Control de Vencimiento {isLogged && `-  ${store.name}`}
        </Heading>
      </Flex>

      {isLogged && (
        <Box alignContent={"end"} mr={5}>
          <HStack>
            <Heading size={{ xs: "xs", md: "sm" }}>
              Usuario: {user.username}
            </Heading>
            <Button
              size={{ xs: "sm", md: "md" }}
              onClick={() => {
                localStorage.removeItem("isLogged");
                localStorage.removeItem("storeId");
                localStorage.removeItem("userId");
                setIsLogged(false);
                router.push("/login");
              }}
            >
              Cerrar sesion
            </Button>
          </HStack>
        </Box>
      )}
    </div>
  );
};
