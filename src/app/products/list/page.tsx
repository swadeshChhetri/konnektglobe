import { Suspense } from "react";
import ProductListPage from "./ProductListPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListPage />
    </Suspense>
  );
}



