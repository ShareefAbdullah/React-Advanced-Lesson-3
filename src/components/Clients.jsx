import { Client } from "./Client";

export const Clients = ({ clients, handleEdit, handleRemove }) => {
  return (
    <div>
      {clients.map((client) => {
        return (
          <Client
            client={client}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            key={client.id}
          />
        );
      })}
    </div>
  );
};
