import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'



const Products = () => {

  //redux state access
 const {items:data, status}= useSelector((state)=>state.products)
 console.log(data)

  return <div className='products-section container mx-auto py-10 px-4'>
    <h2 className='section-title uppercase text-3xl font-bold space-font text-center mb-10 text-white'>
      Browse all <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500'>Products</span>
    </h2>
    <div className='products-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
      {status && <p className='col-span-full text-center text-gray-400'>{status}</p>}
      {data.map((product)=>(
        <Card key={product.id} product={product}/>
      ))}
    </div>
  </div>
}

export default Products