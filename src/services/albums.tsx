import axios, { AxiosPromise } from "axios";
import { Album } from "../types/albums";

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});



export const getAlbums: () => AxiosPromise<Album[]> = async() => {
  const res = await api.get('/albums');

  return res;
};

