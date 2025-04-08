<h1>Solitour - 새로운 나를 찾는 여행</h1>

![394534337-e65f5376-ecf0-4b69-aab0-df5920130856](https://github.com/user-attachments/assets/806b95bd-ab25-462c-adde-e292e36a4754)

> 배포 링크 <br/> **https://www.solitourist.com**

<br />

<div align="center">
   <a href="https://github.com/TripInfoWeb/solitour-frontend/wiki" target="_blank"><img src="https://img.shields.io/badge/GitHub%20Wiki-181717?logo=github&logoColor=white"></a>
   <a href="https://github.com/orgs/TripInfoWeb/projects/6" target="blank"><img src="https://img.shields.io/badge/🎯Backlog%20-02B78F?logo=none&logoColor=white"></a>
</div>

<br/>
<br/>

<h2>목차</h2>

- [✅ 서비스 소개](#-서비스-소개)
- [💾 주요 기능](#-주요-기능)
  - [메인 페이지](#메인-페이지)
  - [정보 목록 조회](#정보-목록-조회)
  - [정보 생성](#정보-생성)
  - [정보 상세 조회](#정보-상세-조회)
  - [정보 수정](#정보-수정)
  - [모임 목록 조회](#모임-목록-조회)
  - [모임 상세 조회](#모임-상세-조회)
  - [모임 수정](#모임-수정)
  - [모임 삭제](#모임-삭제)
  - [모임 참가](#모임-참가)
  - [로그인](#로그인)
  - [마이페이지](#마이페이지)
  - [고객지원](#고객지원)
- [✏️ 개발 기록](#️-개발-기록)
- [🔑 트러블슈팅 해결 경험](#-트러블슈팅-해결-경험)
- [🏛️️ 아키텍처](#️️-아키텍처)
- [📚 기술스택](#-기술스택)
- [👤 팀원 소개](#-팀원-소개)

<br/>
<br/>

## ✅ 서비스 소개

- <b>Solitour(솔리투어)</b>는 사용자들이 여행한 정보를 기록하고 공유하여 여행 정보나 팁을 이미지와 함께 제공하거나, 사용자들이 모임 기간, 모임 마감일, 성별, 나이, 장소, 참여 인원 등을 설정하여 모임을 등록하고, 모임에 신청할 수 있는 서비스를 제공합니다. 또한 본인의 여행 기록을 남길 수 있는 서비스도 제공합니다.
  - 여행 정보
    - Solitour는 사용자들이 직접 작성한 여행 정보를 통해 혼자 여행하는 사람들에게 유용한 맛집, 숙박, 액티비티 정보를 제공합니다.
    - 이를 통해 혼자 여행하는 사람들이 경험에 기반한 신뢰할 수 있는 정보를 쉽게 얻을 수 있습니다.
  - 모임
    - 사용자들은 취미와 활동을 기반으로 모임을 생성하고 참여할 수 있습니다.
    - 이를 통해 평소에 혼자 즐기기 어려웠던 취미와 활동을, 공통의 관심사를 갖고 있던 사람들과 함께 즐길 수 있는 기회를 제공합니다.
  - 여행 일기
    - 사용자 자신의 여행 기억을 이미지와 감정을 함께 기록하고 일기 형식으로 남기면서 자신의 여행을 회고할 수 있는 서비스를 제공합니다.

<br/>
<br/>

## 💾 주요 기능

### 메인 페이지

![홈](https://github.com/user-attachments/assets/b22587af-d65b-4414-96a7-bc681c68d8b4)

- 메인 페이지에서는 최근 3개월 내에 사람들이 많이 찾아본 여행 정보를 확인할 수 있습니다.
- 또한 최근 모집 중인 모임에 대한 정보를 확인할 수 있습니다.

<br/>

### 정보 목록 조회

![정보목록](https://github.com/user-attachments/assets/2f19b727-ac94-45bf-ba2a-b9f73f9bdc91)

- 최근 3개월 내의 가장 인기 있는 여행 정보 글 Top 5를 확인할 수 있습니다.
- 정보 목록 페이지에서는 작성된 여행 정보 목록을 확인할 수 있습니다.
- 카테고리 별로 여행 정보 목록을 확인할 수 있습니다.
- 제목 검색과 태그 검색 기능을 지원합니다.
- 정보 글 목록을 최신순, 좋아요순, 조회순으로 조회할 수 있습니다.
- 지역별 필터링 기능을 지원합니다.
- 북마크 기능을 지원합니다.

<br/>

### 정보 생성

![정보생성](https://github.com/user-attachments/assets/0f0aed95-a886-40c1-8774-fcee5722f9b7)

- 제목, 장소, 카테고리, 이미지, 내용, 해시태그, 정보 Tip을 등록할 수 있습니다.
- 이미지는 최대 12개까지 등록할 수 있습니다.

<br/>

### 정보 상세 조회

![정보상세](https://github.com/user-attachments/assets/553b23ad-f79d-4e9c-a958-2b280cee33b5)

- 다른 사용자가 작성한 여행 상세 정보를 조회할 수 있습니다.
- 좋아요수, 조회수를 확인할 수 있습니다.
- 동일한 카테고리에 속하는 추천 여행 정보 목록을 확인할 수 있습니다.

<br/>

### 정보 수정

![정보수정](https://github.com/user-attachments/assets/65edb0b8-f783-4149-979e-4f22aaf8cb3f)

- 자신이 작성한 정보 글을 수정할 수 있습니다.

<br/>

### 모임 목록 조회

![모임목록](https://github.com/user-attachments/assets/8dfa1152-cd9c-4bb2-a8f5-6c9ec140fcc8)

- 최근 3개월 내의 가장 인기 있는 모임 모집 글 Top 5를 확인할 수 있습니다.
- 모임 목록 페이지에서는 현재 모집 중인 모임 목록을 확인할 수 있습니다.
- 취미 또는 활동 별로 모임 목록을 확인할 수 있습니다.
- 제목 검색과 태그 검색 기능을 지원합니다.
- 모임 목록을 최신순, 좋아요순, 조회순으로 조회할 수 있습니다.
- 지역별, 성별, 나이별, 기간별 필터링 기능을 지원합니다.
- 북마크 기능을 지원합니다.

<br/>

### 모임 상세 조회

![모임상세](https://github.com/user-attachments/assets/5a034d53-c0ed-4167-9509-4ccaae242059)

- 모임을 생성한 사용자는 현재 모임 참가 신청자 목록을 확인할 수 있습니다.
- 모임 주최자는 모임 신청에 대해 승인 또는 거절을 할 수 있습니다.
- 좋아요수, 조회수를 확인할 수 있습니다.
- 동일한 카테고리에 속하는 추천 모임 목록을 확인할 수 있습니다.

<br/>

### 모임 수정

![모임수정](https://github.com/user-attachments/assets/e4945527-630b-4e87-b8ca-1bb8a3562b73)

- 자신이 작성한 모임 글을 수정할 수 있습니다.

<br/>

### 모임 삭제

![모임삭제](https://github.com/user-attachments/assets/63770824-00c1-48bf-98b4-bd5ebc9017d9)

- 자신이 작성한 모임 글을 삭제할 수 있습니다.

<br/>

### 모임 참가

![모임참가](https://github.com/user-attachments/assets/395ea2a7-07f6-4efb-8945-f74561a4dc47)

- 사용자는 다른 사용자가 생성한 모임에 대해 참가 신청을 하거나 취소할 수 있습니다.

<br/>

### 로그인

![로그인](https://github.com/user-attachments/assets/093e6cc5-eccb-4ac3-b2fb-e711447f081e)

- 사용자가 서비스를 쉽게 이용할 수 있도록 Kakao OAuth 로그인을 지원합니다.

<br/>

### 마이페이지

![마이페이지](https://github.com/user-attachments/assets/5e377b07-36e6-47a5-b2a1-782a5da4815a)

- 마이페이지에서 자신이 작성한 정보 또는 모임 글을 확인할 수 있습니다.
- 북마크한 정보 또는 모임 글을 확인할 수 있습니다.
- 닉네임이나 프로필 이미지를 변경할 수 있습니다.
- 서비스를 더 이상 이용하지 않을 경우 회원탈퇴 기능을 지원합니다.

<br/>

### 고객지원

![고객지원](https://github.com/user-attachments/assets/f05d6538-4296-4ba2-ac44-d81f638c3f43)

- 서비스 소개, 공지사항, FAQ, 이용약관 정보를 제공합니다.

<br/>
<br/>

## ✏️ 개발 기록

| 제목                                                                                                                                                                                                                                                                                                              | 핵심 키워드             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [🧱(리팩토링 전) Presentational & Container Components 패턴](<https://github.com/TripInfoWeb/solitour-frontend/wiki/%F0%9F%A7%B1(%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%EC%A0%84)-Presentational-&-Container-Components-%ED%8C%A8%ED%84%B4>)                                                                       | `FE Architecture`       |
| [🧱(리팩토링 후) Presentational & Container Components 패턴을 제거한 이유](<https://github.com/TripInfoWeb/solitour-frontend/wiki/%F0%9F%A7%B1(%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%ED%9B%84)-Presentational-&-Container-Components-%ED%8C%A8%ED%84%B4%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%9C-%EC%9D%B4%EC%9C%A0>) | `FE Architecture`       |
| [📘Next.js 프로젝트에 FSD 아키텍처 적용하기](https://hyunjinno.github.io/posts/fsd-example-nextjs/)                                                                                                                                                                                                               | `FE Architecture` `FSD` |

<br />
<br />

## 🔑 트러블슈팅 해결 경험

| 제목 | 핵심 키워드 |
| ---- | ----------- |
| ?    | ?           |

<br />
<br />

## 🏛️️ 아키텍처

![architecture](https://github.com/user-attachments/assets/b543874f-f861-4ad5-9c9e-32a58a2648f9)

<br/>
<br/>

## 📚 기술스택

| 분류                | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FE                  | ![](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white) ![](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=white) ![](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white) ![](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white) ![](https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=white) ![](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=ffffff) ![](https://img.shields.io/badge/-Zod-FF4154?logo=zod&logoColor=white) ![](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?logo=reacthookform&logoColor=white) ![](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=Framer&logoColor=white) |
| BE                  | ![](https://img.shields.io/badge/Java-%23ED8B00.svg?logo=openjdk&logoColor=white) ![](https://img.shields.io/badge/Spring-6DB33F?logo=Spring&logoColor=white) ![](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=Spring%20Boot&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Database            | ![](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Infrastructure      | ![](https://img.shields.io/badge/Vercel-000000?logo=Vercel&logoColor=white) ![](https://img.shields.io/badge/Nginx-%23009639.svg?logo=nginx&logoColor=white) ![](https://img.shields.io/badge/Amazon%20EC2-FF9900?logo=amazonec2&logoColor=white) ![](https://img.shields.io/badge/Amazon%20S3-569A31?logo=Amazon%20S3&logoColor=white) ![](https://img.shields.io/badge/Amazon%20RDS-527FFF?logo=Amazon%20RDS&logoColor=white) ![](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=GitHub%20Actions&logoColor=white)                                                                                                                                                                                                                                                                                                                             |
| Collaboration Tools | ![](https://img.shields.io/badge/Figma-%23F24E1E.svg?logo=figma&logoColor=white) ![](https://img.shields.io/badge/-Notion-000000?logo=notion&logoColor=white) ![](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white) ![](https://img.shields.io/badge/-Slack-4A154B?logo=slack&logoColor=white) ![](https://img.shields.io/badge/Discord-5865F2?logo=Discord&logoColor=white) ![](https://img.shields.io/badge/Jira-0052CC?logo=Jira&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                 |

<br/>
<br/>

## 👤 팀원 소개

|       김수아        |                                 노현진                                 |                                이수경                                 |                                원동훈                                |                                 정재현                                 |
| :-----------------: | :--------------------------------------------------------------------: | :-------------------------------------------------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|                     | <img src="https://github.com/HyunJinNo.png" width="100" height="100"/> | <img src="https://github.com/ssssksss.png" width="100" height="100"/> | <img src="https://github.com/Astin01.png" width="100" height="100"/> | <img src="https://github.com/hyeonjaez.png" width="100" height="100"/> |
| Sua0714@hotmail.com |               [@HyunJinNo](https://github.com/HyunJinNo)               |               [@ssssksss](https://github.com/ssssksss)                |                [@Astin01](https://github.com/Astin01)                |               [@hyeonjaez](https://github.com/hyeonjaez)               |
|      Designer       |                               Front-end                                |                               Front-end                               |                               Back-end                               |                                Back-end                                |
