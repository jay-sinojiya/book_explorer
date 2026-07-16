import reducer, { addFavorite, removeFavorite } from './favoritesSlice';
import { Book } from '../../types/book';

describe('favoritesSlice', () => {
  const initialState = { books: [] };
  const mockBook: Book = {
    id: '1',
    title: 'Test Book',
    authors: ['Test Author'],
    thumbnail: 'http://test.com/image.jpg',
    description: 'Test description',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addFavorite', () => {
    const actual = reducer(initialState, addFavorite(mockBook));
    expect(actual.books.length).toEqual(1);
    expect(actual.books[0]).toEqual(mockBook);
  });

  it('should not add duplicate favorites', () => {
    const stateWithOneBook = { books: [mockBook] };
    const actual = reducer(stateWithOneBook, addFavorite(mockBook));
    expect(actual.books.length).toEqual(1);
  });

  it('should handle removeFavorite', () => {
    const stateWithOneBook = { books: [mockBook] };
    const actual = reducer(stateWithOneBook, removeFavorite('1'));
    expect(actual.books.length).toEqual(0);
  });
});
