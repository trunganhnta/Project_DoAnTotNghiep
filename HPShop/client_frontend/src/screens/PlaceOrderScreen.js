import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate Price
  const addDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 500000 ? 0 : 20000);
  cart.taxPrice = addDecimals(0);
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) ;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);

  const placeOrderHandler = () => {
    console.log("cart.cartItems", cart.cartItems);
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    
    
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Thông tin đặt hàng</strong>
                </h5>
                <p>Chuyển đến: {cart.shippingAddress.country}</p>
                <p>Phương thức thanh toán: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Địa chỉ nhận hàng</strong>
                </h5>
                <p>
                  Địa chỉ: {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.ward}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Giỏ hàng trống</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name} ( Size {item.size} )</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Số lượng</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>Tổng tiền sản phẩm</h4>
                      <h6>
                        {(item.qty * item.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        đ
                      </h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Tiền sản phẩm</strong>
                  </td>
                  <td>
                    {cart.itemsPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí vận chuyển</strong>
                  </td>
                  <td>
                    {cart.shippingPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>${cart.taxPrice}</td>
                </tr> */}
                <tr>
                  <td>
                    <strong>Tổng tiền</strong>
                  </td>
                  <td>
                    {cart.totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                Đặt hàng
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
