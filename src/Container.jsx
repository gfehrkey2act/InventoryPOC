import React, { useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

const Container = () => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (e) => {
    setSelected(e.selected);
  };

  return (
    <>
      <TabStrip selected={selected} onSelect={handleSelect}>
        <TabStripTab title={"BACNet"}>
          <p>This will be the Bac Net Page</p>
        </TabStripTab>
        <TabStripTab title={"Niagara"}></TabStripTab>
      </TabStrip>
    </>
  );
};

export default Container;
