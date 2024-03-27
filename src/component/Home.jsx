import React, { useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cardsdata from "./CardData";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const [cartData, setCartData] = useState(Cardsdata);
  const dispatch=useDispatch();

  //add to cart
  const send=(e)=>{
    dispatch(addToCart(e))
    toast.success("Iteam added successfully");
  }
  return (
    <>
      <section>
        <h2 className="iteam_section mt-4 container"></h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
        {
          cartData.map((ele,index)=>{
            return(
              <>
              <Card
            style={{ width: "22rem", border: "none" }}
            className="hove mb-4"
          >
            <Card.Img variant="top" className="cd" src={ele.imgdata} />
            <div className="cart_body"></div>
            <div className="upper_data d-flex justify-content-between align-items-center">
                <h4 className="mt-2">{ele.dish}</h4>
                <span>{ele.rating}</span>
            </div>
            <div className="lower_data d-flex justify-content-between">
                <h5 >{ele.address}</h5>
                <span>INR {ele.price}</span>
            </div>
            <div className="extra"></div>
            <div className="last_data d-flex justify-content-between align-items-center">
            <img src={ele.arrimg} className="limg" alt="" srcset="" />
            <Button style={{width:"150px", background:"#ff3054db", border:"none" }} variant="outline-light"
            onClick={()=>send(ele)} >Add to Cart</Button>
            <img src={ele.delimg} className="laimg" alt="" srcset="" />

            </div>
          </Card>
              </>
            )
          })
        }
         
        </div>
      </section>
    </>
  );
};
export default Home;
