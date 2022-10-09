import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import {axiosInstance} from "../config.js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Upload = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(undefined);
//  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0); // image percentage
 // const [videoPerc, setVideoPerc] = useState(0); // video percentage
  const [inputs, setInputs] = useState({});
  const navigate = useLocation();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // const handleTags = (e) => {
  //   setTags(e.target.value.split(","));
  // };
 
  const uploadFile = (file, urlType) => { // upload to firebase // urltype is for imgurl and videourl
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress)); // if it's imgurl then set imgperc otherwise set videoperc
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { // save download url in mongodb
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  // useEffect(() => {
  //   video && uploadFile(video , "videoUrl");
  // }, [video]);

  useEffect(() => {
    img && uploadFile(img, "carImage");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    try {
      try {
        const res = await axiosInstance.post("/api/car/buyCar", {...inputs}); 
        setOpen(false)
        res.status===200 && navigate("/");
      } catch (error) {
       console.log(error); 
      }
    
    } catch (error) {
      console.log(error);
    }  
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Fill the details of your car</Title>
        {/* <Label>Video:</Label>
         {videoPerc > 0 ? ( // video upload
          "Uploading:" + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )} */}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          rows={8}
          name="description"
          onChange={handleChange}
        />
       <Input
          type="text"
          placeholder="Enter the Brand of your car"
          name="brand"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter mileage"
          name="mileage"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter the power of your car's engine"
          name="engine"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter total seating capacity"
          name="seats"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="location"
          name="location"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="price"
          name="price"
          onChange={handleChange}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? ( // image upload
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;

const Container = styled.div`
  z-index: 1;
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
  width: 600px;
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
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid black;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid black;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 14px;
`;