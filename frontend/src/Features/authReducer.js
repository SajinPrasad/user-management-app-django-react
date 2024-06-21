import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    accessToken: localStorage.getItem('ACCESS_TOKEN') ? JSON.parse(localStorage.getItem('ACCESS_TOKEN')) : null,
    refreshToken: localStorage.getItem('REFRESH_TOKEN') ? JSON.parse(localStorage.getItem('REFRESH_TOKEN')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
            localStorage.removeItem('user');
          },
    }
})


export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;