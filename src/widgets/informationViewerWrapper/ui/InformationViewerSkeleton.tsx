import { RecommendationListSkeleton } from "./RecommendationListSkeleton";

export const InformationViewerSkeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full animate-pulse">
        <div className="flex flex-row items-center justify-between overflow-x-hidden max-[1024px]:flex-col">
          <div className="w-full pb-4 lg:hidden">
            <div className="h-10 w-96 bg-gray-100" />
            <div className="flex flex-row items-end justify-between py-4">
              <div className="flex flex-row items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-100 shadow-sm" />
                <div className="space-y-1">
                  <p className="h-4 w-8 bg-gray-100" />
                  <p className="h-4 w-20 bg-gray-100" />
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="text-gray2 flex flex-row items-center gap-1">
                  <div className="h-4 w-4 bg-gray-100" />
                  <div className="h-4 w-7 bg-gray-100" />
                </div>
                <div className="text-gray2 flex flex-row items-center gap-1">
                  <div className="h-4 w-4 bg-gray-100" />
                  <div className="h-4 w-7 bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="h-138 w-117.5 max-[1024px]:w-full max-[744px]:h-110.25">
            <div className="h-104.25 w-full rounded-2xl bg-gray-100 max-[744px]:h-76.5" />
            <div className="flex w-fit flex-row items-center gap-3.5 overflow-x-hidden pt-3.5">
              {[1, 2, 3, 4].map((value) => (
                <div
                  key={value}
                  className="h-26.75 w-26.75 rounded-lg bg-gray-100"
                />
              ))}
            </div>
          </div>
          <div className="flex h-138 w-117.5 flex-col overflow-y-auto px-5 max-[1024px]:h-fit max-[1024px]:w-full max-[1024px]:px-0 max-[1024px]:pt-8">
            <div className="max-[1024px]:hidden">
              <div className="h-10 w-96 bg-gray-100" />
              <div className="flex flex-row items-end justify-between py-4">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-gray-100 shadow-sm" />
                  <div className="space-y-1">
                    <p className="h-4 w-8 bg-gray-100" />
                    <p className="h-4 w-20 bg-gray-100" />
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div className="text-gray2 flex flex-row items-center gap-1">
                    <div className="h-4 w-4 bg-gray-100" />
                    <div className="h-4 w-7 bg-gray-100" />
                  </div>
                  <div className="text-gray2 flex flex-row items-center gap-1">
                    <div className="h-4 w-4 bg-gray-100" />
                    <div className="h-4 w-7 bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1 py-3">
              <div className="h-4 w-4 bg-gray-100" />
              <div className="h-4 w-60 bg-gray-100" />
            </div>
            <div className="flex flex-col gap-2 py-4">
              <div className="h-5 w-full bg-gray-100" />
              <div className="h-5 w-full bg-gray-100" />
              <div className="h-5 w-full bg-gray-100" />
              <div className="h-5 w-full bg-gray-100" />
              <div className="h-5 w-20 bg-gray-100" />
            </div>
            <div className="flex flex-row items-center gap-1 pb-8">
              <div className="h-6 w-16 rounded-full bg-gray-100" />
              <div className="h-6 w-16 rounded-full bg-gray-100" />
              <div className="h-6 w-16 rounded-full bg-gray-100" />
            </div>
            <div className="border-gray3 flex flex-col gap-3 border-y-2 px-6 py-4">
              <div className="h-6 w-32 bg-gray-100" />
              {[1, 2, 3].map((value) => (
                <div
                  key={value}
                  className="ml-6 h-5 w-80 bg-gray-100 align-baseline"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 flex h-48 flex-col">
          <div className="h-48 w-full rounded-2xl border bg-gray-100" />
        </div>
        <div className="-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border-x border-b px-6 pt-12 pb-10">
          <div className="h-8 w-40 bg-gray-100" />
          <div className="flex flex-row items-start gap-1">
            <div className="h-5 w-5 bg-gray-100" />
            <div className="h-5 w-80 bg-gray-100" />
          </div>
        </div>
        <div className="mt-6 flex flex-row items-center justify-end gap-3">
          <div className="flex flex-row items-center gap-1">
            <div className="h-4 w-4 bg-gray-100" />
            <div className="h-4 w-7 bg-gray-100" />
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="h-4 w-4 bg-gray-100" />
            <div className="h-4 w-7 bg-gray-100" />
          </div>
        </div>
      </div>
      <RecommendationListSkeleton />
    </div>
  );
};
