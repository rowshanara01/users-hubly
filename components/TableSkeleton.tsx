import { Skeleton } from "@mui/material";
import React from "react";

const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <tr key={idx} className="border-b border-b-gray-300">
          <td className="px-4 py-3">
            <Skeleton variant="text" width={150} />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="text" width={200} />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="text" width={80} />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="text" width={100} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
