import React,{useState,useEffect} from "react"
import { axiosInstance } from '../../../config';
import { useSelector } from "react-redux";
// import { list } from "../../data/Data"

const RecentCard = () => {
  const [list, setList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const ide = !currentUser ? 0 : currentUser.id;
  
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/api/car/get/all/`);
      setList(res.data);
    };
    fetchVideos();
  }, []);


  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { carImage, onRent, location, title, price, brand , sellerId } = val
          return (
                <div className='box shadow' key={index}>
              <div className='img'>
                <img src={carImage} alt='' />
              </div>
              <div className='text '>
                <div className='category flex'>
                  <span style={{ background: onRent === true ? "#25b5791a" : "#ff98001a", color: onRent === false ? "#25b579" : "#ff9800" }}>{onRent ? "For Rent" : "For Sale"}</span>
                  {/* <i className='fa fa-heart'></i> */}
                </div>
                <h4>{title}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                   <button className='btn2'>₹{ide === sellerId ? "" : price}</button>
                </div>
                <span>{brand}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
