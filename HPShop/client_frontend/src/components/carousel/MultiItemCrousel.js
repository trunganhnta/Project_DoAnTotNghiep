import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../../Redux/Actions/ProductActions";
import ProductCard from "../homeComponents/ProductCard";
import { Link, useHistory } from "react-router-dom";
import Rating from "../homeComponents/Rating";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "blue", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "blue", fontSize: "30px" }} />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 3,
  // infinite={false}
  // slidesToScroll={3}
  centerMode: true,
  centerPadding: "150px",
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 869,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

const MultiItemCarousel = () => {
  const [arrProducts, setArrProducts] = useState([]);
  console.log(arrProducts);
  const dispatch = useDispatch();

  const productListAll = useSelector((state) => state.productListAll);
  const { products } = productListAll;
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setArrProducts([...products.filter((item) => item.saleQuantity > 0)]);
    }
  }, [products]);

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);
  return (
    <div style={{ margin: "30px" }} className="carousel">
      <h5 className="col-12 text-center mb-2" style={{ fontWeight: "bold" }}>
        THỜI TRANG BÁN CHẠY{" "}
      </h5>
      <Slider {...carouselProperties}>
        {/* {multiData.map((item) => (
          <Card item={item} />
        ))} */}
        {arrProducts && arrProducts?.map((item) => <Card item={item} />)}
      </Slider>
    </div>
  );
};

const Card = ({ item }) => {
  const history = useHistory();

  return (
    <>
      {item && (
        <Link to={`/products/${item._id}`}>
          <div style={{ textAlign: "center" }}>
              <img
                className="multi__image"
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
            <p style={{ fontSize: "14px", padding: "5px 0" }}>
              <Link to={`/products/${item._id}`}>{item.name}</Link>
            </p>
            <p style={{ fontSize: "16px", padding: "5px 0", color: "green" }}>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
            </p>
            <p style={{ fontSize: "14px", padding: "5px 0", color: "gray" }}>
              <Rating value={item.rating} text={`${item.numReviews} reviews`} />
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default MultiItemCarousel;
