import { ModuleDef } from './types';

export const MODULES: ModuleDef[] = [
  { 
    id: 'expand-idea', 
    label: '아이디어 확장', 
    description: '초기 아이디어 브레인스토밍', 
    iconName: 'Lightbulb',
    easyDescription: '머릿속에 작은 생각 씨앗만 있을 때, 커다란 나무로 키워주는 도구예요! "재밌겠다" 싶은 생각을 구체적인 계획으로 바꿔줍니다.',
    exampleUsage: {
      input: "유튜브 채널 시작하기",
      output: "채널 컨셉 5가지, 필요한 장비 목록, 첫 달 영상 주제 10개 추천"
    },
    usageScenarios: [
      "막연하게 '유튜브 해볼까?' 생각만 들고 구체적인 주제가 안 떠오를 때",
      "블로그에 글을 써야 하는데 소재가 떨어져서 고민일 때",
      "학교 과제나 프로젝트 주제를 정했는데 내용을 어떻게 채울지 막막할 때"
    ]
  },
  { 
    id: 'marketify', 
    label: '마케팅 문장 변환', 
    description: '판매용 문구로 변환', 
    iconName: 'Megaphone',
    easyDescription: '그냥 평범한 말도 사람들이 "와, 이거 사고 싶다!"라고 느끼게 멋진 광고 문구로 바꿔주는 마법사예요.',
    exampleUsage: {
      input: "이 신발은 편해요.",
      output: "구름 위를 걷는 듯한 편안함, 하루 종일 신어도 발이 웃어요!"
    },
    usageScenarios: [
      "당근마켓이나 중고나라에 물건을 빨리 팔고 싶을 때",
      "내가 만든 쿠키나 수공예품을 인스타그램에서 홍보할 때",
      "가게 메뉴판 설명을 더 맛깔나게 바꾸고 싶을 때"
    ]
  },
  { 
    id: 'hookify', 
    label: '후킹 문장 생성', 
    description: '주목을 끄는 후킹 문구', 
    iconName: 'Magnet',
    easyDescription: '유튜브나 인스타그램을 보다가 엄지손가락을 딱! 멈추게 만드는 첫 마디를 만들어줘요.',
    exampleUsage: {
      input: "다이어트 방법",
      output: "운동 없이 3kg 빼는 비밀, 아직도 모르세요? (클릭을 부르는 제목)"
    },
    usageScenarios: [
      "유튜브 영상 조회수가 낮아서 클릭을 부르는 썸네일 제목이 필요할 때",
      "회사에서 보내는 전체 이메일이나 뉴스레터 제목을 짓기 어려울 때",
      "인스타그램 카드뉴스 첫 장에 들어갈 강렬한 문구가 필요할 때"
    ]
  },
  { 
    id: 'objection-crush', 
    label: '의심 해소 문장', 
    description: '고객의 의심과 반론 제거', 
    iconName: 'ShieldCheck',
    easyDescription: '친구들이 "에이, 그거 진짜야?"라고 의심할 때, 고개를 끄덕이게 만드는 믿음직한 답변을 알려줘요.',
    exampleUsage: {
      input: "이 강의 비싼 거 아니에요?",
      output: "커피 한 잔 값이면 평생 써먹을 기술을 배웁니다. 오히려 돈을 버는 투자죠!"
    },
    usageScenarios: [
      "고객이 가격이 비싸다고 망설일 때 설득하는 답변을 준비할 때",
      "새로운 서비스를 제안하는데 상대방이 효과를 의심할 때",
      "환불이나 AS 걱정 때문에 구매를 주저하는 사람을 안심시킬 때"
    ]
  },
  { 
    id: 'vs-table', 
    label: '비교표 생성', 
    description: '비교 차트 생성', 
    iconName: 'Table2',
    easyDescription: 'A랑 B 중에 뭐가 더 좋을까? 헷갈릴 때 딱 보기 좋게 표로 그려서 비교해줘요.',
    exampleUsage: {
      input: "아이폰 vs 갤럭시",
      output: "카메라, 배터리, 디자인, 가격을 표로 깔끔하게 정리"
    },
    usageScenarios: [
      "내 상품이 경쟁사 상품보다 무엇이 좋은지 한눈에 보여주고 싶을 때",
      "요금제 등 복잡한 옵션의 차이점을 표로 정리해서 보여줘야 할 때",
      "구매를 고민하는 사람에게 두 가지 선택지의 장단점을 딱 정리해줄 때"
    ]
  },
  { 
    id: 'storyspark', 
    label: '스토리텔링 전환', 
    description: '스토리텔링 서사 부여', 
    iconName: 'BookOpen',
    easyDescription: '딱딱한 설명글을 옛날이야기처럼 재미있고 감동적인 이야기로 바꿔서 들려줘요.',
    exampleUsage: {
      input: "우리 회사는 10년 됨",
      output: "단칸방에서 시작된 10년의 열정, 이제 세계를 향해 나아갑니다."
    },
    usageScenarios: [
      "자기소개서나 회사 소개 페이지를 감동적으로 쓰고 싶을 때",
      "딱딱한 정보성 글을 읽기 쉬운 에세이처럼 바꾸고 싶을 때",
      "브랜드가 어떻게 탄생했는지 비하인드 스토리를 들려줄 때"
    ]
  },
  { 
    id: 'clarify-it', 
    label: '명확한 한 문장 정리', 
    description: '한 문장으로 명확히 요약', 
    iconName: 'CheckCircle2',
    easyDescription: '말이 너무 길고 복잡해서 무슨 말인지 모르겠을 때, 딱 한 문장으로 시원하게 정리해줘요.',
    exampleUsage: {
      input: "회의 내용이 너무 길고 복잡해서...",
      output: "핵심 목표: 이번 달 매출 20% 달성을 위해 SNS 광고에 집중한다."
    },
    usageScenarios: [
      "횡설수설하게 쓴 보고서를 상사에게 보고하기 전 깔끔하게 다듬을 때",
      "너무 긴 뉴스 기사나 논문을 읽고 핵심 내용만 요약하고 싶을 때",
      "복잡한 서비스 이용 약관이나 규칙을 고객에게 쉽게 설명해야 할 때"
    ]
  },
  { 
    id: 'trend-lens', 
    label: '트렌드 반영 재해석', 
    description: '최신 트렌드 관점 적용', 
    iconName: 'TrendingUp',
    easyDescription: '내 글이 조금 촌스럽게 느껴질 때, 요즘 유행하는 스타일(MZ 스타일 등)로 세련되게 바꿔줘요.',
    exampleUsage: {
      input: "등산하러 가자",
      output: "요즘 힙한 등산룩 입고 #오운완 찍으러 갈 사람? ⛰️"
    },
    usageScenarios: [
      "너무 옛날 말투 같아서 요즘 세대에게 어색하게 느껴질까 봐 걱정될 때",
      "인스타그램이나 틱톡에 올릴 때 유행하는 밈(Meme)을 섞고 싶을 때",
      "트렌디한 느낌의 뉴스레터나 공지사항을 작성해야 할 때"
    ]
  },
  { 
    id: 'persona-fit', 
    label: '페르소나 맞춤화', 
    description: '타겟 독자 맞춤화', 
    iconName: 'UserCircle',
    easyDescription: '유치원생한테 말할 때랑 사장님한테 말할 때가 다르죠? 듣는 사람에 딱 맞춰서 말투를 바꿔줘요.',
    exampleUsage: {
      input: "조심하세요 (대상: 어린이)",
      output: "친구들! 다치지 않게 사뿐사뿐 걸어요~ 약속!"
    },
    usageScenarios: [
      "어려운 전문 용어를 초등학생이나 노인분들에게 쉽게 설명해야 할 때",
      "친구에게 말하듯 친근한 말투를 격식 있는 비즈니스 메일로 바꿀 때",
      "특정 직군(예: 개발자, 디자이너)이 공감할 수 있는 언어로 바꿔야 할 때"
    ]
  },
];

export const EXAMPLES = [
  "초보자를 위한 퍼스널 브랜딩 5단계 가이드",
  "AI 도구로 업무 생산성을 200% 높이는 노하우",
  "지속 가능한 다이어트 식단과 운동 루틴 짜기",
  "매출을 부르는 인스타그램 마케팅 카피라이팅",
  "번아웃을 극복하고 다시 동기부여를 얻는 방법"
];