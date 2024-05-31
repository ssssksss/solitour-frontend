type MyProps = {
  tag: string;
};

const ItemTag = ({ tag }: MyProps) => {
  return (
    <div className="rounded-full border-[1px] border-neutral-400">
      <div className="px-2 py-1 text-[0.6rem] font-semibold text-neutral-400">
        #{tag}
      </div>
    </div>
  );
};

export default ItemTag;
