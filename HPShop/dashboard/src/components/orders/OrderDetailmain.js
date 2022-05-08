import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails
} from "../../Redux/Actions/OrderActions";
import {
  listAllProducts,
  productSaleQuantity
} from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProducts from "./OrderDetailProducts";

const OrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log('order',order);

  const [arrProducts, setArrProducts] = useState([]);
  console.log(arrProducts);

  const productListAll = useSelector((state) => state.productListAll);
  const { products } = productListAll;
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setArrProducts([...products]);
    }
  }, [products]);


  var result;
  if (order && arrProducts) {
    result = arrProducts.filter((o1) => {
      console.log("o1", o1._id);
      return order.orderItems.some((o2) => {
        console.log("o2", o2.product);
        return o1._id === o2.product;
      });
    });
    console.log(result);
  }

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    result.map((item) => dispatch(productSaleQuantity(item)));
    // dispatch(productSaleQuantityUpdate());
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Trở lại đơn hàng
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("HH:mm , DD/MM/YYYY")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Mã đơn hàng: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                {/* <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Thay đổi trạng thái</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select> */}
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isDelivered ? (
                    <button className="btn btn-success col-12">
                      Giao hàng lúc <br />({" "}
                      {moment(order.isDeliveredAt).format("HH:mm , DD/MM/YYYY")}
                      )
                    </button>
                  ) : (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        onClick={deliverHandler}
                        className="btn btn-dark col-12"
                      >
                        Đánh dấu đã giao hàng
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
