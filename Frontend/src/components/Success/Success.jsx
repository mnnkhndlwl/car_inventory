import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold"
    }}
  >
    <h3>Transaction Completed Successfully 🎉🎊</h3><br/><h4>Thank you 🙏 for using our services</h4>
    <Link to="/">
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </Link>
  </div>
  )
}

export default Success