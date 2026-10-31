import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadClients, remover, editor } from "./redux/clientsSlice";
import { Clients } from "./components/Clients";
import { Header } from "./components/Header";

function App() {
  const clients = useSelector((state) => state.clients.clients);
  const message = useSelector((state) => state.clients.message);
  const isError = useSelector((state) => state.clients.isError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadClients());
  }, []);

  const handleRemove = (id) => {
    dispatch(remover(id));
  };

  const handleEdit = (id) => {
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
      />
    </div>
  );
}

export default App;
