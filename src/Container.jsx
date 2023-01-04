import React, { useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import InventoryGrid from "./InventoryGrid";
import bacNetData from "./data/bacNetData.json";

const Title = (props) => {
  console.log(props);
  return (
    <>
      <img src={props.tab.image} style={{ width: "75px" }} />
      {/* <span style={{ paddingLeft: "5px" }}>{props.tab.title}</span> */}
    </>
  );
};
const Container = () => {
  const tabs = [
    {
      title: "BACNet",
      image: "images/BACnetLogo.png",
    },
    {
      title: "Niagara",
      image: "images/niagara.png",
    },
  ];

  const [selected, setSelected] = useState(0);

  const handleSelect = (e) => {
    setSelected(e.selected);
  };

  const bacNetGridColumns = [
    {
      field: "field1",
      title: "Field 1",
    },
    {
      field: "field2",
      title: "Field 2",
    },
    {
      field: "groupField",
      title: "Group",
    },
  ];

  const niagaraGridColumns = [
    {
      field: "field3",
      title: "Field 3",
    },
    {
      field: "field4",
      titel: "Field 4",
    },
    {
      field: "groupField",
      title: "Group",
    },
  ];

  return (
    <>
      <TabStrip selected={selected} onSelect={handleSelect}>
        <TabStripTab title={<Title tab={tabs[0]} />}>
          <InventoryGrid
            inventoryData={bacNetData}
            gridColumns={bacNetGridColumns}
          />
        </TabStripTab>
        <TabStripTab title={<Title tab={tabs[1]} />}>
          <InventoryGrid inventoryData={[]} gridColumns={niagaraGridColumns} />
        </TabStripTab>
      </TabStrip>
    </>
  );
};

export default Container;
