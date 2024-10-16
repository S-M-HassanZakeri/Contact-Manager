import axios from "axios";
import { Contact } from "../components";

const BASE_URL = "http://localhost:9000/";


export const GET_AllGroups = () => {
    const url = BASE_URL + "Groups";
    return axios.get(url);
}
export const GET_Group = (groupsId) => {
    const url = BASE_URL + `Groups/${groupsId}`;
    return axios.get(url);
}
export const GET_AllContact = () => {
    const url = BASE_URL + "Contacts";
    return axios.get(url);
}
export const GET_Contact = (contactId) => {
    const url = BASE_URL + `Contacts/${contactId}`;
    return axios.get(url);
}
export const CREATE_Contact = (contact) => {
    const url = BASE_URL + `Contacts/`
    return axios.post(url, contact)
}
export const UPDATE_Contact = (contact, contactId) => {
    const url = BASE_URL + `Contacts/${contactId}`;
    return axios.put(url, contact)
}
export const DELETE_Contact = (contactId) => {
    const url = BASE_URL + `Contacts/${contactId}`;
    return axios.delete(url);
}

