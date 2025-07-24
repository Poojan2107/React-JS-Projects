import React, { useState, useEffect } from 'react';
import './ViewProduct.css';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  if (!products.length) {
    return <div className="view-card"><h2>View Product</h2><p>No products found.</p></div>;
  }

  return (
    <div className="view-card">
      <h2>View Product</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProduct;
