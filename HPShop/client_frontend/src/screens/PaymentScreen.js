import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  console.log(paymentMethod)

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const {checked,value} = e.target;
    if(checked){
      setPaymentMethod(value)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h5 className="fw-bold">Chọn phương thức thanh toán</h5>
          <div className="payment-container">
            <div className="radio-container">
              <input
                name="payment"
                id="paypal"
                className="form-check-input cursor-pointer"
                type="radio"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => handleInput(e)}
              />
              <label
                className="form-check-label cursor-pointer"
                htmlFor="paypal"
              >
                PayPal hoặc Credit Card
              </label>
            </div>
            <div className="radio-container ">
              <input
                name="payment"
                className="form-check-input cursor-pointer"
                id="ttknh"
                type="radio"
                value="Thanh toán khi nhận hàng"
                checked={paymentMethod === "Thanh toán khi nhận hàng"}
                onChange={(e) => handleInput(e)}
              />
              <label
                className="form-check-label cursor-pointer"
                htmlFor="ttknh"
              >
                Thanh toán khi nhận hàng
              </label>
            </div>
          </div>

          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
