import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuth: true,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
})


export const {setIsAuth} = authSlice.actions;
export default authSlice.reducer;