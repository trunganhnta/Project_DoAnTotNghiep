import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h4 className="card-title">Đơn đặt hàng mới</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b>{order.user.name}</b>
                  </td>
                  <td>{order.user.email}</td>
                  <td>
                    {order.totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge rounded-pill alert-success">
                        Đã thanh toán{" "}
                        {moment(order.paidAt).format("DD/MM/YYYY")}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Chưa thanh toán
                      </span>
                    )}
                  </td>
                  <td>
                    {moment(order.createdAt)
                      .format("HH:mm , DD/MM/YYYY")
                      }
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
