import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Solitour의 Not found 페이지",
};

const NotFound = () => {
  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
