import React, { useState } from 'react';
import styles from './Marketplace.module.css'; // Import CSS Module

const Marketplace = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Rice', price: 50, quantity: 100, discount: 0 },
    { id: 2, name: 'Fresh Wheat', price: 30, quantity: 200, discount: 5 },
  ]);

  const [newProduct, setNewProduct] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Add new product
  const addProduct = () => {
    if (newProduct && newPrice && newQuantity) {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name: newProduct,
          price: parseFloat(newPrice),
          quantity: parseInt(newQuantity),
          discount: parseFloat(newDiscount) || 0,
        },
      ]);
      setNewProduct('');
      setNewPrice('');
      setNewQuantity('');
      setNewDiscount('');
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.marketplacePage}>
      <div className={styles.content}>
        <h1>Marketplace & Farm-to-Market Access</h1>
        <p>Sell directly through an integrated marketplace and get real-time market insights.</p>

        {/* Real-Time Market Insights */}
        <div className={styles.marketInsights}>
          <h3>Real-Time Market Insights</h3>
          <p>Demand for Organic Rice is high. Prices are stable.</p>
          <p>Wheat prices have increased by 5% this week.</p>
        </div>

        {/* Product List */}
        <div className={styles.productList}>
          <h3>Your Products</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                {product.name}: ₹{product.price} per kg (Quantity: {product.quantity} kg)
                {product.discount > 0 && (
                  <span className={styles.discount}> - {product.discount}% discount</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Product */}
        <div className={styles.addProductSection}>
          <h3>Add New Product</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity (kg)"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={newDiscount}
            onChange={(e) => setNewDiscount(e.target.value)}
          />
          <button onClick={addProduct}>Add Product</button>
        </div>

        {/* Farm-to-Market Access */}
        <div className={styles.farmToMarket}>
          <h3>Farm-to-Market Access</h3>
          <p>Connect directly with buyers and sell your produce at competitive prices.</p>
          <ul>
            <li>List your products for free.</li>
            <li>Get real-time updates on market demand.</li>
            <li>Offer bulk discounts to attract buyers.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;