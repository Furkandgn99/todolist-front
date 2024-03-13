import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export interface TodosState {
  loading: boolean;
  Todos: Todo[];
}

const initialState: TodosState = {
  loading: false,
  Todos: [],
};

export const fetchAllTodos = createAsyncThunk("allTodos", async () => {
  try {
    const response = await axios.get(`http://localhost:3300/todos`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const AddTodo = createAsyncThunk(
  "addTodoItem",
  async ({ title, description, status }: Todo) => {
    try {
      const response = await axios.post(`http://localhost:3300/todos`, {
        title: title,
        description: description,
        status: status,
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const removeTodo = createAsyncThunk(
  "removeTodoItem",
  async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3300/todos/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const editTodo = createAsyncThunk(
  "editTodoItem",
  async ({ id, title, description, status }: Todo) => {
    try {
      const response = await axios.patch(`http://localhost:3300/todos/${id}`, {
        title: title,
        description: description,
        status: status,
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const todosSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.loading = false;
      console.log("allTodos", action.payload);
      state.Todos = action.payload;
    });
    builder.addCase(fetchAllTodos.rejected, (state, action) => {
      state.loading = false;
      console.log("error");
    });
    builder.addCase(AddTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddTodo.fulfilled, (state, action) => {
      state.loading = false;
      console.log("AddTodo", action.payload);
    });
    builder.addCase(AddTodo.rejected, (state, action) => {
      state.loading = false;
      console.log("error");
    });
    builder.addCase(removeTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.loading = false;
      console.log("removeTodo", action.payload);
    });
    builder.addCase(removeTodo.rejected, (state, action) => {
      state.loading = false;
      console.log("error");
    });
    builder.addCase(editTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.loading = false;
      console.log("removeTodo", action.payload);
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.loading = false;
      console.log("error");
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = todosSlice.actions;

export default todosSlice.reducer;
