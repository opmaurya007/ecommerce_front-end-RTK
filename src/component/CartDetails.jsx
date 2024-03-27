import React, { useEffect, useState } from "react";
import "./cartStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart ,removeToCart,removeSingleIteam, emptyCartIteam} from "../redux/features/cartslice";
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';


const CartDetails = () => {

  const { carts } = useSelector((state) => state.allCart);
  const [totalPrice,setPrice]=useState(0);
  const [totalQuantity,setQuantity]=useState(0);

  const dispatch=useDispatch();

//add to cart
const handleIncrement=(e)=>{
  dispatch(addToCart(e))
}
//remove to cart
const handleDecrement=(e)=>{
  dispatch(removeToCart(e))
  toast.success("Iteam Remove to cart")
}
        //remove to single Iteam
const handleSingleDecrement=(e)=>{
  dispatch(removeSingleIteam(e));
}

//empty cart
const emptyCart=()=>{
  dispatch(emptyCartIteam())
  toast.success("Your cart is empty")

}
//count total price
const total=()=>{
let totalPrice=0
carts.map((ele,ind)=>{
  totalPrice=ele.price * ele.qnty+totalPrice
});
setPrice(totalPrice)
};
useEffect(()=>{
  total()
  },[total])
//total quantity

const countQuantity=()=>{
  let totalQuantity=0
  carts.map((ele,ind)=>{
    totalQuantity=ele.qnty +totalQuantity
  });
  setQuantity(totalQuantity)
  };
  useEffect(()=>{
    countQuantity()
    },[countQuantity])

    //payment integration
    const makePayment=async()=>{
        const stripe=await loadStripe("pk_test_51OdtNOSJGQzVMklLwTM8gKSg0S5aDA7DCCy50hGP7yPfkIEaVHP7eGBr4BgVvxMFkn7KquOntXMfl45ahseRVKFe00GX8Xjgr7");

        const body={
          products:carts
        }
        const headers={
          "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:7000/api/create-checkout-session",{
      
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
        });
        const session=await response.json();

        const result=stripe.redirectToCheckout({
          sessionId:session.id
        });
        if(result.errror){
          console.log(result.error)
        }
    }

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 mt-5 mb-5 cardsdetails">
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">Cart Calculation{carts.length >0 ? `(${carts.length})` : ""}</h5>
              {carts.length > 0 ? (
                <button className="btn btn-danger m-0 btn-sm"
                onClick={emptyCart}>
                  <i className="fa fa-trash-alt mr-2"></i>
                  <span>Empty Cart</span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {carts.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your Cart is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action </th>
                    <th>Product </th>
                    <th>Name </th>
                    <th>Price </th>
                    <th>Qtn </th>
                    <th className="text-right">
                      {" "}
                      <span id="amount" className="amout">Total Amount</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    carts.map((data,index)=>{
                      return(
                        <>
                        <tr>
                          <td>
                            <button className="prdct-delete"
                            onClick={()=>handleDecrement(data.id)}
                            ><i className='fa fa-trash-alt'></i></button>
                          </td>
                          <td><div className="product-img"><img src={data.imgdata} alt="" srcset="" /></div></td>
                          <td><div className="product-name"><p>{data.dish}</p></div></td>
                          <td>₹&nbsp;{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                            <button className="prdct-qty-btn" type="button"
                              onClick={data.qnty<=1 ? ()=>{handleDecrement(data.id)} : ()=>handleSingleDecrement(data)}>
                              <i className='fa fa-minus'></i></button>                         
                              <input type="text" className="qty-input-box" value={data.qnty} name="" id="" />
                              <button className="prdct-qty-btn" type="button" 
                              onClick={()=>handleIncrement(data)}>
                              <i className='fa fa-plus'></i>
                            </button>
                            </div>
                          </td>

                            <td className="text-right">₹&nbsp;{data.qnty*data.price}</td>
                        </tr>

                        </>
                      )

                    
                    })
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={2}>&nbsp;</th>
                    <th>Items in Cart <span className="m1-2 mr-2">:</span>
                    <span className="text-danger">{totalQuantity}</span></th>
                    <th className="text-right">Total Price <span className="m1-2 mr-2">:</span>
                    <span className="text-danger">₹&nbsp;{totalPrice}</span></th>
                    <th className="text-right"><button className="btn btn-success" type="button" onClick={makePayment}>Checkout</button></th>

                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartDetails;
