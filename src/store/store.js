import { configureStore } from '@reduxjs/toolkit'
import login from '../components/Login/loginSlice'
import table from '../components/Table/tableSlice'

const store = configureStore({
    reducer: { login, table },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;