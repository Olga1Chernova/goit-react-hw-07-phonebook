import * as api from "../../shared/services/contacts-api";

import {
    fetchAllContactsError, fetchAllContactsLoading, fetchAllContactsSuccess,
    fetchAddContactError, fetchAddContactSuccess, fetchAddContactLoading,
    fetchDeleteContactLoading, fetchDeleteContactSuccess, fetchDeleteContactError} from './contacts-actions';

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

const isDuplicate = (contacts, {name, number}) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const duplicate = contacts.items.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(duplicate);
}

export const fetchAddContact = (data) => {
    const fn = async (dispatch, getState) => {
        try {
            const { contacts } = getState();
            if (isDuplicate(contacts.items, data)) {
                alert(`${data.name} (${data.number}) is already in your contacts!`);
                return false;
            }
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