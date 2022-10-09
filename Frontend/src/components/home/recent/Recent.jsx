import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Cars Listed' subtitle='Some of the cars listed for buy and sell. For more click on Buy cars in the navbar' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
