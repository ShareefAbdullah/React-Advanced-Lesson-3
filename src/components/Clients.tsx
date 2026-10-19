import React from "react";
import { ClientType } from "../redux/actions";
import { Client } from "./Client";
import { ClipLoader } from "react-spinners";

type ClientsProps = {
  clients: ClientType[];
  handleEdit: (id: number, phone: string) => void;
  handleRemove: (id: number) => void;
  ClipLoader: typeof ClipLoader;
};

export const Clients: React.FC<ClientsProps> = ({
  clients,
  handleEdit,
  handleRemove,
  ClipLoader,
}) => {
  return (
    <div>
      {clients.map((client) => {
        return (
          <Client
            client={client}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            ClipLoader={ClipLoader}
          />
        );
      })}
    </div>
  );
};
