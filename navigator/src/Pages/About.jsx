import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FcFullTrash } from "react-icons/fc";
import { NavLink } from 'react-router-dom';

const About = () => {
    const [products, setProduct] = useState([])
    async function showApi() {
        await axios.get(`${import.meta.env.VITE_API_URL}/products`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        showApi()
    }, [])

    async function trash(id) {
        try {
            if (confirm("do you want to  this data")) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
                showApi()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <table className='table table-striped table-hover table-secondary  container my-5'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Desc</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(({ category, p_name, p_price, p_desc, createdAt, id, p_url }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{category}</td>
                                    <td>{p_name}</td>
                                    <td>{p_price}</td>
                                    <td>{p_desc}</td>
                                    <td>{new Date(createdAt * 1000).toDateString()}</td>
                                    <td>
                                        <img src={p_url} alt="" width={100} />
                                    </td>
                                    <td>
                                        <button onClick={() => trash(id)} className='btn btn-outline-danger'><FcFullTrash /></button>
                                        <NavLink to={`/SingleProduct/${id}`} className="btn btn-outline-dark mx-2">
                                            <FaEye />
                                        </NavLink>
                                        <NavLink to={`/update/${id}`} className="btn btn-outline-warning ">
                                            <FaPencil />
                                        </NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default About