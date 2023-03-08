import axios from "axios";

const contactsInstance = axios.create({
    baseURL: "https://6407c4148ee73db92e315c13.mockapi.io/contacts"
})

export const getAllContacts = async () => {
    const { data } = await contactsInstance.get("/");
    return data;
}

export const addContact = async (data) => {
    const { data: result } = await contactsInstance.post("/", data);
    return result;
}

export const deleteContact = async (id) => {
    const { data } = await contactsInstance.delete(`/${id}`);
    return data;
}
