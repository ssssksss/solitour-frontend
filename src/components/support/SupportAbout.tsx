import React from "react";
import SupportAboutBanner from "./about/SupportAboutBanner";

const SupportAbout = () => {
  return (
    <div className="flex w-full flex-col">
      <SupportAboutBanner />
      <div className="h-[35rem]" />
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">1. 정보</h2>
        <p className="text-gray-600">
          사용자들이 여행한 정보를 기록하고 다른 사람에게 공유하여 정보나 팁
          같은 것들을 이미지와 함께 제공하는 서비스입니다. 여행지의 사진과
          유용한 정보들을 함께 제공하여, 다른 사용자들이 여행 계획에 참고할 수
          있도록 합니다.
        </p>
      </div>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">2. 모임</h2>
        <p className="text-gray-600">
          사용자들이 모임 기간, 모임 마감일, 성별, 나이, 장소, 참여 인원 등을
          설정하여 모임을 등록하고, 모임에 신청할 수 있는 서비스를 제공합니다.
          이를 통해 다양한 모임을 효율적으로 관리하고, 참여자들과의 소통을
          원활하게 할 수 있습니다.
        </p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          3. 여행일기
        </h2>
        <p className="text-gray-600">
          본인 스스로 여행을 하면서 여행한 날짜마다 하루의 기분을 최고, 좋아,
          무난, 슬퍼, 화나와 같은 방식으로 설정하고, 본인의 여행 기록을 남길 수
          있는 기능입니다. 여행의 각 일정을 기록하고, 여행 중의 감정을 정리하여
          소중한 추억을 간직할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default SupportAbout;
