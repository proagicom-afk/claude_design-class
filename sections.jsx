/* 클로드 디자인 클래스 — 섹션 컴포넌트 (presentational) */
const { useState, useEffect, useRef } = React;

/* ---- scroll reveal hook (robust: scroll + resize + safety net) ---- */
function useReveal() {
  useEffect(() => {
    const reveal = (el) => el.classList.add('in');
    const check = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95 && r.bottom > -10) reveal(el);
      });
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // safety net: never leave content hidden even if a scroll event is missed
    const t = setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(reveal), 1800);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      clearTimeout(t);
    };
  }, []);
}

/* ============================ NAV ============================ */
function Nav({ onApply }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <span className="mark">디</span>
          <span>클로드 디자인 클래스</span>
        </a>
        <div className="nav-links">
          <a href="#intro">강의 소개</a>
          <a href="#curriculum">커리큘럼</a>
          <a href="#library">강의 자료실</a>
          <a href="#schedule">일정</a>
          <a href="#faq">자주 묻는 질문</a>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onApply}>수강 신청</button>
      </div>
    </nav>
  );
}

/* ============================ HERO ============================ */
function Hero({ onApply }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="kicker">디자인을 처음 배우는 분들을 위한 8개 skill 클래스</span>
          <h1>
            말로 설명하면,<br />
            <span className="accent hand">디자인이 완성</span>돼요
          </h1>
          <p className="hero-sub">
            컴퓨터가 어렵게 느껴져도 괜찮습니다. 평소 말하듯이 설명하면
            홈페이지·발표자료·카드뉴스까지 — 클로드 디자인이 대신 만들어 드려요.
            기초부터 차근차근, 따뜻하게 함께합니다.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onApply}>수강 신청하기</button>
            <a className="btn btn-ghost" href="#curriculum">커리큘럼 살펴보기</a>
          </div>
          <div className="hero-note">
            <span className="dot"></span>
            매주 월·목 오후 2시 · 작은행동한사랑 3층 교육장 · 정원 12명 소수 정예
          </div>
        </div>
        <HeroArt />
      </div>
    </header>
  );
}

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="canvas-card cc-main">
        <div className="cc-toolbar">
          <span className="tdot" style={{ background: '#e8a13c' }}></span>
          <span className="tdot" style={{ background: '#d97757' }}></span>
          <span className="tdot" style={{ background: '#b9c08f' }}></span>
          <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-faint)' }}>내 첫 홈페이지.html</span>
        </div>
        <div className="cc-body">
          <div className="cc-pill" style={{ width: '46%' }}></div>
          <div className="cc-block" style={{ height: 96 }}></div>
          <div className="cc-pill" style={{ width: '72%', background: 'var(--surface-2)' }}></div>
          <div className="cc-pill" style={{ width: '58%', background: 'var(--surface-2)' }}></div>
          <div className="cc-swatch-row">
            <span className="cc-swatch" style={{ background: '#9a7d3f' }}></span>
            <span className="cc-swatch" style={{ background: '#cf6a3c' }}></span>
            <span className="cc-swatch" style={{ background: '#7e7a3c' }}></span>
            <span className="cc-swatch" style={{ background: 'var(--accent-tint)' }}></span>
          </div>
        </div>
      </div>
      <div className="float-chip chip-1">
        <span className="ico" style={{ background: 'var(--accent)' }}>✦</span>
        <span>대화로 수정<br /><small>“색을 더 밝게 해줘”</small></span>
      </div>
      <div className="float-chip chip-2">
        <span className="ico" style={{ background: 'var(--accent)' }}>↧</span>
        <span>바로 내보내기<br /><small>PPT · PDF · 캔바</small></span>
      </div>
    </div>
  );
}

