import ItemTag from "./ItemTag";

type MyProps = {
  category: string;
  title: string;
  tags: string[];
};

const InformationItem = ({ category, title, tags }: MyProps) => {
  return (
    <div className="mt-4 flex h-[310px] w-[310px] flex-col justify-between rounded-2xl bg-neutral-100 p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="w-fit rounded-full bg-white px-4 py-1 text-sm font-black text-gray-500 shadow">
          {category}
        </div>
        <div>북마크</div>
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
