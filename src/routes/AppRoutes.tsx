import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import SearchPage from "../pages/SearchPage/SearchPage";

const BookDetailsPage = React.lazy(() => import("../pages/BookDetailsPage/BookDetailsPage"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
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