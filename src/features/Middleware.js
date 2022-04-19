import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../firebase";
import axios from "axios";
//! fetch async with thunk
export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodosAsync",
  async (id) => {
    console.log(id);
    const ref = await db
      .collection("todos")
      .doc(id)
      .collection("todoArray")
      .get();
    let todos = [];
    console.log("doc");
    ref.docs.map((doc) => {
      todos.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return todos;
  }
);
export const createActionTest = createAction();
//! test fetch async
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/1");
    return data;
  }
);
