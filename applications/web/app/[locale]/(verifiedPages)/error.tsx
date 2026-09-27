"use client";

import ErrorPage from "@/src/components/generalComponents/ErroPage";
import { ErrorType } from "@/src/utils/Error/getErrorMessage";
import { usePathname } from "next/navigation";
const error = () => {
  const pathname = usePathname();
  const currentPage = pathname?.toLocaleUpperCase().split("/")[2];
  console.log(currentPage)
  return <ErrorPage type={currentPage as ErrorType} />;
};

export default error;
