import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import axios from "axios";
import Message from "../components/LoadingError/Error";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(0);
  const [ward, setWard] = useState(shippingAddress.ward);

  const [country, setCountry] = useState(shippingAddress.country);

  const [dataAddress, setDataAddress] = useState([]);

  const [cityId, setCityId] = useState();
  const [showDistrict, setShowDistrict] = useState();

  const [districtId, setDistrictId] = useState();
  const [showWard, setShowWard] = useState();
  console.log(showWard)

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getDataAddress = async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      const data = res.data;
      setDataAddress(data);
    };
    getDataAddress();
    setCountry("");
    setAddress("");
  }, []);

  useEffect(() => {
    if (cityId) {
      const newData = [...dataAddress];
      const dataDistrict = newData.filter((item) => {
        return item.name === cityId;
      });
      setShowDistrict(dataDistrict);
      setCity("");
    }
  }, [cityId]);

  useEffect(() => {
    if (districtId) {
      console.log('districtId',districtId)
      console.log("showDistrict", showDistrict);
      const districts = showDistrict.map((district) => {
        const newData = district.districts;
        return newData;
      });
      console.log(districts);
      const dataFilter = [ ...districts];
      console.log(dataFilter)
      const dataWard = dataFilter.map((i) => {
        return i.filter((w) => (w.name === districtId));
      })
      setShowWard(dataWard);
    }
  }, [districtId]);

  useEffect(() => {
    if (showError) {
      if (country === "") {
        setError("Bạn cần chọn một tỉnh / thành phố");
      } else if (city === "") {
        setError("Bạn cần chọn một quận/ huyện");
      } else if (address === "") {
        setError("Bạn cần phải nhập địa chỉ");
      } else {
        setError("");
      }
    }
  }, [showError, country, city, address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (country === "") {
      setShowError(true);
      setError("Bạn cần chọn một tỉnh / thành phố");
    } else if (city === "") {
      setShowError(true);
      setError("Bạn cần chọn một quận/ huyện");
    } else if (address === "") {
      setShowError(true);
      setError("Bạn cần phải nhập địa chỉ");
    } else {
      setShowError(false);
      dispatch(
        saveShippingAddress({ address, city, ward, country, postalCode })
      );
      history.push("/payment");
    }
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h5 className="fw-bold">Địa chỉ nhận hàng</h5>
          {error && <Message variant="alert-danger">{error}</Message>}
          <div className="mt-4">
            <select
              name="city"
              className="w-100 h-100 text-3xl p-2 rounded cursor-pointer "
              onChange={(e) => {
                setCityId(e.target.value);
                setCountry(e.target.value);
              }}
              size="1"
              style={{ maxHeight: "100px" }}
              value={country}
            >
              <option value="">Chọn tỉnh/ thành phố</option>
              {dataAddress &&
                dataAddress.map((city) => (
                  <option
                    key={city.code}
                    value={city.name}
                    className="cursor-pointer"
                  >
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-4">
            <select
              name="district"
              className="w-100 h-100 text-3xl p-2 rounded cursor-pointer "
              size="1"
              style={{ maxHeight: "100px" }}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setDistrictId(e.target.value);
              }}
            >
              <option value="">Chọn quận/ huyện</option>
              {cityId &&
                showDistrict &&
                showDistrict.map((t) => {
                  return (
                    <>
                      {t.districts.map((d) => {
                        return (
                          <option key={d.code} value={d.name}>
                            {d.name}
                          </option>
                        );
                      })}
                    </>
                  );
                })}
            </select>
          </div>
          <div className="mt-4">
            <select
              name="district"
              className="w-100 h-100 text-3xl p-2 rounded cursor-pointer "
              size="1"
              style={{ maxHeight: "100px" }}
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            >
              <option value="">Chọn Phường/ xã</option>
              {cityId &&
                showWard &&
                showWard.map((t) => {
                  console.log(t);
                  return (
                    <>
                      {t.map((d) => {
                        return (
                          <>
                          {
                            d.wards.map((w) => 
                              <option key={w.code} value={w.name}>
                                {w.name}
                              </option>
                            )
                          }
                          </>
                        );
                      })}
                    </>
                  );
                })}
            </select>
          </div>
          {/* <input
            type="text"
            placeholder="Nhập tỉnh, thành phố"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nhập huyện"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Nhập địa chỉ chi tiết"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* <input
            type="text"
            placeholder="Enter postal code"
            value={ward}
            required
            onChange={(e) => setWard(e.target.value)}
          /> */}

          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
