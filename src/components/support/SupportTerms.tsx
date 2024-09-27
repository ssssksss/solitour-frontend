interface ISupportTerms {}

const SupportTerms = (props: ISupportTerms) => {
  return (
    <section>
      <article className="mb-20 mt-10 flex w-full flex-col gap-10">
        <h2 className="text-3xl font-bold text-main" id={"terms-of-service"}>
          이용약관
        </h2>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제1조 - 목적</h3>
          <p>
            {`이 약관은 Solitour
          홈페이지(이하 "Solitour"라고 합니다)에서 제공하는 인터넷 관련
          서비스를 이용함에 있어 홈페이지와 이용자의 권리·의무 및 책임사항을
          규정함을 목적으로 합니다.`}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제2조 - 정의</h3>
          <p>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 여기에서
            정의되지 않은 이 약관상의 용어의 의미는 일반적인 관행에 따릅니다.
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
          <h3 className="text-xl font-bold">
            제3조 - 약관 등의 명시와 설명 및 개정
          </h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              Solitour는 이 약관의 내용을 회원이 쉽게 확인할 수 있도록
              웹사이트의 초기 서비스 화면에 게시합니다. 다만, 약관의 구체적
              내용은 회원이 연결 화면을 통하여 볼 수 있도록 할 수 있습니다.
            </li>
            <li>
              Solitour는 『전자상거래 등에서의 소비자보호에 관한 법률』,
              『약관의 규제에 관한 법률』, 『전자문서 및 전자거래기본법』,
              『전자금융거래법』, 『전자서명법』, 『정보통신망 이용촉진 및
              정보보호 등에 관한 법률』, 『소비자기본법』 등 관련 법령을
              위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
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
              법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침
              및 관계법령 또는 상관례에 따릅니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제4조 - 서비스의 제공 및 변경</h3>
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
              제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에
              즉시 공지합니다.
            </li>
            <li>
              서비스가 제공하기로 이용자와 계약을 체결한 서비스의 내용을
              재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는
              그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.
            </li>
            <li>
              전항의 경우 Solitour는 이로 인하여 이용자가 입은 손해를
              배상합니다. 다만, Solitour가 고의 또는 과실이 없음을 입증하는
              경우에는 그러하지 않습니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제5조 - 서비스의 중단</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              Solitour는 천재지변 또는 이에 준하는 불가항력, 컴퓨터 등
              정보통신설비의 보수점검·교체, 고장, 통신의 두절 등의 사유가 발생한
              경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </li>
            <li>
              Solitour 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로
              인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단,
              Solitour가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
              않습니다.
            </li>
            <li>
              사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를
              제공할 수 없게 되는 경우에는 Solitour는 제8조에 정한 방법으로
              이용자에게 통지하고 당초 Solitour에서 제시한 조건에 따라
              소비자에게 보상합니다. 다만, Solitour가 보상기준 등을 고지하지
              아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 Solitour에서
              통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게
              지급합니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제6조 - 회원가입</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              회원가입을 희망하는 사람은 연동을 마치고, 이 약관에 동의한다는
              의사를 표시함으로서 회원가입을 신청할 수 있습니다.
            </li>
            <li>
              Solitour는 제1항에 따른 신청에 대하여 아래 각 호의 경우를
              제외하고는 승낙합니다.
              <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
                <li>신청자가 이 약관에 위배되는 경우</li>
                <li>신청자가 실명 또는 다른 사람의 명의를 도용한 경우</li>
                <li>
                  신청자가 부정한 목적으로 서비스를 이용하거나 자사를 저해할
                  경우
                </li>
                <li>기타 Solitour가 정한 회원가입 기준에 미달하는 경우</li>
              </ul>
            </li>
            <li>
              Solitour는 회원가입의 승낙을 한 경우, 회원에게 회원가입의 의사 및
              신청서를 회신합니다.
            </li>
            <li>
              Solitour는 회원가입신청의 승낙을 하지 않을 경우, 그 사유를
              회원에게 통지합니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제7조 - 회원탈퇴 및 자격 상실</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              회원은 언제든지 본인의 의사에 따라 탈퇴를 요청할 수 있으며,
              Solitour는 즉시 회원탈퇴를 처리합니다.
            </li>
            <li>
              Solitour는 회원이 다음 각 호의 사유에 해당하는 경우, 회원자격을
              제한하거나 상실시킬 수 있습니다.
              <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
                <li>다른 사람의 정보를 도용하여 가입한 경우</li>
                <li>불법적인 활동을 한 경우</li>
                <li>회원가입 정보를 허위로 기재한 경우</li>
                <li>
                  서비스 운영을 방해하거나 서비스를 부적절하게 이용한 경우
                </li>
                <li>기타 Solitour가 정한 회원가입 기준에 위배되는 경우</li>
              </ul>
            </li>
            <li>
              제2항에 따라 회원자격을 제한하거나 상실시킨 경우, Solitour는
              회원에게 그 사유를 통지합니다.
            </li>
            <li>
              제3항의 경우, 회원이 이의를 제기하지 않으면 회원자격 상실이
              확정됩니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제8조 - 회원의 의무</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              회원은 관계 법령, 이 약관의 규정 및 Solitour이 통지하는 사항을
              준수하여야 합니다.
            </li>
            <li>
              회원은 서비스의 이용권한을 타인에게 양도하거나 대여할 수 없습니다.
            </li>
            <li>
              회원은 본인의 회원정보를 항상 최신의 상태로 유지하여야 하며,
              회원가입 시 제공한 정보에 변경이 있을 경우 즉시 이를 Solitour에
              통지하여야 합니다.
            </li>
            <li>
              회원은 본인의 회원정보를 타인에게 양도하거나 대여할 수 없으며,
              회원은 본인의 계정 및 비밀번호를 안전하게 관리하여야 합니다.
            </li>
            <li>
              회원은 본인의 계정이 무단으로 사용된 경우 즉시 Solitour에
              통지하고, 해당 계정의 사용을 중지할 수 있도록 하여야 합니다.
            </li>
            <li>
              회원은 서비스를 이용하여 다음 각 호의 행위를 하여서는 안 됩니다.
              <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
                <li>
                  불법적인 내용의 정보, 텍스트, 소프트웨어, 음악, 사진, 그래픽,
                  영상, 메시지 등을 게시하는 행위
                </li>
                <li>저작권, 상표권 등 타인의 지적재산권을 침해하는 행위</li>
                <li>서비스의 운영을 방해하는 행위</li>
                <li>
                  다른 회원의 개인정보를 무단으로 수집하거나 저장하는 행위
                </li>
                <li>기타 법령 및 이 약관에 위배되는 행위</li>
              </ul>
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제9조 - 게시물의 관리</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              Solitour는 회원이 게시한 게시물이 다음 각 호의 경우에 해당하는
              경우, 사전 통지 없이 이를 삭제하거나 이동할 수 있습니다.
              <ul className="my-4 flex list-disc flex-col gap-1 pl-5">
                <li>
                  불법적인 내용의 정보, 텍스트, 소프트웨어, 음악, 사진, 그래픽,
                  영상, 메시지 등이 포함된 경우
                </li>
                <li>타인의 권리를 침해하거나 명예를 훼손하는 경우</li>
                <li>서비스의 운영을 방해하는 경우</li>
                <li>기타 법령 및 이 약관에 위배되는 경우</li>
              </ul>
            </li>
            <li>
              Solitour는 제1항의 경우, 회원에게 사후 통지하고 그 사유를
              설명합니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">
            제10조 - 저작권의 귀속 및 이용제한
          </h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              서비스 내 모든 콘텐츠의 저작권은 Solitour 및 관련 권리자에게
              귀속됩니다. 회원이 게시한 게시물의 저작권은 게시한 회원에게
              귀속됩니다.
            </li>
            <li>
              Solitour는 서비스를 통해 회원이 게시한 게시물을 홍보, 광고
              목적으로 사용할 수 있으며, 이 경우 회원에게 별도로 보상하지
              않습니다.
            </li>
            <li>
              회원이 게시한 게시물이 타인의 권리를 침해하거나 법령에 위반되는
              경우, 해당 게시물의 게시자는 모든 법적 책임을 지며, Solitour는
              해당 게시물에 대한 책임을 지지 않습니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제11조 - 면책조항</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              Solitour는 서비스의 이용과 관련하여 회원에게 발생한 손해에 대하여,
              Solitour의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
            </li>
            <li>
              Solitour는 서비스의 이용과 관련하여 발생한 손해에 대하여
              Solitour의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
            </li>
            <li>
              Solitour는 서비스에 대한 접근을 보장하지 않으며, 서비스의 가용성에
              대한 보증을 하지 않습니다.
            </li>
            <li>
              회원이 서비스 이용 중 발생한 모든 행위에 대해 책임을 지며,
              Solitour는 이에 대해 책임을 지지 않습니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제12조 - 분쟁해결</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              Solitour는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위해
              노력합니다.
            </li>
            <li>
              제1항의 노력에도 불구하고 분쟁이 해결되지 않는 경우, 소송은
              Solitour의 본사 소재지 관할 법원에서 제기합니다.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold">제13조 - 기타</h3>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              이 약관은 대한민국 법률에 따라 해석되며, 이에 따라 법적 효력을
              발휘합니다.
            </li>
            <li>
              이 약관에 명시되지 않은 사항은 관련 법령 또는 상관례에 따릅니다.
            </li>
          </ol>
        </div>
      </article>
      <article>
        <h1 className="mb-10 text-3xl font-bold text-main" id="privacy-policy">
          개인정보 처리방침
        </h1>
        <div className="space-y-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">
              제1조 - 개인정보의 수집 및 이용 목적
            </h2>
            <p>
              {`Solitour(이하 "회사"라 합니다)는 다음과 같은 목적을 위해
              개인정보를 수집하고 이용합니다:`}
            </p>
            <ul className="list-disc pl-5">
              <li>서비스 제공 및 운영</li>
              <li>회원 관리 및 고객 지원</li>
              <li>서비스 개선 및 분석</li>
              <li>마케팅 및 광고</li>
              <li>법적 요구 사항 준수</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">
              제2조 - 수집하는 개인정보 항목
            </h2>
            <p>회사는 다음과 같은 개인정보를 수집합니다:</p>
            <ul className="list-disc pl-5">
              <li>이름</li>
              <li>이메일 주소</li>
              <li>전화번호</li>
              <li>주소</li>
              <li>회원가입 시 제공된 정보</li>
              <li>서비스 이용 기록</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">
              제3조 - 개인정보의 보유 및 이용 기간
            </h2>
            <p>
              회사는 개인정보를 수집한 목적을 달성할 때까지 보유하며, 법령에
              따라 필요한 경우 그 기간을 연장할 수 있습니다. 보유 기간이 종료된
              개인정보는 즉시 파기합니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">
              제4조 - 개인정보의 제3자 제공
            </h2>
            <p>
              회사는 원칙적으로 개인정보를 제3자에게 제공하지 않으며, 아래의
              경우에는 예외로 합니다:
            </p>
            <ul className="list-disc pl-5">
              <li>회원의 동의가 있는 경우</li>
              <li>법령에 따라 제공이 요구되는 경우</li>
              <li>서비스 제공을 위해 필요한 경우</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">
              제5조 - 개인정보의 안전성 확보 조치
            </h2>
            <p>
              회사는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를
              취합니다:
            </p>
            <ul className="list-disc pl-5">
              <li>정보 암호화 및 보안 시스템 구축</li>
              <li>정기적인 보안 점검</li>
              <li>접근 권한 관리</li>
              <li>교육 및 인식 제고</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">제6조 - 개인정보 처리 위탁</h2>
            <p>
              회사는 개인정보 처리를 외부에 위탁할 수 있으며, 이 경우 위탁계약을
              통해 개인정보 보호를 위한 조치를 취합니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">제7조 - 이용자의 권리</h2>
            <p>
              이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리
              정지 요청을 할 수 있습니다. 이러한 요청은 회사의 개인정보 보호
              담당자에게 연락하여 처리할 수 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">제8조 - 개인정보 보호 책임자</h2>
            <p>개인정보 보호에 대한 책임자는 다음과 같습니다:</p>
            <ul className="list-disc pl-5">
              <li>이름: [책임자 이름]</li>
              <li>직위: [직위]</li>
              <li>연락처: [연락처]</li>
              <li>이메일: [이메일]</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">
              제9조 - 개인정보 처리방침의 변경
            </h2>
            <p>
              개인정보 처리방침은 법령이나 회사 정책에 따라 변경될 수 있으며,
              변경된 사항은 즉시 공지됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">제10조 - 시행일</h2>
            <p>이 개인정보 처리방침은 [시행일]부터 시행됩니다.</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SupportTerms;
