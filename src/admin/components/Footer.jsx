import React from "react";

function Footer() {
  return (
    <div className="bg-primary2 w-full h-[10vh] flex justify-center items-center mt-8 ">
      <div className="text-white text-center">
        <p>
          @ {new Date().getFullYear()}{" "}
          <strong className="primary-text uppercase">
            Ultimatefc Admin
          </strong>{" "}
          all right reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
