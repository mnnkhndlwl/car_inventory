import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import videoBg from './videoBg.mp4'

const Hero = () => {
  return (
    <>
    <video src={videoBg} autoPlay loop muted />
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Next Car ' subtitle='Find new & featured Car located in your local city.' /> 
          <form className='flex'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' />
            </div>
            {/* <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' />
            </div> */}
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
