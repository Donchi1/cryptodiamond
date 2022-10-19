import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

function Language() {
  const [selected, setSelected] = useState("US");
  return (
    <ReactFlagsSelect
      selected={selected}
      onSelect={(code) => setSelected(code)}
      countries={["US", "FR", "IN"]}
      className="[&_span]:text-white my-2 lg:my-0 [&_span]:text-[1rem] [&_button]:border-[#cca354]/40  lg:[&_button]:border-none hover:[&_ul_li]:bg-gray-400 [&_ul]:bg-[#202b5d] [&_ul]:border-none"
      customLabels={{ US: "English", FR: "French", IN: "Hindu" }}
      optionsSize={12}
      selectedSize={12}
    />
  );
}

export default Language;
