import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Layout from "../components/Layout/Layout";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import SearchPage from "../pages/SearchPage/SearchPage";

const BookDetailsPage = React.lazy(() => import("../pages/BookDetailsPage/BookDetailsPage"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)',
              color: '#f8fafc',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0f172a',
              }
            }
          }}
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;