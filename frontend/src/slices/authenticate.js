import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api'; 

export const fetchAuthStatus = createAsyncThunk('/auth/verify', async () => {
    const response = await API.get('/auth/verify');
    return response.data.isAuthenticated;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: null, status: 'idle' },
    reducers: {
        logout: (state) => { state.isAuthenticated = false; },
        login: (state) => { state.isAuthenticated = true; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = action.payload;
            })
            .addCase(fetchAuthStatus.rejected, (state) => {
                state.status = 'failed';
                state.isAuthenticated = false;
            });
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;