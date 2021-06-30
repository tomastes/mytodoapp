import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import todosReducer from "../features/todosSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    modalState: modalReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ["todos/setTodos"],
    },
  }),
});
