import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHeader = createAsyncThunk('billets/fetchBillets', async () => {
    const response = await axios.get('https://pixelevent.site/api/views');
    return response.data['hydra:member'];
});

const initialState = {
    views: [],
    status: 'idle',
    error: null,
};

const viewSlice = createSlice({
    name: 'view',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchHeader.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchHeader.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.views = action.payload;
            })
            .addCase(fetchHeader.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to fetch data from the server';
            });
    },
});

export default viewSlice.reducer;
