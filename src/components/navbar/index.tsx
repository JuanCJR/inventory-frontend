"use client";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.css";
import { FiPackage } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";
export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_icon}>
        <Icon as={FiPackage} boxSize={10} />
      </div>

      <Heading size={"lg"}>Control de Vencimiento</Heading>
    </div>
  );
};
