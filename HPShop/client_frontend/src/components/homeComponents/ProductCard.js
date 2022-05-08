import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';

export default function ProductCard({ product }) {
    const history = useHistory()
  return (
    <div className="shop col-lg-3 col-md-4 col-sm-6 cursor-pointer" key={product._id} onClick={()=>{history.replace(`/products/${product._id}`);}}>
      <div className="border-product">
        <Link to={`/products/${product._id}`}>
          <div className="shopBack">
            <img
              src={product.image}
              alt={product.name}
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>

        <div className="shoptext">
          <p>
          {/* <div className="custom-title"> */}
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          {/* </div> */}
          </p>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <h3>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
          </h3>
        </div>
        
      </div>
    </div>
  );
}
