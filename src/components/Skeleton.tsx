import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProduct = () => {
  return (
    <div data-testid="skeleton-product" className="border p-4 rounded shadow-sm bg-white">
      <Skeleton height={130} className="mb-2" />
      <Skeleton width={"80%"} height={20} className="mb-1" />
      <Skeleton width={"50%"} height={15} />
    </div>
  );
};

export default SkeletonProduct;
