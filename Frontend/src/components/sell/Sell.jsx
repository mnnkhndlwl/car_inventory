import React, { useState } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import "./sell.css";
import "../home/featured/Featured.css";
import FeaturedCard from "../home/featured/FeaturedCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Upload from "../../utils/Upload";

const Sell = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div>
        {open && <Upload setOpen={setOpen} />}
        {/* {!open && ( */}
          <section className="services mb">
            <Back
              name="wanna sell your old car"
              title="Sell any type of car"
              cover={img}
            />
            <div className="featured container">
              <FeaturedCard />
            </div>
            { !open && <div className="upload">
              <h1>
                Please Upload Details Of Your Car so that we can put it on sell
              </h1>
              {!currentUser ? (
                <>
                  <Link to="/Login">
                    <button className="button">Log in to sell your car</button>
                  </Link>
                </>
              ) : (
                <button className="button" onClick={() => setOpen(true)}>
                  {" "}
                  Upload{" "}
                </button>
              )}
            </div>}
          </section>
        {/* )} */}
      </div>
    </>
  );
};

export default Sell;
