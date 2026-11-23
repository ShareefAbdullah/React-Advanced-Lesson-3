import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ClientType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  editing?: boolean;
  removing?: boolean;
};

export const loadClients = createAsyncThunk<
  ClientType[],
  void,
  { rejectValue: string }
>("load/clients", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(
        "Couldn't reach the server. Please check your internet connection."
      );
    }
    const data: ClientType[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong.");
  }
});

export const remover = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("remove/clients", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the client.");
    }
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong.");
  }
});

export const editor = createAsyncThunk<
  { id: number; phone: string },
  { id: number; newPhone: string },
  { rejectValue: string }
>("edit/client", async ({ id, newPhone }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          phone: newPhone,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Couldn't update the phone number.");
    }
    return { id, phone: newPhone };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong.");
  }
});

export type InitialStateType = {
  clients: ClientType[];
  message: string;
  isError: boolean;
  isLoading: boolean;
};

const initialState: InitialStateType = {
  clients: [],
  message: "",
  isError: false,
  isLoading: false,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadClients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loadClients.fulfilled, (state, action) => {
        state.clients = action.payload.map((client) => ({
          ...client,
          editing: false,
          removing: false,
        }));
        state.isLoading = false;
      })
      .addCase(loadClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload || action.error.message || "Failed to load clients.";
      })
      .addCase(remover.pending, (state, action) => {
        state.isError = false;
        const client = state.clients.find((c) => c.id === action.meta.arg);
        if (client) {
          client.removing = true;
          state.message = "";
        }
      })
      .addCase(remover.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client.id !== action.payload
        );
      })
      .addCase(remover.rejected, (state, action) => {
        const client = state.clients.find((c) => c.id === action.meta.arg);
        if (client) {
          client.removing = false;
        }
        state.isError = true;
        state.message =
          action.payload || action.error.message || "Failed to remove client.";
      })
      .addCase(editor.pending, (state, action) => {
        const client = state.clients.find((c) => c.id === action.meta.arg.id);
        if (client) {
          client.editing = true;
        }
        state.isError = false;
        state.message = "";
      })
      .addCase(editor.fulfilled, (state, action) => {
        const client = state.clients.find((c) => c.id === action.payload.id);
        if (client) {
          client.phone = action.payload.phone;
          client.editing = false;
        }
      })
      .addCase(editor.rejected, (state, action) => {
        const client = state.clients.find((c) => c.id === action.meta.arg.id);
        if (client) {
          client.editing = false;
        }
        state.isError = true;
        state.message =
          action.payload ||
          action.error.message ||
          "Failed to update phone number.";
      });
  },
});

export default clientsSlice.reducer;
