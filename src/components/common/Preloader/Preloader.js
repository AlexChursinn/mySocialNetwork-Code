import React from "react";
import preloader from "../../../assets/images/loader.gif";

let Preloader = () => {
  return (
    <div>
      <img src={preloader} style={{ width: "50px" }} />
    </div>
  );
};

export default Preloader;
