import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    const prev = JSON.parse(localStorage.getItem('products') || '[]');
    const updated = [...prev, form];
    localStorage.setItem('products', JSON.stringify(updated));
    alert('Product Added!');
    setForm({ name: '', category: '', price: '', remarks: '' });
  };

  return (
    <div className="form-card">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
