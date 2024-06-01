// src/api.js
import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test/companies';
const AUTORIZATION_TOKEN = "" //Here Generated authorization token will be added pls generate form test/auth api to fetch it
export const getTopProducts = async (company, category, top, minPrice, maxPrice) => {
  try {
    const url = '${BASE_URL}/${company}/categories/${category}/products';
    console.log('Requesting URL:', url);
    console.log('Requesting with params:', { top, minPrice, maxPrice });

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AUTORIZATION_TOKEN}`
              },
      params: {
        top,
        minPrice,
        maxPrice,
      },
    });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log detailed error information from the server
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);

      // Check if the error response contains a specific message
      if (error.response.data.message) {
        console.error('API error message:', error.response.data.message);
      }
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('Error request data:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    throw error;
  }
};