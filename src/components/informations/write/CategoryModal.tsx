import { MdClose } from "react-icons/md";

type MyProps = {
  closeModal: () => void;
};

const CategoryModal = ({ closeModal }: MyProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-[31.25rem] w-[31.25rem] flex-col bg-white p-4">
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-gray-100 p-2 text-gray2 hover:text-main">
          <MdClose size="2rem" onClick={closeModal} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-black">카테고리 선택</h2>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-black">서브 카테고리 선택</h2>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
