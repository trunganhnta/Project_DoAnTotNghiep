import React from "react";

const ExtraData = () => {
  return (
    <aside className="col-xl-4 col-lg-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          {/* categories */}
          <>
            <h5 className="mb-3">Loại</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat"
              />
              <label className="form-check-label" htmlFor="product-cat">
                Áo phông
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-1"
              />
              <label className="form-check-label" htmlFor="product-cat-1">
                Áo sơ mi
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-2"
              />
              <label className="form-check-label" htmlFor="product-cat-2">
                Quần âu
              </label>
            </div>
            
          </>
          {/* Colors */}
          <>
            <h5 className="mb-3 mt-4">Colors</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat"
              />
              <label className="form-check-label" htmlFor="product-cat">
                Yellow
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-1"
              />
              <label className="form-check-label" htmlFor="product-cat-1">
                Green
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-2"
              />
              <label className="form-check-label" htmlFor="product-cat-2">
                Blue
              </label>
            </div>
          </>
          {/* Size */}
          <>
            <h5 className="mb-3 mt-4">Size</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat"
              />
              <label className="form-check-label" htmlFor="product-cat">
                SM
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-1"
              />
              <label className="form-check-label" htmlFor="product-cat-1">
                M
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-2"
              />
              <label className="form-check-label" htmlFor="product-cat-2">
                XL
              </label>
            </div>
          </>
        </div>
      </div>
    </aside>
  );
};

export default ExtraData;
