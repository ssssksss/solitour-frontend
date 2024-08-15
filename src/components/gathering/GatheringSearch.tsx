interface IGatheringSearch {
    keywordRef: React.RefObject<HTMLInputElement>;
    searchHandler: (value: string) => void;
}
const GatheringSearch = (props: IGatheringSearch) => {
  return (
        <label className="relative min-[745px]:w-full min-[745px]:max-w-[28rem] w-full max-[768px]:w-full group">
          <input
            className="bg-[0rem_center] w-full pb-1 pl-8 pr-[3.5rem] border-b-[0.0625rem] border-black bg-search-icon bg-[length:1rem] bg-no-repeat text-sm outline-none placeholder:font-medium placeholder:text-gray2"
            type="text"
            autoComplete="search"
            name="search"
            placeholder="검색하기"
            maxLength={30}
            ref={props.keywordRef}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.ctrlKey && e.key === 'Enter' && props.keywordRef.current) {
                  props.searchHandler(props.keywordRef.current.value);
                }
            }}
            />
          <button
              className="absolute right-[0rem] bg-main text-white px-3 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={() => {
                    if (props.keywordRef.current) {
                      props.searchHandler(props.keywordRef.current.value);
                    }
              }}  
          >
            검색
          </button>
        </label>
  );
};
export default GatheringSearch