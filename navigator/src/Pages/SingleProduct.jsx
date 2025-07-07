/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const [product, setProduct] = useState([])
    const { id } = useParams()
    console.log(id)

    async function showApi() {
        await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then((res) => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        showApi()
    }, [])
    return (
        <>
            <div className="col-lg-6 mx-auto p-5 shadow">
                <div className='row'>
                    <div className='col-lg-6 mx-auto'>
                        <img src={product.p_url} alt="" className='w-100 h-100' />
                    </div>
                    <div className='col-lg-6'>
                        <h2>{product.p_name}</h2>
                        <ul className='list-unstyled'>
                            <li>category :- {product.category}</li>
                            <li>price  :- {product.p_price}</li>
                            <li>desc :- {product.p_desc}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct