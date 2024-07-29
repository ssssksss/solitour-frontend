import { Modal } from "@/components/common/modal/Modal";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import GatheringCategoryModal from "../modal/GatheringCategoryModal";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}
interface IGatheringCategoryProps {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GatheringCategory = (props: IGatheringCategoryProps) => {
  const formContext = useFormContext();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/gathering`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCategoryList(result)
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <div className={"flex w-full items-center gap-x-[2rem]"}>
        <div className={"w-[7rem] flex-shrink-0"}>
          <span className={"relative text-lg font-semibold"}>
            카테고리
            <span className="absolute right-[-.5rem] top-[-.5rem] text-lg text-main">
              *
            </span>
          </span>
        </div>
        <button
          onClick={() => props.openModal()}
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          카테고리 선택
        </button>
        <div>
          {formContext.getValues("mainCategoryId") != 0 &&
            formContext.getValues("subCategoryId") != 0 &&
            "OK"}
        </div>
        <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
          <GatheringCategoryModal
            closeModal={() => props.closeModal()}
            categoryList={categoryList}
          />
        </Modal>
      </div>
      <div
        className={
          "flex h-[7rem] flex-col justify-center gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        }
      >
        <div className={"flex h-[2.75rem] items-center"}>
          <span className={"pr-[.5rem]"}> 메인 카테고리 : </span>
          {formContext.getValues("mainCategoryId") != 0 &&
            categoryList.filter(
              (i: { id: number }) =>
                i.id == formContext.getValues("mainCategoryId"),
            )[0].name}
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className={"pr-[.5rem]"}> 서브 카테고리 : </span>
          {formContext.getValues("subCategoryId") != 0 &&
            categoryList
              .filter(
                (i: { id: number }) =>
                  i.id == formContext.getValues("mainCategoryId"),
              )[0]
              .childrenCategories.filter(
                (i: { id: number }) =>
                  i.id == formContext.getValues("subCategoryId"),
              )[0].name}
        </div>
      </div>
    </article>
  );
};

export default GatheringCategory;
