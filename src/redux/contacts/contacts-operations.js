import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../shared/services/contacts-api";

export const fetchAllContacts = createAsyncThunk(
    "contacts/fetch-all",
    async (_, thunkAPI) => {
        try {
            const data = await api.getAllContacts();
            return data;
        }
        catch ({ response }) {
            return thunkAPI.rejectWithValue(response.data);
        }
    }
);

export const fetchAddContact = createAsyncThunk(
    "contacts/add",
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.addContact(data);
            return result;
        }
        catch ({ response }) {
            return rejectWithValue(response.data);
        }
    },
    {
        condition: ({name}, { getState }) => {
            const { contacts } = getState();
            const normalizedName = name.toLowerCase();
            const result = contacts.items.find(({ name }) => {
                return (name.toLowerCase() === normalizedName)
            })
            if(result){
                alert(`${name} is already in your contacts`);
                return false;
            }
        }
    }
);

export const fetchDeleteContact = createAsyncThunk(
    "contacts/delete",
    async ( id, { rejectWithValue }) => {
        try {
            await api.deleteContact(id);
            return id;
        }
        catch ({ response }) {
            return rejectWithValue(response.data);
        }
    }
)
/*
export const fetchAllContacts = () => {
    const fn = async (dispatch) => {
        try {
            dispatch(fetchAllContactsLoading()); // request in process
            const data = await api.getAllContacts();
            dispatch(fetchAllContactsSuccess(data)); // successful (returned data)
        }
        catch ({response}) {
            dispatch(fetchAllContactsError(response.data.message)); 
        }
    }
    return fn;
}
*/
/*
export const fetchAddContact = (data) => {
    const fn = async (dispatch) => {
        try {
            dispatch(fetchAddContactLoading());
            const result = await api.addContact(data);
            dispatch(fetchAddContactSuccess(result));
        }
        catch ({response}) {
            dispatch(fetchAddContactError(response.data.message)); 
        }
    }
    return fn;
}
*/
/*
export const fetchDeleteContact = (id) => {
    const fn= async(dispatch) => {
        try {
            dispatch(fetchDeleteContactLoading());
            await api.deleteContact(id);
            dispatch(fetchDeleteContactSuccess(id));
        }
        catch ({response}) {
            dispatch(fetchDeleteContactError(response.data.message)); 
        }
    }
    return fn;
}
*/