import {createSlice, createAsyncThunk, combineReducers} from '@reduxjs/toolkit';
import axios from 'axios';
import localBilletsData from '../../src/data/billets.json';

///////////////////////////////////////////////Reducer pour les billets///////////////////////////////////////
export const fetchBillets = createAsyncThunk('billets/fetchBillets', async () => {
    try {
        const response = await axios.get('https://pixelevent.site/api/billets');
        return response.data['hydra:member'];
    } catch (error) {
        return localBilletsData;
    }
});

const initialBilletState = {
    billets: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};
const billetsSlice = createSlice({
    name: 'billets',
    initialState: initialBilletState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchBillets.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchBillets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.billets = action.payload;
            })
            .addCase(fetchBillets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to fetch data from the server';
                state.billets = localBilletsData;
            });
    },
});

///////////////////////////////////////////////Reducer pour le programme///////////////////////////////////////
export const fetchProgramme = createAsyncThunk('programme/fetchProgramme', async () => {
    const response = await axios.get('https://pixelevent.site/api/days');
    return response.data['hydra:member'];
});
const initialProgrammeState = {
    programme: [],
    status: 'idle',
    error: null,
};
const programmeSlice = createSlice({
    name: 'programme',
    initialState: initialProgrammeState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProgramme.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchProgramme.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.programme = [action.payload];
            })
            .addCase(fetchProgramme.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

///////////////////////////////////////////////Reducer pour les articles///////////////////////////////////////
export const fetchArticle = createAsyncThunk('articles/fetchArticles', async () => {
    const response = await axios.get('https://pixelevent.site/api/articles');
    return response.data['hydra:member'];
});
const initialArticlesState = {
    articles: [],
    status: 'idle',
    error: null,
};
const articlesSlice = createSlice({
    name: 'articles',
    initialState: initialArticlesState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchArticle.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = [action.payload];
            })
            .addCase(fetchArticle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

///////////////////////////////////////////////Reducer pour la FAQ///////////////////////////////////////
export const fetchFaq = createAsyncThunk('faq/fetchFaq', async () => {
    const response = await axios.get('https://pixelevent.site/api/f_a_qs');
    return response.data['hydra:member'];
});
const initialFaqState = {
    faq: [],
    status: 'idle',
    error: null,
};
const faqSlice = createSlice({
    name: 'faq',
    initialState: initialFaqState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFaq.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchFaq.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.faq = [action.payload];
            })
            .addCase(fetchFaq.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

///////////////////////////////////////////////Reducer pour les sponsors///////////////////////////////////////
export const fetchSponsors = createAsyncThunk('sponsors/fetchSponsors', async () => {
    const response = await axios.get('https://pixelevent.site/api/sponsors');
    return response.data['hydra:member'];
});
const initialSponsorsState = {
    sponsors: [],
    status: 'idle',
    error: null,
};
const sponsorsSlice = createSlice({
    name: 'faq',
    initialState: initialSponsorsState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSponsors.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchSponsors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sponsors = [action.payload];
            })
            .addCase(fetchSponsors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

///////////////////////////////////////////////Reducer pour les views///////////////////////////////////////
export const fetchHeader = createAsyncThunk('header/fetchHeader', async () => {
    const response = await axios.get('https://pixelevent.site/api/views');
    return response.data['hydra:member'];
});

const initialViewState = {
    views: [],
    status: 'idle',
    error: null,
};

const viewSlice = createSlice({
    name: 'views',
    initialState: initialViewState,
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

///////////////////////////////////////////////conbinaison des reducers///////////////////////////////////////
const rootReducer = combineReducers({
    billets: billetsSlice.reducer,
    programme: programmeSlice.reducer,
    articles: articlesSlice.reducer,
    faq: faqSlice.reducer,
    sponsors: sponsorsSlice.reducer,
    views: viewSlice.reducer,
});

export default rootReducer;
