type MyProps = {
  tag: string;
};

const ItemTag = ({ tag }: MyProps) => {
  return (
    <div className="rounded-full border-2 border-white">
      <p className="p-1 text-[0.6rem] font-semibold text-white">#{tag}</p>
    </div>
  );
};

export default ItemTag;
