import { useState } from 'react';
import { Product } from '../types';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts); // 초기화

  // 제품을 업데이트할 수 있다.
  const updateProduct = (updateProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updateProduct.id ? updateProduct : p))
    );
  };

  // 새로운 제품을 추가할 수 있다.
  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
