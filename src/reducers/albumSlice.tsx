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
    addAlbum: (state, action: PayloadAction<Album>) => {
      state = {
        ...state,
        data: [action.payload, ...state.data],
        total: state.data.length,
        currentPage: 1,
        totalPage: Math.ceil(state.total / state.size)
      }

    },
    deleteAlbum: (state, action: PayloadAction<number>) => {
      return state = {
        ...state,
        data: state.data.filter(album => album.id !== action.payload),
        searchResult: state.data.slice((state.currentPage - 1) * 5, state.currentPage * 5),
        total: state.data.length,
        totalPage: Math.ceil(state.total / state.size)
      }
    },
    editAlbum: (state, action: PayloadAction<number, string>) => {
      console.log('eidt', action);

    },

    searchAlbum: (state, action: PayloadAction<{type: 'search' | 'reset', payload: string}>) => {
      if(action.payload.type === 'search') {
        return state = {
          ...state,
          currentPage: 1,
          searchResult: state.data.filter(album => album.title.includes(action.payload.payload)).slice(0, 5),
          total: state.searchResult.length,
          totalPage: Math.ceil(state.total / state.size)
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