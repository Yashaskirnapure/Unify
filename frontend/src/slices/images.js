import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

export const fetchtCatalog = createAsyncThunk('/catalog/fetch', async () => {
    const response = await API.get('/images');
    return response.data.images;
});

export const addImage = createAsyncThunk('/image/add', )