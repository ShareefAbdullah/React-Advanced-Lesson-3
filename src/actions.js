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