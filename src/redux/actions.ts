import { AppDispatch } from ".";

export type ClientType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  editing?: boolean;
  removing?: boolean;
};

export type ActionTypes =
  | { type: "load/clients/fulfilled"; payload: ClientType[] }
  | { type: "load/clients/rejected"; payload: string }
  | { type: "remove/clients/pending"; payload: number }
  | { type: "remove/clients/fulfilled"; payload: number }
  | { type: "edit/clients/pending"; payload: number }
  | { type: "edit/clients/fulfilled"; payload: { id: number; phone: string } };

export const loadClients = () => {
  return (dispatch: AppDispatch): void => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Couldn't reach the server. Please check your internet connection."
          );
        }
        return response.json();
      })
      .then((json) => {
        dispatch({
          type: "load/clients/fulfilled",
          payload: json,
        });
      })
      .catch((error) => {
        dispatch({
          type: "load/clients/rejected",
          payload: error.message,
        });
      });
  };
};

export const remover = (id: number) => {
  return (dispatch: AppDispatch): void => {
    dispatch({ type: "remove/clients/pending", payload: id });

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({
          type: "remove/clients/fulfilled",
          payload: id,
        });
      });
  };
};

export const editor = (id: number, newPhone: string) => {
  return (dispatch: AppDispatch): void => {
    dispatch({ type: "edit/clients/pending", payload: id });

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phone: newPhone,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({
          type: "edit/clients/fulfilled",
          payload: { id, phone: newPhone },
        });
      });
  };
};
