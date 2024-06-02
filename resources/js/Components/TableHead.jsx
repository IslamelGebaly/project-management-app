import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

const TableHead = ({ name, sort_field, sort_order, sortColumn, children }) => {
  return (
    <th onClick={(e) => sortColumn(name)} className="px-3 py-3">
      <div className="flex items-center justify-between gap-1">
        {children}
        {sort_field === name ? (
          sort_order === "asc" ? (
            <ChevronUpIcon className="w-4" />
          ) : (
            <ChevronDownIcon className="w-4" />
          )
        ) : (
          <></>
        )}
      </div>
    </th>
  );
};

export default TableHead;
