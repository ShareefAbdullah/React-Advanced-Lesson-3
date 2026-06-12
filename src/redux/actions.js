import { type } from "@testing-library/user-event/dist/type";

export const loadClients = () => {
    return (dispatch) => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Couldn't reach the server. Please check your internet connection.")
            }
            return response.json();
        })
        .then((json) => {
            dispatch({
                type: "load/clients/fulfilled",
                payload: json
            });
        })
        .catch((error) => {
            dispatch({
                type: "load/clients/rejected",
                payload: error.message
            });
        })
    }
}


export const remover = (id) => {
    return (dispatch) => {
        dispatch({type: "remove/clients/pending", payload: id});

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then(() => {
            dispatch({
                type: "remove/clients/fulfilled",
                payload: id
            });
        })
    } 
}


export const editor = (id, newPhone) => {
    return (dispatch) => {
        dispatch({type: "edit/clients/pending", payload: id});

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                phone: newPhone
            }) 
        })
        .then((response) => response.json())
        .then(() => {
            dispatch({
                type: "edit/clients/fulfilled",
                payload: {id, phone: newPhone}
            })
        })
    }
}