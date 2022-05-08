import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê bán hàng</h5>
          {/* <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-shoeshoptutorial-bzbxw/embed/charts?id=28397e9a-cc52-45f2-8da0-7a9a760c2f6d&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe> */}
          <iframe
            title="a"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "360px",
            }}
            src="https://charts.mongodb.com/charts-hpshop-bfcuw/embed/charts?id=624c6ca9-a2bc-4d7a-8dd4-4c26fc2e4c01&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
