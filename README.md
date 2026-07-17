# Book Explorer

A modern React application for searching books with the Google Books API, viewing detailed book information, and managing a personal favorites list. The project demonstrates React fundamentals, global state management, routing, form handling, testing, and responsive UI design.

## Features

- **Multi-field Search:** Search for books by Title, Author, and Genre simultaneously.
- **Modern Book Cards:** Responsive cards with cover artwork, truncated descriptions, favorite toggles, and details links.
- **Favorites Management:** Add and remove books from a personalized favorites list using an intuitive heart icon toggle.
- **Global Notifications:** Uses `react-hot-toast` for centralized error messaging when API requests fail or validation is needed.
- **Book Details:** Lazy-loaded detailed views for individual books (`/book/:id`).
- **Responsive & Accessible:** Built with semantic HTML, ARIA labels, and responsive layouts for different screen sizes.
- **Home Navigation:** The Book Explorer brand link returns users to the search page.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Styling:** Vanilla CSS with global design tokens
- **Testing:** Jest & React Testing Library

## Architecture & Technical Choices

### State Management
**Redux Toolkit** was chosen for global state management. It provides a structured, predictable way to manage the `books` search results (including loading and error states) and the `favorites` list. Redux Toolkit's built-in immutability (via Immer) and clear separation of concerns make it scalable for future enhancements.

### Routing & Lazy Loading
**React Router** handles client-side routing. To optimize the initial bundle size and improve load times, the `BookDetailsPage` is dynamically imported using **`React.lazy`** and wrapped in a `<Suspense>` boundary. 

### Automated Testing
The application is fully covered by an automated testing suite utilizing **Jest** and **React Testing Library**. Tests cover critical functionality, including:
- API fetching logic and error handling.
- Redux slice reducers and actions.
- Component rendering and user interactions.

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

4. **Run tests:**
   ```bash
   npm run test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```