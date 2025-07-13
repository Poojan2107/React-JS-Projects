import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FcFullTrash } from "react-icons/fc";
import { FaSearch, FaSort, FaFilter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const About = () => {
    const [products, setProduct] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')


    async function showApi() {
        await axios.get(`${import.meta.env.VITE_API_URL}/products`)
            .then((res) => {
                setProduct(res.data)
                setFilteredProducts(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        showApi()
    }, [])

    // Get unique categories for filter dropdown
    const categories = [...new Set(products.map(product => product.category))]

    // Apply filters and search
    useEffect(() => {
        let filtered = [...products]

        // Search functionality
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.p_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.p_desc.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Category filter
        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter)
        }



        // Sorting
        if (sortBy) {
            filtered.sort((a, b) => {
                switch (sortBy) {
                    case 'name-asc':
                        return a.p_name.localeCompare(b.p_name)
                    case 'name-desc':
                        return b.p_name.localeCompare(a.p_name)
                    case 'price-asc':
                        return parseFloat(a.p_price) - parseFloat(b.p_price)
                    case 'price-desc':
                        return parseFloat(b.p_price) - parseFloat(a.p_price)
                    case 'category-asc':
                        return a.category.localeCompare(b.category)
                    case 'category-desc':
                        return b.category.localeCompare(a.category)
                    default:
                        return 0
                }
            })
        }

        setFilteredProducts(filtered)
    }, [products, searchTerm, sortBy, categoryFilter])

    async function trash(id) {
        try {
            if (confirm("Do you want to delete this data?")) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
                showApi()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clearFilters = () => {
        setSearchTerm('')
        setSortBy('')
        setCategoryFilter('')
    }

    return (
        <div className="container my-5">
            {/* Search and Filter Section */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-black text-white">
                    <h5 className="mb-0">
                        <FaSearch className="me-2" />
                        Search & Filter Products
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        {/* Search */}
                        <div className="col-md-4">
                            <label className="form-label">Search Products</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaSearch />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name, category, or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="col-md-3">
                            <label className="form-label">Category Filter</label>
                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>



                        {/* Sort */}
                        <div className="col-md-2">
                            <label className="form-label">Sort By</label>
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="">Default</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">Price (Low-High)</option>
                                <option value="price-desc">Price (High-Low)</option>
                                <option value="category-asc">Category (A-Z)</option>
                                <option value="category-desc">Category (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={clearFilters}
                            >
                                <FaFilter className="me-2" />
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <small className="text-muted">
                                Showing {filteredProducts.length} of {products.length} products
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <h5 className="mb-0">Products List</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className='table table-striped table-hover mb-0'>
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(({ category, p_name, p_price, p_desc, createdAt, id, p_url }, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span className="badge bg-primary">{category}</span>
                                                </td>
                                                <td className="fw-bold">{p_name}</td>
                                                <td className="text-success fw-bold">₹{p_price}</td>
                                                <td>
                                                    <div className="text-truncate" style={{ maxWidth: '200px' }} title={p_desc}>
                                                        {p_desc}
                                                    </div>
                                                </td>
                                                <td>{new Date(createdAt * 1000).toLocaleDateString()}</td>
                                                <td>
                                                    <img 
                                                        src={p_url} 
                                                        alt={p_name} 
                                                        className="img-thumbnail"
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button 
                                                            onClick={() => trash(id)} 
                                                            className='btn btn-sm btn-outline-danger'
                                                            title="Delete"
                                                        >
                                                            <FcFullTrash />
                                                        </button>
                                                        <NavLink 
                                                            to={`/SingleProduct/${id}`} 
                                                            className="btn btn-sm btn-outline-info"
                                                            title="View Details"
                                                        >
                                                            <FaEye />
                                                        </NavLink>
                                                        <NavLink 
                                                            to={`/update/${id}`} 
                                                            className="btn btn-sm btn-outline-warning"
                                                            title="Edit"
                                                        >
                                                            <FaPencil />
                                                        </NavLink>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            <div className="text-muted">
                                                <FaSearch className="mb-2" style={{ fontSize: '2rem' }} />
                                                <p>No products found matching your criteria</p>
                                                <button 
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={clearFilters}
                                                >
                                                    Clear Filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About