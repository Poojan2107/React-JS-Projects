

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/ProductAction';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', category: '', price: '', remarks: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) return;
    await dispatch(addProduct({ ...form, price: parseFloat(form.price) }));
    setForm({ name: '', category: '', price: '', remarks: '' });
    navigate('/view');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #f8fafc 0%, #e0eafc 100%)',
      padding: '0',
      boxSizing: 'border-box',
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: 18,
          boxShadow: '0 4px 24px #0002',
          border: '1px solid #e0eafc',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <h3 className="mb-4 text-center" style={{ color: '#2b5876', fontWeight: 700, marginBottom: 24 }}>Add Product</h3>
        <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Product Name" required style={{ marginBottom: 12 }} />
        <select name="category" value={form.category} onChange={handleChange} className="form-control" required style={{ marginBottom: 12 }}>
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input name="price" value={form.price} onChange={handleChange} className="form-control" placeholder="Price" type="number" min="0" required style={{ marginBottom: 12 }} />
        <textarea name="remarks" value={form.remarks} onChange={handleChange} className="form-control" placeholder="Remarks" rows={2} style={{ marginBottom: 18 }} />
        <button className="btn btn-primary w-100" style={{ background: 'linear-gradient(90deg, #2b5876 0%, #4e4376 100%)', border: 'none', fontWeight: 600 }} type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
