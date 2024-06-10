type MyProps = {
  tag: string;
  borderColor?: string;
  textColor?: string;
};

const ItemTag = ({
  tag,
  borderColor = "border-white",
  textColor = "text-white",
}: MyProps) => {
  return (
    <div className={`rounded-full border-2 ${borderColor}`}>
      <p className={`p-1 text-[0.6rem] font-semibold ${textColor}`}>#{tag}</p>
    </div>
  );
};

export default ItemTag;
