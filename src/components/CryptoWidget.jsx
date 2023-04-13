import React from "react";

function CryptoWidget() {
  return (
    <div
      className="h-[45px] bg-[#0f143a] 
    overflow-hidden p-px m-0 w-full text-[12px] sticky top-0 border-0 border-[#0f143a] rounded-[2px] text-right leading-[14px]"
      style={{
        blockSize: "40px",
        fontFeatureSettings: "normal",
        textSizeAdjust: "100%",
      }}
    >
      <div className="h-[45px] p-0 m-0 w-full">
        <iframe
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
          width="100%"
          height="45px"
          scrolling="auto"
          marginWidth="0"
          marginHeight="0"
          frameBorder="0"
          border="0"
          className="border-0 m-0 p-0"
        ></iframe>
      </div>
    </div>
  );
}

export default CryptoWidget;
