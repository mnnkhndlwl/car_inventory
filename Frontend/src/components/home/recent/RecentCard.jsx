import React, { useState, useEffect } from "react";
import { publicRequest } from "../../../config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { list } from "../../data/Data"

const RecentCard = ({ openPage, range, location }) => {
  const [list, setList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const ide = !currentUser ? 0 : currentUser.id;

  useEffect(() => {
    const fetchVideos = async () => {
      if (!openPage) {
        const res = await publicRequest.get(`/api/car/get/all/`);
        setList(res.data);
      } else {
        const price = range;
        const result = await publicRequest.post("/api/car/get/byLocPrice/", {
          location,
          price,
        });
        console.log({ range, location });
        console.log(result.data);
        setList(result.data);
      }
    };
    fetchVideos();
  }, [openPage,location,range]);

  return (
    <>
      <div className="content grid3 mtop">
        {list.map((val, index) => {
          const {
            _id,
            carImage,
            onRent,
            location,
            title,
            price,
            brand,
            sellerId,
          } = val;
          return (
            <Link to={`/car/${_id}`} style={{ textDecoration: "none" }}>
              <div className="box shadow" key={index}>
                <div className="img">
                  <img src={carImage} alt="" />
                </div>
                <div className="text ">
                  <div className="category flex">
                    <span
                      style={{
                        background: onRent === true ? "#25b5791a" : "#ff98001a",
                        color: onRent === false ? "#25b579" : "#ff9800",
                      }}
                    >
                      {onRent ? "For Rent" : "For Sale"}
                    </span>
                    {/* <i className='fa fa-heart'></i> */}
                  </div>
                  <h4>{title}</h4>
                  <p>
                    <i className="fa fa-location-dot"></i> {location}
                  </p>
                </div>
                <div className="button flex">
                  <div>
                    <button className="btn2">
                      ₹{ide === sellerId ? "" : price}
                    </button>
                  </div>
                  <span>{brand}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