/* ============================ INTRO / AUDIENCE ============================ */
const AUDIENCE = [
  { i: "🌱", t: "컴퓨터가 어렵게 느껴지는 분", d: "복잡한 프로그램 설치도, 디자인 지식도 필요 없어요. 한글로 대화만 하면 됩니다." },
  { i: "📂", t: "자료를 자주 만드는 학부모님", d: "학교 안내문, 모임 홍보물, 발표자료를 직접 예쁘게 만들고 싶은 분께 딱 맞아요." },
  { i: "✨", t: "새로운 도구가 궁금한 분", d: "요즘 화제인 AI 디자인 도구, 무엇이고 어디에 쓰는지 손으로 직접 익혀봅니다." },
];
const MAKE = [
  { c: "#9a7d3f", t: "홈페이지" },
  { c: "#cf6a3c", t: "발표자료(피치덱)" },
  { c: "#7e7a3c", t: "카드뉴스" },
  { c: "#b07a3c", t: "한 장 소개서" },
  { c: "#a8843e", t: "행사 초대장" },
];
function Intro() {
  return (
    <section className="block" id="intro">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">이런 분께 추천해요</span>
          <h2>디자인을 몰라도, 누구나 만들 수 있어요</h2>
          <p>나이도, 전공도 상관없습니다. 말로 설명할 수만 있다면 충분해요.</p>
        </div>
        <div className="card-grid">
          {AUDIENCE.map((a, i) => (
            <div className="soft-card reveal" key={i} style={{ transitionDelay: (i * 80) + 'ms' }}>
              <div className="emoji-ico">{a.i}</div>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
        <div className="make-strip reveal">
          <span className="lab">강의가 끝나면 이런 걸 만들 수 있어요 →</span>
          <div className="make-tags">
            {MAKE.map((m, i) => (
              <span className="make-tag" key={i}>
                <span className="d" style={{ background: m.c }}></span>{m.t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ CURRICULUM ============================ */
const LESSONS = [
  { n: "01", t: "클로드 디자인 첫걸음", d: "디자인을 못해도 괜찮아요. 빈 화면이 아니라 ‘대화’로 만든다는 걸, 첫 시간에 직접 만들어보며 경험합니다.", topics: ["채팅+캔버스", "접속·플랜", "첫 카드 만들기"], meta: "skill 1 · 3시간",
    goal: "접속과 화면 구성(채팅+캔버스)을 익히고, 간단한 카드 하나를 직접 만들어 본다.",
    covers: [
      "“디자인을 못해도 디자인할 수 있다” — 대화로 만든다는 개념",
      "접속 — claude.ai/design, 유료 플랜 필요(무료 제외)",
      "화면 구조 — 왼쪽 채팅 / 오른쪽 실시간 캔버스",
      "짧은 문구 하나로 첫 카드 만들어 보기",
    ],
    practice: "결과물 — 간단한 인사·안내 카드 1종",
    note: "notes/cha-1.html" },
  { n: "02", t: "내 스타일 정하기", d: "‘디자인 시스템’은 어려운 말이 아니라 ‘나만의 스타일 규칙’. 색과 글꼴을 정해두면 이후 작업이 같은 분위기로 이어집니다.", topics: ["디자인 시스템", "색·폰트 지정", "스타일 일관성"], meta: "skill 2 · 3시간",
    goal: "색과 글꼴로 ‘나만의 스타일 규칙’을 정하는 법을 익힌다.",
    covers: [
      "디자인 시스템 = 색·글꼴·버튼 모양 같은 ‘내 스타일 규칙’",
      "스타일 정하는 3가지 — 말로 설명 / 화면 캡처 / 직접 지정",
      "폰트 — 무료 한글 글꼴(Pretendard, 나눔 계열) 이름 말하기",
      "한 번 정한 스타일이 이후 작업에 이어지는 일관성",
    ],
    practice: "결과물 — 나만의 디자인 스타일 1종(색·글꼴 샘플)",
    note: "notes/cha-2.html" },
  { n: "03", t: "카드뉴스·SNS 콘텐츠 만들기", d: "동호회 공지, 가게 홍보, 개인 소식까지 — 일반인 활용도가 가장 높은 시간. 여러 장 카드뉴스를 직접 만듭니다.", topics: ["카드뉴스", "인포그래픽", "SNS 규격"], meta: "skill 3 · 3시간",
    goal: "여러 장 카드뉴스와 인포그래픽을 SNS 규격에 맞춰 만든다.",
    covers: [
      "카드뉴스 구조 — 표지 → 핵심 3~5장 → 마무리",
      "인포그래픽 — 글 정보를 큰 숫자·아이콘·짧은 문구로",
      "규격 — 인스타 정사각(1080×1080), 세로형(1080×1350)",
      "이미지(PNG)·공유 가능한 형태로 내보내기",
    ],
    practice: "결과물 — 인스타용 카드뉴스 1세트(4~5장)",
    note: "notes/cha-3.html" },
  { n: "04", t: "홍보 포스터·전단지 만들기", d: "행사·모임·가게를 알리는 한 장짜리 홍보물. 가장 중요한 정보를 가장 크게, 한눈에 읽히도록 배치합니다.", topics: ["홍보 포스터", "정보 위계", "저작권 주의"], meta: "skill 4 · 3시간",
    goal: "핵심 정보를 보기 좋게 배치한 한 장짜리 홍보물을 만든다.",
    covers: [
      "필수 요소 — 큰 제목, 일시·장소·연락처, 시선 끄는 이미지",
      "정보 위계 — 가장 중요한 것을 가장 크게",
      "사진·이미지 저작권 주의(출처 확인)",
      "규격 — 인쇄용 A4 세로 / 온라인 공유용 이미지",
    ],
    practice: "결과물 — 행사/모임 홍보 포스터 1종(인쇄 가능)",
    note: "notes/cha-4.html" },
  { n: "05", t: "발표자료(PPT) 만들기", d: "안내문·보고서·모임 자료를 발표자료로. 발표자료는 ‘글을 옮기는 것’이 아니라 ‘핵심을 보여주는 것’이에요.", topics: ["문서→발표자료", "한 장 한 메시지", "내보내기"], meta: "skill 5 · 3시간",
    goal: "기존 문서를 핵심만 담은 발표자료로 바꿔 내보낸다.",
    covers: [
      "기존 문서를 올려 발표자료로 변환하기",
      "한 슬라이드 = 한 메시지, 글자 줄이고 핵심만",
      "목록을 다이어그램·도표 같은 시각 요소로",
      "내보내기 형식 안내(변환이 필요할 수 있음)",
    ],
    practice: "결과물 — 기존 문서 기반 발표자료 1편(8~12장)",
    note: "notes/cha-5.html" },
  { n: "06", t: "나만의 웹페이지 만들기", d: "‘웹사이트도 내가 만들 수 있다’는 자신감을 얻는 시간. 소개용 한 페이지 웹사이트를 직접 만듭니다.", topics: ["한 페이지 웹", "웹 캡처 참고", "공유하기"], meta: "skill 6 · 3시간",
    goal: "소개용 한 페이지 웹사이트를 만들고 공유하는 법을 익힌다.",
    covers: [
      "구성 — 첫 화면(소개) → 주요 내용 → 연락/문의",
      "참고 사이트 느낌을 가져와 내 스타일로(웹 캡처)",
      "글·사진·버튼 배치를 대화로 조정",
      "공유/내보내기와 활용 범위",
    ],
    practice: "결과물 — 소개용 한 페이지 웹사이트(공유 가능)",
    note: "notes/cha-6.html" },
  { n: "07", t: "문서·인쇄물 만들기", d: "자기소개 한 장, 초대장처럼 실생활에 바로 쓰는 문서. 가족 행사 등 의미 있는 주제로 만들면 만족도가 높아요.", topics: ["소개서·초대장", "핵심 정리", "인쇄·공유"], meta: "skill 7 · 3시간",
    goal: "소개서·초대장 같은 실용 인쇄물을 깔끔하게 만든다.",
    covers: [
      "실생활 문서 — 자기소개 한 장, 초대장, 안내문",
      "핵심만 남기고 정리하는 편집(긴 글 줄이기)",
      "보기 좋은 레이아웃과 정보 위계",
      "인쇄용·공유용으로 저장하기",
    ],
    practice: "결과물 — 한 장 소개서 또는 초대장 1종(인쇄 가능)",
    note: "notes/cha-7.html" },
  { n: "08", t: "종합 실습 & 수료 발표", d: "배운 것으로 나만의 프로젝트를 완성합니다. 수료의 핵심은 ‘혼자서도 만들 수 있다’는 자립이에요.", topics: ["개인 프로젝트", "접근성 점검", "자립"], meta: "skill 8 · 3시간",
    goal: "내 프로젝트를 완성하고 접근성·저작권 기초까지 점검한다.",
    covers: [
      "개인 프로젝트 — 카드뉴스·포스터·발표자료·웹 중 택1 완성",
      "접근성 점검 — 글씨 크기·색 대비, 클로드에 검토 요청",
      "저작권·브랜드 주의 — 남의 이미지·로고 그대로 쓰지 않기",
      "도구 선택과 혼자 이어갈 방법 정리",
    ],
    practice: "결과물 — 개인 프로젝트 완성작 1편 + 간단 발표",
    note: "notes/cha-8.html" },
];
function Curriculum() {
  const [open, setOpen] = useState(0);
  return (
    <section className="block curri" id="curriculum">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">8개 skill 커리큘럼</span>
          <h2>누구나 디자이너 — 결과물 중심 8개 skill</h2>
          <p>각 skill을 눌러보면 학습 목표·다루는 내용·결과물을 자세히 볼 수 있어요. 매 skill마다 카드뉴스·포스터·발표자료처럼 ‘내 결과물’을 하나씩 완성합니다.</p>
        </div>
        <div className="curri-list">
          {LESSONS.map((l, i) => {
            const isOpen = open === i;
            return (
              <div className={"lesson-wrap" + (isOpen ? " open" : "")} key={i} style={{ transitionDelay: (i * 60) + 'ms' }}>
                <div className="lesson" onClick={() => setOpen(isOpen ? -1 : i)} role="button" aria-expanded={isOpen}>
                  <div className="no">{l.n}</div>
                  <div className="body">
                    <h3>{l.t}</h3>
                    <p>{l.d}</p>
                    <div className="topics">{l.topics.map((t, j) => <span key={j}>{t}</span>)}</div>
                  </div>
                  <div className="lesson-end">
                    <span className="meta">{l.meta}</span>
                    <span className="l-chev">⌄</span>
                  </div>
                </div>
                <div className="lesson-detail" style={{ maxHeight: isOpen ? '640px' : '0' }}>
                  <div className="ld-inner">
                    <div className="ld-block">
                      <h4>학습 목표</h4>
                      <p>{l.goal}</p>
                    </div>
                    <div className="ld-block">
                      <h4>다루는 내용</h4>
                      <ul className="ld-list">{l.covers.map((c, j) => <li key={j}>{c}</li>)}</ul>
                    </div>
                    <div className="ld-block">
                      <h4>결과물</h4>
                      <p>{l.practice}</p>
                    </div>
                    {l.note && (
                      <a className="ld-note-link" href={l.note}>📄 이 skill 강의안 보기 →</a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ SCHEDULE ============================ */
const ROUNDS = [
  { d: "1", t: "skill 1 · 첫걸음", desc: "채팅+캔버스, 첫 카드 만들기", tag: "오후 2시" },
  { d: "2", t: "skill 2 · 내 스타일 정하기", desc: "색·폰트·디자인 시스템", tag: "오후 2시" },
  { d: "3", t: "skill 3 · 카드뉴스·SNS", desc: "카드뉴스·인포그래픽", tag: "오후 2시" },
  { d: "4", t: "skill 4 · 홍보 포스터", desc: "행사·모임 홍보물 만들기", tag: "오후 2시" },
  { d: "5", t: "skill 5 · 발표자료(PPT)", desc: "문서를 발표자료로", tag: "오후 2시" },
  { d: "6", t: "skill 6 · 나만의 웹페이지", desc: "한 페이지 웹사이트", tag: "오후 2시" },
  { d: "7", t: "skill 7 · 문서·인쇄물", desc: "소개서·초대장 만들기", tag: "오후 2시" },
  { d: "8", t: "skill 8 · 종합 실습·수료", desc: "개인 프로젝트 완성·발표", tag: "오후 2시" },
];
function Schedule({ onApply }) {
  return (
    <section className="block" id="schedule">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">수업 안내</span>
          <h2>한눈에 보는 수업 정보</h2>
          <p>평일 오후, 작은행동한사랑 3층 교육장에서 직접 손으로 만들며 진행합니다.</p>
        </div>
        <div className="sched-grid">
          <div className="sched-card reveal">
            <h3>한눈에 보는 정보</h3>
            <div className="fact-row">
              <span className="fico">⏰</span>
              <div><div className="ft">시간</div><div className="fv">오후 2:00 ~ 5:00<small>skill당 3시간(강의+실습)</small></div></div>
            </div>
            <div className="fact-row">
              <span className="fico">📍</span>
              <div><div className="ft">장소</div><div className="fv">작은행동한사랑 3층 교육장<small>현장에서 함께 실습해요</small></div></div>
            </div>
            <div className="fact-row">
              <span className="fico">👥</span>
              <div><div className="ft">정원</div><div className="fv">12명 소수 정예<small>질문을 충분히 나눌 수 있어요</small></div></div>
            </div>
            <div className="fact-row">
              <span className="fico">🎁</span>
              <div><div className="ft">준비물</div><div className="fv">노트북 + 클로드 유료 구독<small>구독 안내는 skill 1에서 함께 도와드려요</small></div></div>
            </div>
          </div>
          <div className="reveal">
            <div className="round-list">
              {ROUNDS.map((r, i) => (
                <div className="round-item" key={i}>
                  <div className="rd">{r.d}</div>
                  <div>
                    <div className="ri-t">{r.t}</div>
                    <div className="ri-d">{r.desc}</div>
                  </div>
                  <span className="ri-tag">{r.tag}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={onApply}>
              이 일정으로 신청하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ CTA BAND ============================ */
function CtaBand({ onApply }) {
  return (
    <section className="block" id="apply">
      <div className="wrap">
        <div className="cta-band reveal">
          <div>
            <h2>이번 주말, 첫 디자인을 함께 만들어볼까요?</h2>
            <p>망설이는 그 마음도 잘 알아요. 정원이 차면 마감되니, 편하게 먼저 신청해 두세요. 부담 없이 시작하셔도 됩니다.</p>
          </div>
          <button className="btn btn-primary" onClick={onApply}>지금 수강 신청하기</button>
        </div>
      </div>
    </section>
  );
}

/* ============================ FAQ ============================ */
const FAQS = [
  { q: "컴퓨터를 잘 못 다뤄도 들을 수 있나요?", a: "네, 그런 분들을 위한 강의예요. 마우스와 키보드만 쓸 수 있으면 충분합니다. 어려운 용어는 쉬운 말로 풀어서 천천히 설명해 드려요." },
  { q: "꼭 유료 구독을 해야 하나요?", a: "원활한 실습을 위해 구독이 필요하지만, 1주차 수업에서 가입부터 설정까지 함께 차근차근 도와드립니다. 미리 준비하지 않으셔도 괜찮아요." },
  { q: "수업을 놓치면 어떻게 하나요?", a: "각 회차의 강의안은 홈페이지 ‘강의 자료실’에 회차별로 차곡차곡 올라갑니다. 못 오신 날이 있어도 자료를 보며 따라잡을 수 있고, 다음 시간에 따로 여쭤보셔도 좋아요." },
  { q: "자녀와 함께 들어도 되나요?", a: "물론입니다. 가족이 함께 한 화면을 보며 참여하셔도 좋아요. 다만 노트북으로 직접 만들어보는 실습이라 한 분이 조작을 맡아 주세요." },
];
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="block curri" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">자주 묻는 질문</span>
          <h2>궁금한 점, 미리 모았어요</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="qmark">Q</span>
                {f.q}
                <span className="chev">⌄</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? '260px' : '0' }}>
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ 강의 자료실 (LECTURE LIBRARY) ============================ */
/* 새 강의안을 추가할 때는 아래 배열에 항목을 추가하세요.
   status: "open"  → 공개(클릭 시 href 페이지로 이동)
           "soon"  → 준비 중(회색 처리, 링크 비활성) */
const LECTURE_NOTES = [
  { round: "개요", title: "과정 개요 & 운영 안내", date: "전체 안내", status: "open",
    summary: "대상·준비물·진행 방식, 차시별 한눈에 보기 표, 운영 참고사항(유료구독·저작권·결과물 보관).", href: "notes/overview.html" },
  { round: "skill 1", title: "클로드 디자인 첫걸음", date: "2026.06.01", status: "open",
    summary: "채팅+캔버스 개념, 접속·플랜 안내, 첫 카드 만들어 보기.", href: "notes/cha-1.html" },
  { round: "skill 2", title: "내 스타일 정하기", date: "2026.06.04", status: "open",
    summary: "색·폰트로 ‘나만의 스타일 규칙’ 정하기, 한글 무료 글꼴 지정.", href: "notes/cha-2.html" },
  { round: "skill 3", title: "카드뉴스·SNS 콘텐츠 만들기", date: "2026.06.08", status: "open",
    summary: "여러 장 카드뉴스와 인포그래픽을 SNS 규격으로 내보내기.", href: "notes/cha-3.html" },
  { round: "skill 4", title: "홍보 포스터·전단지 만들기", date: "2026.06.11", status: "open",
    summary: "행사·가게 홍보물, 정보 위계와 저작권 주의, 인쇄·공유용 저장.", href: "notes/cha-4.html" },
  { round: "skill 5", title: "발표자료(PPT) 만들기", date: "2026.06.15", status: "open",
    summary: "기존 문서를 핵심만 담은 발표자료로 변환하고 내보내기.", href: "notes/cha-5.html" },
  { round: "skill 6", title: "나만의 웹페이지 만들기", date: "2026.06.18", status: "open",
    summary: "소개용 한 페이지 웹사이트 만들기와 공유, 웹 캡처 참고.", href: "notes/cha-6.html" },
  { round: "skill 7", title: "문서·인쇄물 만들기", date: "2026.06.22", status: "open",
    summary: "한 장 소개서·초대장 같은 실용 인쇄물 깔끔하게 만들기.", href: "notes/cha-7.html" },
  { round: "skill 8", title: "종합 실습 & 수료 발표", date: "2026.06.25", status: "open",
    summary: "내 프로젝트 완성, 접근성·저작권 점검, 작품 발표와 자립.", href: "notes/cha-8.html" },
  { round: "보충", title: "시작 메뉴와 디자인 시스템 셋업", date: "시작하기", status: "open",
    summary: "Prototype·Slide deck·Template·Other 메뉴 구조와 디자인 시스템 만드는 법.", href: "notes/cha-menu.html" },
  { round: "보충", title: "내 디자인 시스템에 폰트 넣기", date: "타이포그래피", status: "open",
    summary: "폰트 import·upload 3가지 방법과 한글 무료 폰트 추천까지.", href: "notes/lecture-fonts.html" },
  { round: "보충", title: "기존 문서를 PPT로 만들기", date: "문서 → PPT", status: "open",
    summary: "docx·pdf·ppt·이미지를 발표자료로, 불릿을 다이어그램·차트로 바꾸는 3가지 경로.", href: "notes/lecture-ppt.html" },
];
function LectureLibrary() {
  return (
    <section className="block lib" id="library">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">강의 자료실</span>
          <h2>다시 보는 강의안</h2>
          <p>수업에서 다룬 자료를 skill별로 모아두는 공간이에요. 매 수업이 끝나면 이곳에 강의안이 차곡차곡 쌓입니다.</p>
        </div>
        <div className="lib-grid">
          {LECTURE_NOTES.map((n, i) => {
            const open = n.status === "open";
            const Tag = open ? "a" : "div";
            const props = open ? { href: n.href } : {};
            return (
              <Tag className={"lib-card reveal" + (open ? "" : " soon")} key={i} {...props} style={{ transitionDelay: (i * 60) + "ms" }}>
                <div className="badge">{n.round}</div>
                <div className="lc-body">
                  <h3>{n.title}</h3>
                  <p>{n.summary}</p>
                  <div className="lc-meta">
                    <span className={"lc-pill " + (open ? "open" : "soon")}>{open ? "공개" : "준비 중"}</span>
                    <span className="lc-date">{n.date}</span>
                  </div>
                </div>
                <div className="arrow">→</div>
              </Tag>
            );
          })}
        </div>
        <div className="lib-note reveal">
          <span className="star">✦</span>
          <span>강의안은 수업이 끝나는 대로 하나씩 공개됩니다. 자료실을 즐겨찾기에 추가해 두세요.</span>
        </div>
      </div>
    </section>
  );
}

/* ============================ 참고자료 · DESIGN.md (RESOURCES) ============================ */
const DESIGN_STEPS = [
  { n: "1", t: "새 프로젝트 만들기", d: "claude.ai/design에 접속해 반드시 비어 있는 새 프로젝트를 엽니다. (중간에 다른 브랜드를 섞으면 토큰이 엉켜요)" },
  { n: "2", t: "DESIGN.md 끌어다 놓기", d: "원하는 DESIGN.md 파일 한 장을 채팅창에 드래그 앤 드롭하면 끝. 색·글꼴·컴포넌트가 한 번에 차려집니다." },
  { n: "3", t: "한 줄로 주문하기", d: "“이 디자인 시스템으로 카페 홈페이지 만들어줘”처럼 입력하고, 이어서 “가격 페이지도” 하면 스타일이 자동 유지돼요." },
];
const DESIGN_DOWNLOADS = [
  { name: "따뜻한 동네 카페", sw: "#B5532A", tag: "크림 · 테라코타", desc: "손글씨 같은 친근함, 둥근 모서리, 사진 중심의 포근한 느낌.", file: "downloads/cafe-warm-DESIGN.md", as: "cafe-warm-DESIGN.md" },
  { name: "신뢰감 있는 공공기관", sw: "#1B4A8A", tag: "네이비 · 단정", desc: "또렷하고 정돈된, 누구나 읽기 쉬운 관공서 스타일.", file: "downloads/public-civic-DESIGN.md", as: "public-civic-DESIGN.md" },
  { name: "시니어 친화 고대비", sw: "#0B5FBF", tag: "큰 글씨 · 고대비", desc: "큰 글씨와 높은 대비, 큼직한 버튼. 접근성을 가장 먼저.", file: "downloads/senior-friendly-DESIGN.md", as: "senior-friendly-DESIGN.md" },
];
const DESIGN_SHOWCASE = [
  { name: "Claude", sw: "#D97757", d: "따뜻한 테라코타, 편집 디자인풍", href: "https://getdesign.md/claude/design-md" },
  { name: "Airbnb", sw: "#FF5A5F", d: "코랄 강조, 사진 중심 둥근 UI", href: "https://getdesign.md/airbnb/design-md" },
  { name: "Notion", sw: "#2E2B26", d: "따뜻한 미니멀, 세리프 제목", href: "https://getdesign.md/notion/design-md" },
  { name: "Apple", sw: "#1D1D1F", d: "여백 중심 프리미엄, SF Pro", href: "https://getdesign.md/apple/design-md" },
  { name: "Spotify", sw: "#1DB954", d: "다크 + 비비드 그린, 앨범아트", href: "https://getdesign.md/spotify/design-md" },
  { name: "Linear", sw: "#5E6AD2", d: "초미니멀, 퍼플 포인트", href: "https://getdesign.md/linear.app/design-md" },
  { name: "Stripe", sw: "#635BFF", d: "시그니처 퍼플 그라데이션", href: "https://getdesign.md/stripe/design-md" },
  { name: "Wise", sw: "#1Fb47A", d: "밝은 그린, 친근하고 명확함", href: "https://getdesign.md/wise/design-md" },
  { name: "Tesla", sw: "#171A20", d: "풀스크린 사진, 절제된 흑백", href: "https://getdesign.md/tesla/design-md" },
];
const DESIGN_CATS = [
  { t: "AI·LLM", n: 12 }, { t: "개발 도구·IDE", n: 7 }, { t: "백엔드·DB·DevOps", n: 8 },
  { t: "생산성·SaaS", n: 7 }, { t: "디자인·크리에이티브", n: 6 }, { t: "핀테크·크립토", n: 7 },
  { t: "커머스·리테일", n: 5 }, { t: "미디어·소비자", n: 13 }, { t: "자동차", n: 7 },
];
function Resources() {
  return (
    <section className="block" id="resources">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">참고자료 · DESIGN.md</span>
          <h2>DESIGN.md 한 장이면, 디자인이 통째로 차려져요</h2>
          <p>DESIGN.md는 브랜드의 색·글꼴·분위기를 적어둔 작은 텍스트 파일이에요. 클로드 디자인에 올리면 색상·타입·컴포넌트·UI 키트까지 한 번에 만들어집니다.</p>
        </div>

        <div className="res-steps">
          {DESIGN_STEPS.map((s, i) => (
            <div className="res-step reveal" key={i} style={{ transitionDelay: (i * 70) + "ms" }}>
              <div className="sn">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>

        <div className="section-head reveal" style={{ marginBottom: "22px" }}>
          <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>실습용 DESIGN.md 내려받기</h3>
          <p style={{ fontSize: "16px" }}>강의에서 함께 쓰는 세 가지 견본이에요. 받아서 각각 다른 새 프로젝트에 올려보면 “같은 도구인데 이렇게 달라진다”가 한눈에 보입니다.</p>
        </div>
        <div className="dl-grid">
          {DESIGN_DOWNLOADS.map((d, i) => (
            <div className="dl-card reveal" key={i} style={{ transitionDelay: (i * 60) + "ms" }}>
              <div className="dl-top">
                <span className="sw" style={{ background: d.sw }}></span>
                <div>
                  <div className="dl-name">{d.name}</div>
                  <div className="dl-tag">{d.tag}</div>
                </div>
              </div>
              <p>{d.desc}</p>
              <a className="dl-btn" href={d.file} download={d.as}>
                <span className="di">↧</span> DESIGN.md 받기
              </a>
            </div>
          ))}
        </div>

        <div className="section-head reveal" style={{ marginTop: "56px", marginBottom: "22px" }}>
          <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>더 많은 디자인 영감집</h3>
          <p style={{ fontSize: "16px" }}>유명 브랜드의 색·글꼴·규칙을 깊이 있게 분석한 DESIGN.md가 <b>72종</b> 모여 있어요. Google의 DESIGN.md 표준을 기반으로 만들어져, 표면적인 색 모음이 아니라 바로 쓸 수 있는 수준입니다. 마음에 드는 분위기를 골라 그대로 시작해 보세요.</p>
          <a className="inline-link" href="https://getdesign.md/" target="_blank" rel="noopener">getdesign.md 에서 전체 모음 보기 ↗</a>
        </div>
        <div className="cat-chips reveal">
          {DESIGN_CATS.map((c, i) => (
            <a className="cat-chip" key={i} href="https://getdesign.md/" target="_blank" rel="noopener">
              {c.t}<span className="cn">{c.n}</span>
            </a>
          ))}
        </div>
        <div className="res-grid">
          {DESIGN_SHOWCASE.map((b, i) => (
            <a className="res-card reveal" key={i} href={b.href} target="_blank" rel="noopener" style={{ transitionDelay: (i * 40) + "ms" }}>
              <div className="rc-top">
                <span className="sw" style={{ background: b.sw }}></span>
                <span className="rc-name">{b.name}</span>
                <span className="rc-go">↗</span>
              </div>
              <p>{b.d}</p>
            </a>
          ))}
        </div>
        <div className="res-foot reveal">
          <div className="rf-t">
            클로드 디자인 소스(DESIGN.md) 받는 곳
            <small>72종 · Google DESIGN.md 표준 기반 · 오픈소스(MIT) 무료</small>
            <span className="rf-urls">
              <code className="rf-url">github.com/VoltAgent/awesome-claude-design</code>
              <a className="rf-url rf-url-link" href="https://getdesign.md/" target="_blank" rel="noopener">getdesign.md ↗</a>
            </span>
          </div>
          <a className="btn btn-primary" href="https://github.com/VoltAgent/awesome-claude-design" target="_blank" rel="noopener">저장소 열기 →</a>
        </div>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="brand"><span className="mark">디</span><span>클로드 디자인 클래스</span></div>
        <div>문의 · design.class@example.com · 010-0000-0000</div>
        <div>© 2026 클로드 디자인 클래스 · 일반인을 위한 디자인 교실</div>
      </div>
    </footer>
  );
}

Object.assign(window, { useReveal, Nav, Hero, Intro, Curriculum, LectureLibrary, Resources, Schedule, CtaBand, Faq, Footer });
