import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "Solitour의 이용약관 페이지",
};

export default function page() {
  return (
    <div className="mb-20 mt-10 flex w-full flex-col gap-10">
      <h1 className="text-3xl font-bold">이용약관 v1</h1>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제1조 - 목적</h2>
        <p>
          {`이 약관은 Solitour
          홈페이지(이하 "Solitour"라고 합니다)에서 제공하는 인터넷 관련
          서비스를 이용함에 있어 홈페이지와 이용자의 권리·의무 및 책임사항을
          규정함을 목적으로 합니다.`}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제2조 - 정의</h2>
        <p>
          이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 여기에서 정의되지
          않은 이 약관상의 용어의 의미는 일반적인 관행에 따릅니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            <b>서비스</b>란 회원 또는 웹사이트 방문자가 이용할 수 있는,
            Solitour에서 제공하는 서비스를 말합니다.
          </li>
          <li>
            <b>회원</b>이란 Solitour에 회원등록을 한 자로서, 계속적으로
            Solitour가 제공하는 서비스를 이용할 수 있는 자를 말합니다.
          </li>
          <li>
            <b>비회원</b>이란 Solitour에 회원등록을 하지 않고 Solitour가
            제공하는 서비스를 이용할 수 있는 자를 말합니다.
          </li>
          <li>
            <b>게시물</b>이란 회원이 서비스를 이용하면서 게시한 글, 사진, 각종
            파일과 링크, 디지털 콘텐츠 등을 말합니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">
          제3조 - 약관 등의 명시와 설명 및 개정
        </h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour는 이 약관의 내용을 회원이 쉽게 확인할 수 있도록 웹사이트의
            초기 서비스 화면에 게시합니다. 다만, 약관의 구체적 내용은 회원이
            연결 화면을 통하여 볼 수 있도록 할 수 있습니다.
          </li>
          <li>
            Solitour는 『전자상거래 등에서의 소비자보호에 관한 법률』, 『약관의
            규제에 관한 법률』, 『전자문서 및 전자거래기본법』,
            『전자금융거래법』, 『전자서명법』, 『정보통신망 이용촉진 및
            정보보호 등에 관한 법률』, 『소비자기본법』 등 관련 법령을 위배하지
            않는 범위에서 이 약관을 개정할 수 있습니다.
          </li>
          <li>
            Solitour가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
            현행약관과 함께 Solitour의 초기화면에 그 적용일자 7일 이전부터
            적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을
            변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고
            공지합니다. 이 경우 Solitour는 개정 전 내용과 개정 후 내용을
            명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
          </li>
          <li>
            제3항에 의해 변경된 약관은 관련 법령에 특별한 규정 기타 부득이한
            사유가 없는 한 그 적용일자 이전으로 소급하여 적용되지 않습니다.
          </li>
          <li>
            제3항에 따라 공지된 적용일자 이후에 회원이 명시적으로 거부 의사를
            표명하지 않을 경우에는 개정된 약관에 동의하는 것으로 간주합니다.
            변경된 약관에 동의하지 않는 회원은 회원 탈퇴를 요청할 수 있습니다.
          </li>
          <li>
            제3항의 조치에도 불구하고 약관의 개정 사실을 알지 못함으로써
            발생하는 회원의 피해에 대하여 Solitour는 책임을 지지 않습니다.
          </li>
          <li>
            이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
            전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한
            법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및
            관계법령 또는 상관례에 따릅니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제4조 - 서비스의 제공 및 변경</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour에서는 다음과 같은 서비스를 제공합니다.
            <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
              <li>회원이 작성한 게시물에 대한 정보 제공</li>
              <li>재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</li>
              <li>구매계약이 체결된 재화 또는 용역의 배송</li>
              <li>기타 Solitour가 정하는 서비스 또는 업무</li>
            </ul>
          </li>
          <li>
            Solitour는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의
            경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을
            변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및
            제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시
            공지합니다.
          </li>
          <li>
            서비스가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의
            품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를
            이용자에게 통지 가능한 주소로 즉시 통지합니다.
          </li>
          <li>
            전항의 경우 Solitour는 이로 인하여 이용자가 입은 손해를 배상합니다.
            다만, Solitour가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
            않습니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제5조 - 서비스의 중단</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour는 천재지변 또는 이에 준하는 불가항력, 컴퓨터 등
            정보통신설비의 보수점검·교체, 고장, 통신의 두절 등의 사유가 발생한
            경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
          </li>
          <li>
            Solitour 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여
            이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, Solitour가
            고의 또는 과실이 없음을 입증하는 경우에는 그러하지 않습니다.
          </li>
          <li>
            사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를
            제공할 수 없게 되는 경우에는 Solitour는 제8조에 정한 방법으로
            이용자에게 통지하고 당초 Solitour에서 제시한 조건에 따라 소비자에게
            보상합니다. 다만, Solitour가 보상기준 등을 고지하지 아니한 경우에는
            이용자들의 마일리지 또는 적립금 등을 Solitour에서 통용되는
            통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제6조 - 회원가입</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            회원가입을 희망하는 사람은 연동을 마치고, 이 약관에 동의한다는
            의사를 표시함으로서 회원가입을 신청합니다.
          </li>
          <li>
            Solitour는 제1항과 같이 회원으로 가입할 것을 신청한 사람 중 다음 각
            호에 해당하지 않는 한 회원으로 등록합니다.
            <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
              <li>
                가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는
                경우
              </li>
              <li>
                기타 가입신청자를 회원으로 등록하는 것이 기술상 불가능하거나,
                서비스의 유지·관리에 현저한 지장을 준다고 판단되는 경우
              </li>
            </ul>
          </li>
          <li>
            회원가입의 성립 시기는 서비스의 가입 절차에 따라 승인이 완료되는
            시점으로 합니다.
          </li>
          <li>
            회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간
            이내에 Solitour에 대하여 회원정보 수정 등의 방법으로 그 변경사항을
            알려야 합니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제7조 - 회원 탈퇴 및 자격 상실 등</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            회원은 Solitour에 언제든지 탈퇴를 요청할 수 있으며 Solitour는 즉시
            회원탈퇴를 처리합니다.
          </li>
          <li>
            회원이 다음 각 호의 사유에 해당하는 경우, Solitour는 회원자격을 제한
            및 정지시킬 수 있습니다.
            <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
              <li>
                다른 사람의 서비스 이용을 방해하거나 그 정보를 도용한 경우
              </li>
              <li>
                서비스를 이용하여 Solitour의 허가 없이 영업활동을 하는 경우
              </li>
              <li>서비스를 이용하여 불법, 음란행위를 하는 경우</li>
              <li>
                기타 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에
                반하는 행위를 하는 경우
              </li>
            </ul>
          </li>
          <li>
            Solitour는 본 조에 따른 이용제한 등에 대해 Solitour가 정한 절차에
            따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 Solitour가
            인정하는 경우 Solitour는 즉시 서비스의 이용을 재개합니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제8조 - 회원에 대한 통지</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour가 회원에 대한 통지를 하는 경우 이메일 등으로 할 수
            있습니다.
          </li>
          <li>
            회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는
            개별통지를 할 수 있습니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제9조 - 개인정보보호</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour는 회원의 개인정보 수집 시 서비스 제공을 위하여 필요한
            범위에서 최소한의 개인정보를 수집합니다.
          </li>
          <li>
            Solitour는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며,
            새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는
            이용·제공단계에서 당해 회원에게 그 목적을 고지하고 동의를 받습니다.
            다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.
          </li>
          <li>
            회원은 언제든지 Solitour가 가지고 있는 자신의 개인정보에 대해 열람
            및 오류정정을 요구할 수 있으며 Solitour는 이에 대해 지체 없이 필요한
            조치를 취할 의무를 집니다. 회원이 오류의 정정을 요구한 경우에는
            Solitour는 그 오류를 정정할 때까지 당해 개인정보를 이용하지
            않습니다.
          </li>
          <li>
            Solitour는 개인정보 보호를 위하여 관리자를 한정하여 그 수를
            최소화하며 고유식별정보 등을 포함한 회원의 개인정보의 분실, 도난,
            유출, 변조 등으로 인한 회원의 손해에 대하여 모든 책임을 집니다.
          </li>
          <li>
            회원은 Solitour 이용을 위하여 자신의 개인정보를 성실히 관리해야 하며
            개인정보의 변동 사항이 있을 경우 이를 변경해야 합니다. 회원의
            개인정보 변경이 지연되거나 누락되어 발생하는 손해는 회원의 책임으로
            합니다. Solitour는 회원의 귀책사유로 인하여 유출된 개인정보에
            대해서는 일체의 책임을 지지 않습니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제10조 - Solitour의 의무</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour는 이 약관이 금지하거나 관련 법령 기타 공서양속에 반하는
            행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로
            서비스를 제공하는 데 최선을 다합니다.
          </li>
          <li>
            Solitour는 회원이 안전하게 인터넷 서비스를 이용할 수 있도록 회원의
            개인정보 보호를 위한 보안 시스템을 갖추어야 합니다.
          </li>
          <li>
            Solitour는 이용자가 원하지 않는 영리목적의 광고성 전자우편을
            발송하지 않습니다.
          </li>
          <li>
            Solitour는 회원으로부터 제기되는 의견이나 불만이 객관적으로
            정당하다고 인정될 경우에는 회원의 불만을 해결하기 위해 노력합니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">
          제11조 - 회원의 ID 및 비밀번호에 대한 의무
        </h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.</li>
          <li>
            회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제12조 - 회원의 의무</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            회원은 이 약관의 규정, Solitour의 이용정책, 이용안내 사항 및 관련
            법령 등을 준수하여야 하며, 기타 Solitour의 업무에 방해되는 행위를
            하여서는 안 됩니다.
          </li>
          <li>
            회원은 다음 각 호의 행위를 하여서는 안 됩니다.
            <ul className="flex list-disc flex-col gap-1 pl-5">
              <li>신청 또는 변경 시 허위내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>
                Solitour와 기타 제3자의 저작권 등 지적재산권에 대한 침해 행위
              </li>
              <li>
                Solitour 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는
                행위
              </li>
              <li>
                외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
                정보를 서비스에 공개 또는 게시하는 행위
              </li>
              <li>
                Solitour의 동의 없이 영리를 목적으로 서비스를 사용하는 행위
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제13조 - 회원의 게시물 등</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            회원이 서비스에 등록하는 게시물 등으로 인하여 본인 또는 타인에게
            손해나 기타 문제가 발생하는 경우 회원은 이에 대한 전적인 책임을 지게
            되며, Solitour는 이에 대하여 어떤 경우에도 책임을 지지 않습니다.
          </li>
          <li>
            Solitour는 다음 각 호에 해당하는 게시물 등을 회원의 사전 동의 없이
            임시게시 중단, 수정, 삭제, 이동 또는 등록 거부 등의 관련 조치를 취할
            수 있습니다.
            <ul className="flex list-disc flex-col gap-1 pl-5">
              <li>
                다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는
                내용인 경우
              </li>
              <li>
                공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는
                경우
              </li>
              <li>불법복제 또는 해킹을 조장하는 내용인 경우</li>
              <li>영리를 목적으로 하는 광고일 경우</li>
              <li>범죄와 결부된다고 객관적으로 인정되는 내용일 경우</li>
              <li>
                다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인
                경우
              </li>
              <li>
                사적인 정치적 판단이나 종교적 견해의 내용으로 Solitour가 서비스
                성격에 부합하지 않는다고 판단하는 경우
              </li>
              <li>기타 관계법령에 위배된다고 판단되는 경우</li>
            </ul>
          </li>
          <li>
            Solitour는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의
            권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시를
            중단할 수 있으며, 이의를 제기한 자와 게시물 등록자 간에 소송, 합의
            등을 통해 당해 게시물에 관한 법적 문제가 종결된 후 이를 근거로
            Solitour에 신청이 있는 경우에만 상기 임시로 게시가 중단된 게시물은
            다시 게시될 수 있습니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">
          제14조 - 저작권의 귀속 및 이용제한
        </h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour가 작성한 저작물에 대한 저작권 기타 지적재산권은 Solitour에
            귀속합니다.
          </li>
          <li>
            회원이 서비스 내에 게시한 저작물의 저작권은 원칙적으로 게시한
            회원에게 귀속됩니다. 단, Solitour는 서비스의 운영, 전시, 전송, 배포,
            홍보 등의 목적으로 회원의 별도의 허락 없이 무상으로 회원이 등록한
            저작물을 사용할 수 있습니다.
          </li>
          <li>
            이용자는 Solitour를 이용함으로써 얻은 정보 중 Solitour에게
            지적재산권이 귀속된 정보를 Solitour의 사전 승낙 없이 복제, 송신,
            출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
            제3자에게 이용하게 하여서는 안됩니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제15조 - 분쟁해결</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            Solitour는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는
            책임을 지지 않습니다.
          </li>
          <li>
            Solitour는 이용자에게 제공되는 서비스 이외의 문제로 발생하는 분쟁에
            대해서는 어떠한 책임도 지지 않습니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">제16조 - 재판권 및 준거법</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5">
          <li>
            이 약관의 해석 및 Solitour와 회원 간의 분쟁에 대하여는 대한민국의
            법률을 적용합니다.
          </li>
          <li>
            이 약관 및 서비스 이용과 관련하여 Solitour와 회원 사이에 분쟁이
            발생하여 소송이 제기되는 경우에는 『민사소송법』에 따라 관할법원을
            정합니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">부칙</h2>
        <p>이 약관은 2024년 9월 1일부터 적용됩니다.</p>
      </div>
    </div>
  );
}
