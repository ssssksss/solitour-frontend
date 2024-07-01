"use client"; // Error components must be Client Components

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "error",
  description: "Solitour의 error 페이지",
};

const Error = () => {
  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <h1>Error</h1>
    </div>
  );
};

export default Error;
