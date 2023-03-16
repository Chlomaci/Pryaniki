import { configureStore } from '@reduxjs/toolkit'
import login from '../loginSlice'
import table from '../tableSlice'

const store = configureStore({
    reducer: { login, table },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;