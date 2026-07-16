# Book Explorer

A modern React application built to search for books using the Google Books API, view detailed book information, and manage a personal list of favorite books. This project demonstrates proficiency in React fundamentals, global state management, routing, form handling, and performance optimization.

## Features

- **Multi-field Search:** Search for books by Title, Author, and Genre simultaneously.
- **Form Validation:** Ensures at least one search criterion is provided before querying the API.
- **Book Details:** Lazy-loaded detailed views for individual books (`/book/:id`).
- **Favorites Management:** Add and remove books from a personalized favorites list.
- **Responsive & Accessible:** Built with semantic HTML and ARIA labels to ensure accessibility across devices.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Styling:** Vanilla CSS (CSS Modules/Global)

## Architecture & Technical Choices

### State Management
**Redux Toolkit** was chosen for global state management. It provides a structured, predictable way to manage the `books` search results (including loading and error states) and the `favorites` list. Redux Toolkit's built-in immutability (via Immer) and clear separation of concerns make it scalable for future enhancements.

### Routing & Lazy Loading
**React Router** handles client-side routing. To optimize the initial bundle size and improve load times, the `BookDetailsPage` is dynamically imported using **`React.lazy`** and wrapped in a `<Suspense>` boundary. This ensures that the code for the details page is only fetched when a user actually navigates to it.

### Performance Optimization
To prevent unnecessary re-renders of the large lists of books, the `BookCard` component is wrapped in **`React.memo`**. This guarantees that a book card only re-renders if its specific props change, drastically improving performance when modifying the favorites list.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd book_explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser to the local URL provided in the terminal (usually `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```

## Next Steps
- Implement comprehensive automated tests using Vitest (Jest-compatible) and React Testing Library.
- Add pagination for search results.
- Enhance the UI with tailored CSS animations.
