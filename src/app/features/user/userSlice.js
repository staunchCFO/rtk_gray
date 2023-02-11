import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: "1",
        name: "Emeka Okezie"
    },
    {
        id: "2",
        name: "Preciou Uba"
    }
]

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    }
})

export const allAppUsers = (state) => state.users

export default userSlice.reducer