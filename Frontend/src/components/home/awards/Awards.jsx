import React from "react"
import Heading from "../../common/Heading"
import { awards } from "../../data/Data"
import "./awards.css";
import CountUp from 'react-countup';


const Awards = () => {
 
  return (
    <>
      <section className='awards padding'>
        <div className='container'>
          <Heading title='Over 1,24,000+ Happy User Bieng With Us Still They Love Our Services' subtitle='Our Awards' />

          <div className='content grid4 mtop'>
            {/* {awards.map((val, index) => ( */}
              <div className='box' >
                <div className='icon'>
                  <span><i class='fa-solid fa-trophy'/></span>
                </div>
                <h1>
                   <CountUp duration={3} start={0} end={72} suffix=" M"/>
                </h1>
                <p>Blue Burmin Award</p>
              </div>
              <div className='box' >
                <div className='icon'>
                  <span><i class='fa-solid fa-briefcase'></i></span>
                </div>
                <h1>
                   <CountUp duration={3} start={0} end={32} suffix=" M"/>
                </h1>
                <p>Australian UGC Award</p>
              </div>
              <div className='box'>
                <div className='icon'>
                  <span><i class='fa-solid fa-heart'></i></span>
                </div>
                <h1>
                   <CountUp duration={5} start={0} end={64} suffix=" M"  easing="easeOutCubic" delay={2}/>
                </h1>
                <p>IITCA Green Award</p>
              </div>
              <div className='box'>
                <div className='icon'>
                  <span><i class='fa-solid fa-lightbulb'></i></span>
                </div>
                <h1>
                   <CountUp duration={5} start={0} end={90} suffix=" M"/>
                </h1>
                <p>Mimo X11 Award</p>
              </div>
            {/* ))} */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Awards
