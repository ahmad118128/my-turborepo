/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import ProductsService, { type Products } from '../services/apis/products.service';

const productsService = new ProductsService();

const ProductsApiTest: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsService.getAll();
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>products from API</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map((product) => {
            console.log({ product });

            return (
              <li key={product.id}>
                {product.title} price:{product.price}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsApiTest;
