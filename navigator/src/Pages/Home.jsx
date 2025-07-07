import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Slide, ToastContainer, Zoom, toast } from 'react-toastify';

const Home = () => {
    const { register, handleSubmit, reset } = useForm()

    async function product(data) {
        await axios.post(`${import.meta.env.VITE_API_URL}/products`, data)
            .then((res) => {
                console.log(res.data)
                toast.success('Your Data Is Inserted!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover:false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition:Slide,
                });
                reset()
            })
            .catch((err) => {
                console.log(err)
            })
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
                    <input type="text"{...register("p_name")} placeholder='enter product name' className='form-control'required />
                </div>
                <div className='mt-4'>
                    <input type="num"{...register("p_price")} placeholder='enter product Price' className='form-control' required/>
                </div>
                <div className='mt-4'>
                    <input type="text"{...register("p_url")} placeholder='enter product URL  ' className='form-control' required/>
                </div>
                <div className='mt-4'>
                    <textarea {...register("p_desc")} className='form-control' placeholder='enter your description' required></textarea>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-success '>Submit</button>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default Home  