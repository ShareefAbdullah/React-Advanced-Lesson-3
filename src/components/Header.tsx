import React from "react";
import { ClientType } from "../redux/clientsSlice";
import styles from "../styles/header.module.scss";

type HeaderProps = {
  clients: ClientType[];
  message: string;
  isError: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  clients,
  message,
  isError,
}) => {
  return (
    <header className={styles.header}>
      <h1>Clients</h1>
      <h3>{isError ? message : ""}</h3>
      <p>{!isError && clients.length === 0 ? "Loading..." : ""}</p>
    </header>
  );
};
