import { Skeleton } from "@mui/material";
import React from "react";

interface IPagination {
  pagination: { page: number; pages: number; total: number; limit: number };
}

const PaginationDetails: React.FC<IPagination> = ({ pagination }) => {
  return (
    <div className="flex justify-center md:justify-start">
      {pagination ? (
        <p className="text-sm font-semibold">
          Page {pagination.page} of {pagination.pages}
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            ({pagination.total} total users)
          </span>
        </p>
      ) : (
        <Skeleton width={150} />
      )}
    </div>
  );
};

export default PaginationDetails;
