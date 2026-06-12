import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadClients, remover, editor } from "./redux/actions";
import { ClipLoader } from "react-spinners";
import { Clients } from "./components/Clients";
import { Header } from "./components/Header";

function App() {
  const clients = useSelector((state) => state.clients);
  const message = useSelector((state) => state.message);
  const isError = useSelector((state) => state.isError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadClients())
  }, []);

  const handleRemove = (id) => {
    dispatch(remover(id))
  }

  const handleEdit = (id, phone) => {
    const newPhone = prompt("Enter new phone number");
    dispatch(editor(id, newPhone))
  }

  return (
    <div className="App">
      <Header
        clients={clients}
        message={message}
        isError={isError}
      />
      <Clients
        clients={clients}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        ClipLoader={ClipLoader} 
      />
    </div>
  );
}

export default App;
