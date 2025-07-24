
const ViewProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', category: '', price: '', remarks: '' });

  useEffect(() => {
    dispatch(getAllProducts());
    // Listen for storage changes (in case of add from another tab)
    const interval = setInterval(() => dispatch(getAllProducts()), 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      remarks: product.remarks || '',
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(editProduct.id, { ...editForm, price: parseFloat(editForm.price) }));
    setEditProduct(null);
  };

  const handleEditCancel = () => {
    setEditProduct(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #f8fafc 0%, #e0eafc 100%)',
      padding: 0,
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1200,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}>
        {products.length === 0 ? (
          <div style={{ fontSize: 20, color: '#888' }}>No products found.</div>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ background: 'linear-gradient(120deg, #e0eafc 0%, #f8fafc 100%)', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: 28, minWidth: 260, maxWidth: 320, flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #e0eafc' }}>
              <h5 style={{ marginBottom: 8, color: '#2b5876', fontWeight: 700 }}>{product.name}</h5>
              <div style={{ color: '#4e4376', marginBottom: 8, fontWeight: 500 }}>Category: {product.category}</div>
              <div style={{ color: '#2b5876', marginBottom: 8, fontWeight: 500 }}>Price: ₹{product.price}</div>
              <div style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>{product.remarks}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleEditSubmit} style={{ background: '#fff', padding: 32, borderRadius: 16, minWidth: 320, boxShadow: '0 4px 24px #0002', border: '1px solid #e0eafc' }}>
            <h4 className="mb-3 text-center" style={{ color: '#2b5876', fontWeight: 700 }}>Edit Product</h4>
            <div className="mb-3">
              <input name="name" value={editForm.name} onChange={handleEditChange} className="form-control" placeholder="Product Name" required />
            </div>
            <div className="mb-3">
              <select name="category" value={editForm.category} onChange={handleEditChange} className="form-control" required>
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="mb-3">
              <input name="price" value={editForm.price} onChange={handleEditChange} className="form-control" placeholder="Price" type="number" min="0" required />
            </div>
            <div className="mb-3">
              <textarea name="remarks" value={editForm.remarks} onChange={handleEditChange} className="form-control" placeholder="Remarks" rows={2} />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #2b5876 0%, #4e4376 100%)', border: 'none', fontWeight: 600 }} type="submit">Update</button>
              <button className="btn btn-secondary" type="button" onClick={handleEditCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct, updateProduct } from '../redux/ProductAction';
