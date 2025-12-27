import React from 'react'
import Slider from '../components/Slider'
import TeamShowcase from '../components/TeamShowcase'
import Products from './Products'

const Home = () => {
  return (
    <div>
      <Slider/>
      {/* <TeamShowcase/> */}
      <Products/>
    </div>
  )
}

export default Home