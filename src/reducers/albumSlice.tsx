import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../types/albums";

export interface AlbumState {
  data: Album[],
  searchResult: Album[],
  total: number,
  currentPage: number,
  totalPage: number,
  size: number,
};

const initialState: AlbumState = {
  data: [],
  searchResult: [],
  total: 0,
  currentPage: 1,
  totalPage: 1,
  size: 5,
};

const albumSlice = createSlice({
  name:'album',
  initialState,
  reducers: {
    getAblums: (state, action: PayloadAction<Album[]>) => {
      return state = {
        ...state,
        searchResult: action.payload.slice(0, 5),
        data: action.payload,
        total: action.payload.length,
        currentPage: 1,
        totalPage: Math.ceil(action.payload.length / state.size)
      }
    },
    addAlbum: (state, action: PayloadAction<string>) => {
      const newAlbum = {
        id: state.total + 1,
        userId: 1,
        title: action.payload
      };
      const updatedData = [newAlbum, ...state.data];
      return state = {
        ...state,
        data: updatedData,
        searchResult: updatedData.slice(0, 5),
        total: updatedData.length,
        currentPage: 1,
        totalPage: Math.ceil(updatedData.length / state.size)
      }
    },
    deleteAlbum: (state, action: PayloadAction<number>) => {
      const updatedData = state.data.filter(album => album.id !== action.payload);
      const updatedPageData = updatedData.slice((state.currentPage - 1) * 5, (state.currentPage) * 5);
      const searchResult = updatedPageData.length === 0 ? updatedData.slice((state.currentPage - 2) * 5, state.currentPage * 5): updatedPageData;
  
      return state = {
        ...state,
        data: updatedData,
        searchResult: searchResult,
        total: updatedData.length,
        currentPage: updatedPageData.length === 0 ? state.currentPage - 1 : state.currentPage,
        totalPage: Math.ceil( updatedData.length / state.size)
      }
    },
    editAlbum: (state, action: PayloadAction<{id: number, title: string}>) => {
      const updatedData = state.data.map(d => {
        if(d.id === action.payload.id) {
          return {
            ...d,
            title: action.payload.title
          }
        }
        return d;
      });

      return state = {
        ...state,
        data: updatedData,
        searchResult: updatedData.slice((state.currentPage - 1) * 5, state.currentPage * 5)
      }
    },

    searchAlbum: (state, action: PayloadAction<{type: 'search' | 'reset', payload: string}>) => {
      if(action.payload.type === 'search') {
        const result = state.data.filter(album => album.title.includes(action.payload.payload)).slice(0, 5);
        return state = {
          ...state,
          currentPage: 1,
          searchResult: result,
          total: result.length,
          totalPage: Math.ceil(result.length/ state.size)
        }
      } else {
        return state = {
          ...state,
          currentPage: 1,
          searchResult: state.data.slice(0, 5),
          total: state.data.length,
          totalPage: Math.ceil(state.data.length / state.size)
        }
      }
  
    },

    getAlbumsByPage: (state, action: PayloadAction<number>) => {
      return state = {
        ...state,
        currentPage: action.payload,
        searchResult: state.data.slice((action.payload - 1) * 5, action.payload * 5)
      }
    }
  }
});


export const { getAblums, addAlbum, deleteAlbum, editAlbum, getAlbumsByPage, searchAlbum} = albumSlice.actions;
export default albumSlice.reducer;