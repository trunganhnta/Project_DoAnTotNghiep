import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const Product = (props) => {
  const { product, index, page } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này??")) {
      dispatch(deleteProduct(id));
    }
  };
  
  return (
    <>
      <tbody>
        <tr>
          <th
            scope="row"
            className="text-center"
            style={{ paddingTop: "2.5%" }}
          >
            {page && (page == 1 ? index + 1 : (page - 1) * 12 + index + 1) || index + 1}
          </th>
          <td
            className=" text-left row  d-flex align-items-center "
            style={{ width: "40%", overflow: "hidden",marginLeft:'170px', width: "500px"}}
          >
            <img
              width="15%"
              height="80px"
              className="img-wrap col-3"
              src={product.image}
              alt={"Ảnh sản phẩm " + product.name}
              style={{objectFit:'cover'}}
            />{" "}
            <div className="custom-tittle-admin col-9">

            {product.name}
            </div>
          </td>
          <td className="text-center" style={{ paddingTop: "2.5%" }}>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
          </td>
          <td style={{ width: "10%", overflow: "hidden", paddingTop: "1.6%" }}>
            <Link
              to={`/product/${product._id}/edit`}
              className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <Link
              to="#"
              onClick={() => deletehandler(product._id)}
              className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
            >
              <i className="fas fa-trash-alt"></i>
            </Link>
          </td>
        </tr>
      </tbody>
      {/* <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Product;
