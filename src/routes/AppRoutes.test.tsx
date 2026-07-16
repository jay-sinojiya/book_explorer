import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppRoutes from './AppRoutes';
import booksReducer from '../features/books/booksSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

jest.mock('../api/googleBooksApi', () => ({
  searchBooks: jest.fn().mockResolvedValue({ items: [], totalItems: 0 })
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
      favorites: favoritesReducer,
    },
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('AppRoutes', () => {
  it('renders the navigation layout', async () => {
    await act(async () => {
      renderWithProviders(<AppRoutes />);
    });
    
    expect(screen.getByText(/Book Explorer/i)).toBeInTheDocument();
  });

  it('navigates between Search and Favorites pages', async () => {
    await act(async () => {
      renderWithProviders(<AppRoutes />);
    });

    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: /Favorites/i });
    
    await act(async () => {
      fireEvent.click(favoritesLink);
    });

    expect(screen.getByText(/No favorite books found/i)).toBeInTheDocument();
  });
});
