"use client";
import { UserApiHandler } from "@/api/user/user.api";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";

export default function Login() {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const userApiHandler = new UserApiHandler();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogged")) {
      router.push(`/dashboard/${localStorage.getItem("storeId")}`);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = loginState;
    const { status, data } = await userApiHandler.login(username, password);
    setLoading(true);
    if (status !== 200) {
      toast({
        title: "Error",
        description: "Usuario o contraseña incorrectos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);

      return;
    } else {
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("userId", String(data.id));
      localStorage.setItem("storeId", String(data.store.id));

      router.push(`/dashboard/${data.store.id}`);
    }
  };
  return (
    <Box h={"100vh"}>
      <VStack
        w={"20rem"}
        alignItems={"center"}
        justifyContent={"center"}
        m={"auto"}
        mt={"4rem"}
      >
        <HStack>
          <Box>
            <Icon as={FiPackage} boxSize={6} />
          </Box>
          <Heading size={"sm"}>Inicio de Sesion</Heading>
        </HStack>

        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Usuario</FormLabel>
            <Input
              onChange={(e) =>
                onChangeSimpleValue(e, "username", setLoginState)
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              onChange={(e) =>
                onChangeSimpleValue(e, "password", setLoginState)
              }
            />
          </FormControl>

          <Button mt={2} w={"100%"} type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </form>
      </VStack>
    </Box>
  );
}
