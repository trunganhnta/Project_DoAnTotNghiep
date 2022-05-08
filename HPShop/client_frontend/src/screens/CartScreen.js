import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const CartScreen = ({ match, location, history }) => {
  // 
  const cartId = `cartId-${Math.random().toString(16).slice(2)}`
  console.log(cartId);
  // 

  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  console.log("qty", qty);
  // const size = location.search ? (location.search.split("=")[2]) : 'S';
  const size = location.state ? location.state.size : "S";
  console.log("size", size);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandle = (id) => {
    console.log(id)
    dispatch(removefromcart(id));
  };
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng trống
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              Mua hàng ngay!
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Số lượng đơn hàng
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.cartId)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>
                      {item.name} ( Size {item.size} )
                    </h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6 style={{ paddingLeft: "32px" }}>Số lượng</h6>
                  <div
                    className="row p-0 d-flex align-items-center "
                    style={{ width: "200px" }}
                  >
                    <div className="col-2 p-0">
                      <RemoveCircle
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() =>
                          item.qty > 1
                            ? // ? dispatch(addToCart(item.product, item.qty - 1))
                              dispatch(
                                addToCart(item.product, item.qty - 1, item.size)
                              )
                            : removeFromCartHandle(item.cartId)
                        }
                      />
                    </div>
                    <select
                      className="col-4"
                      style={{ width: "70px" }}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          // addToCart(item.product, Number(e.target.value))
                          addToCart(
                            item.product,
                            Number(e.target.value),
                            item.size
                          )
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <div className="col-2">
                      <AddCircle
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => {
                          return item.qty < item.countInStock
                            ? // ? dispatch(addToCart(item.product, item.qty + 1))
                              dispatch(
                                addToCart(item.product, item.qty + 1, item.size)
                              )
                            : alert("Số lượng mua quá lớn !");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Giá</h6>
                  <h4>
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng:</span>
              <span className="total-price">
                {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
              </span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Tiếp tục mua hàng</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Thanh toán</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
