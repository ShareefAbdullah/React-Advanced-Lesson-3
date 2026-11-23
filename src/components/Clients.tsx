import { ClipLoader } from "react-spinners";
import { ClientType } from "../redux/clientsSlice";
import { Client } from "./Client";

type ClientsProps = {
  clients: ClientType[];
  handleEdit: (id: number, phone: string) => void;
  handleRemove: (id: number) => void;
  Cliploader: typeof ClipLoader;
};

export const Clients: React.FC<ClientsProps> = ({
  clients,
  handleEdit,
  handleRemove,
}) => {
  return (
    <div>
      {clients.map((client) => {
        return (
          <Client
            client={client}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            key={client.id}
            Cliploader={ClipLoader}
          />
        );
      })}
    </div>
  );
};
