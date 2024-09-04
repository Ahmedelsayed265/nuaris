import { configureStore } from "@reduxjs/toolkit";
import authedUser from "./slices/authedUser";
import authRole from "./slices/authRole";

export const store = configureStore({
  reducer: {
    authedUser,
    authRole
  }
});
