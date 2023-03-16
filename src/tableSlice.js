import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "./http/http.hook"


    const initialState = {
        id: [],
        documentStatus: [],
        employeeNumber: [],
        documentType: [],
        documentName: [],
        companySignatureName: [],
        employeeSignatureName: [],
        employeeSigDate: [],
        companySigDate: []
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

    // export const fetchEditData = createAsyncThunk(
    //     'table/fetchEditData',
    //     async (data) => {
    //         const {onDataEditing} = useHttp();
    //         return await onDataEditing(data);
    //     }
    // );

    const tableSlice = createSlice({
        name: 'table',
        initialState,
        extraReducers: (builder) => {
            builder
                .addCase(fetchData.pending, state => {state.loadingStatus = 'loading'})
                .addCase(fetchData.fulfilled, (state, action) => {
                    state.loadingStatus = 'idle';
                    action.payload.map((item) => {
                        state.id.push(item.id);
                        state.documentStatus.push(item.documentStatus);
                        state.employeeNumber.push(item.employeeNumber);
                        state.documentType.push(item.documentType);
                        state.documentName.push(item.documentName);
                        state.companySignatureName.push(item.companySignatureName);
                        state.employeeSignatureName.push(item.employeeSignatureName);
                        state.employeeSigDate.push(item.employeeSigDate);
                        state.companySigDate.push(item.companySigDate);
                    })
                })
                .addCase(fetchData.rejected, state => {
                    state.loadingStatus = 'error';
                })
                .addDefaultCase(() => {})
        }
    });

    const {actions, reducer} = tableSlice;

    // export const {nameChange, errorStatusChange} = actions;

    export default reducer;