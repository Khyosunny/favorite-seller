import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductListBySellerPage from '../pages/ProductListBySellerPage';

export default function Router() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seller/:seller" element={<ProductListBySellerPage />} />
        <Route path="/product/:name" element={<ProductDetailPage />} />
      </Routes>
    </Suspense>
  );
}
