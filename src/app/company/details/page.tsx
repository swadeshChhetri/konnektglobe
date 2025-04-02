import { Suspense } from "react";
import CompanyDetails from "./CompanyDetails";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompanyDetails />
    </Suspense>
  );
}