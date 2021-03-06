import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { createProduct } from "./../../Redux/Actions/ProductActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  // const [image, setImage] = useState("");
  const [image, setImage] = useState();
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  //
  const [category, setCategory] = useState("");

  const [errorNumber, setErrorNumber] = useState("");
  //

  let history = useHistory();
  const dispatch = useDispatch();

  const [listCategory, setListCategory] = useState();
  useEffect(() => {
    const getCategories = localStorage.getItem("category");
    setListCategory(JSON.parse(getCategories));
  }, []);

  const productCreate = useSelector((state) => state.productCreate);

  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setCategory("");
    }
  }, [product, dispatch]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("B???n c???n nh???p t??n s???n ph???m", ToastObjects);
    } else if (price === 0) {
      toast.error("B???n c???n nh???p gi?? s???n ph???m", ToastObjects);
    } else if (countInStock === 0) {
      toast.error("B???n c???n nh???p s??? l?????ng s???n ph???m");
    }else if (description === '') {
      toast.error('B???n c???n ph???i nh???p m?? t??? cho s???n ph???m')
    } else if (category === "") {
      toast.error("B???n c???n ch???n lo???i s???n ph???m");
    } else {
      dispatch(
        createProduct(name, price, description, image, countInStock, category)
      );
    }
    setImage("");
    setPreviewSource("");
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Danh s??ch s???n ph???m
            </Link>
            <h2 className="content-title">Th??m s???n ph???m</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                C???p nh???t
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body ml-20">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Ti??u ????? s???n ph???m
                    </label>
                    <input
                      type="text"
                      placeholder="Nh???p ti??u ????? ..."
                      className="form-control"
                      id="product_title"
                      // required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Gi??
                    </label>
                    <input
                      type="number"
                      placeholder="Nh???p gi??..."
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      onBlur={(e) => {
                        e.target.value < 0
                          ? setErrorNumber("Gi?? kh??ng th??? l?? s??? nh??? h??n 0")
                          : e.target.value === ""
                          ? setErrorNumber("B???n c???n nh???p gi?? s???n ph???m")
                          : setErrorNumber("");
                      }}
                    />
                    {errorNumber && (
                      <span className="custom-error">{errorNumber}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      S??? l?????ng s???n ph???m
                    </label>
                    <input
                      type="number"
                      placeholder="Nh???p s??? l?????ng ..."
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      onBlur={(e) => {
                        e.target.value < 0
                          ? setErrorNumber("S??? l?????ng kh??ng th??? l?? s??? nh??? h??n 0")
                          : e.target.value === ""
                          ? setErrorNumber("B???n c???n nh???p s??? l?????ng s???n ph???m")
                          : setErrorNumber("");
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">M?? t???</label>
                    <textarea
                      placeholder="Nh???p m?? t??? ..."
                      className="form-control"
                      rows="7"
                      // required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4 row p-0 ">
                    <label className="form-label ">Lo???i s???n ph???m</label>
                    <select
                      className="form-control form-select"
                      // required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Ch???n lo???i s???n ph???m</option>
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
                  <div className="mb-4 row p-0">
                    <label className="form-label">???nh</label>
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
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
                    {previewSource && (
                      <div className="col-3">
                        <img
                          alt="Ch???n ???nh"
                          src={previewSource}
                          style={{
                            height: "150px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
