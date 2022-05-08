import React from 'react'

export default function ModalSelectSize() {
  return (
    <>
      <div className="custom-modal container my-4 ">
        <section className="border border-light ">
          {/* <!-- Button trigger modal --> */}
          <div
            // type="button"
            className="custom-modal-button waves-effect waves-light"
            data-toggle="modal"
            data-target="#exampleModalLong"
            style={{ fontSize: "17px" }}
          >
            *Hướng dẫn chọn size*
          </div>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            style={{ display: "none" }}
            aria-hidden="true"
          >
            <div
              className="modal-dialog"
              role="document"
              style={{ maxWidth: "700px" }}
            >
              <div className="custom-modal-content modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    HƯỚNG DẪN CHỌN SIZE
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">x</span>
                  </button>
                </div>
                <div className="custom-modal-body modal-body">
                  <p style={{ color: "black" }}>
                    Nếu bạn băn khoăn không biết chọn size nào cho phù hợp với
                    cân nặng và chiều cao của mình, đừng lo lắng! Hãy xem bảng
                    hướng dẫn chọn size bên dưới mà Shop tư vấn riêng dành cho
                    bạn
                  </p>
                  <img
                    src="https://4menshop.com/images/2021/06/20210616_616a64351e05559313e9f5be86b85544_1623827621.png"
                    alt=""
                    style={{
                      width: "100%",
                      margin: "10px 0",
                      objectFit: "contain",
                    }}
                  />
                  <img
                    src="https://4menshop.com/images/2021/06/20210616_c8342a1b4357a802bf96a3f7f7cb2f63_1623827635.png"
                    alt=""
                    style={{
                      width: "100%",
                      margin: "10px 0",
                      objectFit: "contain",
                    }}
                  />
                  <p
                    style={{
                      margin: "10px 0",
                      color: "black",
                    }}
                  >
                    Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa trên
                    kinh nghiệm nhiều năm của shop theo khảo sát nhu cầu sở
                    thích của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có
                    những trường hợp ngoại lệ phụ thuộc theo vóc dáng, sở thích
                    của từng người. Ví dụ có người thích mặc ôm, có người thích
                    mặc rộng...
                  </p>
                  <p style={{ color: "black" }}>
                    Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải
                    đáp? Hãy liên hệ ngay với Bộ phận Chăm sóc khách hàng của
                    shop qua Hotline (08)68 686868 để được hỗ trợ thêm.
                  </p>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-secondary waves-effect waves-light "
                    data-dismiss="modal"
                  >
                    Đóng cửa sổ
                  </button>
                  {/* <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Save changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
