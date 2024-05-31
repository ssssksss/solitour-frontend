import ItemTag from "./ItemTag";

type MyProps = {
  category: string;
  title: string;
  tags: string[];
};

const InformationItem = ({ category, title, tags }: MyProps) => {
  return (
    <div className="w-[310px] h-[310px] rounded-2xl bg-neutral-100 p-6 mt-4 flex flex-col justify-between">
      <div className="flex flex-row justify-between items-center">
        <div className="w-fit bg-white font-black text-gray-500 px-4 py-1 rounded-full text-sm shadow">
          {category}
        </div>
        <div>북마크</div>
      </div>
      <div>
        <div className="font-black text-lg">{title}</div>
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
