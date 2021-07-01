import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsAsync, fetchTodosAsync } from "./Middleware";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: null,
    status: "idle",
    editingTodo: false,
    todoToEdit: null,
    testData: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setTodoToEdit: (state, action) => {
      const todoToEdit = state.todos.filter(
        (todo) => todo.id == action.payload.id
      );
      state.todoToEdit = todoToEdit;
      state.editingTodo = action.payload.EditingMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(Object.isExtensible(state.todos));
        //  state.todos = action.payload;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.testData = action.payload;
      });
  },
});

export const { setTodos, setTodoToEdit } = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectTodoToEdit = (state) => state.todos.todoToEdit;
export const selectisEditingMode = (state) => state.todos.editingTodo;
export default todosSlice.reducer;
