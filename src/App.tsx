import { useEffect } from "react";
import { loadClients, remover, editor } from "./redux/clientsSlice";
import { Clients } from "./components/Clients";
import { Header } from "./components/Header";
import { useTypedDispatch, useTypedSelector } from "./redux/hooks";
import { ClipLoader } from "react-spinners";

function App() {
  const clients = useTypedSelector((state) => state.clients.clients);
  const message = useTypedSelector((state) => state.clients.message);
  const isError = useTypedSelector((state) => state.clients.isError);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadClients());
  }, []);

  const handleRemove = (id: number) => {
    dispatch(remover(id));
  };

  const handleEdit = (id: number) => {
    const newPhone = prompt("Enter new phone number");

    if (newPhone) {
      dispatch(editor({ id, newPhone }));
    }
  };

  return (
    <div className="App">
      <Header clients={clients} message={message} isError={isError} />
      <Clients
        clients={clients}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        Cliploader={ClipLoader}
      />
    </div>
  );
}

export default App;
