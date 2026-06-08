import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadClients, remover, editor } from "./actions";

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
      <header>
        <h1>Clients</h1>
      </header>
      <main>
        <h3>{isError ? message : ""}</h3>
        <p>{!isError && clients.length === 0 ? "Loading..." : ""}</p>
        {
          clients.map((user) => {
            return <div key={user.id}>
              <ul>
                <li><span>Name:</span> {user.name}</li>
                <li><span>Nickname:</span> {user.username}</li>
                <li><span>Email:</span> {user.email}</li>
                <li><span>Phone:</span> {user.phone}</li>
              </ul>
              <span className="buttons">
                <button onClick={() => handleEdit(user.id, user.phone)}>Edit Number</button>
                <button onClick={() => handleRemove(user.id)}>Remove User</button>
              </span>
            </div>
          })
        }
      </main>
      
    </div>
  );
}

export default App;
