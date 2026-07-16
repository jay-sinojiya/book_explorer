import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Book } from "../../types/book";

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    clearBooks(state) {
      state.books = [];
    },
  },
});

export const {
  setLoading,
  setBooks,
  setError,
  clearBooks,
} = booksSlice.actions;

export default booksSlice.reducer;
