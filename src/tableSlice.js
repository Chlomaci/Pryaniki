import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "./http/http.hook"


    const initialState = {
        id: [],
        rows: [],
        loading: 'idle',
    };


    export const fetchData = createAsyncThunk(
        'table/fetchData',
        async (data) => {
            const {onDataLoading} = useHttp();
            return await onDataLoading(data);
        }
    );

    export const fetchAddData = createAsyncThunk(
        'table/fetchAddData',
        async (data) => {
            const {onDataAdding} = useHttp();
            return await onDataAdding(data);
        }
    );

    export const fetchDeleteData = createAsyncThunk(
        'table/fetchDeleteData',
        async (data) => {
            const {onDataDelete} = useHttp();
            return await onDataDelete(data);
        }
    );

    export const fetchEditData = createAsyncThunk(
        'table/fetchEditData',
        async (data) => {
            const {onDataEditing} = useHttp();
            return await onDataEditing(data);
        }
    );

    const tableSlice = createSlice({
        name: 'table',
        initialState,
        reducers: {
            rowDeleted: (state, action) => {
                state.rows = state.rows.filter((row) => row.id !== action.payload)
            },
            rowAdded: (state, action) => {
                state.rows = [...state.rows, action.payload];
            },
            onCancelRow: (state) => {
                state.rows = state.rows.filter((row) => row.documentName !== '');
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchData.pending, state => {state.loading="true"})
                .addCase(fetchData.fulfilled, (state, action) => {
                    state.loading = 'idle';
                    state.rows = action.payload;
                    action.payload.map((item) => {
                        state.id.push(item.id);
                    })
                })
                .addCase(fetchData.rejected, state => {
                    state.loading='error';
                })
                .addCase(fetchDeleteData.pending, state => {state.loading="true"})
                .addCase(fetchDeleteData.fulfilled, state => {state.loading="idle"})
                .addCase(fetchDeleteData.rejected, state => {state.loading="error"})
                .addCase(fetchAddData.pending, state => {state.loading="true"})
                .addCase(fetchAddData.fulfilled, (state, action) => {
                state.loading="idle"
                state.id = [...state.id, action.payload.id];
                state.rows = state.rows.filter((row) => row.documentName !== '');
                state.rows = [...state.rows, action.payload];
            })
                .addCase(fetchAddData.rejected, state => {state.loading="error"})
                .addDefaultCase(() => {})
        }
    });

    const {actions, reducer} = tableSlice;

    export const {rowDeleted, rowAdded, onChangeUpdatedRow, onCancelRow} = actions;

    export default reducer;