// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { getTopProducts } from '../api';
import ProductCard from './ProductCard';
import { Container, Grid, Typography, TextField, MenuItem, Button } from '@mui/material';

const companies = ['AMZ', 'FLP', 'SNP', 'HYN', 'AZO'];
const categories = ['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState(companies[0]);
  const [category, setCategory] = useState(categories[0]);
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const fetchData = async () => {
    try {
      console.log('Fetching products with parameters:', {
        company,
        category,
        top,
        minPrice,
        maxPrice,
      });

      const result = await getTopProducts(company, category, top, minPrice, maxPrice);
      setProducts(result);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [company, category, top, minPrice, maxPrice]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top Products
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
          >
            {companies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Top N"
            type="number"
            value={top}
            onChange={(e) => setTop(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={fetchData}>
            Fetch Products
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.productName}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;