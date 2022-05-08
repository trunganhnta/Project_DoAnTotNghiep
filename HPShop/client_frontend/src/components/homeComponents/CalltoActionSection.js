import React from "react";
import { Link, useHistory } from "react-router-dom";


const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Bạn thấy sản phẩm của chúng tôi hấp dẫn chứ?</h2>
              <p>Đăng kí tài khoản và mua nào.</p>
              <form className="form-section">
                <input placeholder="Email của bạn..." name="email" type="email" />
                <Link to='/register'>
                <input value="Đăng kí tài khoản" name="subscribe" type="submit" />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
