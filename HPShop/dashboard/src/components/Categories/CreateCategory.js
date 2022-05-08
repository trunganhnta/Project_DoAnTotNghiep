import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { CATEGORY_CREATE_RESET, CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstants";
import { createCategory, editCategory } from "../../Redux/Actions/CategoryActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useRecoilState } from 'recoil';
import { listCategories } from './../../Redux/Actions/CategoryActions';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const nameRef = useRef()

  let history = useHistory();
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const {  categories } = categoryList;

  const categoryCreate = useSelector((state) => {
    return state.categoryCreate});
  const {loading, error, category } = categoryCreate;

  useEffect(() => {
    if (category) {
      toast.success("Category added", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
      setDescription("");
    }
  }, [category, dispatch]);

  const repeatHandler = (e) => {
    categories?.map((category) => {
      if(e.target.value.trim() === category.name){
        toast.warning("Tên thể loại đã có") 
        nameRef.current?.focus()
      }}
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, description));
    window.location.reload(false);
  };
  return (
    <div className="col-md-12 col-lg-4">
      <Toast />
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Tên thể loại
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={name}
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => repeatHandler(e)}
          />
        </div>
        {/* <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" />
        </div> */}
        <div className="mb-4">
          <label className="form-label">Mô tả</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary py-3">
            Cập nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
