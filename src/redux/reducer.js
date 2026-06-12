const initialState = {
  clients: [],
  message: "",
  isError: false
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "load/clients/fulfilled":
      return {
        ...state,
        clients: action.payload
      }
    case "load/clients/rejected":
      return {
        ...state,
        isError: true,
        message: action.payload
      }
    case "remove/clients/pending":
      return {
        ...state,
        clients: state.clients.map((client) => {
          if (client.id === action.payload) {
            return {
              ...client,
              removing: true
            }
          }
          return client;
        })
      }
    case "remove/clients/fulfilled":
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.payload)
      }
    case "edit/clients/pending":
      return {
        ...state,
        clients: state.clients.map((client) => {
          if (client.id === action.payload) {
            return {
              ...client,
              editing: true
            }
          }
          return client
        })
      }
    case "edit/clients/fulfilled":
      return {
        ...state,
        clients: state.clients.map((client) => {
          if (client.id === action.payload.id) {
            return {
              ...client,
              phone: action.payload.phone,
              editing: false
            }
          }
          return client;
        })
      }
      
    default:
      return state;
  }
}