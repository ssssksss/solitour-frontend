type MyProps = {
  tag: string;
};

const ItemTag = ({ tag }: MyProps) => {
  return (
    <div className="rounded-full border-2 border-neutral-400">
      <div className="font-semibold text-[0.6rem] px-2 py-1 text-neutral-400">
        #{tag}
      </div>
    </div>
  );
};

export default ItemTag;
