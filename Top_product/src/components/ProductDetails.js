// src/components/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const product = products.find(p => p.productName === productId);

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{product.productName}</Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Typography variant="h6">Rating: {product.rating}</Typography>
          <Typography variant="h6">Discount: {product.discount}%</Typography>
          <Typography variant="h6">Availability: {product.availability}</Typography>
          <Typography variant="h6">Company: {product.company}</Typography>
          <Typography variant="h6">Category: {product.category}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;