import { searchBooks } from './googleBooksApi';

globalThis.fetch = jest.fn() as jest.Mock;

describe('googleBooksApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array when query is empty', async () => {
    const result = await searchBooks('');
    expect(result).toEqual({ items: [], totalItems: 0 });
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('constructs a multi-field query correctly', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ items: [{ id: '1', volumeInfo: { title: 'Test' } }], totalItems: 1 }),
    });

    await searchBooks({ title: 'React', author: 'Smith', genre: 'Programming' });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=intitle%3AReact%2Binauthor%3ASmith%2Bsubject%3AProgramming')
    );
  });

  it('throws an error when the API response is not ok', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: { message: 'Not found' } }),
    });

    await expect(searchBooks('invalid_query')).rejects.toThrow('Not found');
  });
});
