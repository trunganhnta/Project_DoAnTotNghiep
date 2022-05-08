import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  const [keyword, setKeyword] = useState();

  const [focus, setFocus] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  // useEffect(() => {
  //   if (focus) {
  //     if (keyword) {
  //       history.push(`/search/${keyword}`);
  //     }else{
  //       history.push("/noSearch");
  //     }
  //   }
  // }, [keyword, focus]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword && keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/noSearch");
    }
  };
  return (
    <>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+1900 6868</p>
              <p>huyphongshop@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div
        className="header"
        style={{
          position: "sticky",
          top: "0",
          left: "0",
          zIndex: "99",
          background: "white",
        }}
      >
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo2.jpg" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={logoutHandler}
                        >
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Đăng nhập
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Đăng kí
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Nhập tên sản phẩm bạn muốn ?"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      Tìm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header ">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center ">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo2.jpg" />
                </Link>
              </div>
              {/* <div className="bg-warning col-md-7 col-8 d-flex align-items-center justify-content-end">
                <div className="custom-searchbox">
                  <form onSubmit={submitHandler} className="input-group">
                    <Link
                      to=""
                      style={{ margin: "2% 2% 0 0", color: "orange" }}
                    >
                      <i
                        class="fad fa-search"
                        style={{ fontSize: "25px" }}
                      ></i>
                    </Link>
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Tìm kiếm ..."
                      onChange={(e) => setKeyword(e.target.value)}
                      onFocus={(e) => setFocus(true)}
                      onBlur={(e) => setFocus(false)}
                    /> */}
              {/* <button type="submit" className="search-button">
                    Tìm kiếm
                  </button> */}
              {/* </form>
                </div>
              </div> */}
              <div className="col-md-9 d-flex align-items-center justify-content-end Login-Register">
                <div className="custom-searchbox">
                  <form onSubmit={submitHandler} className="input-group">
                    <Link
                      to=""
                      style={{ margin: "2% 2% 0 0", color: "orange" }}
                    >
                      <i class="fad fa-search" style={{ fontSize: "25px" }}></i>
                    </Link>
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Tìm kiếm ..."
                      onChange={(e) => setKeyword(e.target.value)}
                      onFocus={(e) => setFocus(true)}
                      onBlur={(e) => setFocus(false)}
                    />
                    {/* <button type="submit" className="search-button">
                    Tìm kiếm
                  </button> */}
                  </form>
                </div>
                {userInfo ? (
                  <div className="btn-group" style={{ marginBottom: "11px" }}>
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Chào, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Thông tin
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <Link to="/register">Đăng kí </Link>
                    <Link to="/login">Đăng nhập</Link> */}
                    <div
                      className="btn-group cursor-pointer"
                      style={{ margin: "0 20px 5px 20px", fontSize: "23px" }}
                    >
                      <i
                        class="fad fa-user"
                        aria-hidden="true"
                        data-toggle="dropdown"
                      ></i>
                      {/* <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      > */}
                      {/* Chào, {userInfo.name} */}
                      {/* </button> */}
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/register">
                          Đăng kí
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/login"
                          onClick={logoutHandler}
                        >
                          Đăng nhập
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                <Link to="/cart">
                  <i
                    className="fas fa-shopping-bag"
                    style={{ fontSize: "23px" }}
                  ></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
