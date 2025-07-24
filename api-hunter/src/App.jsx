import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductForm from './ProductForm';
import ViewProduct from './ViewProduct';
import './App.css';

function App() {
  const [page, setPage] = useState('add');

  return (
    <div className="app-bg">
      <Navbar page={page} setPage={setPage} />
      {page === 'add' ? <ProductForm /> : <ViewProduct />}
    </div>
  );
}

export default App;
