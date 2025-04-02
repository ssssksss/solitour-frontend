"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import { useFloatingButton } from "../model/useFloatingButton";
import { AddUserInformationForm } from "@/features/auth";
import { Modal } from "@/shared/ui/modal";

export const FloatingButton = () => {
  const {
    outside,
    visible,
    isOpen,
    closeModal,
    handleScrollToTop,
    handleWriteButtonClick,
    handleGatheringClick,
  } = useFloatingButton();

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <AddUserInformationForm closeModal={closeModal} />
      </Modal>
      <div className="fixed bottom-8 left-[calc(100vw-12px)] z-40 flex w-24 -translate-x-full flex-col items-center gap-3">
        <AnimatePresence>
          {visible && (
            <motion.div
              ref={outside}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-lightgreen flex flex-col items-center gap-6 rounded-full px-4 py-7.5">
                <motion.div
                  initial={{ opacity: 0, y: "0.5rem" }}
                  animate={{ opacity: 1, y: "0rem" }}
                  transition={{ bounce: false, delay: 0.4 }}
                >
                  <Link
                    className="hover:text-main flex flex-col items-center text-sm"
                    href="/diary/write"
                    onClick={handleWriteButtonClick}
                  >
                    <p>일기</p>
                    <p>등록하기</p>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "0.5rem" }}
                  animate={{ opacity: 1, y: "0rem" }}
                  transition={{ bounce: false, delay: 0.3 }}
                >
                  <Link
                    className="hover:text-main flex flex-col items-center text-sm"
                    href="/gathering/write"
                    onClick={(e) => handleGatheringClick(e)}
                  >
                    <p>모임</p>
                    <p>등록하기</p>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "0.5rem" }}
                  animate={{ opacity: 1, y: "0rem" }}
                  transition={{ bounce: false, delay: 0.2 }}
                >
                  <Link
                    className="hover:text-main flex flex-col items-center text-sm"
                    href="/informations/write"
                    onClick={handleWriteButtonClick}
                  >
                    <p>여행정보</p>
                    <p>등록하기</p>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className={[
            visible ? "bg-main" : "bg-black",
            "flex h-12 w-12 flex-row items-center justify-center rounded-full text-white shadow-md transition-all duration-300 hover:scale-105",
          ].join(" ")}
          onClick={handleWriteButtonClick}
        >
          {visible ? (
            <motion.div
              initial={{ rotate: "-90deg" }}
              animate={{ rotate: "0deg" }}
              transition={{ bounce: false }}
            >
              <MdClose size="1.5rem" />
            </motion.div>
          ) : (
            <Image
              className="-ml-1"
              src="/icons/pencil-icon.svg"
              alt="pencil-icon"
              width={24}
              height={24}
            />
          )}
        </button>
        <button
          className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105"
          onClick={handleScrollToTop}
        >
          <IoIosArrowUp size="1.5rem" />
        </button>
      </div>
    </div>
  );
};
