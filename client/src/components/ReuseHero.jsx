import React from "react";

function ReuseHero({ title, style }) {
  return (
    <div className={`${style} w-full h-[80vh] -mb-10`}>
      <div className="flex justify-center items-center h-full">
        <h1 className="text-white text-6xl font-[500] font-ubuntu capitalize">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default ReuseHero;
