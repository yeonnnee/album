import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../types/albums";

export interface AlbumState {
  data: Album[],
  total: number,
  currentPage: number,
  totalPage: number,
  size: number,
};

const initialState: AlbumState = {
  data: [],
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
        data: action.payload.slice(0, 5),
        total: action.payload.length,
        currentPage: 1,
        totalPage: Math.ceil(state.total / state.size)
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
      state = {
        ...state,
        data: state.data.filter(album => album.id !== action.payload),
        totalPage: Math.ceil(state.total / state.size)
      }
    },
    editAlbum: (state, action: PayloadAction<number, string>) => {
      console.log('eidt', action);

    },

    getAlbumsByPage: (state, action: PayloadAction<number>) => {

    }
  }
});


export const { getAblums, addAlbum, deleteAlbum, editAlbum} = albumSlice.actions;
export default albumSlice.reducer;