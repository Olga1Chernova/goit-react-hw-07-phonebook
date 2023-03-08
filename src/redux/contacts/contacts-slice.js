import { createSlice } from '@reduxjs/toolkit';

import {
    fetchAllContactsError, fetchAllContactsLoading, fetchAllContactsSuccess,
    fetchAddContactError, fetchAddContactSuccess, fetchAddContactLoading,
    fetchDeleteContactLoading, fetchDeleteContactSuccess, fetchDeleteContactError} from './contacts-actions';

const initialState = {
    items: [],
    loading: false,
    error: null,
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: {
        [fetchAllContactsLoading]: (store) => {
            store.loading = true;
        },
        [fetchAllContactsSuccess]: (store, {payload}) => {
            //console.log(payload);
            store.loading = false;
            store.items = payload;
        },
        [fetchAllContactsError]: (store, {payload}) => {
            store.loading = false;
            store.error = payload;
        },


        [fetchAddContactLoading]: (store) => {
            store.loading = true;
        },
        [fetchAddContactSuccess]: (store, {payload}) => {
            store.loading = false;
            store.items.push(payload);
        },
        [fetchAddContactError]: (store, {payload}) => {
            store.loading = false;
            store.error = payload;
        },


        [fetchDeleteContactLoading]: (store) => {
            store.loading = true;
        },
        [fetchDeleteContactSuccess]: (store, {payload}) => {
            store.loading = false;
            const index = store.items.findIndex(item => item.id === payload);
            store.items.splice(index, 1);
        },
        [fetchDeleteContactError]: (store, {payload}) => {
            store.loading = false;
            store.error = payload;
        },
    }
})

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;