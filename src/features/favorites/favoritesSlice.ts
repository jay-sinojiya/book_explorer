import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Book } from "../../types/book";

interface FavoritesState {
  favorites: Book[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Book>) {
      const exists = state.favorites.find(
        (book) => book.id === action.payload.id
      );

      if (!exists) {
        state.favorites.push(action.payload);
      }
    },

    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
