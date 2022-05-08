import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState();


  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    const getCategories = localStorage.getItem("category");
    setListCategory(JSON.parse(getCategories));
  }, []);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Sản phẩm đã được cập nhật", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
        setCategory(product.category);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        category,
      })
    );
  };

  // xu li anh
  const [previewSource, setPreviewSource] = useState();

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hpimages");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/nta/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const fileafter = await res.json();
    console.log("fileafter", fileafter);
    setImage(fileafter.url);

    previewFile(file);
  };
  //hien thi anh
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
                Danh sách sản phẩm
            </Link>
            <h2 className="content-title">Cập nhật sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số lượng
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4 row p-0 ">
                        <label className="form-label ">Loại sản phẩm</label>
                        <select
                          className="form-control form-select"
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Chọn loại sản phẩm</option>
                          {listCategory &&
                            listCategory.map((a) => {
                              return (
                                <option key={a._id} value={a._id}>
                                  {a.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="mb-4 row">
                        <label className="form-label">Ảnh</label>
                        {/* <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        /> */}
                        <div className="col-8">
                          <input
                            className="form-control mt-3 form-input"
                            type="file"
                            onChange={handleFileInputChange}
                          />
                        </div>
                        {(previewSource && (
                          <div className="col-3">
                            <img
                              alt="Chọn ảnh"
                              src={previewSource}
                              style={{
                                height: "150px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )) || (
                          <div className="col-3">
                            <img
                              alt="Ảnh"
                              src={image}
                              style={{
                                height: "150px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
