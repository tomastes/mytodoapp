import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../firebase";
import axios from "axios";
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

//! test fetch async
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/1");
    return data;
  }
);
