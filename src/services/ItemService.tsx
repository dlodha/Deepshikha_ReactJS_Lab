import axios from "axios";
import React from "react";
import IDataList from "../models/IDataList";

export const getDataFromServer= () =>
{
    return axios.get<IDataList[]>('http://localhost:4001/items').then(response=>response.data);
}
export const pushDataFromUser = (newPurchase : Omit<IDataList,"id">) => {
    //http://localhost:4001/items
    // headers: {
    //     'Content-Type': 'application/json'
    // }
    return axios.post<IDataList>(`http://localhost:4001/items`,newPurchase,{headers: {'Content-Type': 'application/json' }} )
    .then( response => response.data )
}