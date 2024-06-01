// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList setProducts={setProducts} />} />
        <Route path="/product/:productId" element={<ProductDetails products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;