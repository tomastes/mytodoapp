import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import todosReducer from "../features/todosSlice";
import modalReducer from "../features/modalSlice";
import appReducer from "../features/appSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    modalState: modalReducer,
    appState: appReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ["todos/setTodos"],
    },
  }),
});
