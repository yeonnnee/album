import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album } from "../types/albums";


export const albumApi = createApi({
  reducerPath: 'albumApi',
  baseQuery:fetchBaseQuery({baseUrl:'https://jsonplaceholder.typicode.com'}),
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], null>({
      query: () => '/albums'
    })
  })
});


export const {useGetAlbumsQuery} = albumApi;
