import { AddCircle, RemoveCircle } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../components/homeComponents/Rating";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import ModalSelectSize from "../components/modalSelectSize/ModalSelectSize";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const [size, setSize] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Đánh giá thành công");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    if(size === ''){
      toast.error('Vui lòng chọn size!')
    }else{

      // history.push(`/cart/${productId}?qty=${qty}`);
      const filterArr = cartItems.filter((item) => {
        return item.product === productId && item.size === size;
      });
      if (filterArr.length > 0) {
        filterArr.map((item) => {
          const newQty = +qty + +item.qty;
          // return history.push(`/cart/${productId}?qty=${newQty}`);
          history.push({
            pathname: `/cart/${productId}`,
            search: `?qty=${newQty}`,
            state: { size: `${size}` },
          });
        });
      } else {
        // history.push(`/cart/${productId}?qty=${qty}`);
        history.push({
          pathname: `/cart/${productId}`,
          search: `?qty=${qty}`,
          state: { size: `${size}` },
        });
      }
      //
      // dispatch(productSaleQuantity(product));
      //
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />
      <Toast />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Giá</h6>
                      <span>
                        {product.price
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        đ
                      </span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Trạng thái</h6>
                      {product.countInStock > 0 ? (
                        <span>Còn hàng</span>
                      ) : (
                        <span>Không có sẵn</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Đánh giá</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>

                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Size</h6>
                      <select
                        className="col-4"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {product.name &&
                        product.name.toLowerCase().includes("áo") ? (
                          <>
                            <option value="">Chọn Size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </>
                        ) : (
                          <>
                            <option value="">Chọn Size</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                          </>
                        )}
                      </select>
                    </div>

                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center row">
                          <h6 className="col-4">Số lượng</h6>
                          <div className="col-2">
                            <RemoveCircle
                              style={{ color: "orange", cursor: "pointer" }}
                              onClick={() => (qty >= 1 ? setQty(qty - 1) : {})}
                            />
                          </div>
                          <select
                            className="col-4"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                          <div className="col-2">
                            <AddCircle
                              style={{ color: "orange", cursor: "pointer" }}
                              onClick={() =>
                                qty < product.countInStock
                                  ? setQty(qty + 1)
                                  : alert("Số lượng mua quá lớn !")
                              }
                            />
                          </div>
                        </div>
                        <ModalSelectSize />

                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Thêm vào giỏ
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">Đánh giá</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>
                    Không có đánh giá nào
                  </Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>
                      {moment(review.createdAt).format("h:mm, DD/MM/YYYY")}
                    </span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>Viết đánh giá</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Đánh giá</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Lựa chọn đánh giá...</option>
                        <option value="1">1 - Kém</option>
                        <option value="2">2 - Bình thường</option>
                        <option value="3">3 - Tốt</option>
                        <option value="4">4 - Rất tốt</option>
                        <option value="5">5 - Tuyệt vời</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Nhận xét</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        Gửi đánh giá
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Bạn cần{" "}
                      <Link to="/login">
                        " <strong>đăng nhập</strong> "
                      </Link>{" "}
                      để đánh giá{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
