import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Book } from "../../types/book";

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },

    clearBooks(state) {
      state.books = [];
    },
  },
});

export const { setBooks, clearBooks } = booksSlice.actions;

export default booksSlice.reducer;
