
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const AddProduct = React.lazy(() => import('./components/AddProduct'));
const ViewProducts = React.lazy(() => import('./components/ViewProducts'));

function App() {
  return (
    <>
      <Navbar />
      <React.Suspense fallback={<div style={{textAlign:'center',marginTop:'2rem'}}>Loading...</div>}>
        <Routes>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/view" element={<ViewProducts />} />
          <Route path="*" element={<Navigate to="/add" replace />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
