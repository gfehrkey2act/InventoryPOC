import React, { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {
  setExpandedState,
  setGroupIds,
  getGroupIds
} from "@progress/kendo-react-data-tools";

const initialFilter = {
  logic: "and",
  filters: []
};

const initialDataState = {
  take: 10,
  skip: 0,
  filter: initialFilter,
  group: []
};

const processWithGroups = (data, dataState) => {
  const newDataState = process(data, dataState);
  setGroupIds({
    data: newDataState.data,
    group: dataState.group
  });
  return newDataState;
};

const InventoryGrid = ({ inventoryData, gridColumns }) => {
  const [collapsedState, setCollapsedState] = useState([]);
  const [resultState, setResultState] = useState(
    processWithGroups(inventoryData, initialDataState)
  );
  const [gridData, setGridData] = useState(
    setExpandedState({
      data: resultState.data,
      collapsedIds: collapsedState
    })
  );
  const [dataState, setDataState] = useState(initialDataState);

  const onDataStateChange = (e) => {
    const newDataState = processWithGroups(gridData, e.dataState);
    setDataState(e.dataState);
    setResultState(newDataState);
  };

  const onExpandedChange = (e) => {
    const item = e.dataItem;
    if (item.groupId) {
      const collapsedIds = !e.value
        ? [...collapsedState, item.groupId]
        : collapsedState.filter((groupId) => groupId !== item.groupId);

      setCollapsedState(collapsedIds);
    }
  };

  return (
    <Grid
      groupable
      filterable
      data={gridData}
      {...dataState}
      onDataStateChange={onDataStateChange}
      onExpandChange={onExpandedChange}
      expandField="expanded"
    >
      {gridColumns.map((column, index) => (
        <Column
          key={index}
          reorderable
          field={column.field}
          title={column.name}
        />
      ))}
    </Grid>
  );
};

export default InventoryGrid;
