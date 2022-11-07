import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from "../../config";
import React, { useEffect, useState } from "react";
import { fetchSuccess } from "../../redux/carSlice";
import seat from "./seat.png";
import mileage from "./mileage.png";
import engine from "./engine.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  text-transform: capitalize;
  font-weight: bolder;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  color: black;
  margin: 0px 35px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Search = styled.div`
  margin-top: 10px;
  width: 40%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Car = () => {
  const [isCompare, setIsCompare] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { currentCar } = useSelector((state) => state.car);
  const [carCom, setCarCom] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const path = useLocation().pathname.split("/")[2];

  // to fetch car to compare
  const handleFetch = async () => {
    // e.preventDefault();
    try {
      const result = await publicRequest.get(
        `/api/car/get/byname?title=${title}`
      );
      setCarCom(result.data[0]);
      setFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  // to fetch car
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carRes = await publicRequest.get(`/api/car/${path}`);
        dispatch(fetchSuccess(carRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  // for payment
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/api/payme/payment/", {
          tokenId: stripeToken.id,
          amount: currentCar.price * 100,
        });
        await userRequest.put(`/api/car/buy/${path}`);
        navigate("/success");
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  if (!currentCar) return "loading... ";

  return (
    <Container>
      {isCompare && (
        <Search>
          <Input
            placeholder="Search"
            onChange={(e) => setTitle(e.target.value)}
          />
          <SearchOutlinedIcon onClick={handleFetch} />
        </Search>
      )}

      {/* current car */}
      <Wrapper>
        <ImgContainer>
          <Image src={currentCar.carImage} />
        </ImgContainer>
        <InfoContainer>
          <Title>
            {currentCar.brand} {currentCar.title}
          </Title>
          <Desc>{currentCar.description}</Desc>
          <FilterContainer>
            <Filter>
              {/* <FilterTitle>Color</FilterTitle> */}
              <FilterColor>
                <img src={seat} />
                <p>Seats</p>
                <span>{currentCar.seats}</span>
              </FilterColor>
              <FilterColor>
                <img src={mileage} />
                <p>mileage</p>
                <span>{currentCar.mileage}</span>
              </FilterColor>
              <FilterColor>
                <img src={engine} />
                <p>engine</p>
                <span>{currentCar.engine}</span>
              </FilterColor>
            </Filter>

            {/* <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter> */}
          </FilterContainer>
          <Price>₹ {currentCar.price}</Price>
          {!fetched && (
            <>
              <AddContainer>
                {/* <AmountContainer>
              <Remove /> */}
                {/* <Amount>1</Amount> */}
                {/* <Add />
            </AmountContainer> */}

                {currentUser ? (
                  <StripeCheckout
                    name="Your Car"
                    currency="inr"
                    description={`Your total is ${currentCar.price}`}
                    amount={currentCar.price * 100}
                    token={onToken}
                    stripeKey={KEY}
                  >
                    <button>Buy now</button>
                  </StripeCheckout>
                ) : (
                  <>
                    <span>Agar kharid ni hai to login kar</span>
                  </>
                )}
                <button onClick={() => setIsCompare(true)}>Compare</button>
              </AddContainer>
            </>
          )}
        </InfoContainer>
      </Wrapper>
      {/* fetched car */}
      {fetched && (
        <Wrapper>
          <ImgContainer>
            <Image src={carCom.carImage} />
          </ImgContainer>
          <InfoContainer>
            <Title>
              {carCom.brand} {carCom.title}
            </Title>
            <Desc>{carCom.description}</Desc>
            <FilterContainer>
              <Filter>
                {/* <FilterTitle>Color</FilterTitle> */}
                <FilterColor>
                  <img src={seat} />
                  <p>Seats</p>
                  <span>{carCom.seats}</span>
                </FilterColor>
                <FilterColor>
                  <img src={mileage} />
                  <p>mileage</p>
                  <span>{carCom.mileage}</span>
                </FilterColor>
                <FilterColor>
                  <img src={engine} />
                  <p>engine</p>
                  <span>{carCom.engine}</span>
                </FilterColor>
              </Filter>

              {/* <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter> */}
            </FilterContainer>
            <Price>₹ {carCom.price}</Price>
            {!fetched && (
              <AddContainer>
                {/* <AmountContainer>
              <Remove /> */}
                {/* <Amount>1</Amount> */}
                {/* <Add />
            </AmountContainer> */}
                {currentUser ? (
                  <StripeCheckout
                    name="Your Car"
                    currency="inr"
                    description={`Your total is ${carCom.price}`}
                    amount={carCom.price * 100}
                    token={onToken}
                    stripeKey={KEY}
                  >
                    <button>Buy now</button>
                  </StripeCheckout>
                ) : (
                  <>
                    <span>Agar kharid ni hai to login kar</span>
                  </>
                )}
                <button>Compare</button>
              </AddContainer>
            )}
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default Car;
