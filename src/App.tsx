import React, { useEffect } from "react";
import { loadClients, remover, editor, ClientType } from "./redux/actions";
import { ClipLoader } from "react-spinners";
import { Clients } from "./components/Clients";
import { Header } from "./components/Header";
import { useTypedDispatch, useTypedSelector } from "./hooks";

export const App: React.FC = () => {
  const clients: ClientType[] = useTypedSelector((state) => state.clients);
  const message: string = useTypedSelector((state) => state.message);
  const isError: boolean = useTypedSelector((state) => state.isError);
  const dispatch = useTypedDispatch();

  useEffect((): void => {
    dispatch(loadClients());
  }, []);

  const handleRemove = (id: number): void => {
    dispatch(remover(id));
  };

  const handleEdit = (id: number, phone: string): void => {
    const newPhone: string | null = prompt("Enter new phone number", phone);
    if (newPhone !== null && newPhone.trim() !== "") {
      dispatch(editor(id, newPhone));
    }
  };

  return (
    <div className="App">
      <Header clients={clients} message={message} isError={isError} />
      <Clients
        clients={clients}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        ClipLoader={ClipLoader}
      />
    </div>
  );
};
