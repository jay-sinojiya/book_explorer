import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchForm from './SearchForm';
import booksReducer from '../../features/books/booksSlice';
import favoritesReducer from '../../features/favorites/favoritesSlice';
import * as api from '../../api/googleBooksApi';

jest.mock('../../api/googleBooksApi');

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
      favorites: favoritesReducer,
    },
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe('SearchForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all three input fields', () => {
    renderWithProviders(<SearchForm />);
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Genre')).toBeInTheDocument();
  });

  it('shows an error when submitting with empty fields', () => {
    const { store } = renderWithProviders(<SearchForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    const state = store.getState();
    expect(state.books.error).toBe('Please fill in at least one search field.');
    expect(api.searchBooks).not.toHaveBeenCalled();
  });

  it('submits correctly when a field is filled', async () => {
    (api.searchBooks as jest.Mock).mockResolvedValue({ items: [], totalItems: 0 });
    
    renderWithProviders(<SearchForm />);
    
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'React' } });
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(api.searchBooks).toHaveBeenCalledWith({ title: 'React', author: '', genre: '' });
  });
});
