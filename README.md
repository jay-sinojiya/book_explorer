# Book Explorer

A modern React application built to search for books using the Google Books API, view detailed book information, and manage a personal list of favorite books. This project demonstrates proficiency in React fundamentals, global state management, routing, form handling, testing, and premium UI/UX design.

## Features

- **Multi-field Search:** Search for books by Title, Author, and Genre simultaneously.
- **Premium Aesthetics:** Features a modern "glassmorphism" design system, responsive grid layouts, dynamic hover animations, and custom typography (Inter & Outfit).
- **Favorites Management:** Add and remove books from a personalized favorites list using an intuitive heart icon toggle.
- **API Fallback System:** Includes a robust local fallback mechanism containing 500 dummy books that automatically populates the UI if the Google Books API quota is exhausted.
- **Global Notifications:** Utilizes `react-hot-toast` for elegant, centralized error and success messaging.
- **Book Details:** Lazy-loaded detailed views for individual books (`/book/:id`).
- **Responsive & Accessible:** Built with semantic HTML and ARIA labels to ensure accessibility across all devices.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Styling:** Vanilla CSS (CSS Modules & Global tokens)
- **Testing:** Jest & React Testing Library

## Architecture & Technical Choices

### State Management
**Redux Toolkit** was chosen for global state management. It provides a structured, predictable way to manage the `books` search results (including loading and error states) and the `favorites` list. Redux Toolkit's built-in immutability (via Immer) and clear separation of concerns make it scalable for future enhancements.

### Routing & Lazy Loading
**React Router** handles client-side routing. To optimize the initial bundle size and improve load times, the `BookDetailsPage` is dynamically imported using **`React.lazy`** and wrapped in a `<Suspense>` boundary. 

### Automated Testing
The application is fully covered by an automated testing suite utilizing **Jest** and **React Testing Library**. Tests cover critical functionality, including:
- API fetching logic and dummy data fallback mechanics.
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