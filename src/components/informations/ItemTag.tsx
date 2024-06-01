type MyProps = {
  tag: string;
};

const ItemTag = ({ tag }: MyProps) => {
  return (
    <div className="rounded-full border-2 border-neutral-400">
      <p className="p-1 text-[0.6rem] font-semibold text-neutral-400">#{tag}</p>
    </div>
  );
};

export default ItemTag;
