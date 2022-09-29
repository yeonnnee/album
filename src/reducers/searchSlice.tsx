import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface SearchState {
  searchString: string
};

const initialState: SearchState = {
  searchString: ''
};


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      return state = {
        ...state,
        searchString: action.payload
      }
    },
    resetSearchCondition: (state) => {
      return state = {
        ...state,
        searchString: ''
      }
    }
  }
});


export const { setSearchString, resetSearchCondition } = searchSlice.actions;
export default searchSlice.reducer;