import { ModalTemplate } from "@/shared/ui/modal";

interface GatheringChattingLinkCheckModalProps {
  openChattingUrl: string;
  closeModal: () => void;
}

const GatheringChattingLinkCheckModal = ({
  openChattingUrl,
  closeModal,
}: GatheringChattingLinkCheckModalProps) => {
  return (
    <ModalTemplate
      className="max-h-[340px] w-[calc(100vw-1rem)] max-w-[40rem]"
      closeModal={closeModal}
    >
      <article className="flex w-full flex-col">
        <h3 className="text-lg font-medium text-gray-900">링크 확인</h3>
        <p className="mt-2 text-sm text-gray-500">이 링크를 확인해보세요 ⚠️</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm break-all text-blue-600"
          href={openChattingUrl}
        >
          {openChattingUrl}
        </a>
        <p className="mt-4 text-sm text-gray-500">
          링크의 URL의 주소가 이상하다고 판단이 되면 링크를 클릭하지 마시기
          바랍니다.
        </p>

        <div className="mt-2 border-t border-gray-200 pt-4">
          <h4 className="text-md font-medium text-gray-900">채팅 링크 예시</h4>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li>
              카카오 오픈 채팅 링크 예시 : https://open.kakao.com/o/gvCEsWke
            </li>
            <li>디스코드 오픈 채팅 링크 예시 : https://discord.gg/4r6pS6K5</li>
            <li>
              텔레그램 오픈 채팅 링크 예시 :
              https://t.me/joinchat/AAAAAEg5H44F2s6kGzhqHg
            </li>
          </ul>
        </div>
      </article>
    </ModalTemplate>
  );
};

export default GatheringChattingLinkCheckModal;
