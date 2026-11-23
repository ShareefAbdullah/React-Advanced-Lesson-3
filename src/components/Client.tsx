import React from "react";
import { ClipLoader } from "react-spinners";
import { ClientType } from "../redux/clientsSlice";
import styles from "../styles/clients.module.scss";

type ClientProps = {
  client: ClientType;
  handleEdit: (id: number, phone: string) => void;
  handleRemove: (id: number) => void;
  Cliploader: typeof ClipLoader;
};

export const Client: React.FC<ClientProps> = ({
  client,
  handleEdit,
  handleRemove,
}) => {
  return (
    <div className={styles.client}>
      <ul>
        <li>
          <span>Name:</span> {client.name}
        </li>
        <li>
          <span>Nickname:</span> {client.username}
        </li>
        <li>
          <span>Email:</span> {client.email}
        </li>
        <li>
          <span>Phone:</span> {client.phone}
        </li>
      </ul>
      <div className={styles.buttons}>
        <button
          onClick={() => handleEdit(client.id, client.phone)}
          disabled={client.editing}
        >
          {client.editing ? "Processing..." : "Edit Number"}
        </button>
        <div>
          {client.editing || client.removing ? <ClipLoader size={18} /> : ""}
        </div>
        <button
          onClick={() => handleRemove(client.id)}
          disabled={client.removing}
        >
          {client.removing ? "Removing..." : "Remove User"}
        </button>
      </div>
    </div>
  );
};
