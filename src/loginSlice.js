import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "./http/http.hook"


    const initialState = {
        username: localStorage.getItem('username'),
        error: false,
        isLogged:  localStorage.getItem('isLogged'),
        HOST: 'https://test.v5.pryaniky.com',
        token: localStorage.getItem('token'),
    };

    export const fetchAuth = createAsyncThunk(
        'login/fetchAuth',
        async (data) => {
            const {onAuth} = useHttp();
            return await onAuth(data);
        }
    );

    const loginSlice = createSlice({
        name: 'login',
        initialState,
        reducers: {
            nameChange: (state, action) => {
                localStorage.setItem('username', action.payload)
            },
            errorStatusChange: (state, action) => {
                state.error = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAuth.pending, state => {state.loadingStatus = 'loading'})
                .addCase(fetchAuth.fulfilled, (state, action) => {
                    state.loadingStatus = 'idle';
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('token', action.payload);
                })
                .addCase(fetchAuth.rejected, state => {
                    state.loadingStatus = 'error';
                })
                .addDefaultCase(() => {})
        }
    });

    const {actions, reducer} = loginSlice;

    export const {nameChange, errorStatusChange, onChange} = actions;

    export default reducer;