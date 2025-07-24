import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, addUser, updateUser, deleteUser } from '../redux/Action';

const Crud = () => {
  const [username, setUsername] = useState('');
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateUser(editId, { username }));
      setEditId(null);
    } else {
      dispatch(addUser({ username }));
    }
    setUsername('');
  };

  const handleEdit = (user) => {
    setUsername(user.username);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User CRUD with Redux</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.username}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
