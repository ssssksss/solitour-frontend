const ImageAdditionItem = () => {
  return (
    <div className="my-10 flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 hover:border-main">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-main text-xl text-main">
        +
      </div>
      <p className="pb-[0.375rem] pt-3 text-xs font-semibold text-gray1">
        사진 추가
      </p>
      <p className="text-xs font-semibold text-gray2">0/12</p>
      <input
        className="hidden"
        type="file"
        id="photo"
        name="photo"
        accept=".png, .jpeg, .jpg"
      />
    </div>
  );
};

export default ImageAdditionItem;
