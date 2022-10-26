import React,{useState} from "react";
import styled from "styled-components";
import Heading from "../../common/Heading";
import RecentCard from "../recent/RecentCard";
import "./hero.css";
import videoBg from './videoBg.mp4';

const Hero = () => {

  const [openPage, setOpenPage] = useState(false);
  const [range, setRange] = useState("");
  const [location, setLocation] = useState("");


  return (
    <>
    {
        openPage && 
        <>
        <Container>
      <Wrapper>
        <Close onClick={() => setOpenPage(false)}>X</Close>
        <RecentCard openPage={openPage} range={range} location={location} />
        </Wrapper>
        </Container>
        </>
      }
    <video src={videoBg} autoPlay loop muted />
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Next Car ' subtitle='Find new & featured Car located in your local city.' /> 
          <div className='gh flex'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' onChange={(e) => setLocation(e.target.value)}/>
            </div>
            {/* <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' />
            </div> */}
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' onChange={(e) => setRange(e.target.value)}/>
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1' onClick={() => setOpenPage(true)}>
              <i className='fa fa-search'></i>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero;

const Container = styled.div`
  z-index: 99999;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
