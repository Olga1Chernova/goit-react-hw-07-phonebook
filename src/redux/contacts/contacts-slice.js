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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllContactsLoading, (store) => {
            store.loading = true;
            })
            .addCase(fetchAllContactsSuccess, (store, {payload}) => {
            store.loading = false;
            store.items = payload;
            })
            .addCase(fetchAllContactsError, (store, {payload}) => {
            store.loading = false;
            store.error = payload;
            })


            .addCase(fetchAddContactLoading, (store) => {
            store.loading = true;
            })
            .addCase(fetchAddContactSuccess, (store, {payload}) => {
            store.loading = false;
            store.items.push(payload);
            })
            .addCase(fetchAddContactError, (store, {payload}) => {
            store.loading = false;
            store.error = payload;
            })

            
            .addCase(fetchDeleteContactLoading, (store) => {
            store.loading = true;
            })
            .addCase(fetchDeleteContactSuccess, (store, {payload}) => {
            store.loading = false;
            const index = store.items.findIndex(item => item.id === payload);
            store.items.splice(index, 1);
            })
            .addCase(fetchDeleteContactError, (store, {payload}) => {
            store.loading = false;
            store.error = payload;
        })
    }
})

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;