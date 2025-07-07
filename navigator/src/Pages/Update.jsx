/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

const Update = () => {
    const { register, handleSubmit, reset } = useForm()
    const { id } = useParams()
    const redirect = useNavigate()
    async function showApi() {
        await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then((res) => {
                reset(res.data)
            })
    }
    useEffect(() => {
        showApi()
    }, [])
    async function product(data) {
        await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, data)
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "You Data Has Been Up dated!",
                    icon: "success"
                });
                redirect('/view')
            })
            .catch((err)  => console.log(err))
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit(product)} className='col-lg-6 mx-auto my-5 p-5 shadow bg-secondary'>
                <div className='mt-4'>
                    <select className='form-select' {...register("category")} required>
                        <option value="" disabled selected>--Select category--</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Cloth">Cloth</option>
                        <option value="Toys">Toys</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='mt-4'>
                    <input type="text"{...register("p_name")} placeholder='enter product name' className='form-control' required />
                </div>
                <div className='mt-4'>
                    <input type="num"{...register("p_price")} placeholder='enter product Price' className='form-control' required />
                </div>
                <div className='mt-4'>
                    <input type="text"{...register("p_url")} placeholder='enter product URL  ' className='form-control' required />
                </div>
                <div className='mt-4'>
                    <textarea {...register("p_desc")} className='form-control' placeholder='enter your description' required></textarea>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-warning'>Update</button>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default Update