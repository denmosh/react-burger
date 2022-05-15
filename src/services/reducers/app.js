import { createReducer } from '@reduxjs/toolkit'


const initialState = {
    loading: true,
    hasError: false,
    activeTab: "bun",
    value: 0,
    categories: {
        bun: "Булки",
        sauce: "Начинки",
        main: "Соусы",
    }
}

export const app = createReducer(initialState, (builder) => {

})
