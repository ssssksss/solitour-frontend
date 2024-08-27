import React from "react";
import { HashLoader } from "react-spinners";

interface Props {
  loading: boolean;
}

const HashSpinner = ({ loading }: Props) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/10">
      <HashLoader
        color="#00B488"
        loading={loading}
        cssOverride={{ display: "block", margin: "0 auto" }}
      />
    </div>
  );
};

export default HashSpinner;
