import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../firebase";

//! fetch async with thunk
export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async (id) => {
    let todos = [];
    db.collection("todos")
      .doc(id)
      .collection("todoArray")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          todos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      });
    console.log(todos.length);
    return todos;
  }
);
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: null,
    status: "idle",
    editingTodo: false,
    todoToEdit: null,
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
      });
  },
});

export const { setTodos, setTodoToEdit } = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectTodoToEdit = (state) => state.todos.todoToEdit;
export const selectisEditingMode = (state) => state.todos.editingTodo;
export default todosSlice.reducer;
