import { CiBookmark } from "react-icons/ci";
import ItemTag from "./ItemTag";

type MyProps = {
  category: string;
  title: string;
  tags: string[];
};

const InformationItem = ({ category, title, tags }: MyProps) => {
  return (
    <div className="my-4 flex h-[300px] w-[300px] flex-col justify-between rounded-2xl bg-neutral-100 p-6 duration-300 hover:scale-105">
      <div className="flex flex-row items-center justify-between">
        <div className="w-fit rounded-full bg-white px-4 py-1 text-sm font-semibold text-gray-500 shadow">
          {category}
        </div>
        <div>
          <CiBookmark size={"2rem"} />
        </div>
      </div>
      <div>
        <div className="text-lg font-black">{title}</div>
        <div className="flex flex-row space-x-1 pt-2">
          {tags.map((tag, index) => (
            <ItemTag key={index} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationItem;
