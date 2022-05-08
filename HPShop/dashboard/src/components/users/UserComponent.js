import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  const deletehandler = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này??")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Khách hàng</h2>
        {/* <div>
          <Link to="/register" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo mới
          </Link>
        </div> */}
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control"
              />
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div> */}
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <table style={{ width: "100%" }} className="text-center table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>ID</th>
                  <th>Tên tài khoản</th>
                  <th>Phân quyền</th>
                  <th>Email</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.isAdmin === true ? (
                        <p className="m-0">Admin</p>
                      ) : (
                        <p className="m-0">Khách hàng</p>
                      )}
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td
                      style={{
                        width: "8%",
                        height: "3%",
                        overflow: "hidden",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        alignContent: "center",
                      }}
                    >
                      {/* <Link
                        to={`/product/${product._id}/edit`}
                        className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                      >
                        <i className="fas fa-pen"></i>
                      </Link> */}
                      {user.isAdmin !== true ? (
                        <Link
                          to="#"
                          onClick={() => deletehandler(user._id)}
                          className="btn btn-sm btn-outline-danger p-2 pb-2 col-md-6"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      ) : (
                        <p></p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            // <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            //   {users.map((user) => (
            //     <div className="col" key={user._id}>
            //       <div className="card card-user shadow-sm">
            //         <div className="card-header">
            //           <img
            //             className="img-md img-avatar"
            //             src="images/favicon.jpg"
            //             alt="User pic"
            //           />
            //         </div>
            //         <div className="card-body">
            //           <h5 className="card-title mt-5">{user.name}</h5>
            //           <div className="card-text text-muted">
            //             {user.isAdmin === true ? (
            //               <p className="m-0">Admin</p>
            //             ) : (
            //               <p className="m-0">Khách hàng</p>
            //             )}

            //             <p>
            //               <a href={`mailto:${user.email}`}>{user.email}</a>
            //             </p>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </div>
          )}

          {/* nav */}
          {/* <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </section>
  );
};

export default UserComponent;