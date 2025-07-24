import axios from 'axios';

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const getAllProducts = () => {
  return (dispatch) => {
    axios.get('http://localhost:3000/products').then((res) => {
      dispatch(setProducts(res.data));
    });
  };
};

export const addProduct = (newProduct) => {
  return (dispatch) => {
    axios.post('http://localhost:3000/products', newProduct).then(() => {
      dispatch(getAllProducts());
    });
  };
};

export const updateProduct = (id, updatedProduct) => {
  return (dispatch) => {
    axios.put(`http://localhost:3000/products/${id}`, updatedProduct).then(() => {
      dispatch(getAllProducts());
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/products/${id}`).then(() => {
      dispatch(getAllProducts());
    });
  };
};
