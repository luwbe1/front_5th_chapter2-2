import { useState } from 'react';
import { Discount, Product } from '../../types';
import { SectionTitle } from '../layout/SectionTitle.tsx';
import { CardBox } from '../layout/CardBox.tsx';
import { Input } from '../shared/Input.tsx';
import { ProductForm } from './ProductForm.tsx';

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManager = ({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find(p => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find(p => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find(p => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  return (
    <div>
      <SectionTitle sectionTitle={'상품 관리'} />
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <ProductForm
          product={newProduct}
          setProduct={setNewProduct}
          onSubmit={handleAddNewProduct}
        ></ProductForm>
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <CardBox key={product.id} data-testid={`product-${index + 1}`}>
            <button
              data-testid="toggle-button"
              onClick={() => toggleProductAccordion(product.id)}
              className="w-full text-left font-semibold"
            >
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {openProductIds.has(product.id) && (
              <div className="mt-2">
                {editingProduct && editingProduct.id === product.id ? (
                  <div>
                    <div className="mb-4">
                      <Input
                        label="상품명: "
                        id="productName"
                        type="text"
                        value={editingProduct.name}
                        onChange={e =>
                          handleProductNameUpdate(product.id, e.target.value)
                        }
                        labelClassName="block mb-1"
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        label="가격: "
                        id="productPrice"
                        type="number"
                        value={editingProduct.price}
                        onChange={e =>
                          handlePriceUpdate(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                        labelClassName="block mb-1"
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        label="재고: "
                        id="productStock"
                        type="number"
                        value={editingProduct.stock}
                        onChange={e =>
                          handleStockUpdate(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                        labelClassName="block mb-1"
                      />
                    </div>
                    {/* 할인 정보 수정 부분 */}
                    <div>
                      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                      {editingProduct.discounts.map((discount, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2"
                        >
                          <span>
                            {discount.quantity}개 이상 구매 시{' '}
                            {discount.rate * 100}% 할인
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveDiscount(product.id, index)
                            }
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <div className="flex space-x-2">
                        <Input
                          id="discountQuantity"
                          type="number"
                          placeholder="수량"
                          value={newDiscount.quantity}
                          onChange={e =>
                            setNewDiscount({
                              ...newDiscount,
                              quantity: parseInt(e.target.value),
                            })
                          }
                          inputClassName="w-1/3 p-2 border rounded"
                        />
                        <Input
                          id="discountRate"
                          type="number"
                          placeholder="할인율 (%)"
                          value={newDiscount.rate * 100}
                          onChange={e =>
                            setNewDiscount({
                              ...newDiscount,
                              rate: parseInt(e.target.value) / 100,
                            })
                          }
                          inputClassName="w-1/3 p-2 border rounded"
                        />
                        <button
                          onClick={() => handleAddDiscount(product.id)}
                          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                          할인 추가
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleEditComplete}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                    >
                      수정 완료
                    </button>
                  </div>
                ) : (
                  <div>
                    {product.discounts.map((discount, index) => (
                      <div key={index} className="mb-2">
                        <span>
                          {discount.quantity}개 이상 구매 시{' '}
                          {discount.rate * 100}% 할인
                        </span>
                      </div>
                    ))}
                    <button
                      data-testid="modify-button"
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                    >
                      수정
                    </button>
                  </div>
                )}
              </div>
            )}
          </CardBox>
        ))}
      </div>
    </div>
  );
};
